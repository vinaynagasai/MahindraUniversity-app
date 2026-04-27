import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Select, Badge } from '../../components/common';
import { Save, Check, X } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';
import styles from './MarkAttendance.module.css';

const semesters = [
  { value: 5, label: 'Semester 5' },
  { value: 6, label: 'Semester 6' }
];

export const FacultyMarkAttendance = () => {
  const { markAttendance, getAllStudents, departments, subjects } = useAppData();
  const { addToast } = useToast();
  
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const allStudents = getAllStudents();
  const filteredStudents = department && semester 
    ? allStudents.filter(s => s.department === department && s.semester === parseInt(semester))
    : [];

  const handleClassSelect = () => {
    const classStudents = filteredStudents.map(s => ({
      ...s,
      status: 'present'
    }));
    setStudentAttendance(classStudents);
  };

  const handleStatusChange = (studentId, status) => {
    setStudentAttendance(prev => prev.map(s =>
      s.id === studentId ? { ...s, status } : s
    ));
  };

  const handleMarkAll = (status) => {
    setStudentAttendance(prev => prev.map(s => ({ ...s, status })));
  };

  const handleSave = async () => {
    const allMarked = studentAttendance.every(s => s.status !== null);
    if (!allMarked) {
      addToast('Please mark attendance for all students', 'error');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const attendanceRecords = studentAttendance.map(s => ({
      studentId: s.id,
      subject,
      date: selectedDate,
      status: s.status
    }));

    markAttendance(attendanceRecords);
    addToast('Attendance marked successfully!', 'success');
    setLoading(false);
    setSaved(true);
    setStudentAttendance([]);
    setTimeout(() => {
      setSaved(false);
      setDepartment('');
      setSemester('');
      setSubject('');
    }, 2000);
  };

  const presentCount = studentAttendance.filter(s => s.status === 'present').length;
  const absentCount = studentAttendance.filter(s => s.status === 'absent').length;

  return (
    <div className={styles.page}>
      <Header title="Mark Attendance" />

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
            <div className={styles.dateField}>
              <label>Date</label>
              <input
                type="date"
                value={selectedDate}
                className={styles.dateInput}
                disabled
              />
            </div>
          </div>
          {department && semester && subject && (
            <Button onClick={handleClassSelect} variant="outline" className={styles.loadBtn}>
              Load Students
            </Button>
          )}
        </Card>

        {studentAttendance.length > 0 && (
          <>
            <Card className={styles.controlsCard}>
              <div className={styles.controls}>
                <div className={styles.quickActions}>
                  <Button size="small" variant="outline" onClick={() => handleMarkAll('present')}>
                    <Check size={16} /> All Present
                  </Button>
                  <Button size="small" variant="outline" onClick={() => handleMarkAll('absent')}>
                    <X size={16} /> All Absent
                  </Button>
                </div>
                <div className={styles.stats}>
                  <Badge variant="success">{presentCount} Present</Badge>
                  <Badge variant="error">{absentCount} Absent</Badge>
                </div>
              </div>
            </Card>

            <Card className={styles.studentsCard}>
              <div className={styles.studentsHeader}>
                <span>Student List</span>
                <span>{studentAttendance.length} students</span>
              </div>
              <div className={styles.studentsList}>
                {studentAttendance.map((student) => (
                  <div key={student.id} className={styles.studentItem}>
                    <div className={styles.studentInfo}>
                      <span className={styles.studentName}>{student.name}</span>
                      <span className={styles.studentRoll}>{student.id}</span>
                    </div>
                    <div className={styles.statusButtons}>
                      <button
                        className={`${styles.statusBtn} ${styles.present} ${student.status === 'present' ? styles.active : ''}`}
                        onClick={() => handleStatusChange(student.id, 'present')}
                      >
                        P
                      </button>
                      <button
                        className={`${styles.statusBtn} ${styles.absent} ${student.status === 'absent' ? styles.active : ''}`}
                        onClick={() => handleStatusChange(student.id, 'absent')}
                      >
                        A
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className={styles.actions}>
              <Button
                icon={Save}
                onClick={handleSave}
                loading={loading}
              >
                {saved ? 'Saved!' : 'Save Attendance'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
