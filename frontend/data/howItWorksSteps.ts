import { WorkflowStepData } from '@/types';

export const HOW_IT_WORKS_STEPS: WorkflowStepData[] = [
  {
    stepNumber: 1,
    shortLabel: 'Onboard',
    title: 'Onboarding',
    actor: 'Student, Institution, or Coach',
    description:
      'The student/patient enters the WTF ecosystem seamlessly through an institutional cohort, a certified life coach invitation, or direct self-enrollment.',
    output: 'Verified account, profile initialization, and preliminary orientation module assigned.',
    iconName: 'LoginOutlined',
    clinicalSafeguard: 'Consent, confidentiality, and platform safety terms confirmed prior to engagement.',
  },
  {
    stepNumber: 2,
    shortLabel: 'Assess',
    title: 'Initial Assessment',
    actor: 'Student & Life Coach',
    description:
      'The student completes WTF’s structured baseline assessment questionnaire under appropriate life-coach supervision or guided self-administration.',
    output: 'Raw assessment responses covering behavioral symptoms, stressors, and emotional baseline.',
    iconName: 'AssignmentTurnedInOutlined',
    clinicalSafeguard: 'Automated red-flag scanning for crisis keywords with immediate 988 emergency fallback.',
  },
  {
    stepNumber: 3,
    shortLabel: 'AI Scribe',
    title: 'AI-Assisted Processing',
    actor: 'WTF AI Medical Scribe Engine',
    description:
      'The completed assessment enters the AI medical-scribe workflow, synthesizing qualitative and quantitative responses into a structured clinical summary using standardized clinical templates.',
    output: 'Formatted clinical assessment draft, highlighted symptom clusters, and suggested risk-stratification tags.',
    iconName: 'SmartToyOutlined',
    clinicalSafeguard: 'AI serves strictly as an assistive documentation engine; no autonomous clinical diagnoses are made.',
  },
  {
    stepNumber: 4,
    shortLabel: 'Provider Review',
    title: 'Provider Review & Sign-Off',
    actor: 'WTF Licensed Provider / Therapist',
    description:
      'A licensed WTF provider or therapist thoroughly reviews the AI-assisted output, validates questionnaire inputs, and formally signs off on the clinical evaluation.',
    output: 'Verified, signed clinical evaluation with tailored recommendation for the next care tier.',
    iconName: 'VerifiedUserOutlined',
    clinicalSafeguard: '100% human-in-the-loop review ensures high clinical fidelity and patient safety.',
  },
  {
    stepNumber: 5,
    shortLabel: 'Pathway',
    title: 'Personalized Pathway Determination',
    actor: 'Assigned Provider',
    description:
      'Based on the validated review, the provider determines the optimal care track: continue standard 16-week curriculum, initiate individual therapy sessions, or schedule a medical necessity consultation.',
    output: 'Personalized care track assigned to student dashboard with immediate calendar scheduling.',
    iconName: 'RouteOutlined',
    clinicalSafeguard: 'Students with moderate-to-severe symptoms are immediately directed to clinical care tiers.',
  },
  {
    stepNumber: 6,
    shortLabel: 'Curriculum',
    title: 'Chapter-Based Curriculum',
    actor: 'Student & Certified Coach',
    description:
      'Students progress through the WTF 16-week behavioral wellness curriculum chapter by chapter, engaging in guided cognitive exercises, behavioral logs, and skill-building modules.',
    output: 'Weekly chapter completion, reflective logs, and updated self-regulation metrics.',
    iconName: 'MenuBookOutlined',
    clinicalSafeguard: 'Paced learning prevents cognitive overload and maintains weekly habit consistency.',
  },
  {
    stepNumber: 7,
    shortLabel: 'Review',
    title: 'Continuous Review',
    actor: 'Supervising Provider / Coach',
    description:
      'Completed weekly chapters and mini-assessments are processed through the workflow and reviewed by the assigned WTF provider/therapist to track ongoing progress.',
    output: 'Weekly progress index, trend reports, and coach advisory notes.',
    iconName: 'FactCheckOutlined',
    clinicalSafeguard: 'Detects mid-course regressions or emergent behavioral distress proactively.',
  },
  {
    stepNumber: 8,
    shortLabel: 'Escalate',
    title: 'Escalation When Needed',
    actor: 'Platform Safety Engine & Provider',
    description:
      'If professional intervention is required at any point, the student is seamlessly escalated and assigned to an appropriate WTF licensed therapist or medical provider.',
    output: 'Warm handoff packet, escalated clinical alert, and priority appointment booking.',
    iconName: 'NotificationImportantOutlined',
    clinicalSafeguard: 'Zero delay between identification of clinical need and licensed specialist handoff.',
  },
  {
    stepNumber: 9,
    shortLabel: 'Telehealth',
    title: 'Integrated Telehealth',
    actor: 'Patient & Licensed Clinician',
    description:
      'Virtual psychotherapy or medical consultations are conducted directly inside the HIPAA-compliant, WebRTC-powered WTF Telehealth suite.',
    output: 'Encrypted HD video consultation, real-time clinical notes, and session audio-transcription.',
    iconName: 'VideoCameraFrontOutlined',
    clinicalSafeguard: 'End-to-end encryption with integrated crisis button accessible during live video.',
  },
  {
    stepNumber: 10,
    shortLabel: 'EHR & RCM',
    title: 'EHR Documentation & Billing',
    actor: 'Clinical Billing & Admin Team',
    description:
      'Clinical consultations, diagnostic codes, and provider notes are systematically documented in the EHR, feeding seamlessly into the RCM and insurance claim workflow.',
    output: 'Compliant SOAP notes, claim generation, audit-ready billing records, and longitudinal health history.',
    iconName: 'ReceiptLongOutlined',
    clinicalSafeguard: 'Standardized CPT/ICD coding compliant with HIPAA and payer documentation rules.',
  },
];
