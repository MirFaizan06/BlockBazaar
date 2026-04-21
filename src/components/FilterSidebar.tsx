import type { FilterState } from '../types';
import styles from './FilterSidebar.module.css';

const MOD_TYPES = ['mcaddon', 'mcworld', 'mcpack', 'mctemplate'];
const ALL_TAGS = ['survival', 'pvp', 'ui', 'fun', 'shaders', 'world', 'mobs', 'magic', 'tech', 'adventure', 'minigames', 'crafting'];

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const toggleType = (type: string) => {
    const types = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onChange({ ...filters, types });
  };

  const toggleTag = (tag: string) => {
    const tags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onChange({ ...filters, tags });
  };

  const clearAll = () => onChange({ types: [], tags: [], sortBy: 'newest' });
  const hasActive = filters.types.length > 0 || filters.tags.length > 0;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>Filters</span>
        {hasActive && (
          <button className={styles.clearBtn} onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Type</p>
        {MOD_TYPES.map(type => (
          <label key={type} className={styles.checkLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={filters.types.includes(type)}
              onChange={() => toggleType(type)}
            />
            <span className={styles.checkText}>{type}</span>
          </label>
        ))}
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Tags</p>
        <div className={styles.tagGrid}>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`${styles.tagChip} ${filters.tags.includes(tag) ? styles.tagActive : ''}`}
              onClick={() => toggleTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Sort By</p>
        {(['newest', 'popular'] as const).map(sort => (
          <label key={sort} className={styles.checkLabel}>
            <input
              type="radio"
              className={styles.radio}
              name="sortBy"
              checked={filters.sortBy === sort}
              onChange={() => onChange({ ...filters, sortBy: sort })}
            />
            <span className={styles.checkText}>{sort === 'newest' ? 'Newest First' : 'Most Popular'}</span>
          </label>
        ))}
      </div>
    </aside>
  );
}
