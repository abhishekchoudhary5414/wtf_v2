import { IntegrationData } from '@/types';

export const INTEGRATIONS_DATA: IntegrationData[] = [
  {
    id: 'ehr',
    name: 'Electronic Health Record (EHR)',
    category: 'Clinical Core',
    description:
      'Bi-directional synchronization of patient clinical charts, validated SOAP notes, diagnostic codes, and treatment plans via HL7 FHIR APIs.',
    iconName: 'StorageOutlined',
    standard: 'HL7 FHIR v4 / SMART on FHIR',
    benefit: 'Eliminates dual-charting for providers and maintains longitudinal clinical histories compliant with 45 CFR § 164.',
  },
  {
    id: 'rcm',
    name: 'Revenue Cycle Management (RCM)',
    category: 'Billing & Claims',
    description:
      'Automated claim generation, real-time insurance eligibility checks, batch 837P filing, and electronic remittance processing (835).',
    iconName: 'ReceiptLongOutlined',
    standard: 'ANSI X12 837 / 835 EDI',
    benefit: 'Drastically reduces claim denial rates for telehealth psychotherapy and psychiatric necessity consultations.',
  },
  {
    id: 'ai-scribe',
    name: 'AI Medical Scribe Engine',
    category: 'Documentation Intelligence',
    description:
      'Proprietary clinical NLP converts assessment questionnaires and video transcripts into formatted clinical summaries using standardized diagnostic templates.',
    iconName: 'PsychologyAltOutlined',
    standard: 'HIPAA BAA & Zero-Retention AI Enclave',
    benefit: 'Reduces clinician documentation burden by 70% while keeping licensed providers firmly in the sign-off seat.',
  },
  {
    id: 'telehealth',
    name: 'Integrated WebRTC Telehealth',
    category: 'Virtual Care',
    description:
      'Browser-based encrypted HD video sessions with zero software downloads required for students, faculty, coaches, and clinicians.',
    iconName: 'VideoChatOutlined',
    standard: 'WebSockets / WebRTC / AES-256 GCM',
    benefit: 'High-reliability, low-latency video care with integrated live session notes, chat, and an instant emergency crisis beacon.',
  },
  {
    id: 'sms-reminders',
    name: 'Automated SMS & Multichannel Reminders',
    category: 'Engagement & Adherence',
    description:
      'Intelligent notification pipeline dispatching weekly module prompts, appointment reminders, and coach check-in nudges via SMS and email.',
    iconName: 'SmsOutlined',
    standard: '10DLC Verified / TCPA Compliant',
    benefit: 'Maintains 92%+ weekly student curriculum retention through personalized, gentle, and timely reminders.',
  },
  {
    id: 'payment-gateway',
    name: 'Enterprise & Copay Payment Gateway',
    category: 'Financial Infrastructure',
    description:
      'PCI-DSS Level 1 compliant payment processor supporting institutional bulk licensing, HSA/FSA card payments, and direct patient copays.',
    iconName: 'CreditCardOutlined',
    standard: 'PCI-DSS Level 1 / Tokenized Vault',
    benefit: 'Frictionless billing for institutional partner contracts, coach tuition, and patient self-pay therapy visits.',
  },
];
