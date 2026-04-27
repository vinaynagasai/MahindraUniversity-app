import { useState, useEffect } from 'react';
import { Header } from '../../components/layout';
import { Card, Badge, Button } from '../../components/common';
import { Bell, AlertCircle, CheckCircle, Info, Calendar, CreditCard, BookOpen, RefreshCw } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import styles from './ParentNotifications.module.css';

const getIcon = (type) => {
  switch (type) {
    case 'warning': return <AlertCircle size={20} />;
    case 'error': return <AlertCircle size={20} />;
    case 'success': return <CheckCircle size={20} />;
    default: return <Info size={20} />;
  }
};

const getTypeIcon = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('fee') || lowerTitle.includes('payment')) return <CreditCard size={20} />;
  if (lowerTitle.includes('attendance')) return <Calendar size={20} />;
  if (lowerTitle.includes('exam') || lowerTitle.includes('result') || lowerTitle.includes('mark')) return <BookOpen size={20} />;
  return <Bell size={20} />;
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const ParentNotifications = () => {
  const { getNotificationsByRole, markAllNotificationsRead } = useAppData();
  const [refreshKey, setRefreshKey] = useState(0);
  
  const notifications = getNotificationsByRole('parent');
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey(k => k + 1);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleRefresh = () => {
    setRefreshKey(k => k + 1);
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead('parent');
  };

  return (
    <div className={styles.page} key={refreshKey}>
      <Header title="Notifications" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h3>All Notifications</h3>
            {unreadCount > 0 && <Badge variant="primary">{unreadCount} unread</Badge>}
          </div>
          <div className={styles.headerActions}>
            <Button variant="ghost" size="small" onClick={handleRefresh} title="Refresh">
              <RefreshCw size={16} />
            </Button>
            {unreadCount > 0 && (
              <Button variant="outline" size="small" onClick={handleMarkAllRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        <div className={styles.notificationsList}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`${styles.notificationCard} ${!notification.isRead ? styles.unread : ''}`}
              >
                <div className={`${styles.notificationIcon} ${styles[notification.type]}`}>
                  {getIcon(notification.type)}
                </div>
                <div className={styles.notificationContent}>
                  <div className={styles.notificationHeader}>
                    <div className={styles.titleRow}>
                      {!notification.isRead && <span className={styles.unreadDot} />}
                      {getTypeIcon(notification.title)}
                      <span className={styles.notificationTitle}>{notification.title}</span>
                    </div>
                    <span className={styles.notificationTime}>{formatTime(notification.createdAt)}</span>
                  </div>
                  <p className={styles.notificationMessage}>{notification.message}</p>
                  {notification.priority === 'high' && (
                    <Badge variant="warning" className={styles.priorityBadge}>High Priority</Badge>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card className={styles.emptyCard}>
              <Bell size={48} style={{ opacity: 0.3 }} />
              <p>No notifications yet</p>
              <p className={styles.emptyHint}>Notifications will appear here</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
