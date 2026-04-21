import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import { getTeamMembers, deleteTeamMember } from '../../services/teamService';
import { useToast } from '../../contexts/ToastContext';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import type { TeamMember } from '../../types';
import styles from './AdminTeam.module.css';

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [confirmName, setConfirmName] = useState('');
  const toast = useToast();

  const loadMembers = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getTeamMembers();
      setMembers(list);
    } catch {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { loadMembers(); }, [loadMembers]);

  const handleDeleteClick = (member: TeamMember) => {
    setConfirmId(member.id);
    setConfirmName(member.name);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmId) return;
    setDeleting(confirmId);
    setConfirmId(null);
    try {
      await deleteTeamMember(confirmId);
      setMembers(prev => prev.filter(m => m.id !== confirmId));
      toast.success('Member deleted', confirmName);
    } catch {
      toast.error('Delete failed', 'Could not delete team member');
    } finally {
      setDeleting(null);
    }
  };

  function socialCount(m: TeamMember): number {
    return [m.instagram, m.linkedin, m.github, m.youtube].filter(
      v => v && v.trim() !== ''
    ).length;
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Team</h1>
          <p className={styles.pageSubtitle}>
            {members.length} member{members.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link to="/admin/team/new" className={styles.addBtn}>
          <Plus size={16} />
          Add Member
        </Link>
      </div>

      {loading ? (
        <div className={styles.list}>
          {[0, 1, 2, 3].map(i => <div key={i} className={styles.skeleton} />)}
        </div>
      ) : members.length === 0 ? (
        <div className={styles.empty}>
          <Users size={36} />
          <p>
            No team members yet.{' '}
            <Link to="/admin/team/new">Add the first member.</Link>
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          <AnimatePresence>
            {members.map((member, i) => (
              <motion.div
                key={member.id}
                className={styles.row}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.04 }}
                layout
              >
                <div className={styles.info}>
                  <span className={styles.name}>{member.name}</span>
                  <div className={styles.meta}>
                    <span className={styles.roleBadge}>{member.role}</span>
                    <span className={styles.metaDot}>·</span>
                    <span>{socialCount(member)} social{socialCount(member) !== 1 ? 's' : ''}</span>
                    <span className={styles.metaDot}>·</span>
                    <span>order {member.order}</span>
                  </div>
                </div>
                <div className={styles.actions}>
                  <Link
                    to={`/admin/team/edit/${member.id}`}
                    className={styles.editBtn}
                  >
                    <Edit2 size={14} />
                  </Link>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteClick(member)}
                    disabled={deleting === member.id}
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
        title="Delete Member"
        message={`Are you sure you want to delete "${confirmName}"? This cannot be undone.`}
        confirmLabel="Delete"
        danger
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  );
}
