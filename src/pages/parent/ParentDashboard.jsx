import { Header } from '../../components/layout';
import { Card, Avatar, Badge, CircularProgress } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar,
  BookOpen,
  Bell,
  User,
  DollarSign,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './ParentDashboard.module.css';

const childInfo = {
  name: 'John Doe',
  rollNo: 'CS2021001',
  department: 'Computer Science',
  semester: 5,
  status: 'in_campus',
  statusText: 'Currently in Campus'
};

const quickStats = [
  { label: 'Attendance', value: '85%', icon: Calendar, color: 'var(--success)' },
  { label: 'Current GPA', value: '8.5', icon: TrendingUp, color: 'var(--primary)' },
  { label: 'Pending Fees', value: '₹50,000', icon: DollarSign, color: 'var(--warning)' }
];

const quickActions = [
  { label: 'Child Profile', icon: User, path: '/parent/child', color: 'var(--primary)' },
  { label: 'Attendance', icon: Calendar, path: '/parent/attendance', color: 'var(--success)' },
  { label: 'Marks', icon: BookOpen, path: '/parent/marks', color: 'var(--accent)' },
  { label: 'Notifications', icon: Bell, path: '/parent/notifications', color: 'var(--info)' }
];

const recentNotifications = [
  { id: 1, title: 'Fee Payment Reminder', message: 'Pending fee of ₹2,500 due by Feb 28', time: '1 day ago', type: 'warning' },
  { id: 2, title: 'Attendance Alert', message: 'Your child attendance dropped below 75%', time: '3 days ago', type: 'error' },
  { id: 3, title: 'Result Published', message: 'Mid-semester results have been published', time: '1 week ago', type: 'success' }
];

export const ParentDashboard = () => {
  useAuth();

  return (
    <div className={styles.dashboard}>
      <Header title="Parent Dashboard" />

      <div className={styles.content}>
        <Card className={styles.childCard}>
          <div className={styles.childHeader}>
            <Avatar name={childInfo.name} size="large" />
            <div className={styles.childInfo}>
              <h2>{childInfo.name}</h2>
              <p>{childInfo.rollNo} • {childInfo.department}</p>
              <Badge variant="primary">Semester {childInfo.semester}</Badge>
            </div>
            <div className={styles.statusBadge}>
              <span className={`${styles.statusDot} ${styles[childInfo.status]}`} />
              <span>{childInfo.statusText}</span>
            </div>
          </div>
        </Card>

        <div className={styles.statsGrid}>
          {quickStats.map((stat) => (
            <Card key={stat.label} className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: stat.color, opacity: 0.1 }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Quick Actions</h3>
          <div className={styles.actionsGrid}>
            {quickActions.map((action) => (
              <Link key={action.label} to={action.path} className={styles.actionCard}>
                <div className={styles.actionIcon} style={{ backgroundColor: action.color, opacity: 0.1 }}>
                  <action.icon size={20} style={{ color: action.color }} />
                </div>
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Alerts & Notifications</h3>
          {recentNotifications.map((notification) => (
            <Card key={notification.id} className={styles.notificationCard}>
              <div className={styles.notificationContent}>
                <div className={styles.notificationIcon}>
                  {notification.type === 'warning' && <AlertTriangle size={20} style={{ color: 'var(--warning)' }} />}
                  {notification.type === 'error' && <AlertTriangle size={20} style={{ color: 'var(--error)' }} />}
                  {notification.type === 'success' && <TrendingUp size={20} style={{ color: 'var(--success)' }} />}
                </div>
                <div className={styles.notificationText}>
                  <span className={styles.notificationTitle}>{notification.title}</span>
                  <span className={styles.notificationMessage}>{notification.message}</span>
                  <span className={styles.notificationTime}>{notification.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className={styles.summaryCard}>
          <h3>Academic Summary</h3>
          <div className={styles.summaryContent}>
            <div className={styles.summaryItem}>
              <CircularProgress
                value={85}
                max={100}
                size={80}
                strokeWidth={8}
                variant="success"
              />
              <span>Attendance</span>
            </div>
            <div className={styles.summaryItem}>
              <CircularProgress
                value={85}
                max={100}
                size={80}
                strokeWidth={8}
                variant="primary"
              />
              <span>Performance</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
