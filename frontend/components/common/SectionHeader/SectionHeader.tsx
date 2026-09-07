import React from 'react';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'primary' | 'subtle' | 'warning' | 'danger';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  maxWidth?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'subtle',
  title,
  subtitle,
  align = 'center',
  maxWidth,
  className = '',
}) => {
  const containerClasses = [
    styles.headerContainer,
    styles[align],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} style={maxWidth ? { maxWidth } : undefined}>
      {badge && (
        <div className={`${styles.badge} ${styles[`badge_${badgeVariant}`]}`}>
          {badge}
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};
