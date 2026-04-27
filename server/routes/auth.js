import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

const users = [
  { id: '1', email: 'cs2021001@mu.edu', password: '$2a$10$abcdefghijklmnopqrstuv', role: 'student', name: 'John Doe' },
  { id: '2', email: 'emp001@mu.edu', password: '$2a$10$abcdefghijklmnopqrstuv', role: 'faculty', name: 'Dr. Sarah Smith' },
  { id: '3', email: 'parent001@mu.edu', password: '$2a$10$abcdefghijklmnopqrstuv', role: 'parent', name: 'Michael Doe' }
];

const otpStore = new Map();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    const demoCredentials = {
      student: { username: 'CS2021001', password: 'student123' },
      faculty: { username: 'EMP001', password: 'faculty123' },
      parent: { username: 'PAR001', password: 'parent123' }
    };

    const demoUsers = {
      student: { id: 'CS2021001', name: 'John Doe', role: 'student' },
      faculty: { id: 'EMP001', name: 'Dr. Sarah Smith', role: 'faculty' },
      parent: { id: 'PAR001', name: 'Michael Doe', role: 'parent' }
    };

    if (demoCredentials[role]?.username === username && demoCredentials[role]?.password === password) {
      const user = demoUsers[role];
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      
      return res.json({
        success: true,
        user: { ...user, email: `${username.toLowerCase()}@mu.edu` },
        token
      });
    }

    res.status(401).json({ success: false, error: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

router.post('/forgot-password', (req, res) => {
  const { identifier } = req.body;
  
  const otp = generateOTP();
  otpStore.set(identifier, { otp, expiresAt: Date.now() + 300000 });
  
  console.log(`OTP for ${identifier}: ${otp}`);
  
  res.json({ 
    success: true, 
    message: 'OTP sent to your registered email/phone',
    demo: true
  });
});

router.post('/verify-otp', (req, res) => {
  const { identifier, otp } = req.body;
  
  const stored = otpStore.get(identifier);
  
  if (stored && stored.otp === otp && stored.expiresAt > Date.now()) {
    otpStore.delete(identifier);
    return res.json({ success: true, message: 'OTP verified successfully' });
  }
  
  res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
});

router.post('/reset-password', async (req, res) => {
  const { identifier, newPassword } = req.body;
  
  res.json({ success: true, message: 'Password updated successfully' });
});

router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
