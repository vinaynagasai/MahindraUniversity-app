import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, User, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../../components/common';
import { ROLES } from '../../utils/constants';
import styles from './Login.module.css';

const roleOptions = [
  { value: ROLES.STUDENT, label: 'Student', icon: GraduationCap },
  { value: ROLES.FACULTY, label: 'Faculty', icon: Users },
  { value: ROLES.PARENT, label: 'Parent', icon: User }
];

const demoUsers = {
  student: { username: 'CS2021001', password: 'student123', name: 'John Doe', id: 'CS2021001' },
  faculty: { username: 'EMP001', password: 'faculty123', name: 'Dr. Sarah Smith', id: 'EMP001' },
  parent: { username: 'PAR001', password: 'parent123', name: 'Michael Doe', id: 'PAR001' }
};

export const Login = () => {
  const [selectedRole, setSelectedRole] = useState(ROLES.STUDENT);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  const { login, loginFailure, failedAttempts, lockAccount, unlockAccount, lockedUntil, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const lockTime = lockedUntil ? Math.max(0, Math.ceil((lockedUntil - currentTime) / 1000)) : 0;

  useEffect(() => {
    if (isAuthenticated) {
      const role = JSON.parse(localStorage.getItem('mu_user'))?.role;
      navigate(`/${role}`, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (failedAttempts >= 3 && !lockedUntil) {
      lockAccount(Date.now() + 30000);
    }
  }, [failedAttempts, lockAccount, lockedUntil]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (lockedUntil && currentTime >= lockedUntil) {
      unlockAccount();
    }
  }, [currentTime, lockedUntil, unlockAccount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (lockTime > 0) {
      setError(`Please wait ${lockTime} seconds before trying again`);
      return;
    }

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const demoUser = demoUsers[selectedRole];
    
    if (username === demoUser.username && password === demoUser.password) {
      const user = {
        id: demoUser.id,
        name: demoUser.name,
        role: selectedRole,
        email: `${username.toLowerCase()}@mu.edu`
      };
      login(user);
      navigate(`/${selectedRole}`, { replace: true });
    } else {
      loginFailure();
      const attemptsLeft = 3 - (failedAttempts + 1);
      if (attemptsLeft > 0) {
        setError(`Invalid credentials. ${attemptsLeft} attempt(s) remaining.`);
      } else {
        setError('Too many failed attempts. Please wait 30 seconds.');
      }
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>MU</div>
          <h1 className={styles.logoText}>MU App</h1>
          <p className={styles.tagline}>Your University, At Your Fingertips</p>
        </div>

        <div className={styles.roleSelector}>
          {roleOptions.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.value}
                type="button"
                className={`${styles.roleButton} ${selectedRole === role.value ? styles.active : ''}`}
                onClick={() => setSelectedRole(role.value)}
              >
                <Icon size={20} />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Username"
            placeholder="Enter your ID or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading || lockTime > 0}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading || lockTime > 0}
          />

          {error && <div className={styles.error}>{error}</div>}

          {lockTime > 0 && (
            <div className={styles.lockTimer}>
              <div className={styles.lockIcon}>
                <Loader2 size={24} className={styles.spin} />
              </div>
              <div className={styles.lockText}>
                <span>Account temporarily locked</span>
                <span className={styles.countdown}>{lockTime}s</span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${((30 - lockTime) / 30) * 100}%` }}
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            size="large"
            loading={loading}
            disabled={lockTime > 0}
          >
            Sign In
          </Button>

          <div className={styles.forgot}>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>

        <div className={styles.demo}>
          <p>Demo Credentials</p>
          <div className={styles.demoCredentials}>
            <span>ID: {demoUsers[selectedRole].username}</span>
            <span>Password: {demoUsers[selectedRole].password}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
