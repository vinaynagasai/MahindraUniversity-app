import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Badge, CircularProgress } from '../../components/common';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './Attendance.module.css';

export const StudentAttendance = () => {
  const { user } = useAuth();
  const { getStudentAttendance } = useAppData();
  const [selectedSemester] = useState(5);

  const studentId = user?.id || 'CS2021001';
  const attendance = getStudentAttendance(studentId);

  const totalClasses = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const absentCount = attendance.filter(a => a.status === 'absent').length;
  const leaveCount = attendance.filter(a => a.status === 'leave').length;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  const subjects = [...new Set(attendance.map(a => a.subject))];
  
  const getSubjectAttendance = (subject) => {
    const subjectAttendance = attendance.filter(a => a.subject === subject);
    const present = subjectAttendance.filter(a => a.status === 'present').length;
    const total = subjectAttendance.length;
    return { present, total, percentage: total > 0 ? Math.round((present / total) * 100) : 0 };
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return 'var(--success)';
    if (percentage >= 60) return 'var(--warning)';
    return 'var(--error)';
  };

  const getTrend = () => {
    const diff = 5;
    if (diff > 0) return { icon: TrendingUp, color: 'var(--success)', text: `+${diff}% from last semester` };
    if (diff < 0) return { icon: TrendingDown, color: 'var(--error)', text: `${diff}% from last semester` };
    return { icon: Minus, color: 'var(--text-secondary)', text: 'No change' };
  };

  const trend = getTrend();
  const TrendIcon = trend.icon;

  return (
    <div className={styles.page}>
      <Header title="My Attendance" />

      <div className={styles.content}>
        <Card className={styles.overviewCard}>
          <div className={styles.overviewHeader}>
            <h3>Overall Attendance - Semester {selectedSemester}</h3>
          </div>
          <div className={styles.overviewContent}>
            <div className={styles.attendanceCircle}>
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={getAttendanceColor(attendancePercentage)}
                  strokeWidth="10"
                  strokeDasharray={`${attendancePercentage * 2.83} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className={styles.attendanceValue}>
                <span className={styles.percentage}>{attendancePercentage}%</span>
                <span className={styles.label}>Attendance</span>
              </div>
            </div>
            <div className={styles.overviewStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{totalClasses}</span>
                <span className={styles.statLabel}>Total Classes</span>
              </div>
              <div className={styles.statItem}>
                <span className={`${styles.statValue} ${styles.success}`}>{presentCount}</span>
                <span className={styles.statLabel}>Present</span>
              </div>
              <div className={styles.statItem}>
                <span className={`${styles.statValue} ${styles.danger}`}>{absentCount}</span>
                <span className={styles.statLabel}>Absent</span>
              </div>
              <div className={styles.statItem}>
                <span className={`${styles.statValue} ${styles.warning}`}>{leaveCount}</span>
                <span className={styles.statLabel}>On Leave</span>
              </div>
            </div>
          </div>
          <div className={styles.trendBadge} style={{ color: trend.color }}>
            <TrendIcon size={16} />
            <span>{trend.text}</span>
          </div>
        </Card>

        <h3 className={styles.sectionTitle}>Subject-wise Attendance</h3>
        <div className={styles.subjectsGrid}>
          {subjects.length > 0 ? subjects.map((subject) => {
            const subjectData = getSubjectAttendance(subject);
            return (
              <Card key={subject} className={styles.subjectCard}>
                <div className={styles.subjectHeader}>
                  <h4>{subject}</h4>
                  <Badge
                    variant={subjectData.percentage >= 75 ? 'success' : subjectData.percentage >= 60 ? 'warning' : 'error'}
                  >
                    {subjectData.percentage}%
                  </Badge>
                </div>
                <div className={styles.subjectProgress}>
                  <div className={styles.progressTrack}>
                    <div 
                      className={styles.progressFill}
                      style={{ 
                        width: `${subjectData.percentage}%`,
                        backgroundColor: getAttendanceColor(subjectData.percentage)
                      }}
                    />
                  </div>
                </div>
                <div className={styles.subjectStats}>
                  <span>{subjectData.present} / {subjectData.total} classes</span>
                </div>
              </Card>
            );
          }) : (
            <Card className={styles.emptyCard}>
              <p>No attendance records found for this semester.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
