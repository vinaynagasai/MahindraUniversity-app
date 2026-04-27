import { Header } from '../../components/layout';
import { Card, Avatar, Badge, CircularProgress } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar,
  BookOpen,
  FileText,
  MessageSquare,
  Clock,
  TrendingUp,
  Bell,
  DollarSign,
  MapPin,
  QrCode
} from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './StudentDashboard.module.css';

const quickStats = [
  { label: 'Attendance', value: '85%', icon: Calendar, color: 'success' },
  { label: 'Pending Fees', value: '₹50,000', icon: DollarSign, color: 'warning' },
  { label: 'Notifications', value: '3', icon: Bell, color: 'info' }
];

const quickActions = [
  { label: 'Profile', icon: Avatar, path: '/student/profile', color: 'var(--primary)' },
  { label: 'Attendance', icon: Calendar, path: '/student/attendance', color: 'var(--secondary)' },
  { label: 'Marks', icon: BookOpen, path: '/student/marks', color: 'var(--accent)' },
  { label: 'Timetable', icon: Clock, path: '/student/timetable', color: 'var(--info)' },
  { label: 'Fees', icon: FileText, path: '/student/fees', color: 'var(--warning)' },
  { label: 'Doubts', icon: MessageSquare, path: '/student/doubts', color: 'var(--primary-light)' },
  { label: 'Permissions', icon: FileText, path: '/student/permissions', color: 'var(--success)' },
  { label: 'QR Scan', icon: QrCode, path: '/student/qr-scan', color: 'var(--secondary)' },
  { label: 'Campus', icon: MapPin, path: '/student/campus', color: 'var(--text-secondary)' }
];

const recentNotifications = [
  { id: 1, title: 'Mid-Semester Exams', message: 'Exams start from next Monday', time: '2 hours ago', type: 'info' },
  { id: 2, title: 'Fee Payment Reminder', message: 'Last date for fee payment is approaching', time: '1 day ago', type: 'warning' },
  { id: 3, title: 'Doubt Response', message: 'Your doubt in Database Systems has been answered', time: '2 days ago', type: 'success' }
];

export const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className={styles.dashboard}>
      <Header title="Student Dashboard" />

      <div className={styles.content}>
        <div className={styles.profileCard}>
          <Avatar name={user?.name} size="xlarge" />
          <div className={styles.profileInfo}>
            <h2>{user?.name}</h2>
            <p>Roll No: {user?.id}</p>
            <div className={styles.profileMeta}>
              <Badge variant="primary">Computer Science</Badge>
              <Badge variant="default">Semester 5</Badge>
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {quickStats.map((stat) => (
            <Card key={stat.label} className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: `var(--${stat.color})`, opacity: 0.1 }}>
                <stat.icon size={20} style={{ color: `var(--${stat.color})` }} />
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
          <h3 className={styles.sectionTitle}>Recent Notifications</h3>
          <div className={styles.notificationsList}>
            {recentNotifications.map((notification) => (
              <Card key={notification.id} className={styles.notificationCard}>
                <div className={styles.notificationContent}>
                  <div className={styles.notificationHeader}>
                    <span className={styles.notificationTitle}>{notification.title}</span>
                    <Badge variant={notification.type} size="small">{notification.type}</Badge>
                  </div>
                  <p className={styles.notificationMessage}>{notification.message}</p>
                  <span className={styles.notificationTime}>{notification.time}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Attendance Overview</h3>
          <Card className={styles.attendanceCard}>
            <div className={styles.attendanceContent}>
              <div className={styles.attendanceChart}>
              <CircularProgress
                value={85}
                max={100}
                size={100}
                strokeWidth={10}
                variant="success"
              />
              </div>
              <div className={styles.attendanceStats}>
                <div className={styles.attendanceRow}>
                  <span>Total Classes</span>
                  <span>120</span>
                </div>
                <div className={styles.attendanceRow}>
                  <span>Present</span>
                  <span className={styles.success}>102</span>
                </div>
                <div className={styles.attendanceRow}>
                  <span>Absent</span>
                  <span className={styles.error}>15</span>
                </div>
                <div className={styles.attendanceRow}>
                  <span>On Leave</span>
                  <span className={styles.warning}>3</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
