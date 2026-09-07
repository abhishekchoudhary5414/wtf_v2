import { BenefitGroupData } from '@/types';

export const BENEFITS_DATA: BenefitGroupData[] = [
  {
    id: 'institutions',
    audience: 'For Institutions',
    headline: 'Implement structured wellness programs with centralized management and professional support.',
    subheadline:
      'Eliminate patchwork wellness initiatives. WTF delivers a proven, proactive behavioral wellness operating system that protects student wellbeing while providing faculty clear escalation pathways.',
    benefits: [
      {
        title: 'Centralized Cohort Management',
        description: 'Deploy programs across athletic teams, residence halls, or entire student bodies with simple roster provisioning.',
      },
      {
        title: 'Guaranteed Clinical Network Access',
        description: 'Connect directly to vetted, licensed therapists and psychiatrists so staff are never left stranded with complex cases.',
      },
      {
        title: 'FERPA & HIPAA Aligned Architecture',
        description: 'Executive dashboards provide aggregate wellness trends and risk indicators without compromising student privacy.',
      },
      {
        title: 'Measurable Retention & Well-Being ROI',
        description: 'Track program engagement, reduction in crisis escalations, and positive correlations with student academic persistence.',
      },
    ],
    keyMetric: {
      stat: '88%',
      label: 'Average 16-week curriculum completion rate among partner university cohorts',
    },
  },
  {
    id: 'students',
    audience: 'For Students & Patients',
    headline: 'Get a structured journey from assessment to guided learning and professional support.',
    subheadline:
      'No more confusing, overwhelming mental health labyrinths. Experience a safe, step-by-step pathway tailored to your specific emotional and behavioral needs.',
    benefits: [
      {
        title: 'Clear, Actionable Starting Point',
        description: 'Begin with a guided, non-stigmatizing assessment that maps your stress points, frustration triggers, and strengths.',
      },
      {
        title: 'Engaging, Practical Curriculum',
        description: 'Learn concrete behavioral strategies for anger, anxiety, and frustration through 16 structured, bite-sized weekly chapters.',
      },
      {
        title: 'Dedicated Human Support',
        description: 'Partner with a certified life coach for weekly motivation and know that licensed clinical therapists are just one tap away.',
      },
      {
        title: 'Private Avatar & Growth Tracking',
        description: 'Build your personal avatar, track your reflection streak, and watch your emotional regulation metrics steadily improve.',
      },
    ],
    keyMetric: {
      stat: '94%',
      label: 'Of students report greater self-awareness and emotional regulation confidence by Week 8',
    },
  },
  {
    id: 'coaches',
    audience: 'For Life Coaches',
    headline: 'Manage students within a structured ecosystem with certification and professional supervision.',
    subheadline:
      'Transform informal coaching into a verified, high-credibility practice backed by continuous clinical supervision and structured escalation guardrails.',
    benefits: [
      {
        title: 'WTF Behavioral Wellness Certification',
        description: 'Earn an institutional-grade coaching credential demonstrating competency in evidence-informed behavioral mentoring.',
      },
      {
        title: 'Dedicated Multi-Student Dashboard',
        description: 'Monitor weekly chapter submissions, reflection logs, and engagement levels from one clean, intuitive interface.',
      },
      {
        title: 'Clinical Supervision & Mentorship',
        description: 'Consult regularly with licensed psychologists and psychiatrists to discuss student progress and coaching strategies.',
      },
      {
        title: 'Zero-Liability Escalation Channel',
        description: 'Safely transfer students experiencing clinical distress to in-house licensed providers with a single click.',
      },
    ],
    keyMetric: {
      stat: '100%',
      label: 'Of coaches operate under direct clinical supervision with instant specialist escalation',
    },
  },
  {
    id: 'providers',
    audience: 'For Providers & Therapists',
    headline: 'Review assessments, manage assigned students and provide professional intervention when required.',
    subheadline:
      'Practice at the top of your license. WTF offloads administrative documentation through AI medical scribing, allowing you to focus on clinical reviews and high-impact therapy.',
    benefits: [
      {
        title: 'AI Medical Scribe Pre-Charting',
        description: 'Receive structured, pre-drafted clinical summaries formatted to diagnostic criteria, ready for your expert review and sign-off.',
      },
      {
        title: 'Qualified Patient Assignments',
        description: 'Receive pre-stratified referrals with complete baseline histories, symptom inventories, and longitudinal progress charts.',
      },
      {
        title: 'Built-In HD Telehealth Suite',
        description: 'Conduct secure virtual consultations with in-session note taking and instant EHR sync without managing third-party tools.',
      },
      {
        title: 'Automated Coding & RCM Workflows',
        description: 'Integrated CPT coding and automated insurance claim batching eliminate administrative billing headaches.',
      },
    ],
    keyMetric: {
      stat: '70%',
      label: 'Reduction in clinical documentation time through structured AI-assisted scribing',
    },
  },
  {
    id: 'admin',
    audience: 'For WTF Platform Administrators',
    headline: 'Manage the complete ecosystem through centralized workflows, integrations and reporting.',
    subheadline:
      'Total operational control, compliance enforcement, and real-time oversight across all institutions, providers, coaches, and students.',
    benefits: [
      {
        title: 'Granular Role-Based Access Controls',
        description: 'Configure multi-tenant security policies, permission tiers, and audit-ready data segregation across institutions.',
      },
      {
        title: 'Automated Provider Credentialing',
        description: 'Track provider licensing renewals, state compact authorizations, and insurance panel statuses seamlessly.',
      },
      {
        title: 'Intelligent Load & Roster Balancing',
        description: 'Route student assessments dynamically based on provider specialty, clinical volume, and geographic licensure.',
      },
      {
        title: 'Ecosystem Telemetry & SLA Tracking',
        description: 'Monitor API uptime, video session quality, claim acceptance rates, and crisis alert response latency in real time.',
      },
    ],
    keyMetric: {
      stat: '99.98%',
      label: 'Platform service availability with sub-second crisis event notification delivery',
    },
  },
];
