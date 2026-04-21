import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, EyeOff, LogIn } from 'lucide-react';
import { adminSignIn } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const [displayId, setDisplayId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (!authLoading && isAdmin) navigate('/admin/dashboard', { replace: true });
  }, [isAdmin, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminSignIn(displayId.trim(), password);
      toast.success('Welcome back, Admin');
      navigate('/admin/dashboard', { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      setError(msg);
      toast.error('Login failed', msg);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <ShieldCheck size={24} />
          </div>
          <h1 className={styles.title}>Admin Access</h1>
          <p className={styles.subtitle}>BlockBazaar Control Panel</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <div className={styles.field}>
            <label className={styles.label}>Admin ID</label>
            <input
              type="text"
              className={styles.input}
              value={displayId}
              onChange={e => setDisplayId(e.target.value)}
              placeholder="blockbazaar_adminuser@001"
              autoCapitalize="none"
              spellCheck={false}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.pwWrap}>
              <input
                type={showPw ? 'text' : 'password'}
                className={styles.input}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.pwToggle}
                onClick={() => setShowPw(v => !v)}
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && <div className={styles.errorBox}>{error}</div>}

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                <LogIn size={16} />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className={styles.secureNote}>
          <ShieldCheck size={12} /> Secured with Firebase Authentication
        </p>
      </motion.div>
    </div>
  );
}
