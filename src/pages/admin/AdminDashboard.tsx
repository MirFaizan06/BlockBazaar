import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Download, Plus, TrendingUp, Clock } from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Mod } from '../../types';
import styles from './AdminDashboard.module.css';

interface Stats {
  totalMods: number;
  totalDownloads: number;
  typeBreakdown: Record<string, number>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalMods: 0, totalDownloads: 0, typeBreakdown: {} });
  const [recentMods, setRecentMods] = useState<Mod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, 'mods'));
        const mods = snap.docs.map(d => ({ id: d.id, ...d.data() } as Mod));
        const totalDownloads = mods.reduce((acc, m) => acc + (m.downloadCount || 0), 0);
        const typeBreakdown: Record<string, number> = {};
        mods.forEach(m => { typeBreakdown[m.type] = (typeBreakdown[m.type] || 0) + 1; });
        setStats({ totalMods: mods.length, totalDownloads, typeBreakdown });

        const recentSnap = await getDocs(query(collection(db, 'mods'), orderBy('createdAt', 'desc'), limit(5)));
        setRecentMods(recentSnap.docs.map(d => ({ id: d.id, ...d.data() } as Mod)));
      } catch {
        // firestore may be empty
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = [
    { label: 'Total Mods', value: stats.totalMods, icon: Package, color: '#7ED957' },
    { label: 'Total Downloads', value: stats.totalDownloads.toLocaleString(), icon: Download, color: '#60A5FA' },
    { label: 'Most Common Type', value: Object.entries(stats.typeBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—', icon: TrendingUp, color: '#F59E0B' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Overview of BlockBazaar</p>
        </div>
        <Link to="/admin/mods/new" className={styles.addBtn}>
          <Plus size={16} />
          Add Mod
        </Link>
      </div>

      {loading ? (
        <div className={styles.loadingGrid}>
          {[0, 1, 2].map(i => <div key={i} className={styles.skeleton} />)}
        </div>
      ) : (
        <div className={styles.statsGrid}>
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className={styles.statIcon} style={{ color: card.color, background: `${card.color}18`, border: `1px solid ${card.color}30` }}>
                <card.icon size={20} />
              </div>
              <div>
                <div className={styles.statValue}>{card.value}</div>
                <div className={styles.statLabel}>{card.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {Object.keys(stats.typeBreakdown).length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Mod Types</h2>
          <div className={styles.typeGrid}>
            {Object.entries(stats.typeBreakdown).map(([type, count]) => (
              <div key={type} className={styles.typeChip}>
                <span className={styles.typeLabel}>{type}</span>
                <span className={styles.typeCount}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Clock size={16} />
            Recent Mods
          </h2>
          <Link to="/admin/mods" className={styles.viewAll}>View all</Link>
        </div>

        {loading ? (
          <div className={styles.recentList}>
            {[0, 1, 2].map(i => <div key={i} className={`${styles.skeleton} ${styles.skeletonRow}`} />)}
          </div>
        ) : recentMods.length === 0 ? (
          <div className={styles.empty}>
            <Package size={32} />
            <p>No mods yet. <Link to="/admin/mods/new">Add your first mod.</Link></p>
          </div>
        ) : (
          <div className={styles.recentList}>
            {recentMods.map((mod, i) => (
              <motion.div
                key={mod.id}
                className={styles.recentRow}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <img src={mod.thumbnail} alt={mod.title} className={styles.recentThumb} onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/131313/7ED957?text=M'; }} />
                <div className={styles.recentInfo}>
                  <span className={styles.recentTitle}>{mod.title}</span>
                  <span className={styles.recentMeta}>{mod.type} · {new Date(mod.createdAt).toLocaleDateString()}</span>
                </div>
                <span className={styles.recentDownloads}>{mod.downloadCount ?? 0} dl</span>
                <Link to={`/admin/mods/edit/${mod.id}`} className={styles.recentEdit}>Edit</Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
