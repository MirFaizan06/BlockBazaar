import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.btn,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          loading && styles.loading,
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        <span className={loading ? styles.hiddenText : undefined}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
