import { Header } from '../../components/layout';
import { Card } from '../../components/common';
import { MapPin, LogIn, LogOut, Clock } from 'lucide-react';
import styles from './Campus.module.css';

const campusLogs = [
  { id: 1, type: 'in', location: 'Main Gate', time: '2024-01-22 08:30', date: 'Today' },
  { id: 2, type: 'out', location: 'Cafeteria', time: '2024-01-22 12:45', date: 'Today' },
  { id: 3, type: 'in', location: 'Cafeteria', time: '2024-01-22 13:00', date: 'Today' },
  { id: 4, type: 'out', location: 'Main Gate', time: '2024-01-22 17:00', date: 'Today' },
  { id: 5, type: 'in', location: 'Library Entrance', time: '2024-01-21 09:00', date: 'Yesterday' },
  { id: 6, type: 'out', location: 'Library Entrance', time: '2024-01-21 14:30', date: 'Yesterday' }
];

export const StudentCampus = () => {
  const todayLogs = campusLogs.filter(log => log.date === 'Today');
  const todayEntries = todayLogs.filter(log => log.type === 'in').length;
  const todayExits = todayLogs.filter(log => log.type === 'out').length;
  const totalTimeOnCampus = '8h 30m';

  return (
    <div className={styles.page}>
      <Header title="Campus In/Out" />

      <div className={styles.content}>
        <Card className={styles.todayCard}>
          <div className={styles.todayHeader}>
            <h3>Today's Activity</h3>
            <span className={styles.date}>January 22, 2024</span>
          </div>
          
          <div className={styles.todayStats}>
            <div className={styles.statItem}>
              <LogIn size={20} style={{ color: 'var(--success)' }} />
              <span className={styles.statValue}>{todayEntries}</span>
              <span className={styles.statLabel}>Entries</span>
            </div>
            <div className={styles.statItem}>
              <LogOut size={20} style={{ color: 'var(--error)' }} />
              <span className={styles.statValue}>{todayExits}</span>
              <span className={styles.statLabel}>Exits</span>
            </div>
            <div className={styles.statItem}>
              <Clock size={20} style={{ color: 'var(--primary)' }} />
              <span className={styles.statValue}>{totalTimeOnCampus}</span>
              <span className={styles.statLabel}>Time on Campus</span>
            </div>
          </div>
        </Card>

        <Card className={styles.statusCard}>
          <div className={styles.statusContent}>
            <div className={`${styles.statusIndicator} ${styles['out']}`}>
              <MapPin size={20} />
            </div>
            <div className={styles.statusInfo}>
              <span className={styles.statusLabel}>Current Status</span>
              <span className={styles.statusValue}>Outside Campus</span>
              <span className={styles.statusLocation}>Last exit: Main Gate at 5:00 PM</span>
            </div>
          </div>
        </Card>

        <Card className={styles.logsCard}>
          <h3>Activity Log</h3>
          <div className={styles.logsList}>
            {campusLogs.map((log, index) => (
              <div key={log.id} className={styles.logItem}>
                <div className={`${styles.logIcon} ${styles[log.type]}`}>
                  {log.type === 'in' ? <LogIn size={16} /> : <LogOut size={16} />}
                </div>
                <div className={styles.logContent}>
                  <span className={styles.logType}>
                    {log.type === 'in' ? 'Entered' : 'Exited'} campus
                  </span>
                  <span className={styles.logLocation}>
                    <MapPin size={12} />
                    {log.location}
                  </span>
                </div>
                <div className={styles.logTime}>
                  <span>{log.time}</span>
                  <span className={styles.logDate}>{log.date}</span>
                </div>
                {index < campusLogs.length - 1 && <div className={styles.logLine} />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
