import React from 'react';
import styles from './IconBox.module.css';

export interface IconBoxProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'subtle' | 'surface' | 'white' | 'warning' | 'danger';
  children: React.ReactNode;
  className?: string;
}

export const IconBox: React.FC<IconBoxProps> = ({
  size = 'md',
  variant = 'subtle',
  children,
  className = '',
}) => {
  const classNames = [
    styles.iconBox,
    styles[size],
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
};
