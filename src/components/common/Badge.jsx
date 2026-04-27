import { classNames } from '../../utils/helpers';
import styles from './Badge.module.css';

export const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  className,
  ...props
}) => {
  return (
    <span
      className={classNames(
        styles.badge,
        styles[variant],
        styles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
