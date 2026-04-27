# MU App - University Management Application

## 1. Concept & Vision

MU App is a comprehensive mobile-first university management platform that bridges the communication gap between students, faculty, and parents. The application embodies a professional yet approachable aesthetic—think of a blend between modern banking apps and educational platforms. It should feel trustworthy, organized, and empowering, giving each user role a personalized experience that respects their unique needs while maintaining visual consistency.

The core philosophy: **"Your university, at your fingertips."**

---

## 2. Design Language

### Aesthetic Direction
Clean, professional interface inspired by modern fintech apps (e.g., Revolut, Robinhood) combined with educational warmth. Card-based layouts with generous white space, subtle shadows, and purposeful color accents.

### Color Palette
```
Primary:        #4F46E5 (Indigo-600 - Trust, Education)
Primary Dark:   #3730A3 (Indigo-800)
Primary Light:  #818CF8 (Indigo-400)
Secondary:      #10B981 (Emerald-500 - Success, Growth)
Accent:         #F59E0B (Amber-500 - Attention, Warnings)
Background:     #F8FAFC (Slate-50)
Surface:        #FFFFFF (White)
Text Primary:   #1E293B (Slate-800)
Text Secondary: #64748B (Slate-500)
Error:          #EF4444 (Red-500)
Border:         #E2E8F0 (Slate-200)
```

### Role-Based Accent Colors
```
Student:    #4F46E5 (Indigo)
Faculty:    #7C3AED (Violet)
Parent:     #059669 (Emerald)
```

### Typography
- **Headings:** Inter (700, 600) - Clean, modern sans-serif
- **Body:** Inter (400, 500) - Excellent readability
- **Monospace:** JetBrains Mono (for IDs, codes)
- **Scale:** 12px / 14px / 16px / 18px / 24px / 32px / 48px

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- Border radius: 8px (cards), 12px (buttons), 16px (modals), 9999px (pills)
- Card padding: 20px
- Page padding: 16px (mobile), 24px (tablet), 32px (desktop)

### Motion Philosophy
- **Transitions:** 200ms ease-out for micro-interactions, 300ms for page transitions
- **Entrance:** Fade + slide up (translateY: 8px → 0)
- **Loading:** Skeleton screens with subtle pulse animation
- **Feedback:** Scale 0.98 on button press, color transitions on hover
- **Modals:** Fade + scale from 0.95

### Visual Assets
- **Icons:** Lucide React (consistent 24px stroke-width: 1.5)
- **Avatars:** Circular with gradient fallback for missing photos
- **Illustrations:** Simple line illustrations for empty states
- **Charts:** Recharts library with theme colors

---

## 3. Layout & Structure

### Authentication Flow
```
Login → Role Selection (Student/Faculty/Parent)
         ↓
    [Login Form]
         ↓
    [3 Failed Attempts] → Lock Screen (30s countdown)
         ↓
    [Success] → Role Dashboard
         ↓
    [Forgot Password] → ID/Email Input → OTP Verification → New Password → Success
```

### Role-Based Navigation

#### Student Dashboard Structure
```
┌─────────────────────────────────────┐
│ Header: Profile + Notifications     │
├─────────────────────────────────────┤
│ Quick Stats Cards                   │
│ [Attendance] [Fees] [Notifications] │
├─────────────────────────────────────┤
│ Navigation Grid (2x3)               │
│ [Profile] [Attendance] [Marks]      │
│ [Timetable] [Fees] [Doubts]         │
│ [Permissions] [Campus]             │
├─────────────────────────────────────┤
│ Recent Notifications                │
└─────────────────────────────────────┘
```

#### Faculty Dashboard Structure
```
┌─────────────────────────────────────┐
│ Header: Profile + Notifications     │
├─────────────────────────────────────┤
│ My Classes Today                    │
├─────────────────────────────────────┤
│ Quick Actions                       │
│ [Mark Attendance] [Upload Marks]    │
│ [Send Notification] [View Doubts]   │
├─────────────────────────────────────┤
│ Pending Tasks                       │
│ [Doubt Responses] [Recent Activity] │
└─────────────────────────────────────┘
```

#### Parent Dashboard Structure
```
┌─────────────────────────────────────┐
│ Header: Profile + Notifications     │
├─────────────────────────────────────┤
│ Child Overview Card                 │
│ [Photo] [Name] [Current Status]     │
├─────────────────────────────────────┤
│ Quick Stats                         │
│ [Attendance %] [Fee Status] [Grade] │
├─────────────────────────────────────┤
│ Navigation                          │
│ [Child Profile] [Attendance]        │
│ [Marks] [Notifications]            │
└─────────────────────────────────────┘
```

