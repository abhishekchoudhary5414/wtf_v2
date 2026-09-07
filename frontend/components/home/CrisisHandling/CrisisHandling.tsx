import React from 'react';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import styles from './CrisisHandling.module.css';

export const CrisisHandling: React.FC = () => {
  return (
    <section className={`sectionPadding ${styles.crisisSection}`} id="crisis-safety">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Safety & Crisis Protocol"
          badgeVariant="danger"
          title="Crisis Support & Emergency Redirection"
          subtitle="WTF University is engineered with strict patient safety boundaries. While the platform provides structured proactive wellness, acute emergencies trigger immediate handoff to certified crisis lifelines."
          align="center"
        />

        {/* 3-Stage Crisis Workflow Visual */}
        <div className={styles.workflowBanner}>
          <div className={styles.workflowStage}>
            <div className={styles.stageIconWrapWarning}>
              <WarningAmberOutlinedIcon />
            </div>
            <span className={styles.stageNumber}>Step 1</span>
            <h4 className={styles.stageTitle}>Crisis Identified</h4>
            <p className={styles.stageDesc}>
              Continuous AI keyword scanning, assessment red flags, or user-triggered urgent distress beacon.
            </p>
          </div>

          <div className={styles.stageArrow}>
            <ArrowForwardIcon />
          </div>

          <div className={styles.workflowStage}>
            <div className={styles.stageIconWrapSafety}>
              <ShieldOutlinedIcon />
            </div>
            <span className={styles.stageNumber}>Step 2</span>
            <h4 className={styles.stageTitle}>WTF Safety Workflow</h4>
            <p className={styles.stageDesc}>
              Normal workflow pauses immediately. Safety screen modal deploys with reassuring de-escalation guidance.
            </p>
          </div>

          <div className={styles.stageArrow}>
            <ArrowForwardIcon />
          </div>

          <div className={styles.workflowStage}>
            <div className={styles.stageIconWrapEmergency}>
              <PhoneInTalkOutlinedIcon />
            </div>
            <span className={styles.stageNumber}>Step 3</span>
            <h4 className={styles.stageTitle}>External Crisis Resource</h4>
            <p className={styles.stageDesc}>
              Instant 1-tap connection to 988 Suicide &amp; Crisis Lifeline, Crisis Text Line, or local emergency 911 dispatch.
            </p>
          </div>
        </div>

        {/* Calm, Prominent Emergency Resource Card */}
        <div className={styles.resourceCard}>
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <span className={styles.emergencyPill}>Emergency Protocol (USA)</span>
              <h3 className={styles.cardHeading}>
                Immediate External Help Lines • Confidential &amp; Free 24/7
              </h3>
            </div>
            <span className={styles.nonEmergencyBadge}>
              WTF is NOT an emergency dispatch service
            </span>
          </div>

          <p className={styles.cardIntro}>
            If you, a student, or a colleague are experiencing suicidal ideation, self-harm impulses, severe psychosis, or acute medical distress, please utilize these dedicated national resources immediately:
          </p>

          <div className={styles.resourcesGrid}>
            {/* 988 Lifeline */}
            <div className={styles.resourceItem}>
              <div className={styles.resIconBox}>
                <PhoneInTalkOutlinedIcon />
              </div>
              <div className={styles.resContent}>
                <span className={styles.resName}>988 Suicide &amp; Crisis Lifeline</span>
                <span className={styles.resDesc}>
                  Call or text 24 hours a day, 7 days a week. Free, confidential support from trained crisis counselors.
                </span>
                <a href="tel:988" className={styles.resActionBtnPrimary}>
                  Call 988 Lifeline
                </a>
              </div>
            </div>

            {/* Crisis Text Line */}
            <div className={styles.resourceItem}>
              <div className={styles.resIconBox}>
                <SmsOutlinedIcon />
              </div>
              <div className={styles.resContent}>
                <span className={styles.resName}>Crisis Text Line</span>
                <span className={styles.resDesc}>
                  Text HOME to 741741 to connect with a volunteer crisis counselor via SMS anytime.
                </span>
                <a href="sms:741741" className={styles.resActionBtn}>
                  Text HOME to 741741
                </a>
              </div>
            </div>

            {/* 911 Emergency */}
            <div className={styles.resourceItem}>
              <div className={styles.resIconBox}>
                <LocalHospitalOutlinedIcon />
              </div>
              <div className={styles.resContent}>
                <span className={styles.resName}>Emergency Medical Services</span>
                <span className={styles.resDesc}>
                  For immediate physical danger, medical crises, or accidents, contact 911 or go to your nearest emergency department.
                </span>
                <a href="tel:911" className={styles.resActionBtnDanger}>
                  Call 911 Emergency
                </a>
              </div>
            </div>
          </div>

          <div className={styles.safetyGuarantees}>
            <div className={styles.guaranteeItem}>
              <CheckCircleOutlineIcon className={styles.guaranteeCheck} />
              <span>Campus coordinators &amp; counselors receive asynchronous safety event alerts</span>
            </div>
            <div className={styles.guaranteeItem}>
              <CheckCircleOutlineIcon className={styles.guaranteeCheck} />
              <span>Full compliance with federal student health and crisis intervention safety standards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
