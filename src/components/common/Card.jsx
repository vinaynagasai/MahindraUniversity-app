import { classNames } from '../../utils/helpers';
import styles from './Card.module.css';

export const Card = ({
  children,
  variant = 'elevated',
  padding = 'medium',
  interactive = false,
  className,
  onClick,
  ...props
}) => {
  return (
    <div
      className={classNames(
        styles.card,
        styles[variant],
        styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
        interactive && styles.interactive,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }) => (
  <div className={classNames(styles.header, className)}>{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h3 className={classNames(styles.title, className)}>{children}</h3>
);

export const CardContent = ({ children, className }) => (
  <div className={classNames(styles.content, className)}>{children}</div>
);

export const CardFooter = ({ children, className }) => (
  <div className={classNames(styles.footer, className)}>{children}</div>
);