### Responsive Strategy
- **Mobile (< 640px):** Single column, bottom navigation
- **Tablet (640px - 1024px):** 2-column grid, sidebar collapsible
- **Desktop (> 1024px):** 3-column layout, persistent sidebar

---

## 4. Features & Interactions

### 4.1 Authentication System

#### Login Page
- **Role Selection:** Three pill buttons (Student/Faculty/Parent) with icons
- **Form Fields:** 
  - Username (email or student/faculty ID)
  - Password (with show/hide toggle)
- **Remember Me:** Checkbox option
- **Submit Button:** Full-width, disabled during loading
- **Forgot Password Link:** Below form

#### Login Lock Mechanism
- Track failed attempts per session
- After 3 failures: Show overlay with 30-second countdown
- Countdown: "Please wait 30 seconds before trying again"
- Visual: Circular progress indicator with seconds
- Auto-refresh form when timer completes

#### Forgot Password Flow
1. **Step 1:** Enter ID or registered email
   - Validation: Check format, show error if not found
   - Success: "OTP sent to your registered email/phone"
   
2. **Step 2:** OTP Verification (6 digits)
   - Auto-focus next input on digit entry
   - 60-second resend timer
   - "Resend OTP" button appears after 30 seconds
   
3. **Step 3:** New Password
   - Password requirements displayed
   - Confirm password field
   - Password strength indicator
   
4. **Step 4:** Success
   - Checkmark animation
   - "Password updated successfully"
   - Redirect to login after 3 seconds

### 4.2 Student Dashboard

#### Profile Section
- **View Mode:** Photo, Name, Roll No, Department, Semester, Email, Phone, Address
- **Edit Mode:** 
  - Inline editing for phone, address
  - Photo upload with crop/preview
  - Save/Cancel buttons
- **States:** Loading skeleton, Error with retry, Empty (no photo uploaded)

#### Attendance Tracking
- **Semester Selector:** Dropdown (Sem 1 - Sem 8)
- **Subject List:** Cards showing subject name, total classes, attended, percentage
- **Color Coding:**
  - ≥75%: Green
  - 60-74%: Yellow
  - <60%: Red
- **Detail View:** Click to see month-wise breakdown
- **Empty State:** "No attendance records for this semester"

#### Marks View
- **Semester Selector:** Dropdown
- **Subject Cards:** Subject name, internal marks, external marks, total, grade
- **Grade Calculation:** A (≥90), B (80-89), C (70-79), D (60-69), F (<60)
- **Visual:** Progress bars showing percentage

#### Timetable
- **Week View:** Horizontal scrollable days (Mon-Sat)
- **Time Slots:** 8:00 AM - 5:00 PM in 1-hour blocks
- **Class Cards:** Subject name, Room, Faculty name
- **Today Highlight:** Current day highlighted
- **Empty Slot:** Grayed out

#### Fee Details
- **Status Cards:** Paid (green), Pending (amber/red)
- **Amount Details:** Total, Paid, Pending, Due Date
- **Payment History:** List with dates and amounts
- **Pay Now Button:** Links to payment gateway (mock)

#### Campus In/Out
- **Log List:** Date, Time, In/Out indicator, Location
- **Today's Summary:** Total time on campus
- **Map View:** Optional location markers

#### Permissions
- **Apply Form:**
  - Type (Leave/Permission)
  - Start Date, End Date
  - Reason (textarea)
  - Attachment (optional)
- **Status Tabs:** Pending, Approved, Rejected
- **Request Cards:** Date range, Status badge, Reason preview

#### Doubts
- **Ask Question Form:**
  - Subject dropdown
  - Title
  - Description (rich text)
  - Attachment (optional)
- **My Doubts List:** 
  - Status (Pending/Answered)
  - Faculty response with timestamp
  - Mark as resolved option

### 4.3 Faculty Dashboard

#### Mark Attendance
- **Class Selector:** Department + Semester + Subject
- **Student List:** 
  - Checkbox for present
  - Auto-fill all (Present/Absent buttons)
  - Date picker
  - Save attendance button
- **Validation:** Warn if >50% absent

