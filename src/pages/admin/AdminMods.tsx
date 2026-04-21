import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Package } from 'lucide-react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { deleteMod } from '../../services/modService';
import { useToast } from '../../contexts/ToastContext';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import type { Mod } from '../../types';
import styles from './AdminMods.module.css';

export default function AdminMods() {
  const [mods, setMods] = useState<Mod[]>([]);
  const [filtered, setFiltered] = useState<Mod[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const toast = useToast();

  const loadMods = useCallback(async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, 'mods'), orderBy('createdAt', 'desc')));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as Mod));
      setMods(list);
      setFiltered(list);
    } catch {
      // toast ref is stable via add, error shown via state if needed
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { loadMods(); }, [loadMods]);

  useEffect(() => {
    const q = search.toLowerCase().trim();
    setFiltered(q ? mods.filter(m => m.title.toLowerCase().includes(q) || m.author.toLowerCase().includes(q) || m.type.includes(q)) : mods);
  }, [search, mods]);

  const handleDeleteClick = (mod: Mod) => {
    setConfirmId(mod.id);
    setConfirmTitle(mod.title);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmId) return;
    setDeleting(confirmId);
    setConfirmId(null);
    try {
      await deleteMod(confirmId);
      setMods(prev => prev.filter(m => m.id !== confirmId));
      toast.success('Mod deleted', confirmTitle);
    } catch {
      toast.error('Delete failed', 'Could not delete mod');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Mods</h1>
          <p className={styles.pageSubtitle}>{mods.length} mod{mods.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link to="/admin/mods/new" className={styles.addBtn}>
          <Plus size={16} />
          Add Mod
        </Link>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search mods…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className={styles.list}>
          {[0, 1, 2, 3].map(i => <div key={i} className={styles.skeleton} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <Package size={36} />
          {search ? <p>No mods match "{search}"</p> : <p>No mods yet. <Link to="/admin/mods/new">Add your first mod.</Link></p>}
        </div>
      ) : (
        <div className={styles.list}>
          <AnimatePresence>
            {filtered.map((mod, i) => (
              <motion.div
                key={mod.id}
                className={styles.row}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.04 }}
                layout
              >
                <img
                  src={mod.thumbnail}
                  alt={mod.title}
                  className={styles.thumb}
                  onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/48x48/131313/7ED957?text=M'; }}
                />
                <div className={styles.info}>
                  <span className={styles.title}>{mod.title}</span>
                  <div className={styles.meta}>
                    <span className={styles.typeBadge}>{mod.type}</span>
                    <span className={styles.metaDot}>·</span>
                    <span>{mod.author}</span>
                    <span className={styles.metaDot}>·</span>
                    <span>{new Date(mod.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className={styles.downloads}>{(mod.downloadCount ?? 0).toLocaleString()} dl</span>
                <div className={styles.actions}>
                  <Link to={`/admin/mods/edit/${mod.id}`} className={styles.editBtn}>
                    <Edit2 size={14} />
                  </Link>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteClick(mod)}
                    disabled={deleting === mod.id}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ConfirmDialog
        open={!!confirmId}
        title="Delete Mod"
        message={`Are you sure you want to delete "${confirmTitle}"? This cannot be undone.`}
        confirmLabel="Delete"
        danger
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  );
}
