import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.subtitle}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primaryBtn}>
            <Home size={16} />
            Back to Home
          </Link>
          <Link to="/browse" className={styles.secondaryBtn}>
            <Search size={16} />
            Browse Mods
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
