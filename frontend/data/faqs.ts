import { FAQData } from '@/types';

export const FAQS_DATA: FAQData[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is WTF University?',
    answer:
      'WTF University is a technology-enabled mental and behavioral wellness ecosystem that connects institutions, students/patients, life coaches, and qualified providers/therapists. It provides structured behavioral assessments, guided 16-week learning, professional clinical supervision, integrated telehealth, and healthcare billing workflows in a unified platform.',
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'Who can use WTF University?',
    answer:
      'WTF serves three primary user cohorts: (1) Educational and athletic institutions seeking proactive, campus-wide wellness operating systems, (2) Certified life coaches seeking clinical supervision, structured curriculum, and a reliable medical escalation pathway, and (3) Individual students/patients seeking evidence-informed behavioral guidance and on-demand clinical support.',
  },
  {
    id: 'faq-3',
    category: 'Institutions',
    question: 'How do institutions join and onboard students?',
    answer:
      'Institutions partner with WTF through enterprise onboarding. We provision administrative portals, integrate with campus SIS/roster systems, and train campus counselors and faculty. Students can then be onboarded in cohorts via secure email invites, student ID single-sign-on (SSO), or bulk roster activation.',
  },
  {
    id: 'faq-4',
    category: 'Coaches',
    question: 'What is the certified life coach model?',
    answer:
      'The WTF Certified Life Coach pathway trains non-clinical mentors in our behavioral wellness curriculum and strict scope boundaries. Coaches guide students through weekly goal-setting, reflection, and habit restructuring. Crucially, coaches operate under the supervision of WTF licensed clinicians and utilize a single-click escalation tool whenever clinical concerns arise.',
  },
  {
    id: 'faq-5',
    category: 'Curriculum',
    question: 'What happens after the initial assessment?',
    answer:
      'Once a student completes the initial assessment questionnaire, our AI medical-scribe engine synthesizes the responses into a structured clinical draft. A licensed WTF provider or therapist reviews and signs off on this output, determining the appropriate personalized pathway: continuing the 16-week curriculum, scheduling an individual therapy session, or initiating a medical consultation.',
  },
  {
    id: 'faq-6',
    category: 'Curriculum',
    question: 'What is the 16-week curriculum?',
    answer:
      'The 16-week curriculum is a structured behavioral learning journey covering self-awareness, frustration management, anger dynamics, anxiety recognition, depressive inertia awareness, emotional regulation, and sustainable habits. Each week follows a closed-loop cycle: Learn → Complete Assessment → AI Scribe Processing → Provider Review → Continue / Escalate.',
  },
  {
    id: 'faq-7',
    category: 'Clinical & Safety',
    question: 'When is a licensed provider or therapist involved?',
    answer:
      'Licensed providers are involved at mandatory clinical milestones: validating the initial baseline assessment, reviewing 4-week milestone progress, and conducting clinical therapy or medical necessity consultations whenever a student flags moderate-to-severe distress. Life coaches never practice clinical therapy—all clinical determinations remain exclusively with licensed professionals.',
  },
  {
    id: 'faq-8',
    category: 'Clinical & Safety',
    question: 'How does Telehealth work on the platform?',
    answer:
      'WTF features a fully integrated, HIPAA-compliant WebRTC telehealth suite accessible directly in the browser. When a provider recommends virtual therapy or medical consultation, students can book and join HD encrypted sessions without downloading third-party software. Providers take live session notes that sync directly to the EHR.',
  },
  {
    id: 'faq-9',
    category: 'Clinical & Safety',
    question: 'What is the role of the AI medical scribe?',
    answer:
      'The AI medical scribe functions strictly as an assistive documentation workflow. It organizes qualitative questionnaire answers and session transcripts into clinical templates (e.g., SOAP formats, symptom cluster summaries). The AI never makes autonomous medical diagnoses—a licensed human clinician must always review, edit, and sign off on all documentation.',
  },
  {
    id: 'faq-10',
    category: 'Clinical & Safety',
    question: 'Does WTF provide crisis support or emergency services?',
    answer:
      'No. WTF University is a SaaS wellness and behavioral care coordination platform, NOT an emergency response dispatch service. However, our safety engine continuously scans assessments for crisis indicators. If acute risk is identified, the user is immediately redirected to external emergency resources, prominently integrating the national 988 Suicide & Crisis Lifeline and local emergency services (911).',
  },
  {
    id: 'faq-11',
    category: 'General',
    question: 'What integrations does the platform support?',
    answer:
      'WTF integrates with Electronic Health Record (EHR) systems via HL7 FHIR APIs, Revenue Cycle Management (RCM) clearinghouses for automated ANSI X12 837 claim filing, enterprise identity providers (SAML/OAuth SSO), SMS notification carriers, and PCI-DSS Level 1 payment gateways for seamless institutional and patient billing.',
  },
];
