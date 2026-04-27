import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AppDataProvider } from './context/AppDataContext';
import { DashboardLayout } from './components/layout';
import { ToastContainer } from './components/common';
import { Login, ForgotPassword } from './pages/auth';
import {
  StudentDashboard,
  StudentProfile,
  StudentAttendance,
  StudentMarks,
  StudentTimetable,
  StudentFees,
  StudentDoubts,
  StudentPermissions,
  StudentCampus,
  QRScanner,
  StudentNotifications
} from './pages/student';
import {
  FacultyDashboard,
  FacultyProfile,
  FacultyMarkAttendance,
  FacultyUploadMarks,
  FacultyNotifications,
  FacultyManageDoubts,
  FacultyPermissions
} from './pages/faculty';
import {
  ParentDashboard,
  ParentProfile,
  ParentChildProfile,
  ParentAttendance,
  ParentMarks,
  ParentNotifications
} from './pages/parent';
import './styles/global.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--background)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={`/${user?.role}`} replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student" replace />} />

        {/* Student Routes */}
        <Route path="student" element={<StudentDashboard />} />
        <Route path="student/profile" element={<StudentProfile />} />
        <Route path="student/attendance" element={<StudentAttendance />} />
        <Route path="student/marks" element={<StudentMarks />} />
        <Route path="student/timetable" element={<StudentTimetable />} />
        <Route path="student/fees" element={<StudentFees />} />
        <Route path="student/doubts" element={<StudentDoubts />} />
        <Route path="student/permissions" element={<StudentPermissions />} />
        <Route path="student/campus" element={<StudentCampus />} />
        <Route path="student/qr-scan" element={<QRScanner />} />
        <Route path="student/notifications" element={<StudentNotifications />} />

        {/* Faculty Routes */}
        <Route path="faculty" element={<FacultyDashboard />} />
        <Route path="faculty/profile" element={<FacultyProfile />} />
        <Route path="faculty/attendance" element={<FacultyMarkAttendance />} />
        <Route path="faculty/marks" element={<FacultyUploadMarks />} />
        <Route path="faculty/notifications" element={<FacultyNotifications />} />
        <Route path="faculty/doubts" element={<FacultyManageDoubts />} />
        <Route path="faculty/permissions" element={<FacultyPermissions />} />

        {/* Parent Routes */}
        <Route path="parent" element={<ParentDashboard />} />
        <Route path="parent/profile" element={<ParentProfile />} />
        <Route path="parent/child" element={<ParentChildProfile />} />
        <Route path="parent/attendance" element={<ParentAttendance />} />
        <Route path="parent/marks" element={<ParentMarks />} />
        <Route path="parent/notifications" element={<ParentNotifications />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AppDataProvider>
              <AppRoutes />
              <ToastContainer />
            </AppDataProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
