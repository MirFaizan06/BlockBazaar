import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import styles from './ConfirmDialog.module.css';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open, title, message, confirmLabel = 'Confirm', danger = false,
  loading = false, onConfirm, onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className={styles.dialog}
            initial={{ scale: 0.9, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className={`${styles.iconWrap} ${danger ? styles.danger : ''}`}>
              <AlertTriangle size={22} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.message}>{message}</p>
            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={onCancel} disabled={loading}>
                Cancel
              </button>
              <button
                className={`${styles.confirmBtn} ${danger ? styles.dangerBtn : ''}`}
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? <span className={styles.spinner} /> : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