#### Upload Marks
- **Class Selector:** Department + Semester + Subject + Exam Type
- **Student Marks Form:**
  - Student name, Roll No (read-only)
  - Mark inputs per component (Internal, Assignment, Exam)
  - Auto-calculate total
- **Bulk Upload:** CSV upload option
- **Preview & Confirm:** Before final save

#### Send Notifications
- **Form:**
  - Title
  - Message (textarea)
  - Target (All/Class-specific/Individual)
  - Priority (Normal/Urgent)
  - Attachment option
- **Preview:** How notification will appear
- **Schedule:** Send now or schedule

#### Manage Doubts
- **Pending Doubts List:** Student name, Subject, Question preview
- **Answer Form:**
  - Read question
  - Response textarea
  - Mark as resolved checkbox
- **History:** Previously answered doubts

### 4.4 Parent Dashboard

#### Child Overview
- **Profile Card:** Photo, Name, Roll No, Department
- **Current Status:** In campus / Out of campus (based on last log)
- **Quick Contact:** Call/Message buttons

#### Child Attendance
- **Overall Attendance:** Percentage with circular progress
- **Semester Selector**
- **Monthly Breakdown:** Bar chart visualization
- **Alert:** If attendance < 75%

#### Child Marks
- **Current Semester GPA**
- **Subject-wise Performance:** Cards with grades
- **Trend Graph:** Performance across semesters

#### Notifications
- **Fee Reminders:** Highlighted if pending
- **Academic Updates:** Attendance alerts, Result announcements
- **All Notifications:** Filtered view

### 4.5 Notification System

#### Types
- Attendance alerts
- Marks uploaded
- Fee reminders
- Announcements
- Doubt responses
- Permission status updates

#### Delivery
- In-app notifications (bell icon with badge)
- Optional push notifications (web)
- Notification center with filters

#### UI
- **Bell Icon:** Badge count for unread
- **Notification Panel:** Slide-in drawer
- **Notification Card:** Icon, Title, Message, Time, Read/Unread status

---

## 5. Component Inventory

### Core Components

#### Button
- **Variants:** Primary, Secondary, Outline, Ghost, Danger
- **Sizes:** Small (32px), Medium (40px), Large (48px)
- **States:** Default, Hover (darken 10%), Active (scale 0.98), Disabled (50% opacity), Loading (spinner)
- **Icons:** Optional leading/trailing icon

#### Input
- **Types:** Text, Email, Password (with toggle), Number, Date
- **States:** Default, Focus (ring), Error (red border + message), Disabled
- **Variants:** With label, Without label, With helper text
- **Password:** Show/hide toggle icon

#### Card
- **Variants:** Elevated (shadow), Outlined (border), Flat
- **Padding:** 16px, 20px, 24px
- **Interactive:** Hover lift effect (optional)

#### Modal
- **Sizes:** Small (400px), Medium (500px), Large (640px)
- **Header:** Title, Close button
- **Footer:** Action buttons
- **Animation:** Fade + scale

#### Dropdown/Select
- **Searchable option**
- **Multi-select option**
- **States:** Default, Open, Disabled

#### Badge/Pill
- **Variants:** Success, Warning, Error, Info, Neutral
- **Sizes:** Small, Medium

#### Avatar
- **Sizes:** 32px, 40px, 48px, 64px
- **Fallback:** Initials with gradient background
- **Status:** Online indicator dot

#### Skeleton
- **Types:** Text, Circle, Rectangle
- **Animation:** Pulse

#### Toast/Alert
- **Variants:** Success, Error, Warning, Info
- **Position:** Top-right
- **Auto-dismiss:** 5 seconds

#### Progress Bar
- **Variants:** Linear, Circular
- **With label**

#### Table
- **Sortable headers**
- **Pagination**
- **Row selection**
- **Responsive:** Horizontal scroll or card view on mobile

### Page Components

#### Sidebar
- Logo, Navigation items, User profile mini, Logout
- Collapsible on desktop, drawer on mobile

#### Header
- Page title, Breadcrumbs (optional), Search, Notifications, Profile menu

#### Bottom Navigation (Mobile)
- 4-5 main nav items with icons and labels
- Active state highlight

---

## 6. Technical Approach

### Frontend
- **Framework:** React 19 with Vite
- **Routing:** React Router v6
- **State Management:** React Context + useReducer
- **Styling:** CSS Modules with CSS Variables
- **Icons:** Lucide React
- **Charts:** Recharts
- **HTTP Client:** Fetch API with custom hooks
- **Form Handling:** Controlled components with validation

