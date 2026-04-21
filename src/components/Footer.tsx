import { Link } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';
import styles from './Footer.module.css';

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="11.5" cy="4.5" r="0.75" fill="currentColor"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4.5 6.5V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="4.5" cy="4.5" r="0.75" fill="currentColor"/>
      <path d="M7.5 11.5V9C7.5 7.619 8.119 6.5 9.5 6.5C10.881 6.5 11.5 7.619 11.5 9V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7.5 8V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="12" height="12" x="2" y="2" fill="#7ED957" rx="1"/>
              <rect width="12" height="12" x="14" y="2" fill="#7ED957" rx="1"/>
              <rect width="12" height="12" x="2" y="14" fill="#7ED957" rx="1"/>
              <rect width="12" height="12" x="14" y="14" fill="#3C8527" rx="1"/>
            </svg>
            <span className={styles.logoText}>BlockBazaar</span>
          </Link>
          <p className={styles.tagline}>Discover Minecraft mods, free.</p>
        </div>

        <div className={styles.links}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/browse" className={styles.link}>Browse</Link>
          <Link to="/privacy" className={styles.link}>Privacy</Link>
          <Link to="/terms" className={styles.link}>Terms</Link>
          <Link to="/team" className={styles.link}>Team</Link>
          <a href="mailto:mirfaizan8803@gmail.com" className={styles.link}>
            <Mail size={13} /> Contact
          </a>
        </div>

        <div className={styles.devCard}>
          <span className={styles.devLabel}>Developer</span>
          <span className={styles.devName}>Faizan Hussain Mir</span>
          <span className={styles.devSub}>The NxT LvL</span>
          <div className={styles.devSocials}>
            <a
              href="https://instagram.com/is_anxt"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.devSocialLink}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/faizan-hussain-mir-830b69344/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.devSocialLink}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/MirFaizan06"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.devSocialLink}
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://youtube.com/@TheNxTLvL"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.devSocialLink}
              aria-label="YouTube"
            >
              <YouTubeIcon />
            </a>
          </div>
        </div>

        <div className={styles.copy}>
          <p>Built by <span className={styles.author}>The NxT LvL</span></p>
          <p>© {new Date().getFullYear()} BlockBazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
