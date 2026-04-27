import express from 'express';

const router = express.Router();

let notifications = [
  { id: 1, type: 'info', title: 'Mid-Semester Exams', message: 'Exams start from next Monday', priority: 'normal', isRead: false, createdAt: new Date() },
  { id: 2, type: 'warning', title: 'Fee Payment Due', message: 'Last date for fee payment is approaching', priority: 'high', isRead: false, createdAt: new Date(Date.now() - 86400000) },
  { id: 3, type: 'success', title: 'Doubt Response', message: 'Your doubt has been answered', priority: 'normal', isRead: true, createdAt: new Date(Date.now() - 172800000) }
];

router.get('/', (req, res) => {
  const { isRead, type } = req.query;
  let filtered = notifications;
  
  if (isRead !== undefined) {
    filtered = filtered.filter(n => n.isRead === (isRead === 'true'));
  }
  if (type) {
    filtered = filtered.filter(n => n.type === type);
  }
  
  res.json(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

router.put('/:id/read', (req, res) => {
  const { id } = req.params;
  const notification = notifications.find(n => n.id === parseInt(id));
  if (notification) {
    notification.isRead = true;
    return res.json({ success: true, notification });
  }
  res.status(404).json({ error: 'Notification not found' });
});

router.put('/read-all', (req, res) => {
  notifications = notifications.map(n => ({ ...n, isRead: true }));
  res.json({ success: true, message: 'All notifications marked as read' });
});

router.get('/unread-count', (req, res) => {
  const count = notifications.filter(n => !n.isRead).length;
  res.json({ count });
});

export default router;
