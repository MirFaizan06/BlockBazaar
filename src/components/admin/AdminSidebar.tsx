import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, LogOut, ShieldCheck, Sun, Moon } from 'lucide-react';
import { adminSignOut } from '../../services/authService';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './AdminSidebar.module.css';

const NAV = [
  { to: '/admin/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/admin/mods', icon: <Package size={18} />, label: 'Mods' },
  { to: '/admin/team', icon: <Users size={18} />, label: 'Team' },
];

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { theme, toggle } = useTheme();

  const handleLogout = async () => {
    try {
      await adminSignOut();
      toast.success('Signed out');
      navigate('/admin/login');
    } catch {
      toast.error('Sign out failed');
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <ShieldCheck size={18} />
        </div>
        <div>
          <div className={styles.brandTitle}>BlockBazaar</div>
          <div className={styles.brandSub}>Admin Panel</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            onClick={onClose}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <button className={styles.themeBtn} onClick={toggle} type="button">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>
        <button className={styles.logout} onClick={handleLogout}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
