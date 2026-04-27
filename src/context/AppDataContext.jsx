import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppDataContext = createContext(null);

export const departments = [
  { value: 'Computer Science & Engineering', label: 'Computer Science & Engineering' },
  { value: 'Electronics & Communication', label: 'Electronics & Communication' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  { value: 'Civil Engineering', label: 'Civil Engineering' },
  { value: 'Electrical Engineering', label: 'Electrical Engineering' },
  { value: 'Information Technology', label: 'Information Technology' }
];

export const subjects = [
  { value: 'Data Structures & Algorithms', label: 'Data Structures & Algorithms' },
  { value: 'Database Management Systems', label: 'Database Management Systems' },
  { value: 'Operating Systems', label: 'Operating Systems' },
  { value: 'Computer Networks', label: 'Computer Networks' },
  { value: 'Software Engineering', label: 'Software Engineering' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Web Technologies', label: 'Web Technologies' },
  { value: 'Digital Electronics', label: 'Digital Electronics' },
  { value: 'Signals & Systems', label: 'Signals & Systems' },
  { value: 'Thermodynamics', label: 'Thermodynamics' },
  { value: 'Fluid Mechanics', label: 'Fluid Mechanics' },
  { value: 'Structural Analysis', label: 'Structural Analysis' },
  { value: 'Circuit Theory', label: 'Circuit Theory' }
];

let nextRecordId = 1000;

const createRecordId = () => {
  nextRecordId += 1;
  return nextRecordId;
};

const initialData = {
  students: [
    { id: 'CS2021001', name: 'Aarav Sharma', email: 'aarav.sharma@mu.edu', department: 'Computer Science & Engineering', semester: 5, phone: '+91 98765 43210' },
    { id: 'CS2021002', name: 'Priya Patel', email: 'priya.patel@mu.edu', department: 'Computer Science & Engineering', semester: 5, phone: '+91 98765 43211' },
    { id: 'CS2021003', name: 'Arjun Reddy', email: 'arjun.reddy@mu.edu', department: 'Electronics & Communication', semester: 5, phone: '+91 98765 43212' },
    { id: 'CS2021004', name: 'Sneha Gupta', email: 'sneha.gupta@mu.edu', department: 'Information Technology', semester: 5, phone: '+91 98765 43213' },
    { id: 'EC2021005', name: 'Rohan Kumar', email: 'rohan.kumar@mu.edu', department: 'Electronics & Communication', semester: 5, phone: '+91 98765 43214' },
    { id: 'ME2021006', name: 'Ananya Singh', email: 'ananya.singh@mu.edu', department: 'Mechanical Engineering', semester: 5, phone: '+91 98765 43215' },
    { id: 'CE2021007', name: 'Vikram Mehta', email: 'vikram.mehta@mu.edu', department: 'Civil Engineering', semester: 5, phone: '+91 98765 43216' },
    { id: 'EE2021008', name: 'Kavya Nair', email: 'kavya.nair@mu.edu', department: 'Electrical Engineering', semester: 5, phone: '+91 98765 43217' }
  ],
  
  attendance: [
    { id: 1, studentId: 'CS2021001', subject: 'Data Structures & Algorithms', date: '2024-01-22', status: 'present', markedBy: 'EMP001' },
    { id: 2, studentId: 'CS2021001', subject: 'Database Management Systems', date: '2024-01-22', status: 'present', markedBy: 'EMP001' },
    { id: 3, studentId: 'CS2021002', subject: 'Data Structures & Algorithms', date: '2024-01-22', status: 'absent', markedBy: 'EMP001' },
    { id: 4, studentId: 'CS2021001', subject: 'Artificial Intelligence', date: '2024-01-21', status: 'present', markedBy: 'EMP001' },
    { id: 5, studentId: 'CS2021001', subject: 'Machine Learning', date: '2024-01-21', status: 'present', markedBy: 'EMP001' },
    { id: 6, studentId: 'CS2021003', subject: 'Digital Electronics', date: '2024-01-22', status: 'present', markedBy: 'EMP002' },
    { id: 7, studentId: 'CS2021004', subject: 'Web Technologies', date: '2024-01-22', status: 'present', markedBy: 'EMP001' }
  ],
  
  marks: [
    { id: 1, studentId: 'CS2021001', subject: 'Data Structures & Algorithms', semester: 5, examType: 'internal', marks: 22, maxMarks: 25 },
    { id: 2, studentId: 'CS2021001', subject: 'Data Structures & Algorithms', semester: 5, examType: 'final', marks: 68, maxMarks: 75 },
    { id: 3, studentId: 'CS2021002', subject: 'Data Structures & Algorithms', semester: 5, examType: 'internal', marks: 20, maxMarks: 25 },
    { id: 4, studentId: 'CS2021001', subject: 'Database Management Systems', semester: 5, examType: 'internal', marks: 23, maxMarks: 25 },
    { id: 5, studentId: 'CS2021001', subject: 'Database Management Systems', semester: 5, examType: 'final', marks: 69, maxMarks: 75 },
    { id: 6, studentId: 'CS2021003', subject: 'Digital Electronics', semester: 5, examType: 'internal', marks: 18, maxMarks: 25 },
    { id: 7, studentId: 'CS2021004', subject: 'Web Technologies', semester: 5, examType: 'internal', marks: 21, maxMarks: 25 }
  ],
  
  doubts: [
    { id: 1, studentId: 'CS2021001', studentName: 'Aarav Sharma', subject: 'Data Structures & Algorithms', title: 'Binary Search Tree Operations', description: 'I am confused about how deletion works in BST when the node has two children.', status: 'pending', response: '', createdAt: '2024-01-20', respondedAt: null },
    { id: 2, studentId: 'CS2021002', studentName: 'Priya Patel', subject: 'Database Management Systems', title: 'SQL Join Operations', description: 'What is the difference between LEFT JOIN and RIGHT JOIN?', status: 'pending', response: '', createdAt: '2024-01-22', respondedAt: null },
    { id: 3, studentId: 'CS2021001', studentName: 'Aarav Sharma', subject: 'Artificial Intelligence', title: 'A* Algorithm', description: 'How does the heuristic function affect A* search?', status: 'answered', response: 'The heuristic function directly impacts A* efficiency. An admissible heuristic never overestimates the cost.', createdAt: '2024-01-18', respondedAt: '2024-01-19' },
    { id: 4, studentId: 'CS2021003', studentName: 'Arjun Reddy', subject: 'Digital Electronics', title: 'Flip Flops', description: 'Difference between SR and JK flip flop?', status: 'answered', response: 'SR flip flop has invalid state when both inputs are 1, while JK flip flop toggles in that case.', createdAt: '2024-01-15', respondedAt: '2024-01-16' }
  ],
  
  permissions: [
    { id: 1, studentId: 'CS2021001', studentName: 'Aarav Sharma', type: 'leave', startDate: '2024-02-01', endDate: '2024-02-03', reason: 'Family wedding', status: 'approved', appliedOn: '2024-01-25' },
    { id: 2, studentId: 'CS2021001', studentName: 'Aarav Sharma', type: 'permission', startDate: '2024-01-30', endDate: '2024-01-30', reason: 'Medical appointment', status: 'approved', appliedOn: '2024-01-28' },
    { id: 3, studentId: 'CS2021001', studentName: 'Aarav Sharma', type: 'leave', startDate: '2024-02-10', endDate: '2024-02-15', reason: 'Sick leave', status: 'pending', appliedOn: '2024-02-08' },
    { id: 4, studentId: 'CS2021002', studentName: 'Priya Patel', type: 'leave', startDate: '2024-02-05', endDate: '2024-02-07', reason: 'Personal work', status: 'pending', appliedOn: '2024-02-03' }
  ],
  
  notifications: [
    { id: 1, type: 'info', title: 'Mid-Semester Exams', message: 'Exams start from next Monday', priority: 'normal', isRead: false, forRole: 'all', createdAt: new Date().toISOString() },
    { id: 2, type: 'warning', title: 'Fee Payment Due', message: 'Pending fee of ₹50,000 is due by March 15', priority: 'high', isRead: false, forRole: 'all', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, type: 'success', title: 'Doubt Answered', message: 'Your doubt in A* Algorithm has been answered', priority: 'normal', isRead: true, forRole: 'student', createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: 4, type: 'info', title: 'Faculty Meeting', message: 'All faculty members attend meeting on Friday at 3 PM', priority: 'normal', isRead: false, forRole: 'faculty', createdAt: new Date(Date.now() - 43200000).toISOString() }
  ]
};

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('mu_app_data');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading from localStorage:', e);
  }
  return initialData;
};

