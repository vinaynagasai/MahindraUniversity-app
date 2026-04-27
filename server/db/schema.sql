-- MU App Database Schema
-- PostgreSQL compatible

-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT CHECK(role IN ('student', 'faculty', 'parent')) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Students table
CREATE TABLE students (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  roll_no TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  semester INTEGER CHECK(semester BETWEEN 1 AND 8),
  phone TEXT,
  address TEXT,
  photo_url TEXT,
  parent_id TEXT REFERENCES users(id),
  blood_group TEXT,
  date_of_birth DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Faculty table
CREATE TABLE faculty (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  employee_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  photo_url TEXT,
  specialization TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parents table
CREATE TABLE parents (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  student_id TEXT REFERENCES students(id),
  relationship TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects table
CREATE TABLE subjects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  semester INTEGER NOT NULL,
  faculty_id TEXT REFERENCES faculty(id),
  credits INTEGER DEFAULT 4
);

-- Attendance table
CREATE TABLE attendance (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
  subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT CHECK(status IN ('present', 'absent', 'leave')),
  marked_by TEXT REFERENCES faculty(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, subject_id, date)
);

-- Marks table
CREATE TABLE marks (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
  subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
  semester INTEGER NOT NULL,
  exam_type TEXT CHECK(exam_type IN ('internal', 'assignment', 'midterm', 'final')),
  marks REAL NOT NULL,
  total_marks REAL NOT NULL,
  uploaded_by TEXT REFERENCES faculty(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Timetable table
CREATE TABLE timetable (
  id TEXT PRIMARY KEY,
  subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK(day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room TEXT NOT NULL
);

-- Fees table
CREATE TABLE fees (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
  amount REAL NOT NULL,
  paid_amount REAL DEFAULT 0,
  due_date DATE,
  status TEXT CHECK(status IN ('pending', 'partial', 'paid')),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee transactions table
CREATE TABLE fee_transactions (
  id TEXT PRIMARY KEY,
  fee_id TEXT REFERENCES fees(id) ON DELETE CASCADE,
  amount REAL NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_method TEXT,
  transaction_id TEXT
);

-- Permissions table
CREATE TABLE permissions (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
  type TEXT CHECK(type IN ('leave', 'permission')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status TEXT CHECK(status IN ('pending', 'approved', 'rejected')),
  reviewed_by TEXT REFERENCES faculty(id),
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doubts table
CREATE TABLE doubts (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
  subject_id TEXT REFERENCES subjects(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK(status IN ('pending', 'answered')),
  response TEXT,
  responded_by TEXT REFERENCES faculty(id),
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campus logs table
CREATE TABLE campus_logs (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
  type TEXT CHECK(type IN ('in', 'out')),
  location TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT DEFAULT 'normal',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OTP table
CREATE TABLE otp (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  otp TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Login attempts table
CREATE TABLE login_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  ip_address TEXT,
  attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  successful BOOLEAN
);

-- Create indexes for better performance
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_roll_no ON students(roll_no);
CREATE INDEX idx_attendance_student_id ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_marks_student_id ON marks(student_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_doubts_student_id ON doubts(student_id);
CREATE INDEX idx_doubts_status ON doubts(status);

-- Insert sample data
INSERT INTO users (id, email, password_hash, role) VALUES
  ('user_student_1', 'cs2021001@mu.edu', '$2a$10$demo', 'student'),
  ('user_faculty_1', 'sarah.smith@mu.edu', '$2a$10$demo', 'faculty'),
  ('user_parent_1', 'michael.doe@email.com', '$2a$10$demo', 'parent');

INSERT INTO students (id, user_id, roll_no, name, department, semester, phone, blood_group) VALUES
  ('student_1', 'user_student_1', 'CS2021001', 'John Doe', 'Computer Science', 5, '+1 234 567 8900', 'O+');

INSERT INTO faculty (id, user_id, employee_id, name, department, specialization) VALUES
  ('faculty_1', 'user_faculty_1', 'EMP001', 'Dr. Sarah Smith', 'Computer Science', 'Machine Learning, AI');

INSERT INTO parents (id, user_id, name, email, student_id, relationship) VALUES
  ('parent_1', 'user_parent_1', 'Michael Doe', 'michael.doe@email.com', 'student_1', 'Father');
