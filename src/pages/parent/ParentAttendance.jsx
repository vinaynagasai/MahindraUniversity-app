import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Select, Badge, CircularProgress } from '../../components/common';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import styles from './ParentAttendance.module.css';

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const TREND_NONE = () => null;

const generateAttendanceData = (_semester) => ({
  overall: 85,
  subjects: [
    { name: 'Machine Learning', attended: 38, total: 45, percentage: 84 },
    { name: 'Web Development', attended: 42, total: 45, percentage: 93 },
    { name: 'Compiler Design', attended: 35, total: 45, percentage: 78 },
    { name: 'Artificial Intelligence', attended: 40, total: 45, percentage: 89 },
    { name: 'Cryptography', attended: 41, total: 45, percentage: 91 }
  ]
});

export const ParentAttendance = () => {
  const [selectedSemester, setSelectedSemester] = useState(5);
  const data = generateAttendanceData(selectedSemester);

  const semesterOptions = SEMESTERS.map(sem => ({
    value: sem,
    label: `Semester ${sem}`
  }));

  const getTrend = () => {
    const diff = selectedSemester - 4;
    if (diff > 0) return { icon: TrendingUp, color: 'var(--success)', text: `+${diff}% from last semester` };
    if (diff < 0) return { icon: TrendingDown, color: 'var(--error)', text: `${diff}% from last semester` };
    return { icon: TREND_NONE, color: 'var(--text-secondary)', text: 'Same as last semester' };
  };

  const trend = getTrend();

  return (
    <div className={styles.page}>
      <Header title="Child Attendance" />

      <div className={styles.content}>
        <Card className={styles.overviewCard}>
          <div className={styles.overviewHeader}>
            <h3>Overall Attendance</h3>
            <Select
              options={semesterOptions}
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
            />
          </div>

          <div className={styles.overviewContent}>
            <div className={styles.attendanceCircle}>
              <CircularProgress
                value={data.overall}
                max={100}
                size={120}
                strokeWidth={10}
                variant={data.overall >= 75 ? 'success' : 'error'}
              />
            </div>

            <div className={styles.overviewStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{data.overall}%</span>
                <span className={styles.statLabel}>Attendance Rate</span>
              </div>
              {data.overall < 75 && (
                <div className={styles.alertBox}>
                  <AlertTriangle size={18} />
                  <span>Attendance below required 75%</span>
                </div>
              )}
              <div className={styles.trendBadge} style={{ color: trend.color }}>
                {trend.icon && <trend.icon size={16} />}
                <span>{trend.text}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className={styles.subjectsCard}>
          <h3>Subject-wise Attendance - Semester {selectedSemester}</h3>
          <div className={styles.subjectsList}>
            {data.subjects.map((subject) => (
              <div key={subject.name} className={styles.subjectItem}>
                <div className={styles.subjectInfo}>
                  <span className={styles.subjectName}>{subject.name}</span>
                  <span className={styles.subjectStats}>
                    {subject.attended} / {subject.total} classes
                  </span>
                </div>
                <Badge
                  variant={subject.percentage >= 75 ? 'success' : subject.percentage >= 60 ? 'warning' : 'error'}
                >
                  {subject.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.remarksCard}>
          <h3>Remarks</h3>
          <div className={styles.remarksContent}>
            <p>John has maintained good attendance in most subjects. Special attention needed for Compiler Design.</p>
            <span className={styles.remarksDate}>Last updated: Jan 22, 2024</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
