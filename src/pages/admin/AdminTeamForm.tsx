import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
} from '../../services/teamService';
import { useToast } from '../../contexts/ToastContext';
import type { TeamMember } from '../../types';
import styles from './AdminTeamForm.module.css';

interface FormState {
  name: string;
  role: string;
  order: number;
  instagram: string;
  linkedin: string;
  github: string;
  youtube: string;
}

const empty: FormState = {
  name: '',
  role: '',
  order: 0,
  instagram: '',
  linkedin: '',
  github: '',
  youtube: '',
};

export default function AdminTeamForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!isEdit || !id) return;
    async function fetchMember() {
      try {
        const all = await getTeamMembers();
        const found = all.find((m: TeamMember) => m.id === id);
        if (!found) {
          toast.error('Member not found');
          navigate('/admin/team');
          return;
        }
        setForm({
          name: found.name,
          role: found.role,
          order: found.order,
          instagram: found.instagram ?? '',
          linkedin: found.linkedin ?? '',
          github: found.github ?? '',
          youtube: found.youtube ?? '',
        });
      } catch {
        toast.error('Failed to load member');
        navigate('/admin/team');
      } finally {
        setFetching(false);
      }
    }
    fetchMember();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEdit]);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.role.trim()) e.role = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { toast.warning('Check required fields'); return; }
    setLoading(true);
    try {
      const data: Omit<TeamMember, 'id'> = {
        name: form.name.trim(),
        role: form.role.trim(),
        order: form.order,
        instagram: form.instagram.trim() || undefined,
        linkedin: form.linkedin.trim() || undefined,
        github: form.github.trim() || undefined,
        youtube: form.youtube.trim() || undefined,
      };
      if (isEdit) {
        await updateTeamMember(id!, data);
        toast.success('Member updated', form.name);
      } else {
        await createTeamMember(data);
        toast.success('Member created', form.name);
      }
      navigate('/admin/team');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      toast.error('Save failed', msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className={styles.fetchingWrap}>
        <Loader2 size={24} className={styles.spin} />
        <span>Loading member…</span>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => navigate('/admin/team')}>
          <ArrowLeft size={16} />
          Back
        </button>
        <h1 className={styles.pageTitle}>{isEdit ? 'Edit Member' : 'New Member'}</h1>
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
              <label className={styles.label}>
                Name <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Full name"
                disabled={loading}
              />
              {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Role <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${errors.role ? styles.inputError : ''}`}
                value={form.role}
                onChange={e => set('role', e.target.value)}
                placeholder="Developer"
                disabled={loading}
              />
              {errors.role && <span className={styles.fieldError}>{errors.role}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Display Order</label>
              <input
                type="number"
                className={styles.input}
                min={0}
                value={form.order}
                onChange={e => set('order', Number(e.target.value))}
                disabled={loading}
              />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Social Links</h2>
          <p className={styles.sectionHint}>All fields are optional. Leave blank to hide.</p>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Instagram URL</label>
              <input
                className={styles.input}
                value={form.instagram}
                onChange={e => set('instagram', e.target.value)}
                placeholder="https://instagram.com/…"
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>LinkedIn URL</label>
              <input
                className={styles.input}
                value={form.linkedin}
                onChange={e => set('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/…"
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>GitHub URL</label>
              <input
                className={styles.input}
                value={form.github}
                onChange={e => set('github', e.target.value)}
                placeholder="https://github.com/…"
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>YouTube URL</label>
              <input
                className={styles.input}
                value={form.youtube}
                onChange={e => set('youtube', e.target.value)}
                placeholder="https://youtube.com/@…"
                disabled={loading}
              />
            </div>
          </div>
        </section>

        <div className={styles.formFooter}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate('/admin/team')}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            {loading ? <Loader2 size={16} className={styles.spin} /> : <Save size={16} />}
            {isEdit ? 'Save Changes' : 'Create Member'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
