import { useState } from 'react';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Avatar, Badge } from '../common';
import styles from './Header.module.css';

export const Header = ({ title, showSearch = false }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: 'Fee Payment Due', message: 'Last date for fee payment is approaching', time: '2 hours ago', unread: true },
    { id: 2, title: 'Exam Schedule', message: 'Mid-semester exams start next week', time: '1 day ago', unread: true },
    { id: 3, title: 'Attendance Alert', message: 'Your attendance is below 75%', time: '2 days ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.right}>
        {showSearch && (
          <div className={styles.search}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        )}

        <button
          className={styles.iconButton}
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className={styles.notificationWrapper}>
          <button
            className={styles.iconButton}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>
                <h3>Notifications</h3>
                <button>Mark all read</button>
              </div>
              <div className={styles.notificationList}>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`${styles.notificationItem} ${notification.unread ? styles.unread : ''}`}
                  >
                    <div className={styles.notificationContent}>
                      <span className={styles.notificationTitle}>{notification.title}</span>
                      <span className={styles.notificationMessage}>{notification.message}</span>
                      <span className={styles.notificationTime}>{notification.time}</span>
                    </div>
                    {notification.unread && <span className={styles.unreadDot} />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Avatar name={user?.name} size="medium" />
      </div>
    </header>
  );
};
