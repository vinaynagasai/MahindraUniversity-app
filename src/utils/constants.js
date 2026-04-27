export const ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  PARENT: 'parent'
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const DEPARTMENTS = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical'
];

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const SUBJECTS = {
  'Computer Science': {
    1: ['Mathematics I', 'Physics', 'Computer Fundamentals', 'C Programming', 'English'],
    2: ['Mathematics II', 'Data Structures', 'Digital Electronics', 'C++ Programming', 'Workshop'],
    3: ['Discrete Mathematics', 'OOP', 'Database Systems', 'Computer Architecture', 'Statistics'],
    4: ['Algorithms', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Probability'],
    5: ['Machine Learning', 'Web Development', 'Compiler Design', 'Artificial Intelligence', 'Cryptography'],
    6: ['Cloud Computing', 'Mobile Development', 'Data Science', 'Computer Graphics', 'Information Security'],
    7: ['Big Data', 'IoT', 'Deep Learning', 'DevOps', 'Project Management'],
    8: ['Research Project', 'Seminar', 'Industry Training', 'Elective I', 'Elective II']
  }
};

export const STATUS_COLORS = {
  present: 'var(--success)',
  absent: 'var(--error)',
  leave: 'var(--warning)',
  pending: 'var(--warning)',
  approved: 'var(--success)',
  rejected: 'var(--error)',
  answered: 'var(--success)'
};

export const getGrade = (percentage) => {
  if (percentage >= 90) return { grade: 'A', color: 'var(--success)' };
  if (percentage >= 80) return { grade: 'B', color: 'var(--primary-light)' };
  if (percentage >= 70) return { grade: 'C', color: 'var(--warning)' };
  if (percentage >= 60) return { grade: 'D', color: 'var(--accent)' };
  return { grade: 'F', color: 'var(--error)' };
};

export const getAttendanceColor = (percentage) => {
  if (percentage >= 75) return 'var(--success)';
  if (percentage >= 60) return 'var(--warning)';
  return 'var(--error)';
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};
