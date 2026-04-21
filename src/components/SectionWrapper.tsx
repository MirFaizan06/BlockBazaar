import { Link } from 'react-router-dom';
import styles from './SectionWrapper.module.css';

interface SectionWrapperProps {
  title: string;
  seeAllHref?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({ title, seeAllHref, children }: SectionWrapperProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {seeAllHref && (
          <Link to={seeAllHref} className={styles.seeAll}>
            See all →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
