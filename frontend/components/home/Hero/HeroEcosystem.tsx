import React, { useState } from 'react';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styles from './Hero.module.css';

interface EcosystemNode {
  id: string;
  step: string;
  title: string;
  role: string;
  icon: React.ReactNode;
  detail: string;
  badge: string;
}

const ECOSYSTEM_FLOW: EcosystemNode[] = [
  {
    id: 'institution',
    step: '01',
    title: 'Institution',
    role: 'Campuses & Organizations',
    icon: <SchoolOutlinedIcon />,
    detail: 'Provisions student cohorts, enables campus counselors, and initiates aggregate health tracking.',
    badge: 'Enterprise Hub',
  },
  {
    id: 'coach',
    step: '02',
    title: 'Teacher / Life Coach',
    role: 'Frontline Guidance & Mentorship',
    icon: <SelfImprovementOutlinedIcon />,
    detail: 'Monitors engagement, assists assessments, and operates within certified non-clinical boundaries.',
    badge: 'Certified Mentorship',
  },
  {
    id: 'student',
    step: '03',
    title: 'Student / Patient',
    role: 'Central Wellness Journey',
    icon: <PersonOutlineIcon />,
    detail: 'Completes baseline evaluations, reflects through journals, and earns module progress badges.',
    badge: 'Active Journeyer',
  },
  {
    id: 'assessment',
    step: '04',
    title: 'Assessment',
    role: 'Standardized Questionnaires',
    icon: <AssignmentTurnedInOutlinedIcon />,
    detail: 'Measures behavioral patterns, frustration indicators, and stress triggers with crisis filters.',
    badge: 'Evidence-Informed',
  },
  {
    id: 'ai-review',
    step: '05',
    title: 'AI-Assisted Review',
    role: 'Clinical Medical Scribe Engine',
    icon: <SmartToyOutlinedIcon />,
    detail: 'Synthesizes responses into pre-formatted SOAP clinical templates without making diagnoses.',
    badge: 'Assistive Tech',
  },
  {
    id: 'provider',
    step: '06',
    title: 'Provider / Therapist',
    role: 'Qualified Clinical Oversight',
    icon: <HealthAndSafetyOutlinedIcon />,
    detail: 'Reviews drafts, validates risk stratification, signs off, and directs appropriate care pathways.',
    badge: 'Human Clinical Gate',
  },
  {
    id: 'curriculum',
    step: '07',
    title: '16-Week Curriculum / Therapy',
    role: 'Personalized Pathway',
    icon: <AutoStoriesOutlinedIcon />,
    detail: 'Continuous weekly modular learning, behavioral habit restructuring, or telehealth psychotherapy.',
    badge: 'Ongoing Growth',
  },
];

export const HeroEcosystem: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('ai-review');

  return (
    <div className={styles.ecosystemCard}>
      <div className={styles.ecosystemHeader}>
        <div className={styles.ecosystemHeaderLeft}>
          <span className={styles.ecosystemPulseBadge}>
            <span className={styles.pulseDot} />
            WTF Unified Workflow Engine
          </span>
          <h3 className={styles.ecosystemTitle}>The Connected Care Ecosystem</h3>
        </div>
        <span className={styles.ecosystemStatusNote}>
          7 Connected Entities • 1 Integrated Loop
        </span>
      </div>

      <div className={styles.flowList}>
        {ECOSYSTEM_FLOW.map((node, index) => {
          const isActive = activeNode === node.id;

          return (
            <React.Fragment key={node.id}>
              <div
                className={`${styles.flowNode} ${isActive ? styles.flowNodeActive : ''}`}
                onClick={() => setActiveNode(node.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveNode(node.id);
                  }
                }}
              >
                <div className={styles.nodeLeft}>
                  <span className={styles.nodeStep}>{node.step}</span>
                  <div className={styles.nodeIconWrap}>{node.icon}</div>
                  <div className={styles.nodeMeta}>
                    <span className={styles.nodeTitle}>{node.title}</span>
                    <span className={styles.nodeRole}>{node.role}</span>
                  </div>
                </div>

                <div className={styles.nodeRight}>
                  <span className={styles.nodeBadge}>{node.badge}</span>
                  {isActive && (
                    <span className={styles.nodeActiveIcon}>
                      <CheckCircleOutlineIcon />
                    </span>
                  )}
                </div>

                {isActive && (
                  <div className={styles.nodeExpandedDetail}>
                    <p>{node.detail}</p>
                  </div>
                )}
              </div>

              {index < ECOSYSTEM_FLOW.length - 1 && (
                <div className={styles.flowConnector}>
                  <ArrowDownwardIcon className={styles.connectorArrow} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className={styles.ecosystemFooter}>
        <div className={styles.guaranteePill}>
          <span className={styles.shieldIcon}>🛡️</span>
          <span>Zero gaps in care: From student assessment to supervising clinician sign-off</span>
        </div>
      </div>
    </div>
  );
};
