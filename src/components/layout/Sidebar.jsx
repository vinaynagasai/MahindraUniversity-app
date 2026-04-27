import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common';
import {
  Home,
  User,
  Calendar,
  BookOpen,
  FileText,
  Bell,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  QrCode,
  GraduationCap,
  ClipboardCheck,
  MessageSquare,
  FileCheck,
  CreditCard,
  Clock,
  Send,
  Users,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Sidebar.module.css';

const roleNavItems = {
  student: [
    { path: '/student', icon: Home, label: 'Dashboard' },
    { path: '/student/profile', icon: User, label: 'Profile' },
    { path: '/student/attendance', icon: Calendar, label: 'Attendance' },
    { path: '/student/marks', icon: BookOpen, label: 'Marks' },
    { path: '/student/timetable', icon: Clock, label: 'Timetable' },
    { path: '/student/fees', icon: CreditCard, label: 'Fees' },
    { path: '/student/doubts', icon: MessageSquare, label: 'Doubts' },
    { path: '/student/permissions', icon: FileCheck, label: 'Permissions' },
    { path: '/student/qr-scan', icon: QrCode, label: 'QR Scan' },
    { path: '/student/notifications', icon: Bell, label: 'Notifications' }
  ],
  faculty: [
    { path: '/faculty', icon: Home, label: 'Dashboard' },
    { path: '/faculty/profile', icon: User, label: 'Profile' },
    { path: '/faculty/attendance', icon: ClipboardCheck, label: 'Mark Attendance' },
    { path: '/faculty/marks', icon: GraduationCap, label: 'Upload Marks' },
    { path: '/faculty/notifications', icon: Send, label: 'Send Notification' },
    { path: '/faculty/doubts', icon: MessageSquare, label: 'Manage Doubts' },
    { path: '/faculty/permissions', icon: FileCheck, label: 'Manage Permissions' }
  ],
  parent: [
    { path: '/parent', icon: Home, label: 'Dashboard' },
    { path: '/parent/profile', icon: User, label: 'My Profile' },
    { path: '/parent/child', icon: GraduationCap, label: 'Child Profile' },
    { path: '/parent/attendance', icon: Calendar, label: 'Child Attendance' },
    { path: '/parent/marks', icon: BookOpen, label: 'Child Marks' },
    { path: '/parent/notifications', icon: Bell, label: 'Notifications' }
  ]
};

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = roleNavItems[user?.role] || [];

  return (
    <>
      <button
        className={styles.menuToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>MU</div>
            <span className={styles.logoText}>MU App</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          <div className={styles.user}>
            <Avatar name={user?.name} size="medium" />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name}</span>
              <span className={styles.userRole}>{user?.role}</span>
            </div>
          </div>

          <button className={styles.logout} onClick={logout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
