import React from 'react';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import styles from './TherapyMedicalNecessity.module.css';

interface NecessityCard {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  description: string;
  keyAction: string;
  compliancePoint: string;
}

const CARDS: NecessityCard[] = [
  {
    id: 'therapy',
    title: 'Therapy Sessions',
    badge: 'Psychotherapy Track',
    icon: <VolunteerActivismOutlinedIcon />,
    description:
      'When assessments or coach reviews reveal moderate symptoms requiring clinical care, the student is scheduled for 1-on-1 psychotherapy with an in-house licensed clinician (LCSW, LMFT, LPC).',
    keyAction: 'Evidence-based cognitive and behavioral psychotherapeutic care plans.',
    compliancePoint: 'Operates independently of coaching sessions with full clinical privilege separation.',
  },
  {
    id: 'medical',
    title: 'Medical Consultation',
    badge: 'Psychiatric Oversight',
    icon: <MedicalServicesOutlinedIcon />,
    description:
      'For complex behavioral situations requiring psychiatric diagnostic clarity, our board-certified psychiatrists evaluate medical necessity and coordinate physician-directed care.',
    keyAction: 'Comprehensive diagnostic interviews and medication evaluation when indicated.',
    compliancePoint: 'Direct physician sign-off adhering strictly to state medical board requirements.',
  },
  {
    id: 'assignment',
    title: 'Intelligent Provider Assignment',
    badge: 'Clinical Matching',
    icon: <PersonSearchOutlinedIcon />,
    description:
      'WTF automatically matches students to credentialed clinicians based on state licensure, clinical specialty (e.g., student burnout, anxiety, sports wellness), and immediate calendar availability.',
    keyAction: 'Warm handoffs that preserve assessment context so students never repeat their story.',
    compliancePoint: 'Cross-state licensure verification and NPI registry synchronization.',
  },
  {
    id: 'telehealth',
    title: 'Integrated Telehealth',
    badge: 'HIPAA-Compliant Video',
    icon: <VideoCameraFrontOutlinedIcon />,
    description:
      'Consultations occur securely inside the browser via our WebRTC encrypted suite. No third-party links or downloads needed by students, faculty, or clinicians.',
    keyAction: 'One-click joining, integrated in-session notes, and active crisis safety beacons.',
    compliancePoint: 'End-to-end AES-256 encryption with zero video data recording on local devices.',
  },
  {
    id: 'ehr',
    title: 'EHR Documentation & RCM',
    badge: 'Clinical Continuity',
    icon: <ReceiptLongOutlinedIcon />,
    description:
      'Session progress notes, standardized clinical scales, and treatment goals sync to the EHR, feeding directly into billing workflows and insurance claims.',
    keyAction: 'Standardized SOAP note generation and automated ANSI X12 837 claim processing.',
    compliancePoint: 'Audit-ready medical records compliant with 45 CFR § 164 and payer guidelines.',
  },
];

export const TherapyMedicalNecessity: React.FC = () => {
  return (
    <section className={`sectionPadding ${styles.necessitySection}`} id="therapy-necessity">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Seamless Care Escalation"
          badgeVariant="primary"
          title="When More Support Is Needed"
          subtitle="Life coaching and curriculum learning are transformative, but clinical conditions demand licensed medical and psychological professionals. WTF bridges this divide safely."
          align="center"
        />

        {/* Top Escalation Pathway Sequence Banner */}
        <div className={styles.escalationPipeline}>
          <div className={styles.pipeStep}>
            <span className={styles.pipeStepNum}>1</span>
            <span className={styles.pipeStepTitle}>Need Identified</span>
            <span className={styles.pipeStepSub}>Via assessment or coach alert</span>
          </div>
          <ArrowForwardIcon className={styles.pipeArrow} />
          <div className={styles.pipeStep}>
            <span className={styles.pipeStepNum}>2</span>
            <span className={styles.pipeStepTitle}>Provider Matched</span>
            <span className={styles.pipeStepSub}>By state license &amp; specialty</span>
          </div>
          <ArrowForwardIcon className={styles.pipeArrow} />
          <div className={styles.pipeStep}>
            <span className={styles.pipeStepNum}>3</span>
            <span className={styles.pipeStepTitle}>Telehealth Session</span>
            <span className={styles.pipeStepSub}>Secure WebRTC video care</span>
          </div>
          <ArrowForwardIcon className={styles.pipeArrow} />
          <div className={styles.pipeStep}>
            <span className={styles.pipeStepNum}>4</span>
            <span className={styles.pipeStepTitle}>EHR Documentation</span>
            <span className={styles.pipeStepSub}>SOAP note &amp; RCM billing</span>
          </div>
        </div>

        {/* 5 Core Cards */}
        <div className={styles.cardsGrid}>
          {CARDS.map((card) => (
            <div key={card.id} className={styles.necessityCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}>{card.icon}</div>
                <span className={styles.badge}>{card.badge}</span>
              </div>

              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.description}</p>

              <div className={styles.actionBox}>
                <div className={styles.actionHeader}>
                  <CheckCircleOutlineIcon className={styles.actionIcon} />
                  <span className={styles.actionLabel}>Clinical Focus:</span>
                </div>
                <p className={styles.actionText}>{card.keyAction}</p>
              </div>

              <div className={styles.complianceFooter}>
                <span className={styles.complianceText}>{card.compliancePoint}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