### Backend
- **Runtime:** Node.js with Express
- **Database:** SQLite (for demo) / PostgreSQL (production)
- **Authentication:** JWT tokens
- **Password Hashing:** bcrypt
- **OTP:** Random 6-digit generation with expiry
- **Email:** Nodemailer (mock for demo)

### Project Structure
```
mu-app/
├── src/
│   ├── components/
│   │   ├── common/          # Button, Input, Card, Modal, etc.
│   │   ├── layout/          # Sidebar, Header, BottomNav
│   │   └── features/        # Feature-specific components
│   ├── pages/
│   │   ├── auth/            # Login, ForgotPassword, OTP
│   │   ├── student/         # Student dashboard pages
│   │   ├── faculty/         # Faculty dashboard pages
│   │   └── parent/           # Parent dashboard pages
│   ├── context/             # AuthContext, ThemeContext
│   ├── hooks/               # useAuth, useFetch, useToast
│   ├── services/            # API calls
│   ├── utils/               # Helpers, constants
│   ├── styles/              # Global CSS, variables
│   └── App.jsx
├── server/
│   ├── index.js             # Express server
│   ├── routes/              # API routes
│   ├── controllers/         # Route handlers
│   ├── models/              # Data models
│   ├── middleware/          # Auth, validation
│   └── db/                  # Database setup
├── SPEC.md
└── README.md
```

---

