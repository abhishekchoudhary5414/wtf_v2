'use client';

import React, { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import styles from './UserJourney.module.css';

interface JourneyNode {
  step: string;
  title: string;
  category: string;
  actor: string;
  dataPayload: string;
  verificationRule: string;
}

const JOURNEY_NODES: JourneyNode[] = [
  {
    step: '01',
    title: 'ONBOARD',
    category: 'Intake Phase',
    actor: 'Institution, Coach, or Direct Student',
    dataPayload: 'Identity verification, consent documentation, baseline demographic profile initialized.',
    verificationRule: 'Platform confidentiality policy and safety terms formally acknowledged.',
  },
  {
    step: '02',
    title: 'ASSESS',
    category: 'Baseline Phase',
    actor: 'Student with Life Coach Support',
    dataPayload: 'Behavioral questionnaire, trigger inventory, and emotional symptom scale responses.',
    verificationRule: 'Sub-second scan for acute crisis indicators with emergency 988 redirection.',
  },
  {
    step: '03',
    title: 'AI-ASSISTED PROCESSING',
    category: 'Documentation Intelligence',
    actor: 'AI Medical Scribe Engine',
    dataPayload: 'Categorized symptom clusters, subjective/objective summaries, pre-formatted clinical SOAP draft.',
    verificationRule: 'Zero autonomous diagnosis; output strictly routed to licensed clinician review queue.',
  },
  {
    step: '04',
    title: 'PROVIDER REVIEW',
    category: 'Human Clinical Gate',
    actor: 'WTF Licensed Provider / Therapist',
    dataPayload: 'Validated clinical evaluation, verified risk tier, formal provider signature.',
    verificationRule: 'Mandatory human-in-the-loop review ensures 100% clinical compliance.',
  },
  {
    step: '05',
    title: 'PERSONALIZED PATH',
    category: 'Pathway Routing',
    actor: 'Platform Engine & Supervising Clinician',
    dataPayload: 'Curriculum tier selection, coaching cadence assignment, or therapy priority referral.',
    verificationRule: 'Moderate-to-severe symptoms automatically unlock clinical therapy consultation.',
  },
  {
    step: '06',
    title: '16-WEEK CURRICULUM',
    category: 'Guided Learning Phase',
    actor: 'Student & Certified Life Coach',
    dataPayload: 'Weekly modular reflections, habit restructuring logs, emotional regulation practice entries.',
    verificationRule: 'Coach operates strictly within non-clinical scope with immediate escalation tools.',
  },
  {
    step: '07',
    title: 'CONTINUOUS REVIEW',
    category: 'Progress Surveillance',
    actor: 'Supervising Clinician & Life Coach',
    dataPayload: 'Delta symptom trajectories across Weeks 1, 4, 8, 12, and 16.',
    verificationRule: 'Mid-program regressions flag proactive coach and provider check-ins.',
  },
  {
    step: '08',
    title: 'THERAPY / CONSULTATION IF NEEDED',
    category: 'Clinical Escalation',
    actor: 'Licensed Therapist or Psychiatrist',
    dataPayload: 'Clinical psychotherapy treatment plan, diagnostic assessment, psychiatric necessity review.',
    verificationRule: 'Direct licensed care with separation of non-clinical coaching functions.',
  },
  {
    step: '09',
    title: 'TELEHEALTH',
    category: 'Virtual Care Delivery',
    actor: 'Patient & Licensed Clinician',
    dataPayload: 'Encrypted HD WebRTC video consultation, real-time in-session clinical notes.',
    verificationRule: 'End-to-end AES-256 encryption with instant crisis beacon accessible in video room.',
  },
  {
    step: '10',
    title: 'EHR + RCM',
    category: 'Systemic Continuity',
    actor: 'Medical Billing & EHR Pipeline',
    dataPayload: 'HL7 FHIR chart synchronization, ANSI X12 837 claim batch generation, longitudinal archive.',
    verificationRule: 'Compliant HIPAA and payer documentation rules with audit-proof records.',
  },
];

export const UserJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // default highlight provider review
  const currentNode = JOURNEY_NODES[activeStep];

  return (
    <section className={`sectionPadding ${styles.journeySection}`} id="user-journey">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="End-to-End Care Pipeline"
          badgeVariant="primary"
          title="The Complete WTF User Journey"
          subtitle="Explore how data, mentorship, and clinical oversight transition seamlessly from initial onboarding to long-term behavioral maintenance and EHR billing."
          align="center"
        />

        <div className={styles.journeyLayout}>
          {/* Left: Interactive Step Chain */}
          <div className={styles.chainCol}>
            {JOURNEY_NODES.map((node, index) => {
              const isCurrent = activeStep === index;
              const isPast = index < activeStep;

              return (
                <React.Fragment key={node.step}>
                  <div
                    className={`${styles.chainNode} ${isCurrent ? styles.chainNodeActive : ''} ${
                      isPast ? styles.chainNodePast : ''
                    }`}
                    onClick={() => setActiveStep(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveStep(index);
                      }
                    }}
                  >
                    <div className={styles.nodeStepBadge}>{node.step}</div>
                    <div className={styles.nodeTextCol}>
                      <span className={styles.nodeTitle}>{node.title}</span>
                      <span className={styles.nodeCategory}>{node.category}</span>
                    </div>
                    {isCurrent && (
                      <span className={styles.activePill}>Selected Phase</span>
                    )}
                  </div>

                  {index < JOURNEY_NODES.length - 1 && (
                    <div className={styles.arrowWrap}>
                      <ArrowDownwardIcon className={styles.downArrow} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right: Detailed Phase Inspector Card (Sticky) */}
          <div className={styles.inspectorCol}>
            <div className={styles.stickyInspector}>
              <div className={styles.inspectorHeader}>
                <span className={styles.phaseStepNum}>Phase {currentNode.step} of 10</span>
                <h3 className={styles.phaseTitle}>{currentNode.title}</h3>
                <span className={styles.phaseCategory}>{currentNode.category}</span>
              </div>

              <div className={styles.inspectorBody}>
                <div className={styles.inspectorRow}>
                  <span className={styles.rowLabel}>Primary Responsible Actor:</span>
                  <span className={styles.actorBadge}>{currentNode.actor}</span>
                </div>

                <div className={styles.inspectorRow}>
                  <span className={styles.rowLabel}>Transferred Data Payload:</span>
                  <div className={styles.payloadBox}>
                    <p>{currentNode.dataPayload}</p>
                  </div>
                </div>

                <div className={styles.inspectorRow}>
                  <span className={styles.rowLabel}>Clinical &amp; Safety Rule:</span>
                  <div className={styles.safetyRuleBox}>
                    <ShieldOutlinedIcon className={styles.ruleIcon} />
                    <p>{currentNode.verificationRule}</p>
                  </div>
                </div>
              </div>

              <div className={styles.inspectorFooter}>
                <div className={styles.footerStatus}>
                  <CheckCircleOutlineIcon className={styles.statusIcon} />
                  <span>Verified WTF Ecosystem Protocol Stage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
