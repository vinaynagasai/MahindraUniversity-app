# MU App - University Management Application

A comprehensive mobile-first university management platform with role-based access for Students, Faculty, and Parents.

## Features

### Authentication System
- Role-based login (Student / Faculty / Parent)
- Login lock after 3 failed attempts (30-second countdown)
- Password recovery with OTP verification
- JWT token authentication

### Student Dashboard
- Profile management with photo upload
- Semester-wise attendance tracking
- Subject-wise marks view
- Weekly timetable
- Fee details and payment history
- Campus in/out logs
- Leave/permission applications
- Academic doubt raising

### Faculty Dashboard
- Mark student attendance
- Upload student marks
- Send notifications/announcements
- Manage student doubts

### Parent Dashboard
- View child's attendance
- View child's academic performance
- Fee notifications
- Receive important announcements

### Extra Features
- Dark mode toggle
- Responsive design (mobile-first)
- Real-time notifications
- Analytics dashboards

## Tech Stack

- **Frontend:** React 19, React Router v7, Vite
- **Styling:** CSS Modules with CSS Variables
- **Icons:** Lucide React
- **Charts:** Recharts
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (schema provided)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start the frontend development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Backend (Optional - for full functionality)

```bash
# Start the backend server
npm run server
```

The API will be available at `http://localhost:5000`

## Environment Variables

Create a `.env` file from `.env.example`.

```bash
cp .env.example .env
```

Variables used by the app:

- `NODE_ENV` - `development` or `production`
- `PORT` - Express server port
- `JWT_SECRET` - JWT signing secret for the backend
- `CORS_ORIGIN` - allowed frontend origin(s), comma-separated if needed
- `VITE_API_BASE_URL` - frontend API base URL
- `VITE_DEV_API_TARGET` - local Vite proxy target

## Docker

Build and run locally with Docker:

```bash
docker build -t mu-app .
docker run --env-file .env -p 5000:5000 mu-app
```

Or with Docker Compose:

```bash
docker compose up --build
```

The container serves both the API and the built frontend on port `5000`.

## Deployment

This project is set up to deploy well as a single Dockerized service.

### Railway

1. Push the repo to GitHub
2. Create a new Railway project from the repo
3. Railway will detect the `Dockerfile`
4. Add environment variables from `.env.example`
5. Deploy

Health check:

- `/api/health`

### Render

1. Create a new `Web Service`
2. Connect the GitHub repo
3. Choose `Docker` as the runtime
4. Set environment variables from `.env.example`
5. Deploy

Health check:

- `/api/health`

## Demo Credentials

| Role    | Username   | Password    |
|---------|------------|-------------|
| Student | CS2021001  | student123  |
| Faculty | EMP001     | faculty123  |
| Parent  | PAR001     | parent123   |

## Project Structure

```
mu-app/
├── src/
│   ├── components/
│   │   ├── common/       # Reusable UI components
│   │   ├── layout/       # Sidebar, Header, Layout
│   │   └── features/     # Feature-specific components
│   ├── pages/
│   │   ├── auth/         # Login, ForgotPassword
│   │   ├── student/      # Student dashboard pages
│   │   ├── faculty/      # Faculty dashboard pages
│   │   └── parent/       # Parent dashboard pages
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service functions
│   ├── utils/            # Helpers and constants
│   └── styles/           # Global CSS and variables
├── server/
│   ├── routes/           # Express API routes
│   ├── controllers/      # Route handlers
│   ├── models/           # Data models
│   └── db/               # Database schema
├── SPEC.md               # Design specification
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Request OTP
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password

### Student
- `GET /api/students/profile` - Get profile
- `GET /api/students/attendance` - Get attendance
- `GET /api/students/marks` - Get marks
- `GET /api/students/fees` - Get fee details
- `POST /api/students/permissions` - Apply for permission
- `POST /api/students/doubts` - Raise doubt

### Faculty
- `POST /api/faculty/attendance` - Mark attendance
- `POST /api/faculty/marks` - Upload marks
- `POST /api/faculty/notifications` - Send notification
- `GET /api/faculty/doubts` - Get pending doubts

### Parent
- `GET /api/parent/student` - Get child info
- `GET /api/parent/attendance` - Get child's attendance
- `GET /api/parent/marks` - Get child's marks

## License

MIT License
