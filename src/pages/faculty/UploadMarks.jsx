import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Select } from '../../components/common';
import { Save, Upload, Download } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';
import styles from './UploadMarks.module.css';

const semesters = [
  { value: 5, label: 'Semester 5' },
  { value: 6, label: 'Semester 6' },
  { value: 7, label: 'Semester 7' },
  { value: 8, label: 'Semester 8' }
];

const examTypes = [
  { value: 'internal', label: 'Internal Assessment' },
  { value: 'midterm', label: 'Mid-Term' },
  { value: 'final', label: 'Final Exam' }
];

export const FacultyUploadMarks = () => {
  const { uploadMarks, getAllStudents, departments, subjects } = useAppData();
  const { addToast } = useToast();
  
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [examType, setExamType] = useState('');
  const [studentMarks, setStudentMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const allStudents = getAllStudents();
  const filteredStudents = department && semester 
    ? allStudents.filter(s => s.department === department && s.semester === parseInt(semester))
    : [];

  const handleLoadStudents = () => {
    const marksData = filteredStudents.map(s => ({
      ...s,
      marks: ''
    }));
    setStudentMarks(marksData);
  };

  const handleMarksChange = (studentId, value) => {
    const numValue = value === '' ? '' : Math.min(parseInt(value) || 0, 100);
    setStudentMarks(prev => prev.map(s =>
      s.id === studentId ? { ...s, marks: numValue } : s
    ));
  };

  const getMaxMarks = () => {
    if (examType === 'internal') return 25;
    if (examType === 'midterm') return 50;
    return 75;
  };

  const handleSave = async () => {
    const allFilled = studentMarks.every(s => s.marks !== '');
    if (!allFilled) {
      addToast('Please enter marks for all students', 'error');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const marksRecords = studentMarks.map(s => ({
      studentId: s.id,
      subject,
      semester: parseInt(semester),
      examType,
      marks: parseInt(s.marks),
      maxMarks: getMaxMarks()
    }));

    uploadMarks(marksRecords);
    addToast('Marks uploaded successfully!', 'success');
    setLoading(false);
    setSaved(true);
    setStudentMarks([]);
    setTimeout(() => {
      setSaved(false);
      setDepartment('');
      setSemester('');
      setSubject('');
      setExamType('');
    }, 2000);
  };

  const totalMarks = studentMarks.reduce((sum, s) => sum + (parseInt(s.marks) || 0), 0);
  const maxMarks = getMaxMarks();

  return (
    <div className={styles.page}>
      <Header title="Upload Marks" />

      <div className={styles.content}>
        <Card className={styles.filterCard}>
          <div className={styles.filters}>
            <Select
              label="Department"
              options={departments}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Select department"
            />
            <Select
              label="Semester"
              options={semesters}
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="Select semester"
            />
            <Select
              label="Subject"
              options={subjects}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Select subject"
            />
            <Select
              label="Exam Type"
              options={examTypes}
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              placeholder="Select exam type"
            />
          </div>
          <div className={styles.uploadActions}>
            <Button variant="outline" icon={Download}>
              Download Template
            </Button>
            <Button variant="outline" icon={Upload}>
              Upload CSV
            </Button>
          </div>
          {department && semester && subject && examType && (
            <Button onClick={handleLoadStudents} variant="outline" className={styles.loadBtn}>
              Load Students
            </Button>
          )}
        </Card>

        {studentMarks.length > 0 && (
          <>
            <Card className={styles.studentsCard}>
              <div className={styles.cardHeader}>
                <h3>Enter Marks</h3>
                <span>Max Marks: {maxMarks}</span>
              </div>

              <div className={styles.studentsList}>
                <div className={styles.listHeader}>
                  <span>Roll No</span>
                  <span>Student Name</span>
                  <span>Marks ({maxMarks})</span>
                </div>
                {studentMarks.map((student) => (
                  <div key={student.id} className={styles.studentRow}>
                    <span className={styles.rollNo}>{student.id}</span>
                    <span className={styles.name}>{student.name}</span>
                    <input
                      type="number"
                      min="0"
                      max={maxMarks}
                      value={student.marks}
                      onChange={(e) => handleMarksChange(student.id, e.target.value)}
                      className={styles.marksInput}
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>

              <div className={styles.summary}>
                <div className={styles.summaryItem}>
                  <span>Total Students</span>
                  <span>{studentMarks.length}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Class Average</span>
                  <span>
                    {studentMarks.length > 0 
                      ? (totalMarks / studentMarks.length).toFixed(1)
                      : '0'} / {maxMarks}
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Total Marks</span>
                  <span>{totalMarks} / {studentMarks.length * maxMarks}</span>
                </div>
              </div>
            </Card>

            <div className={styles.actions}>
              <Button
                icon={Save}
                onClick={handleSave}
                loading={loading}
              >
                {saved ? 'Saved!' : 'Save Marks'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
