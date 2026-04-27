import express from 'express';

const router = express.Router();

const parentData = {
  child: {
    id: 'CS2021001',
    name: 'John Doe',
    email: 'john.doe@student.mu.edu',
    phone: '+1 234 567 8901',
    department: 'Computer Science',
    semester: 5,
    cgpa: 8.5,
    attendance: 85,
    status: 'in_campus'
  },
  attendance: {
    overall: 85,
    subjects: [
      { name: 'Machine Learning', attended: 38, total: 45, percentage: 84 },
      { name: 'Web Development', attended: 42, total: 45, percentage: 93 }
    ]
  },
  marks: {
    semester: 5,
    subjects: [
      { name: 'Machine Learning', marks: 90, grade: 'A' },
      { name: 'Web Development', marks: 92, grade: 'A' }
    ],
    overallGrade: 'A',
    cgpa: 8.5
  },
  notifications: [
    { id: 1, type: 'warning', title: 'Fee Payment Reminder', message: 'Pending fee of ₹2,500 due by Feb 28' },
    { id: 2, type: 'error', title: 'Attendance Alert', message: 'Attendance below 75%' },
    { id: 3, type: 'success', title: 'Result Published', message: 'Mid-semester results published' }
  ]
};

router.get('/student', (req, res) => {
  res.json(parentData.child);
});

router.get('/attendance', (req, res) => {
  const { semester } = req.query;
  res.json(parentData.attendance);
});

router.get('/marks', (req, res) => {
  const { semester } = req.query;
  res.json(parentData.marks);
});

router.get('/notifications', (req, res) => {
  res.json(parentData.notifications);
});

export default router;
