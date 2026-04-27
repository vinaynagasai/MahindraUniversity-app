import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Badge } from '../../components/common';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Marks.module.css';

const getGrade = (percentage) => {
  if (percentage >= 90) return { grade: 'A', color: 'var(--success)' };
  if (percentage >= 80) return { grade: 'B', color: 'var(--primary)' };
  if (percentage >= 70) return { grade: 'C', color: 'var(--warning)' };
  if (percentage >= 60) return { grade: 'D', color: 'var(--accent)' };
  return { grade: 'F', color: 'var(--error)' };
};

export const StudentMarks = () => {
  const { user } = useAuth();
  const { getStudentMarks } = useAppData();
  const [selectedSemester] = useState(5);

  const studentId = user?.id || 'CS2021001';
  const marks = getStudentMarks(studentId);

  const subjects = [...new Set(marks.map(m => m.subject))];
  
  const getSubjectMarks = (subject) => {
    const subjectMarks = marks.filter(m => m.subject === subject);
    const internal = subjectMarks.find(m => m.examType === 'internal');
    const final = subjectMarks.find(m => m.examType === 'final');
    const totalObtained = (internal?.marks || 0) + (final?.marks || 0);
    const totalMax = (internal?.maxMarks || 0) + (final?.maxMarks || 0);
    const percentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;
    return {
      internal: internal?.marks || 0,
      internalMax: internal?.maxMarks || 25,
      final: final?.marks || 0,
      finalMax: final?.maxMarks || 75,
      total: totalObtained,
      totalMax,
      percentage,
      grade: getGrade(percentage)
    };
  };

  const totalObtained = marks.reduce((sum, m) => sum + m.marks, 0);
  const totalMax = marks.reduce((sum, m) => sum + m.maxMarks, 0);
  const overallPercentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;
  const overallGrade = getGrade(overallPercentage);

  const gradeDistribution = {};
  subjects.forEach(subject => {
    const data = getSubjectMarks(subject);
    const grade = data.grade.grade;
    gradeDistribution[grade] = (gradeDistribution[grade] || 0) + 1;
  });

  return (
    <div className={styles.page}>
      <Header title="My Marks" />

      <div className={styles.content}>
        <Card className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <h3>Academic Performance - Semester {selectedSemester}</h3>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.gradeDisplay}>
              <span className={styles.gradeValue} style={{ color: overallGrade.color }}>{overallGrade.grade}</span>
              <span className={styles.gradeLabel}>Current Grade</span>
            </div>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{overallPercentage}%</span>
                <span className={styles.statLabel}>Percentage</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{totalObtained}/{totalMax}</span>
                <span className={styles.statLabel}>Total Marks</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Internal ({subjects.length > 0 ? marks.find(m => m.subject === subjects[0] && m.examType === 'internal')?.maxMarks || 25 : 25})</th>
                <th>Final ({subjects.length > 0 ? marks.find(m => m.subject === subjects[0] && m.examType === 'final')?.maxMarks || 75 : 75})</th>
                <th>Total</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => {
                const data = getSubjectMarks(subject);
                return (
                  <tr key={subject}>
                    <td><span className={styles.subjectName}>{subject}</span></td>
                    <td>{data.internal}/{data.internalMax}</td>
                    <td>{data.final}/{data.finalMax}</td>
                    <td className={styles.total}>{data.total}/{data.totalMax}</td>
                    <td>
                      <Badge
                        variant={
                          data.grade.grade === 'A' ? 'success' :
                          data.grade.grade === 'B' ? 'primary' :
                          data.grade.grade === 'C' ? 'warning' : 'error'
                        }
                      >
                        {data.grade.grade}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total</strong></td>
                <td>-</td>
                <td>-</td>
                <td className={styles.total}><strong>{totalObtained}/{totalMax}</strong></td>
                <td><strong>{overallGrade.grade}</strong></td>
              </tr>
            </tfoot>
          </table>
        </Card>

        <div className={styles.gradeCards}>
          {Object.entries(gradeDistribution).map(([grade, count]) => (
            <Card key={grade} className={styles.gradeCard}>
              <span className={styles.gradeCardValue}>{count}</span>
              <span className={styles.gradeCardLabel}>Grade {grade}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
