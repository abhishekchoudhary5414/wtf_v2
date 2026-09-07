export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ProblemCardData {
  id: string;
  title: string;
  category: string;
  description: string;
  impactNote: string;
  wtfSolution: string;
  iconName: string;
}

export interface EcosystemEntity {
  id: string;
  title: string;
  category: 'institution' | 'coach' | 'student' | 'clinical' | 'admin';
  role: string;
  description: string;
  iconName: string;
  responsibilities: string[];
}

export interface EngagementModelData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  badge: string;
  targetAudience: string[];
  workflowSteps: string[];
  scopeStatement?: string;
  benefits: string[];
  ctaLabel: string;
  iconName: string;
}

export interface WorkflowStepData {
  stepNumber: number;
  title: string;
  shortLabel: string;
  actor: string;
  description: string;
  output: string;
  iconName: string;
  clinicalSafeguard?: string;
}

export interface CurriculumWeekData {
  week: number;
  title: string;
  domain: string;
  coreObjective: string;
  isMilestone?: boolean;
  milestoneTitle?: string;
  weeklyCycle: {
    learn: string;
    assessment: string;
    aiProcessing: string;
    review: string;
    nextAction: string;
  };
}

export interface PlatformModuleData {
  id: string;
  roleTitle: string;
  subtitle: string;
  iconName: string;
  features: {
    name: string;
    description: string;
  }[];
  mockStats: {
    label: string;
    value: string;
  }[];
  dashboardHighlights: string[];
}

export interface ProviderData {
  id: string;
  name: string;
  title: string;
  credentials: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  availability: 'Available Today' | 'Next Available: Tomorrow' | 'Available in 2 Days';
  isAvailableNow: boolean;
  providerType: 'Licensed Therapist' | 'Psychiatrist' | 'Clinical Psychologist' | 'Certified Life Coach';
  about: string;
  experienceYears: number;
  languages: string[];
}

export interface IntegrationData {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
  standard: string;
  benefit: string;
}

export interface BenefitGroupData {
  id: string;
  audience: string;
  headline: string;
  subheadline: string;
  benefits: {
    title: string;
    description: string;
  }[];
  keyMetric: {
    stat: string;
    label: string;
  };
}

export interface ReviewData {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
  verifiedStakeholder: boolean;
  tag: string;
}

export interface FAQData {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Institutions' | 'Coaches' | 'Clinical & Safety' | 'Curriculum';
}
