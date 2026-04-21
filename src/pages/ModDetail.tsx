import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, User, Calendar, ArrowLeft, Heart, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMod } from '../hooks/useMods';
import { incrementDownloadCount } from '../services/modService';
import { formatDownloadCount, formatDate } from '../utils/helpers';
import Button from '../components/Button';
import Tag from '../components/Tag';
import Modal from '../components/Modal';
import styles from './ModDetail.module.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function ModDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { mod, loading, error } = useMod(slug ?? '');
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  const handleDownloadClick = useCallback(() => {
    if (!mod) return;
    setCountdown(10);
    setDownloadOpen(true);
    if (!downloadTriggered) {
      setDownloadTriggered(true);
      incrementDownloadCount(mod.id).catch(() => {});
    }
  }, [mod, downloadTriggered]);

  useEffect(() => {
    if (!downloadOpen) return;
    if (countdown <= 0) {
      window.open(mod?.gumroadUrl, '_blank', 'noopener,noreferrer');
      setDownloadOpen(false);
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [downloadOpen, countdown, mod?.gumroadUrl]);

  const handleSkip = () => {
    window.open(mod?.gumroadUrl, '_blank', 'noopener,noreferrer');
    setDownloadOpen(false);
  };

  const handleDonate = () => {
    window.open(mod?.gumroadUrl, '_blank', 'noopener,noreferrer');
    setDownloadOpen(false);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const prevScreenshot = () => setLightboxIndex(i => Math.max(0, i - 1));
  const nextScreenshot = () => setLightboxIndex(i => Math.min((mod?.screenshots.length ?? 1) - 1, i + 1));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowLeft') prevScreenshot();
      if (e.key === 'ArrowRight') nextScreenshot();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  if (loading) return <ModDetailSkeleton />;

  if (error || !mod) {
    return (
      <div className="container">
        <div className={styles.errorState}>
          <h2>Mod not found</h2>
          <Link to="/browse" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  const progress = ((10 - countdown) / 10) * 100;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
      <div className="container">
        <Link to="/browse" className={styles.backLink}>
          <ArrowLeft size={15} /> Back to Browse
        </Link>

        <div className={styles.hero}>
          <div className={styles.thumbnail}>
            <img src={mod.thumbnail} alt={mod.title} className={styles.thumbnailImg} />
          </div>
          <div className={styles.info}>
            <div className={styles.typeBadge}>{mod.type}</div>
            <h1 className={styles.title}>{mod.title}</h1>
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <User size={14} /> {mod.author}
              </span>
              <span className={styles.metaItem}>
                <Calendar size={14} /> {formatDate(mod.createdAt)}
              </span>
              <span className={styles.metaItem}>
                <Download size={14} /> {formatDownloadCount(mod.downloadCount)} downloads
              </span>
            </div>
            <div className={styles.tags}>
              {mod.tags.map(tag => <Tag key={tag} label={tag} />)}
            </div>
            <div className={styles.actions}>
              <Button size="lg" onClick={handleDownloadClick}>
                <Download size={16} /> Download
              </Button>
            </div>
          </div>
        </div>

        {mod.screenshots.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Screenshots</h2>
            <div className={styles.screenshots}>
              {mod.screenshots.map((src, i) => (
                <button key={i} className={styles.screenshotBtn} onClick={() => openLightbox(i)}>
                  <img src={src} alt={`Screenshot ${i + 1}`} loading="lazy" className={styles.screenshotImg} />
                </button>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Description</h2>
          <div className={styles.description}>
            {mod.longDesc.split('\n').map((line, i) =>
              line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
            )}
          </div>
        </section>

        {mod.versions.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Version History</h2>
            <div className={styles.versions}>
              {mod.versions.map((v, i) => (
                <div key={i} className={`${styles.versionItem} ${i === 0 ? styles.latestVersion : ''}`}>
                  <div className={styles.versionHeader}>
                    <span className={styles.versionNum}>v{v.version}</span>
                    {i === 0 && <span className={styles.latestBadge}>Latest</span>}
                    <span className={styles.versionDate}>{formatDate(v.date)}</span>
                  </div>
                  <p className={styles.versionChangelog}>{v.changelog}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Modal open={downloadOpen} onClose={() => setDownloadOpen(false)} size="sm" closable={false}>
        <div className={styles.downloadModal}>
          <div className={styles.dlHeart}>
            <Heart size={28} fill="#7ED957" color="#7ED957" />
          </div>
          <h2 className={styles.dlTitle}>Thanks for downloading!</h2>
          <p className={styles.dlText}>
            Enjoying <strong>{mod.title}</strong>? Consider supporting <strong>{mod.author}</strong> to keep amazing mods coming.
          </p>

          <div className={styles.progressWrap}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>
          <p className={styles.countdownText}>
            Redirecting in <strong>{countdown}</strong> second{countdown !== 1 ? 's' : ''}...
          </p>

          <div className={styles.dlActions}>
            <Button variant="primary" size="md" onClick={handleDonate}>
              <Heart size={14} /> Donate
            </Button>
            <Button variant="ghost" size="md" onClick={handleSkip}>
              <ExternalLink size={14} /> Skip
            </Button>
          </div>

          <button className={styles.dlClose} onClick={() => setDownloadOpen(false)} aria-label="Close">
            <X size={16} />
          </button>
        </div>
      </Modal>

      <AnimatePresence>
        {lightboxOpen && mod.screenshots[lightboxIndex] && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.img
              key={lightboxIndex}
              src={mod.screenshots[lightboxIndex]}
              alt={`Screenshot ${lightboxIndex + 1}`}
              className={styles.lightboxImg}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
            />
            {lightboxIndex > 0 && (
              <button
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={e => { e.stopPropagation(); prevScreenshot(); }}
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {lightboxIndex < mod.screenshots.length - 1 && (
              <button
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={e => { e.stopPropagation(); nextScreenshot(); }}
              >
                <ChevronRight size={24} />
              </button>
            )}
            <button className={styles.lightboxClose} onClick={() => setLightboxOpen(false)}>
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ModDetailSkeleton() {
  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <div style={{ marginTop: 24, marginBottom: 24, width: 120, height: 20, background: 'var(--surface-2)', borderRadius: 4 }} />
      <div className={styles.hero}>
        <div style={{ background: 'var(--surface-2)', borderRadius: 12, aspectRatio: '16/9' }} />
        <div className={styles.info}>
          {[80, 60, 40, 70, 50].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 16, background: 'var(--surface-2)', borderRadius: 4, marginBottom: 12 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
