import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'subtle';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'subtle',
  size = 'md',
  children,
  icon,
  className = '',
}) => {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
};
