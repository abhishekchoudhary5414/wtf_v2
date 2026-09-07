import { NavItem } from '@/types';

export const HEADER_NAV_LINKS: NavItem[] = [
  { label: 'What is WTF?', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Engagement Models', href: '#engagement-models' },
  // { label: '16-Week Program', href: '#curriculum' },
  // { label: 'For Institutions', href: '#benefits' },
  // { label: 'For Life Coaches', href: '#benefits' },
  // { label: 'For Students', href: '#benefits' },
  // { label: 'Providers', href: '#providers' },
  { label: 'FAQ', href: '#faq' },
];

export const FOOTER_SECTIONS = [
  {
    title: 'Platform',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: '16-Week Curriculum', href: '#curriculum' },
      { label: 'AI Clinical Scribe', href: '#assessment-workflow' },
      { label: 'Integrated Telehealth', href: '#therapy-necessity' },
      { label: 'EHR & Billing Workflows', href: '#integrations' },
      { label: 'Crisis Safety Protocol', href: '#crisis-safety' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'For Universities & Colleges', href: '#engagement-models' },
      { label: 'For K-12 & Schools', href: '#engagement-models' },
      { label: 'For Sports Organizations', href: '#engagement-models' },
      { label: 'For Certified Life Coaches', href: '#engagement-models' },
      { label: 'For Licensed Therapists', href: '#providers' },
      { label: 'For Students & Patients', href: '#benefits' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Clinical Review Standards', href: '#assessment-workflow' },
      { label: 'Life Coach Scope Guidelines', href: '#engagement-models' },
      { label: 'Provider Credentialing', href: '#providers' },
      { label: 'HIPAA & Data Security', href: '#integrations' },
      { label: 'Platform FAQs', href: '#faq' },
    ],
  },
  {
    title: 'Support & Emergency',
    links: [
      { label: 'Crisis Lifeline: Dial 988', href: 'tel:988' },
      { label: 'Crisis Text Line: Text HOME to 741741', href: 'sms:741741' },
      { label: 'Emergency Services: Dial 911', href: 'tel:911' },
      { label: 'Contact Support Desk', href: 'mailto:support@wtfuniversity.com' },
      { label: 'Schedule Institutional Demo', href: '#get-started' },
    ],
  },
];
