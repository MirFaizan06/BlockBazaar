import { useRef } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search mods...',
  onSubmit,
  size = 'md',
  autoFocus,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) onSubmit();
  };

  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <Search className={styles.icon} size={size === 'lg' ? 20 : 16} aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search mods"
      />
      {value && (
        <button
          className={styles.clear}
          onClick={() => { onChange(''); inputRef.current?.focus(); }}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
