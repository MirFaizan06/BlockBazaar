import clsx from 'clsx';
import styles from './Tag.module.css';

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export default function Tag({ label, active, onClick, size = 'md' }: TagProps) {
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag
      className={clsx(styles.tag, styles[size], active && styles.active, onClick && styles.clickable)}
      onClick={onClick}
    >
      #{label}
    </Tag>
  );
}
