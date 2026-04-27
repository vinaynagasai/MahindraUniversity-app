import { classNames } from '../../utils/helpers';
import styles from './Checkbox.module.css';

export const Checkbox = ({ checked, onChange, label, disabled = false }) => {
  return (
    <label className={classNames(styles.wrapper, disabled && styles.disabled)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.input}
      />
      <span className={classNames(styles.checkbox, checked && styles.checked)}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
