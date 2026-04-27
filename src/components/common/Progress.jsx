import { classNames } from '../../utils/helpers';
import styles from './Progress.module.css';

export const Progress = ({
  value = 0,
  max = 100,
  size = 'medium',
  variant = 'primary',
  showLabel = false,
  label,
  className
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={classNames(styles.wrapper, className)}>
      {showLabel && (
        <div className={styles.labelRow}>
          <span className={styles.label}>{label || `${Math.round(percentage)}%`}</span>
        </div>
      )}
      <div className={classNames(styles.track, styles[size])}>
        <div
          className={classNames(styles.fill, styles[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const CircularProgress = ({
  value = 0,
  max = 100,
  size = 80,
  strokeWidth = 8,
  variant = 'primary',
  showLabel = true,
  className
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    primary: 'var(--primary)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    error: 'var(--error)'
  };

  return (
    <div className={classNames(styles.circular, className)} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className={styles.circleTrack}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.circleFill}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ stroke: colors[variant] }}
        />
      </svg>
      {showLabel && (
        <span className={styles.circleLabel}>{Math.round(percentage)}%</span>
      )}
    </div>
  );
};
