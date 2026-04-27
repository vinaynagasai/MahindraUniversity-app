import styles from './Skeleton.module.css';
import { classNames } from '../../utils/helpers';

export const Skeleton = ({
  variant = 'text',
  width,
  height,
  className
}) => {
  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  return (
    <div
      className={classNames(styles.skeleton, styles[variant], className)}
      style={style}
    />
  );
};

export const CardSkeleton = () => (
  <div className={styles.cardSkeleton}>
    <Skeleton variant="circle" width={48} height={48} />
    <div className={styles.cardSkeletonContent}>
      <Skeleton width="60%" height={16} />
      <Skeleton width="40%" height={14} />
    </div>
  </div>
);

export const ListSkeleton = ({ count = 3 }) => (
  <div className={styles.listSkeleton}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={styles.listItem}>
        <Skeleton variant="circle" width={40} height={40} />
        <div className={styles.listItemContent}>
          <Skeleton width="50%" height={16} />
          <Skeleton width="30%" height={14} />
        </div>
      </div>
    ))}
  </div>
);
