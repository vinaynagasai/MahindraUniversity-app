import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Select, Badge, Progress } from '../../components/common';
import { getGrade } from '../../utils/constants';
import styles from './ParentMarks.module.css';

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

const generateMarksData = (_semester) => {
  const subjects = ['Machine Learning', 'Web Development', 'Compiler Design', 'Artificial Intelligence', 'Cryptography'];
  return subjects.map(subject => {
    const total = 60 + Math.floor(Math.random() * 30);
    const percentage = (total / 100) * 100;
    const grade = getGrade(percentage);
    return {
      name: subject,
      marks: total,
      percentage: Math.round(percentage),
      grade
    };
  });
};

export const ParentMarks = () => {
  const [selectedSemester, setSelectedSemester] = useState(5);
  const marksData = generateMarksData(selectedSemester);
  
  const totalObtained = marksData.reduce((acc, curr) => acc + curr.marks, 0);
  const totalPossible = marksData.length * 100;
  const overallPercentage = (totalObtained / totalPossible) * 100;
  const overallGrade = getGrade(overallPercentage);

  const semesterOptions = SEMESTERS.map(sem => ({
    value: sem,
    label: `Semester ${sem}`
  }));

  return (
    <div className={styles.page}>
      <Header title="Child Marks" />

      <div className={styles.content}>
        <Card className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <h3>Academic Performance</h3>
            <Select
              options={semesterOptions}
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
            />
          </div>

          <div className={styles.summaryContent}>
            <div className={styles.gradeDisplay}>
              <span className={styles.gradeValue}>{overallGrade.grade}</span>
              <span className={styles.gradeLabel}>Current Grade</span>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{overallPercentage.toFixed(1)}%</span>
                <span className={styles.statLabel}>Percentage</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{totalObtained}/{totalPossible}</span>
                <span className={styles.statLabel}>Total Marks</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>A</span>
                <span className={styles.statLabel}>Grade</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className={styles.subjectsCard}>
          <h3>Subject-wise Performance - Semester {selectedSemester}</h3>
          <div className={styles.subjectsList}>
            {marksData.map((subject) => (
              <div key={subject.name} className={styles.subjectItem}>
                <div className={styles.subjectHeader}>
                  <span className={styles.subjectName}>{subject.name}</span>
                  <div className={styles.subjectMarks}>
                    <span>{subject.marks}/100</span>
                    <Badge
                      variant={
                        subject.grade.grade === 'A' ? 'success' :
                        subject.grade.grade === 'B' ? 'primary' :
                        subject.grade.grade === 'C' ? 'warning' : 'error'
                      }
                    >
                      {subject.grade.grade}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={subject.percentage}
                  max={100}
                  variant={
                    subject.percentage >= 90 ? 'success' :
                    subject.percentage >= 70 ? 'primary' :
                    subject.percentage >= 60 ? 'warning' : 'error'
                  }
                  size="medium"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.remarksCard}>
          <h3>Performance Summary</h3>
          <div className={styles.remarksContent}>
            <p>John is performing well in Web Development and Cryptography. Machine Learning and Compiler Design need some improvement.</p>
            <div className={styles.comparison}>
              <span>Performance vs Previous Semester:</span>
              <Badge variant="success">Improved +5%</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
