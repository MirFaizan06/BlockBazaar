import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastCtx, type ToastType } from '../../contexts/ToastContext';
import styles from './ToastContainer.module.css';

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={17} />,
  error: <XCircle size={17} />,
  warning: <AlertTriangle size={17} />,
  info: <Info size={17} />,
};

export default function ToastContainer() {
  const { toasts, dismiss } = useToastCtx();

  return (
    <div className={styles.container} role="region" aria-label="Notifications">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            className={`${styles.toast} ${styles[t.type]}`}
            initial={{ opacity: 0, x: 80, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.88 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            layout
          >
            <span className={styles.icon}>{ICONS[t.type]}</span>
            <div className={styles.body}>
              <p className={styles.title}>{t.title}</p>
              {t.message && <p className={styles.message}>{t.message}</p>}
            </div>
            <button className={styles.close} onClick={() => dismiss(t.id)} aria-label="Dismiss">
              <X size={13} />
            </button>
            <div
              className={styles.bar}
              style={{ animationDuration: `${t.duration}ms` }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
