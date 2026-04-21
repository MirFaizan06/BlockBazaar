import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ModCard from '../components/ModCard';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import GridLayout from '../components/GridLayout';
import Modal from '../components/Modal';
import { useMods } from '../hooks/useMods';
import { useDebounce } from '../hooks/useDebounce';
import { filterMods } from '../utils/helpers';
import type { FilterState } from '../types';
import styles from './Browse.module.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Browse() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    tags: searchParams.get('tag') ? [searchParams.get('tag')!] : [],
    sortBy: 'newest',
  });
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 280);
  const { mods, loading } = useMods();

  useEffect(() => {
    const q = searchParams.get('q');
    const tag = searchParams.get('tag');
    if (q) setSearch(q);
    if (tag) setFilters(f => ({ ...f, tags: [tag] }));
  }, [searchParams]);

  const filtered = useMemo(
    () => filterMods(mods, debouncedSearch, filters.types, filters.tags, filters.sortBy),
    [mods, debouncedSearch, filters]
  );

  const activeFilterCount = filters.types.length + filters.tags.length;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
      <div className="container">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Browse Mods</h1>
            <p className={styles.pageCount}>
              {loading ? 'Loading...' : `${filtered.length} mod${filtered.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.searchWrap}>
              <SearchBar value={search} onChange={setSearch} placeholder="Search mods..." size="sm" />
            </div>
            <button className={styles.filterBtn} onClick={() => setFilterModalOpen(true)}>
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && <span className={styles.filterBadge}>{activeFilterCount}</span>}
            </button>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.sidebar}>
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>

          <div className={styles.content}>
            {loading ? (
              <GridLayout cols={3}>
                {[...Array(9)].map((_, i) => <SkeletonCard key={i} />)}
              </GridLayout>
            ) : filtered.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>
                  <X size={32} />
                </div>
                <h3 className={styles.emptyTitle}>No mods found</h3>
                <p className={styles.emptyText}>Try adjusting your search or filters.</p>
              </div>
            ) : (
              <GridLayout cols={3}>
                {filtered.map((mod, i) => (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.3) }}
                  >
                    <ModCard mod={mod} />
                  </motion.div>
                ))}
              </GridLayout>
            )}
          </div>
        </div>
      </div>

      <Modal open={filterModalOpen} onClose={() => setFilterModalOpen(false)} title="Filters" size="sm">
        <FilterSidebar filters={filters} onChange={f => { setFilters(f); setFilterModalOpen(false); }} />
      </Modal>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonLine} style={{ width: '70%' }} />
        <div className={styles.skeletonLine} style={{ width: '90%' }} />
        <div className={styles.skeletonLine} style={{ width: '50%' }} />
      </div>
    </div>
  );
}
