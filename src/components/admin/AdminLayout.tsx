import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <div className={styles.layout}>
      {/* Desktop sidebar */}
      <div className={styles.desktopSidebar}>
        <AdminSidebar />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className={styles.drawer}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.24 }}
            >
              <AdminSidebar onClose={() => setDrawerOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className={styles.main}>
        {/* Mobile top bar */}
        <div className={styles.mobileBar}>
          <button className={styles.menuBtn} onClick={() => setDrawerOpen(true)}>
            <Menu size={20} />
          </button>
          <span className={styles.mobileTitle}>BlockBazaar Admin</span>
          <button className={styles.themeToggle} onClick={toggle} type="button" title="Toggle theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
