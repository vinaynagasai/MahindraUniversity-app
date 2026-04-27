import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { Button, Input } from '../../components/common';
import styles from './ForgotPassword.module.css';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('email');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [passwordError, setPasswordError] = useState('');

  const handleSendOTP = async () => {
    if (!identifier) {
      setError('Please enter your ID or email');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep(2);
    setTimer(60);
  };

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep(3);
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setOtp(['', '', '', '', '', '']);
    setTimer(60);
  };

  const validatePassword = (pwd) => {
    if (pwd.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(pwd)) return 'Password must contain an uppercase letter';
    if (!/[a-z]/.test(pwd)) return 'Password must contain a lowercase letter';
    if (!/[0-9]/.test(pwd)) return 'Password must contain a number';
    return '';
  };

  const handleResetPassword = async () => {
    const pwdError = validatePassword(newPassword);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep(4);
    setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button className={styles.back} onClick={() => navigate('/login')}>
          <ArrowLeft size={20} />
          <span>Back to Login</span>
        </button>

        {step === 1 && (
          <>
            <div className={styles.header}>
              <h1>Forgot Password</h1>
              <p>Enter your ID or registered email to receive a verification code</p>
            </div>

            <div className={styles.methodSelector}>
              <button
                className={`${styles.methodButton} ${method === 'email' ? styles.active : ''}`}
                onClick={() => setMethod('email')}
              >
                <Mail size={20} />
                <span>Email</span>
              </button>
              <button
                className={`${styles.methodButton} ${method === 'phone' ? styles.active : ''}`}
                onClick={() => setMethod('phone')}
              >
                <Phone size={20} />
                <span>Phone</span>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSendOTP(); }} className={styles.form}>
              <Input
                label={method === 'email' ? 'Email Address' : 'Phone Number'}
                placeholder={method === 'email' ? 'john@example.com' : '+1 234 567 8900'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                type={method === 'phone' ? 'tel' : 'email'}
              />

              {error && <div className={styles.error}>{error}</div>}

              <Button type="submit" fullWidth size="large" loading={loading}>
                Send Verification Code
              </Button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <div className={styles.header}>
              <h1>Verify OTP</h1>
              <p>Enter the 6-digit code sent to your {method}</p>
            </div>

            <div className={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  className={styles.otpInput}
                />
              ))}
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <Button
              onClick={handleVerifyOTP}
              fullWidth
              size="large"
              loading={loading}
              disabled={otp.join('').length !== 6}
            >
              Verify OTP
            </Button>

            <div className={styles.resend}>
              {timer > 0 ? (
                <span>Resend code in {timer}s</span>
              ) : (
                <button onClick={handleResendOTP} disabled={loading}>
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className={styles.header}>
              <h1>Set New Password</h1>
              <p>Create a strong password for your account</p>
            </div>

            <div className={styles.passwordRequirements}>
              <p>Password must contain:</p>
              <ul>
                <li className={newPassword.length >= 6 ? styles.valid : ''}>At least 6 characters</li>
                <li className={/[A-Z]/.test(newPassword) ? styles.valid : ''}>An uppercase letter</li>
                <li className={/[a-z]/.test(newPassword) ? styles.valid : ''}>A lowercase letter</li>
                <li className={/[0-9]/.test(newPassword) ? styles.valid : ''}>A number</li>
              </ul>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }} className={styles.form}>
              <Input
                type="password"
                label="New Password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {passwordError && <div className={styles.error}>{passwordError}</div>}

              <Button type="submit" fullWidth size="large" loading={loading}>
                Reset Password
              </Button>
            </form>
          </>
        )}

        {step === 4 && (
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1>Password Reset Successful</h1>
            <p>Your password has been updated. Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  );
};
