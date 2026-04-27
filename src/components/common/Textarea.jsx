import { classNames } from '../../utils/helpers';
import styles from './Textarea.module.css';

export const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  rows = 4,
  className,
  ...props
}) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classNames(styles.textarea, error && styles.hasError)}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
