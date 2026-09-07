import React from 'react';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import styles from './Stepper.module.css';

export interface StepItem {
  id: string | number;
  label: string;
  sublabel?: string;
}

export interface StepperProps {
  steps: StepItem[];
  activeStep: number; // 0-indexed
  onStepClick?: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  orientation = 'horizontal',
  className = '',
}) => {
  return (
    <div className={`${styles.stepperContainer} ${styles[orientation]} ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;
        const isClickable = Boolean(onStepClick);

        return (
          <div
            key={step.id}
            className={`${styles.stepItem} ${isActive ? styles.active : ''} ${
              isCompleted ? styles.completed : ''
            } ${isClickable ? styles.clickable : ''}`}
            onClick={() => isClickable && onStepClick?.(index)}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onStepClick?.(index);
              }
            }}
          >
            <div className={styles.indicatorArea}>
              <div className={styles.indicator}>
                {isCompleted ? (
                  <CheckCircleOutlinedIcon className={styles.completedIcon} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && <div className={styles.line} />}
            </div>
            <div className={styles.labelArea}>
              <span className={styles.stepLabel}>{step.label}</span>
              {step.sublabel && <span className={styles.stepSublabel}>{step.sublabel}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
