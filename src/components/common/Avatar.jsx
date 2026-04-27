import { getInitials } from '../../utils/helpers';
import { classNames } from '../../utils/helpers';
import styles from './Avatar.module.css';

export const Avatar = ({
  name,
  src,
  size = 'medium',
  status,
  className,
  ...props
}) => {
  const initials = getInitials(name);
  const sizes = { small: 32, medium: 40, large: 48, xlarge: 64 };

  return (
    <div
      className={classNames(styles.avatar, styles[size], className)}
      style={{ width: sizes[size], height: sizes[size] }}
      {...props}
    >
      {src ? (
        <img src={src} alt={name} className={styles.image} />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
      {status && <span className={classNames(styles.status, styles[status])} />}
    </div>
  );
};
