import express from 'express';

const router = express.Router();

const facultyData = {
  profile: {
    id: 'EMP001',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@mu.edu',
    phone: '+1 234 567 8900',
    department: 'Computer Science',
    specialization: 'Machine Learning, AI'
  },
  subjects: [
    { id: 'CS501', name: 'Machine Learning', semester: 5, students: 45 },
    { id: 'CS504', name: 'Artificial Intelligence', semester: 5, students: 38 },
    { id: 'CS601', name: 'Deep Learning', semester: 6, students: 35 }
  ],
  students: [
    { id: 1, rollNo: 'CS2021001', name: 'John Doe', attendance: 'present' },
    { id: 2, rollNo: 'CS2021002', name: 'Jane Smith', attendance: 'present' },
    { id: 3, rollNo: 'CS2021003', name: 'Mike Johnson', attendance: 'absent' },
    { id: 4, rollNo: 'CS2021004', name: 'Emily Brown', attendance: 'present' }
  ],
  pendingDoubts: [
    { id: 1, student: 'John Doe', subject: 'Machine Learning', title: 'Neural Networks' },
    { id: 2, student: 'Jane Smith', subject: 'AI', title: 'Search Algorithms' }
  ]
};

router.get('/profile', (req, res) => {
  res.json(facultyData.profile);
});

router.get('/subjects', (req, res) => {
  res.json(facultyData.subjects);
});

router.get('/students', (req, res) => {
  const { subject } = req.query;
  res.json(facultyData.students);
});

router.post('/attendance', (req, res) => {
  const { subjectId, date, attendance } = req.body;
  res.json({ success: true, message: 'Attendance marked successfully' });
});

router.post('/marks', (req, res) => {
  const { subjectId, examType, marks } = req.body;
  res.json({ success: true, message: 'Marks uploaded successfully' });
});

router.post('/notifications', (req, res) => {
  const { title, message, targetType, priority } = req.body;
  res.json({ success: true, message: 'Notification sent successfully' });
});

router.get('/doubts', (req, res) => {
  res.json(facultyData.pendingDoubts);
});

router.post('/doubts/:id/respond', (req, res) => {
  const { id } = req.params;
  const { response } = req.body;
  res.json({ success: true, message: 'Response submitted successfully' });
});

export default router;
