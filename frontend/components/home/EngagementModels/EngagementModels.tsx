import React from 'react';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { Button } from '@/components/common/Button/Button';
import { ENGAGEMENT_MODELS } from '@/data/engagementModels';
import styles from './EngagementModels.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  CorporateFareOutlined: <CorporateFareOutlinedIcon />,
  WorkspacePremiumOutlined: <WorkspacePremiumOutlinedIcon />,
  PsychologyAltOutlined: <PsychologyAltOutlinedIcon />,
};

export interface EngagementModelsProps {
  onSelectModel?: (modelId: string) => void;
}

export const EngagementModels: React.FC<EngagementModelsProps> = ({ onSelectModel }) => {
  return (
    <section className={`sectionPadding ${styles.engagementSection}`} id="engagement-models">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Tailored Entry Points"
          badgeVariant="primary"
          title="Three Ways Users Enter the WTF Ecosystem"
          subtitle="Whether onboarding an entire collegiate cohort, certifying an independent life coach, or enrolling as a direct student, WTF provides structured pathways with built-in clinical guardrails."
          align="center"
        />

        {/* 3 Columns Grid */}
        <div className={styles.modelsGrid}>
          {ENGAGEMENT_MODELS.map((model) => (
            <div key={model.id} className={styles.modelCard}>
              {/* Card Header */}
              <div className={styles.cardTop}>
                <div className={styles.numberBadge}>{model.number}</div>
                <span className={styles.audienceBadge}>{model.badge}</span>
              </div>

              <div className={styles.titleArea}>
                <div className={styles.iconCircle}>
                  {ICON_MAP[model.iconName] || <CorporateFareOutlinedIcon />}
                </div>
                <h3 className={styles.modelTitle}>{model.title}</h3>
                <p className={styles.modelSubtitle}>{model.subtitle}</p>
              </div>

              {/* Target Audience Tags */}
              <div className={styles.targetSection}>
                <span className={styles.targetLabel}>Built For:</span>
                <div className={styles.tagsWrap}>
                  {model.targetAudience.map((target) => (
                    <span key={target} className={styles.tag}>
                      {target}
                    </span>
                  ))}
                </div>
              </div>

              {/* Workflow Stepper */}
              <div className={styles.workflowBox}>
                <span className={styles.workflowLabel}>End-to-End Workflow:</span>
                <div className={styles.stepsTimeline}>
                  {model.workflowSteps.map((step, idx) => (
                    <div key={idx} className={styles.stepRow}>
                      <span className={styles.stepNum}>{idx + 1}</span>
                      <span className={styles.stepText}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scope & Safety Statement */}
              {model.scopeStatement && (
                <div className={styles.scopeBox}>
                  <ShieldOutlinedIcon className={styles.scopeIcon} />
                  <p className={styles.scopeText}>{model.scopeStatement}</p>
                </div>
              )}

              {/* Benefits Checklist */}
              <div className={styles.benefitsSection}>
                <span className={styles.benefitsHeading}>Key Benefits:</span>
                <ul className={styles.benefitsList}>
                  {model.benefits.map((benefit, i) => (
                    <li key={i} className={styles.benefitItem}>
                      <CheckCircleOutlineIcon className={styles.checkIcon} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card CTA */}
              <div className={styles.cardAction}>
                <Button
                  variant="primary"
                  fullWidth
                  rightIcon={<ArrowForwardOutlinedIcon />}
                  onClick={() => onSelectModel?.(model.id)}
                >
                  {model.ctaLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
