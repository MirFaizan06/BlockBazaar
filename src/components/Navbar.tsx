import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggle } = useTheme();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/browse?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="12" height="12" x="2" y="2" fill="#7ED957" rx="1"/>
              <rect width="12" height="12" x="14" y="2" fill="#7ED957" rx="1"/>
              <rect width="12" height="12" x="2" y="14" fill="#7ED957" rx="1"/>
              <rect width="12" height="12" x="14" y="14" fill="#3C8527" rx="1"/>
            </svg>
            <span className={styles.logoText}>BlockBazaar</span>
          </Link>

          <div className={styles.searchWrap}>
            <SearchBar
              value={search}
              onChange={setSearch}
              onSubmit={handleSearch}
              placeholder="Search mods..."
              size="sm"
            />
          </div>

          <div className={styles.links}>
            <Link to="/browse" className={`${styles.link} ${location.pathname === '/browse' ? styles.active : ''}`}>
              Browse
            </Link>
            <a
              href="https://gumroad.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.donateBtn}
            >
              Donate
            </a>
          </div>

          <button className={styles.themeBtn} onClick={toggle} type="button" title="Toggle theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className={styles.mobileDrawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className={styles.drawerSearch}>
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  onSubmit={() => { handleSearch(); setMobileOpen(false); }}
                  placeholder="Search mods..."
                  size="md"
                  autoFocus
                />
              </div>
              <Link to="/browse" className={styles.drawerLink}>Browse</Link>
              <a
                href="https://gumroad.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.drawerLink}
              >
                Donate
              </a>
              <button className={styles.drawerThemeBtn} onClick={() => { toggle(); setMobileOpen(false); }} type="button">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
