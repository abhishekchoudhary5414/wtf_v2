import React from 'react';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import styles from './AssessmentWorkflow.module.css';

export const AssessmentWorkflow: React.FC = () => {
  return (
    <section className={`sectionPadding ${styles.workflowSection}`} id="assessment-workflow">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Clinical Workflow Synergy"
          badgeVariant="primary"
          title="Assessment & Professional Review"
          subtitle="How WTF combines intelligent automated medical scribing with rigorous, human-in-the-loop clinical governance."
          align="center"
        />

        {/* Central Imperative Callout Banner */}
        <div className={styles.imperativeBanner}>
          <div className={styles.imperativeIcon}>
            <ShieldOutlinedIcon />
          </div>
          <div className={styles.imperativeText}>
            <span className={styles.imperativePill}>Core Clinical Principle</span>
            <h3 className={styles.imperativeHeading}>
              AI assists the workflow. Qualified professionals make the final clinical decision.
            </h3>
            <p className={styles.imperativeDesc}>
              No automated diagnosis. No unreviewed prescription. AI performs documentation synthesis; licensed human therapists and physicians retain 100% diagnostic and clinical authority.
            </p>
          </div>
        </div>

        {/* Two-Column Comparison Grid */}
        <div className={styles.twoColumnGrid}>
          {/* Column 1: AI-Assisted Assessment */}
          <div className={styles.columnCard}>
            <div className={styles.cardHeader}>
              <div className={styles.columnIconWrapAI}>
                <SmartToyOutlinedIcon />
              </div>
              <div>
                <span className={styles.columnPreTitle}>Machine Efficiency</span>
                <h3 className={styles.columnTitle}>AI-Assisted Assessment</h3>
              </div>
            </div>

            {/* Micro-flow */}
            <div className={styles.microFlow}>
              <span className={styles.microStep}>Questionnaire</span>
              <ArrowForwardIcon className={styles.microArrow} />
              <span className={styles.microStep}>AI Medical Scribe</span>
              <ArrowForwardIcon className={styles.microArrow} />
              <span className={styles.microStep}>Structured Output</span>
            </div>

            <p className={styles.columnIntro}>
              When a student completes an assessment, the AI Medical Scribe rapidly categorizes free-text responses and quantitative scales into standardized clinical documentation templates.
            </p>

            {/* Mock Output Container */}
            <div className={styles.mockTerminal}>
              <div className={styles.mockTop}>
                <span className={styles.mockBadgeAI}>AI Scribe Draft • Pending Sign-off</span>
                <span className={styles.mockTime}>Latency: 1.2s</span>
              </div>
              <div className={styles.mockContent}>
                <div className={styles.mockRow}>
                  <span className={styles.mockKey}>Chief Subjective Note:</span>
                  <p className={styles.mockVal}>
                    &quot;Reports frequent irritability and academic fatigue during exam cycles; acknowledges difficulty pausing before reacting to peers.&quot;
                  </p>
                </div>
                <div className={styles.mockRow}>
                  <span className={styles.mockKey}>Synthesized Symptom Clusters:</span>
                  <div className={styles.clusterPills}>
                    <span className={styles.clusterPill}>Elevated Frustration (Moderate)</span>
                    <span className={styles.clusterPill}>Situational Stress</span>
                    <span className={styles.clusterPillClean}>Zero Acute Crisis Flags</span>
                  </div>
                </div>
                <div className={styles.mockRow}>
                  <span className={styles.mockKey}>Scribe Recommendation:</span>
                  <span className={styles.mockValRecommendation}>
                    Route to Week 3 Module (Frustration Management) + Life Coach Touchpoint.
                  </span>
                </div>
              </div>
            </div>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <CheckCircleOutlineIcon className={styles.featureCheck} />
                <span>Zero-retention HIPAA BAA secure processing enclaves</span>
              </li>
              <li className={styles.featureItem}>
                <CheckCircleOutlineIcon className={styles.featureCheck} />
                <span>Saves clinicians up to 70% in redundant typing and formatting</span>
              </li>
              <li className={styles.featureItem}>
                <CheckCircleOutlineIcon className={styles.featureCheck} />
                <span>Real-time scanning for crisis keywords with immediate 988 trigger</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Human Professional Oversight */}
          <div className={styles.columnCard}>
            <div className={styles.cardHeader}>
              <div className={styles.columnIconWrapHuman}>
                <VerifiedUserOutlinedIcon />
              </div>
              <div>
                <span className={styles.columnPreTitle}>Clinical Authority</span>
                <h3 className={styles.columnTitle}>Human Professional Oversight</h3>
              </div>
            </div>

            {/* Micro-flow */}
            <div className={styles.microFlow}>
              <span className={styles.microStep}>Provider Review</span>
              <ArrowForwardIcon className={styles.microArrow} />
              <span className={styles.microStep}>Clinical Sign-Off</span>
              <ArrowForwardIcon className={styles.microArrow} />
              <span className={styles.microStep}>Recommended Pathway</span>
            </div>

            <p className={styles.columnIntro}>
              A licensed WTF provider or therapist validates the AI-assisted draft against the student’s longitudinal history, edits clinical notes, and formally signs off.
            </p>

            {/* Mock Provider Sign-Off Container */}
            <div className={styles.mockSignoff}>
              <div className={styles.mockTop}>
                <span className={styles.mockBadgeVerified}>
                  <LockOutlinedIcon style={{ fontSize: '0.8rem' }} /> Verified &amp; Signed
                </span>
                <span className={styles.mockProviderName}>Dr. Sarah Jenkins, MD</span>
              </div>
              <div className={styles.mockContent}>
                <div className={styles.mockRow}>
                  <span className={styles.mockKey}>Attending Provider Evaluation:</span>
                  <p className={styles.mockVal}>
                    &quot;Assessment reviewed and approved. Student exhibits situational cognitive distortion without clinical impairment. Approved for 16-Week Curriculum with supervised Life Coach check-ins.&quot;
                  </p>
                </div>
                <div className={styles.mockRow}>
                  <span className={styles.mockKey}>Authorized Care Pathway:</span>
                  <div className={styles.pathwayBadgeGreen}>
                    Curriculum Track A (Behavioral Regulation) + 2x Weekly Coach Check
                  </div>
                </div>
                <div className={styles.mockRow}>
                  <span className={styles.mockKey}>Clinical Checkpoint Gate:</span>
                  <span className={styles.mockVal}>
                    Re-evaluate at Week 4 Milestone for potential psychotherapy escalation.
                  </span>
                </div>
              </div>
            </div>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <CheckCircleOutlineIcon className={styles.featureCheck} />
                <span>Every pathway decision requires verifiable licensed practitioner sign-off</span>
              </li>
              <li className={styles.featureItem}>
                <CheckCircleOutlineIcon className={styles.featureCheck} />
                <span>Single-click escalation to virtual psychotherapy when needed</span>
              </li>
              <li className={styles.featureItem}>
                <CheckCircleOutlineIcon className={styles.featureCheck} />
                <span>Audit-proof SOAP documentation syncing seamlessly into EHR &amp; billing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
