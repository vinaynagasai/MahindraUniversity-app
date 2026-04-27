import { useState } from 'react';
import { classNames } from '../../utils/helpers';
import styles from './Select.module.css';
import { ChevronDown } from 'lucide-react';

export const Select = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  error,
  disabled = false,
  required = false,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (option) => {
    onChange({ target: { value: option.value } });
    setIsOpen(false);
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.container}>
        <button
          type="button"
          className={classNames(styles.trigger, error && styles.hasError)}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          {...props}
        >
          <span className={selectedOption ? styles.value : styles.placeholder}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            size={18}
            className={classNames(styles.chevron, isOpen && styles.open)}
          />
        </button>
        {isOpen && (
          <div className={styles.dropdown}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={classNames(
                  styles.option,
                  option.value === value && styles.selected
                )}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
