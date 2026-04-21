import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ArrowLeft } from 'lucide-react';
import { getTeamMembers } from '../services/teamService';
import type { TeamMember } from '../types';
import styles from './Team.module.css';

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="13" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11.8" cy="4.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 6.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="4.5" cy="4.5" r="0.9" fill="currentColor" />
      <path d="M7.5 11.5V9a1.5 1.5 0 0 1 3 0v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 8.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="3.5" width="14" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 5.8l3.5 2.2-3.5 2.2V5.8z" fill="currentColor" />
    </svg>
  );
}

function SkeletonCard() {
  return <div className={styles.skeleton} aria-hidden="true" />;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamMembers()
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  function socialCount(m: TeamMember): number {
    return [m.instagram, m.linkedin, m.github, m.youtube].filter(
      v => v && v.trim() !== ''
    ).length;
  }

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={15} />
          Home
        </Link>
        <h1 className={styles.pageTitle}>Team</h1>
        <p className={styles.pageSubtitle}>The people behind BlockBazaar</p>
      </div>

      {loading ? (
        <div className={styles.grid}>
          {[0, 1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : members.length === 0 ? (
        <div className={styles.empty}>
          <p>No team members found.</p>
        </div>
      ) : (
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {members.map(member => (
            <motion.div key={member.id} className={styles.card} variants={cardVariants}>
              <div className={styles.cardInner}>
                <span className={styles.cardName}>{member.name}</span>
                <span className={styles.roleBadge}>{member.role}</span>
                {socialCount(member) > 0 && (
                  <div className={styles.socials}>
                    {member.instagram && member.instagram.trim() !== '' && (
                      <a
                        href={member.instagram}
                        className={styles.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        title="Instagram"
                      >
                        <InstagramIcon />
                      </a>
                    )}
                    {member.linkedin && member.linkedin.trim() !== '' && (
                      <a
                        href={member.linkedin}
                        className={styles.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                      >
                        <LinkedInIcon />
                      </a>
                    )}
                    {member.github && member.github.trim() !== '' && (
                      <a
                        href={member.github}
                        className={styles.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        title="GitHub"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {member.youtube && member.youtube.trim() !== '' && (
                      <a
                        href={member.youtube}
                        className={styles.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        title="YouTube"
                      >
                        <YouTubeIcon />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