## 7. Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT CHECK(role IN ('student', 'faculty', 'parent')) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);
```

### Students Table
```sql
CREATE TABLE students (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  roll_no TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  semester INTEGER CHECK(semester BETWEEN 1 AND 8),
  phone TEXT,
  address TEXT,
  photo_url TEXT,
  parent_id TEXT REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Faculty Table
```sql
CREATE TABLE faculty (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  employee_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  photo_url TEXT,
  subjects TEXT, -- JSON array of subject IDs
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Parents Table
```sql
CREATE TABLE parents (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  student_id TEXT REFERENCES students(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Attendance Table
```sql
CREATE TABLE attendance (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  subject_id TEXT REFERENCES subjects(id),
  date DATE NOT NULL,
  status TEXT CHECK(status IN ('present', 'absent', 'leave')),
  marked_by TEXT REFERENCES faculty(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Marks Table
```sql
CREATE TABLE marks (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  subject_id TEXT REFERENCES subjects(id),
  semester INTEGER NOT NULL,
  exam_type TEXT NOT NULL, -- 'internal', 'assignment', 'final'
  marks REAL NOT NULL,
  total_marks REAL NOT NULL,
  uploaded_by TEXT REFERENCES faculty(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Subjects Table
```sql
CREATE TABLE subjects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  semester INTEGER NOT NULL,
  faculty_id TEXT REFERENCES faculty(id)
);
```

### Timetable Table
```sql
CREATE TABLE timetable (
  id TEXT PRIMARY KEY,
  subject_id TEXT REFERENCES subjects(id),
  day_of_week INTEGER CHECK(day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room TEXT NOT NULL
);
```

### Fees Table
```sql
CREATE TABLE fees (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  amount REAL NOT NULL,
  paid_amount REAL DEFAULT 0,
  due_date DATE,
  status TEXT CHECK(status IN ('pending', 'partial', 'paid')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Permissions Table
```sql
CREATE TABLE permissions (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  type TEXT CHECK(type IN ('leave', 'permission')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status TEXT CHECK(status IN ('pending', 'approved', 'rejected')),
  reviewed_by TEXT REFERENCES faculty(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Doubts Table
```sql
CREATE TABLE doubts (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  subject_id TEXT REFERENCES subjects(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK(status IN ('pending', 'answered')),
  response TEXT,
  responded_by TEXT REFERENCES faculty(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  responded_at DATETIME
);
```

### Campus Logs Table
```sql
CREATE TABLE campus_logs (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id),
  type TEXT CHECK(type IN ('in', 'out')),
  location TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT DEFAULT 'normal',
  is_read BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### OTP Table
```sql
CREATE TABLE otp (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  otp TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Login Attempts Table
```sql
CREATE TABLE login_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  ip_address TEXT,
  attempt_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  successful BOOLEAN
);
```

---

## 8. API Endpoints

### Authentication
```
POST   /api/auth/login          - Login with role
POST   /api/auth/logout         - Logout
POST   /api/auth/forgot-password - Request OTP
POST   /api/auth/verify-otp     - Verify OTP
POST   /api/auth/reset-password - Reset password
GET    /api/auth/me             - Get current user
POST   /api/auth/refresh        - Refresh token
```

### Student
```
GET    /api/students/profile           - Get profile
PUT    /api/students/profile           - Update profile
POST   /api/students/profile/photo     - Upload photo
GET    /api/students/attendance         - Get attendance
GET    /api/students/attendance/:sem    - Get by semester
GET    /api/students/marks              - Get marks
GET    /api/students/marks/:sem         - Get by semester
GET    /api/students/timetable          - Get timetable
GET    /api/students/fees               - Get fee details
GET    /api/students/campus-logs        - Get campus logs
POST   /api/students/permissions        - Apply permission
GET    /api/students/permissions        - Get permissions
POST   /api/students/doubts             - Raise doubt
GET    /api/students/doubts             - Get doubts
```

### Faculty
```
GET    /api/faculty/profile            - Get profile
PUT    /api/faculty/profile            - Update profile
GET    /api/faculty/students           - Get assigned students
GET    /api/faculty/subjects           - Get subjects
POST   /api/faculty/attendance          - Mark attendance
GET    /api/faculty/attendance/:class   - Get attendance records
POST   /api/faculty/marks              - Upload marks
GET    /api/faculty/marks/:class        - Get marks records
POST   /api/faculty/notifications      - Send notification
GET    /api/faculty/doubts             - Get pending doubts
POST   /api/faculty/doubts/:id/respond - Respond to doubt
```

### Parent
```
GET    /api/parent/profile             - Get profile
GET    /api/parent/student             - Get child's details
GET    /api/parent/attendance           - Get child's attendance
GET    /api/parent/marks                - Get child's marks
GET    /api/parent/notifications       - Get notifications
```

### Notifications
```
GET    /api/notifications              - Get notifications
PUT    /api/notifications/:id/read     - Mark as read
PUT    /api/notifications/read-all     - Mark all as read
GET    /api/notifications/unread-count - Get unread count
```

---

## 9. UI Wireframes (ASCII)

### Login Page
```
┌─────────────────────────────┐
│                             │
│         [MU Logo]           │
│          MU App             │
│                             │
│    ┌─────┐ ┌─────┐ ┌─────┐  │
│    │ 🎓  │ │ 👨‍🏫 │ │ 👨‍👩‍👧 │  │
│    │Student│ │Faculty│ │Parent│ │
│    └─────┘ └─────┘ └─────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Username or Email     │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Password          👁️ │  │
│  └───────────────────────┘  │
│                             │
│  [    Sign In    ]          │
│                             │
│   Forgot Password?          │
│                             │
└─────────────────────────────┘
```

### Student Dashboard
```
┌─────────────────────────────┐
│ ≡  Student Dashboard    🔔 │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │  👤 John Doe            │ │
│ │  Roll No: CS2021001    │ │
│ │  Semester: 5           │ │
│ └─────────────────────────┘ │
│                             │
│ ┌────────┐ ┌────────┐       │
│ │  85%   │ │  ₹2500 │       │
│ │Attend. │ │ Pending│       │
│ └────────┘ └────────┘       │
│                             │
│ ┌──────┐ ┌──────┐ ┌──────┐ │
│ │ 📊  │ │ 📝  │ │ 📅  │ │
│ │Marks │ │Attnd │ │Time  │ │
│ └──────┘ └──────┘ └──────┘ │
│ ┌──────┐ ┌──────┐ ┌──────┐ │
│ │ 💰  │ │ ❓  │ │ 📝  │ │
│ │Fees  │ │Doubt │ │Perms │ │
│ └──────┘ └──────┘ └──────┘ │
│                             │
│ Recent Notifications        │
│ ┌─────────────────────────┐ │
│ │ 📢 Mid-sem exam sched. │ │
│ │ 🔔 Fee due in 5 days   │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ 🏠  📊  📅  🔔  👤        │
└─────────────────────────────┘
```

---

## 10. Extra Features

### Dark Mode
- Toggle in header
- Stored in localStorage
- Smooth transition between themes
- All components have dark variants

### Search
- Global search in header
- Search across students, subjects, notifications
- Recent searches history

### Analytics Dashboard
- Attendance percentage with trend
- Performance graphs across semesters
- Fee payment timeline
- Activity heatmap
