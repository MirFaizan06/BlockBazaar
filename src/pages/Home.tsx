import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import SearchBar from '../components/SearchBar';
import ModCard from '../components/ModCard';
import SectionWrapper from '../components/SectionWrapper';
import GridLayout from '../components/GridLayout';
import Tag from '../components/Tag';
import { useMods } from '../hooks/useMods';
import styles from './Home.module.css';

const POPULAR_TAGS = ['survival', 'pvp', 'shaders', 'world', 'magic', 'fun'];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Home() {
  const [search, setSearch] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { mods, loading } = useMods();

  const featured = useMemo(() =>
    [...mods].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, 3),
    [mods]
  );
  const latest = useMemo(() =>
    [...mods].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8),
    [mods]
  );
  const trending = useMemo(() =>
    [...mods].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, 6),
    [mods]
  );

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const blocks: HTMLDivElement[] = [];

    // Keep blocks to the edges — never in center 40% horizontally or middle 50% vertically
    const positions = [
      [5, 8], [15, 75], [82, 12], [90, 80], [3, 50],
      [95, 40], [70, 5], [25, 90], [88, 60], [50, 95],
      [8, 30], [60, 88],
    ];

    positions.forEach(([leftPct, topPct]) => {
      const block = document.createElement('div');
      block.className = styles.floatingBlock;
      const size = Math.random() * 18 + 8;
      block.style.cssText = `width:${size}px;height:${size}px;left:${leftPct}%;top:${topPct}%;`;
      hero.appendChild(block);
      blocks.push(block);

      gsap.set(block, { opacity: Math.random() * 0.4 + 0.2 });
      gsap.to(block, {
        y: -(Math.random() * 50 + 20),
        x: (Math.random() - 0.5) * 30,
        rotation: Math.random() * 60 - 30,
        duration: Math.random() * 5 + 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 3,
      });
    });

    return () => { blocks.forEach(b => b.remove()); };
  }, []);

  const handleSearch = () => {
    if (search.trim()) navigate(`/browse?q=${encodeURIComponent(search.trim())}`);
  };

  const handleTagClick = (tag: string) => {
    navigate(`/browse?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
      <div className={styles.hero} ref={heroRef}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroEyebrow}>Bedrock Edition Mods</div>
          <div className={styles.heroTitleWrap}>
            <h1 className={styles.heroTitle}>BlockBazaar</h1>
            <p className={styles.heroSubtitle}>Discover, download, and enjoy the best Minecraft Bedrock mods — completely free.</p>
          </div>
          <div className={styles.heroSearch}>
            <SearchBar
              value={search}
              onChange={setSearch}
              onSubmit={handleSearch}
              placeholder="Search for mods, addons, worlds..."
              size="lg"
            />
          </div>
          <div className={styles.heroTags}>
            <span className={styles.heroTagsLabel}>Popular tags</span>
            <div className={styles.heroTagList}>
              {POPULAR_TAGS.map(tag => (
                <Tag key={tag} label={tag} onClick={() => handleTagClick(tag)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <SectionWrapper title="Featured Mods" seeAllHref="/browse">
          {loading ? (
            <GridLayout cols={3}>
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </GridLayout>
          ) : (
            <GridLayout cols={3}>
              {featured.map(mod => <ModCard key={mod.id} mod={mod} featured />)}
            </GridLayout>
          )}
        </SectionWrapper>

        <SectionWrapper title="Latest Mods" seeAllHref="/browse">
          {loading ? (
            <GridLayout cols={4}>
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </GridLayout>
          ) : (
            <GridLayout cols={4}>
              {latest.map(mod => <ModCard key={mod.id} mod={mod} />)}
            </GridLayout>
          )}
        </SectionWrapper>

        <SectionWrapper title="Trending">
          {loading ? (
            <div className={styles.trendingScroll}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className={styles.trendingItem}><SkeletonCard /></div>
              ))}
            </div>
          ) : (
            <div className={styles.trendingScroll}>
              {trending.map(mod => (
                <div key={mod.id} className={styles.trendingItem}>
                  <ModCard mod={mod} />
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      </div>
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
