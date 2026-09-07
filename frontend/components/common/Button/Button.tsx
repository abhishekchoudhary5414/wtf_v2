import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  asLink?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  asLink = false,
  href,
  className = '',
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (asLink && href) {
    return (
      <a href={href} className={classNames}>
        {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        <span className={styles.content}>{children}</span>
        {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button className={classNames} {...props}>
      {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
      <span className={styles.content}>{children}</span>
      {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
    </button>
  );
};
