import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, User } from 'lucide-react';
import Tag from './Tag';
import { formatDownloadCount } from '../utils/helpers';
import type { Mod } from '../types';
import styles from './ModCard.module.css';

interface ModCardProps {
  mod: Mod;
  featured?: boolean;
}

export default function ModCard({ mod, featured }: ModCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 24px rgba(126,217,87,0.18)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
    >
      <Link to={`/mod/${mod.slug}`} className={styles.link} aria-label={mod.title}>
        <div className={styles.thumbnail}>
          <img
            src={mod.thumbnail}
            alt={mod.title}
            loading="lazy"
            className={styles.image}
            onError={e => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${mod.id}/400/250`;
            }}
          />
          <span className={styles.typeBadge}>{mod.type}</span>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{mod.title}</h3>
          <p className={styles.desc}>{mod.shortDesc}</p>
          <div className={styles.tags}>
            {mod.tags.slice(0, 3).map(tag => (
              <Tag key={tag} label={tag} size="sm" />
            ))}
          </div>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <Download size={13} />
              {formatDownloadCount(mod.downloadCount)}
            </span>
            <span className={styles.metaItem}>
              <User size={13} />
              {mod.author}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
