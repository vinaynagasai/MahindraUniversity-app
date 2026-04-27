import { Header } from '../../components/layout';
import { Card, Avatar, Badge } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar,
  Users,
  BookOpen,
  FileText,
  Bell,
  MessageSquare,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './FacultyDashboard.module.css';

const quickStats = [
  { label: 'My Classes', value: '4', icon: Calendar, color: 'var(--primary)' },
  { label: 'Students', value: '156', icon: Users, color: 'var(--secondary)' },
  { label: 'Pending Doubts', value: '7', icon: MessageSquare, color: 'var(--warning)' },
  { label: 'Notifications', value: '2', icon: Bell, color: 'var(--info)' }
];

const todayClasses = [
  { time: '09:00 AM', subject: 'Machine Learning', room: 'A-101', students: 45 },
  { time: '11:00 AM', subject: 'Artificial Intelligence', room: 'B-202', students: 38 },
  { time: '02:00 PM', subject: 'Database Systems', room: 'C-301', students: 42 }
];

const quickActions = [
  { label: 'Mark Attendance', icon: Calendar, path: '/faculty/attendance', color: 'var(--primary)' },
  { label: 'Upload Marks', icon: BookOpen, path: '/faculty/marks', color: 'var(--secondary)' },
  { label: 'Send Notification', icon: Bell, path: '/faculty/notifications', color: 'var(--warning)' },
  { label: 'Manage Doubts', icon: MessageSquare, path: '/faculty/doubts', color: 'var(--info)' }
];

const pendingTasks = [
  { type: 'Doubt', title: 'Query about Neural Networks', student: 'John Doe', time: '2 hours ago' },
  { type: 'Permission', title: 'Leave request from Sarah', student: 'Sarah Miller', time: '4 hours ago' },
  { type: 'Doubt', title: 'Gradient Descent Question', student: 'Mike Chen', time: '5 hours ago' }
];

export const FacultyDashboard = () => {
  const { user } = useAuth();

  return (
    <div className={styles.dashboard}>
      <Header title="Faculty Dashboard" />

      <div className={styles.content}>
        <div className={styles.profileCard}>
          <Avatar name={user?.name} size="xlarge" />
          <div className={styles.profileInfo}>
            <h2>{user?.name}</h2>
            <p>Employee ID: {user?.id}</p>
            <div className={styles.profileMeta}>
              <Badge variant="primary">Computer Science</Badge>
            </div>
          </div>
        </div>

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

        <div className={styles.grid}>
          <Card className={styles.classesCard}>
            <div className={styles.cardHeader}>
              <h3>My Classes Today</h3>
              <span className={styles.day}>Monday, Jan 22</span>
            </div>
            <div className={styles.classesList}>
              {todayClasses.map((cls, index) => (
                <div key={index} className={styles.classItem}>
                  <div className={styles.classTime}>
                    <Clock size={14} />
                    <span>{cls.time}</span>
                  </div>
                  <div className={styles.classDetails}>
                    <span className={styles.classSubject}>{cls.subject}</span>
                    <span className={styles.classRoom}>{cls.room} • {cls.students} students</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.actionsCard}>
            <h3>Quick Actions</h3>
            <div className={styles.actionsGrid}>
              {quickActions.map((action) => (
                <Link key={action.label} to={action.path} className={styles.actionItem}>
                  <div className={styles.actionIcon} style={{ backgroundColor: action.color, opacity: 0.1 }}>
                    <action.icon size={20} style={{ color: action.color }} />
                  </div>
                  <span>{action.label}</span>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        <Card className={styles.tasksCard}>
          <div className={styles.cardHeader}>
            <h3>Pending Tasks</h3>
            <Badge variant="warning">{pendingTasks.length} pending</Badge>
          </div>
          <div className={styles.tasksList}>
            {pendingTasks.map((task, index) => (
              <div key={index} className={styles.taskItem}>
                <Badge variant={task.type === 'Doubt' ? 'info' : 'primary'} size="small">
                  {task.type}
                </Badge>
                <div className={styles.taskContent}>
                  <span className={styles.taskTitle}>{task.title}</span>
                  <span className={styles.taskStudent}>from {task.student}</span>
                </div>
                <span className={styles.taskTime}>{task.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
