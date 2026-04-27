import express from 'express';

const router = express.Router();

const studentData = {
  profile: {
    id: 'CS2021001',
    name: 'John Doe',
    email: 'cs2021001@mu.edu',
    phone: '+1 234 567 8900',
    address: '123 University Street',
    department: 'Computer Science',
    semester: 5,
    dob: '2002-05-15',
    bloodGroup: 'O+'
  },
  attendance: {
    overall: 85,
    subjects: [
      { name: 'Machine Learning', code: 'CS501', attended: 38, total: 45, percentage: 84 },
      { name: 'Web Development', code: 'CS502', attended: 42, total: 45, percentage: 93 },
      { name: 'Compiler Design', code: 'CS503', attended: 35, total: 45, percentage: 78 },
      { name: 'Artificial Intelligence', code: 'CS504', attended: 40, total: 45, percentage: 89 },
      { name: 'Cryptography', code: 'CS505', attended: 41, total: 45, percentage: 91 }
    ]
  },
  marks: {
    semester: 5,
    subjects: [
      { name: 'Machine Learning', code: 'CS501', internal: 22, external: 45, practical: 23, total: 90 },
      { name: 'Web Development', code: 'CS502', internal: 20, external: 48, practical: 24, total: 92 },
      { name: 'Compiler Design', code: 'CS503', internal: 18, external: 42, practical: 20, total: 80 },
      { name: 'Artificial Intelligence', code: 'CS504', internal: 21, external: 46, practical: 22, total: 89 },
      { name: 'Cryptography', code: 'CS505', internal: 23, external: 47, practical: 24, total: 94 }
    ]
  },
  fees: {
    total: 52500,
    paid: 50000,
    pending: 2500,
    dueDate: '2024-02-28'
  },
  permissions: [
    { id: 1, type: 'leave', startDate: '2024-02-01', endDate: '2024-02-03', status: 'approved' },
    { id: 2, type: 'permission', startDate: '2024-01-30', endDate: '2024-01-30', status: 'approved' },
    { id: 3, type: 'leave', startDate: '2024-02-10', endDate: '2024-02-15', status: 'pending' }
  ],
  doubts: [
    { id: 1, subject: 'Database Systems', title: 'Query about JOIN operations', status: 'answered' },
    { id: 2, subject: 'Machine Learning', title: 'Gradient Descent Algorithm', status: 'pending' }
  ]
};

router.get('/profile', (req, res) => {
  res.json(studentData.profile);
});

router.put('/profile', (req, res) => {
  res.json({ success: true, message: 'Profile updated successfully' });
});

router.get('/attendance', (req, res) => {
  const { semester } = req.query;
  res.json(studentData.attendance);
});

router.get('/marks', (req, res) => {
  const { semester } = req.query;
  res.json(studentData.marks);
});

router.get('/fees', (req, res) => {
  res.json(studentData.fees);
});

router.get('/permissions', (req, res) => {
  res.json(studentData.permissions);
});

router.post('/permissions', (req, res) => {
  const permission = { ...req.body, id: Date.now(), status: 'pending' };
  res.json({ success: true, permission });
});

router.get('/doubts', (req, res) => {
  res.json(studentData.doubts);
});

router.post('/doubts', (req, res) => {
  const doubt = { ...req.body, id: Date.now(), status: 'pending' };
  res.json({ success: true, doubt });
});

export default router;
