import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, X, Loader2, Save, Upload } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { createMod, updateMod, getModById, isSlugTaken } from '../../services/modService';
import { useToast } from '../../contexts/ToastContext';
import type { Mod, Version } from '../../types';
import styles from './AdminModForm.module.css';

type ModType = Mod['type'];

const MOD_TYPES: ModType[] = ['mcaddon', 'mcworld', 'mcpack', 'mctemplate'];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

interface FormState {
  title: string;
  slug: string;
  author: string;
  type: ModType;
  shortDesc: string;
  longDesc: string;
  thumbnail: string;
  gumroadUrl: string;
  downloadCount: number;
  tags: string[];
  screenshots: string[];
  versions: Version[];
}

const empty: FormState = {
  title: '', slug: '', author: '', type: 'mcaddon',
  shortDesc: '', longDesc: '', thumbnail: '', gumroadUrl: '',
  downloadCount: 0, tags: [], screenshots: [], versions: [],
};

type MediaTab = 'url' | 'upload';

export default function AdminModForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState<FormState>(empty);
  // true = MANUAL (user typed or edit mode), false = AUTO (derive from title)
  const [slugManual, setSlugManual] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [screenshotInput, setScreenshotInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  // Media tabs
  const [thumbTab, setThumbTab] = useState<MediaTab>('url');
  const [screenshotTab, setScreenshotTab] = useState<MediaTab>('url');

  // Upload states
  const [thumbUploading, setThumbUploading] = useState(false);
  const [thumbUploadError, setThumbUploadError] = useState('');
  const [thumbDragging, setThumbDragging] = useState(false);

  const [screenshotsUploading, setScreenshotsUploading] = useState(false);
  const [screenshotsUploadError, setScreenshotsUploadError] = useState('');
  const [screenshotsDragging, setScreenshotsDragging] = useState(false);

  const thumbInputRef = useRef<HTMLInputElement>(null);
  const screenshotsInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!isEdit || !id) return;
    async function fetchMod() {
      try {
        const mod = await getModById(id!);
        if (!mod) { toast.error('Mod not found'); navigate('/admin/mods'); return; }
        setForm({
          title: mod.title, slug: mod.slug, author: mod.author, type: mod.type,
          shortDesc: mod.shortDesc, longDesc: mod.longDesc, thumbnail: mod.thumbnail,
          gumroadUrl: mod.gumroadUrl, downloadCount: mod.downloadCount ?? 0,
          tags: mod.tags ?? [], screenshots: mod.screenshots ?? [], versions: mod.versions ?? [],
        });
        setSlugManual(true);
      } catch {
        toast.error('Failed to load mod');
        navigate('/admin/mods');
      } finally {
        setFetching(false);
      }
    }
    fetchMod();
  }, [id, isEdit, navigate, toast]);

  const handleTitleChange = useCallback((v: string) => {
    setForm(prev => ({
      ...prev,
      title: v,
      slug: slugManual ? prev.slug : slugify(v),
    }));
  }, [slugManual]);

  const toggleSlugMode = () => {
    if (slugManual) {
      // Switch to AUTO: re-derive from current title
      setForm(prev => ({ ...prev, slug: slugify(prev.title) }));
      setSlugManual(false);
    } else {
      // Switch to MANUAL: keep current slug, allow editing
      setSlugManual(true);
    }
  };

  const validate = async (): Promise<boolean> => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = 'Required';
    if (!form.slug.trim()) {
      e.slug = 'Required';
    } else {
      const taken = await isSlugTaken(form.slug, isEdit ? id : undefined);
      if (taken) e.slug = 'Slug already in use';
    }
    if (!form.author.trim()) e.author = 'Required';
    if (!form.shortDesc.trim()) e.shortDesc = 'Required';
    if (!form.gumroadUrl.trim()) e.gumroadUrl = 'Required';
    if (form.versions.length === 0) e.versions = 'Add at least one version';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await validate();
    if (!valid) { toast.warning('Check required fields'); return; }
    setLoading(true);
    try {
      const data: Omit<Mod, 'id'> = {
        ...form,
        createdAt: isEdit ? (await getModById(id!))?.createdAt ?? Date.now() : Date.now(),
      };
      if (isEdit) {
        await updateMod(id!, data);
        toast.success('Mod updated', form.title);
      } else {
        await createMod(data);
        toast.success('Mod created', form.title);
      }
      navigate('/admin/mods');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      toast.error('Save failed', msg);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  };

  const addScreenshot = () => {
    const s = screenshotInput.trim();
    if (s && !form.screenshots.includes(s)) set('screenshots', [...form.screenshots, s]);
    setScreenshotInput('');
  };

  const addVersion = () => {
    set('versions', [...form.versions, { version: '', changelog: '', date: Date.now() }]);
  };

  const updateVersion = (i: number, key: keyof Version, value: string | number) => {
    const updated = form.versions.map((v, idx) => idx === i ? { ...v, [key]: value } : v);
    set('versions', updated);
  };

  const removeVersion = (i: number) => set('versions', form.versions.filter((_, idx) => idx !== i));

  // ── Upload helpers ──

  async function uploadFile(file: File, folder: string): Promise<string> {
    const path = `${folder}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async function handleThumbFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setThumbUploadError('');
    setThumbUploading(true);
    try {
      const url = await uploadFile(files[0], 'thumbnails');
      set('thumbnail', url);
    } catch (err) {
      setThumbUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setThumbUploading(false);
    }
  }

  async function handleScreenshotFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setScreenshotsUploadError('');
    setScreenshotsUploading(true);
    try {
      const uploads = Array.from(files).map(f => uploadFile(f, 'screenshots'));
      const urls = await Promise.all(uploads);
      const deduped = urls.filter(u => !form.screenshots.includes(u));
      set('screenshots', [...form.screenshots, ...deduped]);
    } catch (err) {
      setScreenshotsUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setScreenshotsUploading(false);
    }
  }

  if (fetching) {
    return (
      <div className={styles.fetchingWrap}>
        <Loader2 size={24} className={styles.spin} />
        <span>Loading mod…</span>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => navigate('/admin/mods')}>
          <ArrowLeft size={16} />
          Back
        </button>
        <h1 className={styles.pageTitle}>{isEdit ? 'Edit Mod' : 'New Mod'}</h1>
      </div>

      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        noValidate
      >
        {/* Basic Info */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Info</h2>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Title <span className={styles.req}>*</span></label>
              <input
                className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="Amazing Mod Pack"
                disabled={loading}
              />
              {errors.title && <span className={styles.fieldError}>{errors.title}</span>}
            </div>

            <div className={styles.field}>
              <div className={styles.slugLabelRow}>
                <label className={styles.label}>
                  Slug <span className={styles.req}>*</span>
                </label>
                <button
                  type="button"
                  className={`${styles.slugToggleBtn} ${slugManual ? styles.slugToggleManual : styles.slugToggleAuto}`}
                  onClick={toggleSlugMode}
                  disabled={loading}
                  title={slugManual ? 'Switch to auto-generate from title' : 'Switch to manual editing'}
                >
                  {slugManual ? 'MANUAL' : 'AUTO'}
                </button>
              </div>
              <input
                className={`${styles.input} ${errors.slug ? styles.inputError : ''}`}
                value={form.slug}
                onChange={e => {
                  if (slugManual) set('slug', slugify(e.target.value));
                }}
                placeholder="amazing-mod-pack"
                disabled={loading || !slugManual}
                readOnly={!slugManual}
              />
              {errors.slug && <span className={styles.fieldError}>{errors.slug}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Author <span className={styles.req}>*</span></label>
              <input
                className={`${styles.input} ${errors.author ? styles.inputError : ''}`}
                value={form.author}
                onChange={e => set('author', e.target.value)}
                placeholder="Creator name"
                disabled={loading}
              />
              {errors.author && <span className={styles.fieldError}>{errors.author}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Type</label>
              <select
                className={styles.select}
                value={form.type}
                onChange={e => set('type', e.target.value as ModType)}
                disabled={loading}
              >
                {MOD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Descriptions */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Descriptions</h2>
          <div className={styles.field}>
            <label className={styles.label}>Short Description <span className={styles.req}>*</span></label>
            <input
              className={`${styles.input} ${errors.shortDesc ? styles.inputError : ''}`}
              value={form.shortDesc}
              onChange={e => set('shortDesc', e.target.value)}
              placeholder="One-line description shown in cards"
              disabled={loading}
            />
            {errors.shortDesc && <span className={styles.fieldError}>{errors.shortDesc}</span>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Long Description</label>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              value={form.longDesc}
              onChange={e => set('longDesc', e.target.value)}
              placeholder="Full markdown-friendly description…"
              rows={6}
              disabled={loading}
            />
          </div>
        </section>

        {/* Media & Links */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Media & Links</h2>
          <div className={styles.grid2}>

            {/* Thumbnail */}
            <div className={styles.field}>
              <label className={styles.label}>Thumbnail</label>
              <div className={styles.mediaTabs}>
                <button
                  type="button"
                  className={`${styles.mediaTabBtn} ${thumbTab === 'url' ? styles.mediaTabBtnActive : ''}`}
                  onClick={() => setThumbTab('url')}
                >
                  URL
                </button>
                <button
                  type="button"
                  className={`${styles.mediaTabBtn} ${thumbTab === 'upload' ? styles.mediaTabBtnActive : ''}`}
                  onClick={() => setThumbTab('upload')}
                >
                  Upload
                </button>
              </div>

              {thumbTab === 'url' ? (
                <input
                  className={styles.input}
                  value={form.thumbnail}
                  onChange={e => set('thumbnail', e.target.value)}
                  placeholder="https://…/thumbnail.png"
                  disabled={loading}
                />
              ) : (
                <div
                  className={`${styles.uploadArea} ${thumbDragging ? styles.uploadAreaDragging : ''}`}
                  onDragOver={ev => { ev.preventDefault(); setThumbDragging(true); }}
                  onDragLeave={() => setThumbDragging(false)}
                  onDrop={ev => {
                    ev.preventDefault();
                    setThumbDragging(false);
                    handleThumbFiles(ev.dataTransfer.files);
                  }}
                  onClick={() => thumbInputRef.current?.click()}
                >
                  <input
                    ref={thumbInputRef}
                    type="file"
                    accept="image/*"
                    className={styles.uploadHiddenInput}
                    onChange={e => handleThumbFiles(e.target.files)}
                    disabled={loading || thumbUploading}
                  />
                  <span className={styles.uploadAreaLabel}>
                    <Upload size={18} color="#7ED957" />
                    <strong>Click to browse</strong>
                    <span>or drag & drop an image</span>
                  </span>
                </div>
              )}

              {thumbUploading && (
                <span className={styles.uploadingText}>
                  <Loader2 size={12} className={styles.spin} /> Uploading…
                </span>
              )}
              {thumbUploadError && <span className={styles.uploadError}>{thumbUploadError}</span>}
              {form.thumbnail && (
                <img
                  src={form.thumbnail}
                  alt=""
                  className={styles.thumbPreview}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Gumroad URL <span className={styles.req}>*</span></label>
              <input
                className={`${styles.input} ${errors.gumroadUrl ? styles.inputError : ''}`}
                value={form.gumroadUrl}
                onChange={e => set('gumroadUrl', e.target.value)}
                placeholder="https://gumroad.com/l/…"
                disabled={loading}
              />
              {errors.gumroadUrl && <span className={styles.fieldError}>{errors.gumroadUrl}</span>}
            </div>
          </div>

          {/* Screenshots */}
          <div className={styles.field}>
            <label className={styles.label}>Screenshots</label>
            <div className={styles.mediaTabs}>
              <button
                type="button"
                className={`${styles.mediaTabBtn} ${screenshotTab === 'url' ? styles.mediaTabBtnActive : ''}`}
                onClick={() => setScreenshotTab('url')}
              >
                URL
              </button>
              <button
                type="button"
                className={`${styles.mediaTabBtn} ${screenshotTab === 'upload' ? styles.mediaTabBtnActive : ''}`}
                onClick={() => setScreenshotTab('upload')}
              >
                Upload
              </button>
            </div>

            {screenshotTab === 'url' ? (
              <div className={styles.listInputRow}>
                <input
                  className={styles.input}
                  value={screenshotInput}
                  onChange={e => setScreenshotInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addScreenshot(); } }}
                  placeholder="https://…/screenshot.png"
                  disabled={loading}
                />
                <button type="button" className={styles.listAddBtn} onClick={addScreenshot} disabled={loading}>
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <div
                className={`${styles.uploadArea} ${screenshotsDragging ? styles.uploadAreaDragging : ''}`}
                onDragOver={ev => { ev.preventDefault(); setScreenshotsDragging(true); }}
                onDragLeave={() => setScreenshotsDragging(false)}
                onDrop={ev => {
                  ev.preventDefault();
                  setScreenshotsDragging(false);
                  handleScreenshotFiles(ev.dataTransfer.files);
                }}
                onClick={() => screenshotsInputRef.current?.click()}
              >
                <input
                  ref={screenshotsInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className={styles.uploadHiddenInput}
                  onChange={e => handleScreenshotFiles(e.target.files)}
                  disabled={loading || screenshotsUploading}
                />
                <span className={styles.uploadAreaLabel}>
                  <Upload size={18} color="#7ED957" />
                  <strong>Click to browse</strong>
                  <span>supports multiple images</span>
                </span>
              </div>
            )}

            {screenshotsUploading && (
              <span className={styles.uploadingText}>
                <Loader2 size={12} className={styles.spin} /> Uploading…
              </span>
            )}
            {screenshotsUploadError && <span className={styles.uploadError}>{screenshotsUploadError}</span>}

            {form.screenshots.length > 0 && (
              <div className={styles.chipList}>
                {form.screenshots.map((s, i) => (
                  <div key={i} className={`${styles.chip} ${styles.chipUrl}`}>
                    <span>{s.length > 40 ? `…${s.slice(-38)}` : s}</span>
                    <button
                      type="button"
                      onClick={() => set('screenshots', form.screenshots.filter((_, idx) => idx !== i))}
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Tags */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tags</h2>
          <div className={styles.field}>
            <div className={styles.listInputRow}>
              <input
                className={styles.input}
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                placeholder="Type tag and press Enter"
                disabled={loading}
              />
              <button type="button" className={styles.listAddBtn} onClick={addTag} disabled={loading}>
                <Plus size={14} />
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className={styles.chipList}>
                {form.tags.map(tag => (
                  <div key={tag} className={styles.chip}>
                    <span>{tag}</span>
                    <button type="button" onClick={() => set('tags', form.tags.filter(t => t !== tag))}>
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Versions */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Versions <span className={styles.req}>*</span></h2>
            <button type="button" className={styles.addVersionBtn} onClick={addVersion} disabled={loading}>
              <Plus size={13} /> Add Version
            </button>
          </div>
          {errors.versions && <span className={styles.fieldError}>{errors.versions}</span>}
          {form.versions.length === 0 ? (
            <p className={styles.versionsEmpty}>No versions yet. Add at least one.</p>
          ) : (
            <div className={styles.versionList}>
              {form.versions.map((v, i) => (
                <div key={i} className={styles.versionCard}>
                  <div className={styles.versionHeader}>
                    <span className={styles.versionNum}>Version {i + 1}</span>
                    <button type="button" className={styles.removeVersionBtn} onClick={() => removeVersion(i)}>
                      <X size={13} />
                    </button>
                  </div>
                  <div className={styles.grid2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Version string</label>
                      <input
                        className={styles.input}
                        value={v.version}
                        onChange={e => updateVersion(i, 'version', e.target.value)}
                        placeholder="1.0.0"
                        disabled={loading}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Date</label>
                      <input
                        type="date"
                        className={styles.input}
                        value={new Date(v.date).toISOString().slice(0, 10)}
                        onChange={e => updateVersion(i, 'date', new Date(e.target.value).getTime())}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Changelog</label>
                    <textarea
                      className={`${styles.input} ${styles.textareaSm}`}
                      value={v.changelog}
                      onChange={e => updateVersion(i, 'changelog', e.target.value)}
                      placeholder="What changed in this version…"
                      rows={2}
                      disabled={loading}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Stats */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Stats</h2>
          <div className={styles.field} style={{ maxWidth: 180 }}>
            <label className={styles.label}>Download Count</label>
            <input
              type="number"
              className={styles.input}
              min={0}
              value={form.downloadCount}
              onChange={e => set('downloadCount', Number(e.target.value))}
              disabled={loading}
            />
          </div>
        </section>

        <div className={styles.formFooter}>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin/mods')} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            {loading ? <Loader2 size={16} className={styles.spin} /> : <Save size={16} />}
            {isEdit ? 'Save Changes' : 'Create Mod'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
