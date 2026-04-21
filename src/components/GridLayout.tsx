import styles from './GridLayout.module.css';

interface GridLayoutProps {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
}

export default function GridLayout({ children, cols = 3 }: GridLayoutProps) {
  return (
    <div className={`${styles.grid} ${styles[`cols${cols}`]}`}>
      {children}
    </div>
  );
}
