import { ProblemCardData } from '@/types';

export const PROBLEMS_DATA: ProblemCardData[] = [
  {
    id: 'fragmented-support',
    category: 'Institutional Challenge',
    title: 'Fragmented Support',
    description:
      'Mental and behavioral wellness programs may exist inside institutions but are not always implemented consistently or connected to actionable care.',
    impactNote: 'Coordinators and faculty lack unified visibility, causing at-risk students to slip through cracks.',
    wtfSolution: 'WTF establishes a standardized, campus-wide operating system with continuous tracking and accountability.',
    iconName: 'WidgetsOutlined',
  },
  {
    id: 'limited-professional-access',
    category: 'Escalation Bottleneck',
    title: 'Limited Professional Access',
    description:
      'Teachers and life coaches may identify concerns but need qualified professionals when situations go beyond their scope.',
    impactNote: 'Unlicensed coaches face liability and anxiety when complex clinical needs arise without supervision.',
    wtfSolution: 'WTF connects coaches directly to qualified, credentialed in-house providers for immediate escalation and sign-off.',
    iconName: 'MedicalServicesOutlined',
  },
  {
    id: 'unstructured-journey',
    category: 'Student Experience',
    title: 'Unstructured Student Journey',
    description:
      'Students need a clear journey from assessment to learning, monitoring, and professional intervention when appropriate.',
    impactNote: 'Random wellness seminars fail to produce sustained behavioral changes or measurable improvement.',
    wtfSolution: 'A progressive 16-week modular curriculum with closed-loop assessments and personalized pathways.',
    iconName: 'AltRouteOutlined',
  },
  {
    id: 'disconnected-healthcare',
    category: 'Systemic Disconnect',
    title: 'Disconnected Healthcare Workflow',
    description:
      'Assessment, Telehealth, EHR, AI documentation, and billing often exist as completely disconnected systems.',
    impactNote: 'Clinicians waste hours on manual re-entry while billing reconciliation and clinical compliance suffer.',
    wtfSolution: 'WTF unifies AI medical scribing, EHR documentation, Telehealth, and RCM into one frictionless platform.',
    iconName: 'HubOutlined',
  },
];