export const AppDataProvider = ({ children }) => {
  const [data, setData] = useState(loadFromStorage);

  useEffect(() => {
    localStorage.setItem('mu_app_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'mu_app_data' && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Error syncing from storage:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const // Attendance
  markAttendance = useCallback((attendanceRecords) => {
    setData(prev => ({
      ...prev,
      attendance: [...prev.attendance, ...attendanceRecords.map(r => ({
        ...r,
        id: createRecordId(),
        markedBy: 'EMP001'
      }))]
    }));
  }, []);

  const getStudentAttendance = useCallback((studentId) => {
    return data.attendance.filter(a => a.studentId === studentId);
  }, [data.attendance]);

  const // Marks
  uploadMarks = useCallback((marksRecords) => {
    setData(prev => ({
      ...prev,
      marks: [...prev.marks, ...marksRecords.map(r => ({
        ...r,
        id: createRecordId()
      }))]
    }));
  }, []);

  const getStudentMarks = useCallback((studentId) => {
    return data.marks.filter(m => m.studentId === studentId);
  }, [data.marks]);

  const // Doubts
  addDoubt = useCallback((doubt) => {
    const newDoubt = {
      ...doubt,
      id: Date.now(),
      status: 'pending',
      response: '',
      createdAt: new Date().toISOString().split('T')[0],
      respondedAt: null
    };
    setData(prev => ({
      ...prev,
      doubts: [newDoubt, ...prev.doubts]
    }));
    return newDoubt;
  }, []);

  const respondToDoubt = useCallback((id, response) => {
    setData(prev => ({
      ...prev,
      doubts: prev.doubts.map(d =>
        d.id === id
          ? { ...d, status: 'answered', response, respondedAt: new Date().toISOString().split('T')[0] }
          : d
      )
    }));
  }, []);

  const getStudentDoubts = useCallback((studentId) => {
    return data.doubts.filter(d => d.studentId === studentId);
  }, [data.doubts]);

  const getPendingDoubts = useCallback(() => {
    return data.doubts.filter(d => d.status === 'pending');
  }, [data.doubts]);

  const // Permissions
  addPermission = useCallback((permission) => {
    const newPermission = {
      ...permission,
      id: Date.now(),
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({
      ...prev,
      permissions: [newPermission, ...prev.permissions]
    }));
    return newPermission;
  }, []);

  const updatePermissionStatus = useCallback((id, status) => {
    setData(prev => ({
      ...prev,
      permissions: prev.permissions.map(p =>
        p.id === id ? { ...p, status } : p
      )
    }));
  }, []);

  const getStudentPermissions = useCallback((studentId) => {
    return data.permissions.filter(p => p.studentId === studentId);
  }, [data.permissions]);

  const getPendingPermissions = useCallback(() => {
    return data.permissions.filter(p => p.status === 'pending');
  }, [data.permissions]);

  const // Notifications
  addNotification = useCallback((notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications]
    }));
  }, []);

  const markNotificationRead = useCallback((id) => {
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n =>
        n.id === id ? { ...n, isRead: true } : n
      )
    }));
  }, []);

  const getNotificationsByRole = useCallback((role) => {
    return data.notifications.filter(n => n.forRole === 'all' || n.forRole === role);
  }, [data.notifications]);

  const markAllNotificationsRead = useCallback((role) => {
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n =>
        (n.forRole === 'all' || n.forRole === role) ? { ...n, isRead: true } : n
      )
    }));
  }, []);

  const // Getters
  getAllStudents = useCallback(() => data.students, [data.students]),
  getStudent = useCallback((id) => data.students.find(s => s.id === id), [data.students]),
  getAllDoubts = useCallback(() => data.doubts, [data.doubts]),
  getAllPermissions = useCallback(() => data.permissions, [data.permissions]);

  return (
    <AppDataContext.Provider value={{
      data,
      departments,
      subjects,
      // Attendance
      markAttendance,
      getStudentAttendance,
      // Marks
      uploadMarks,
      getStudentMarks,
      // Doubts
      addDoubt,
      respondToDoubt,
      getStudentDoubts,
      getPendingDoubts,
      getAllDoubts,
      // Permissions
      addPermission,
      updatePermissionStatus,
      getStudentPermissions,
      getPendingPermissions,
      // Notifications
      addNotification,
      markNotificationRead,
      getNotificationsByRole,
      markAllNotificationsRead,
      // Getters
      getAllStudents,
      getStudent,
      getAllPermissions
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
};
