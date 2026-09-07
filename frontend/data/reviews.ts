import { ReviewData } from '@/types';

export const REVIEWS_DATA: ReviewData[] = [
  {
    id: 'review-1',
    name: 'Dr. Rebecca Vance',
    role: 'Associate Dean of Student Affairs',
    organization: 'Midwest Collegiate System',
    content:
      'WTF University provided the missing link between our residence hall advisors and licensed clinical therapists. Our students now have an engaging, structured 16-week progression rather than waiting until midterms to seek help.',
    rating: 5,
    verifiedStakeholder: true,
    tag: 'Institutional Partner Evaluation',
  },
  {
    id: 'review-2',
    name: 'Jordan Miller',
    role: 'WTF Certified Life Coach',
    organization: 'Peak Mind Youth Academy',
    content:
      'As an independent coach, my biggest anxiety was what to do when a student showed signs of clinical depression. With WTF, the clinical supervision and instant one-click provider escalation gives me total peace of mind to focus on behavioral coaching.',
    rating: 5,
    verifiedStakeholder: true,
    tag: 'Certified Coach Evaluation',
  },
  {
    id: 'review-3',
    name: 'Dr. Arthur Sterling',
    role: 'Board-Certified Psychiatrist',
    organization: 'WTF Clinical Provider Network',
    content:
      'The AI medical-scribe workflow produces remarkably thorough, structured assessment notes that highlight the exact symptom clusters I need. I can review and sign off with high confidence, saving hours of redundant charting every week.',
    rating: 5,
    verifiedStakeholder: true,
    tag: 'Clinical Provider Evaluation',
  },
  {
    id: 'review-4',
    name: 'Samantha K.',
    role: 'Sophomore Student (Pre-Med)',
    organization: 'State University Pilot Cohort',
    content:
      'The 16-week curriculum helped me understand why I was snapping at roommates during exams. The avatar and weekly reflections felt personal and motivating, and knowing a real therapist looked over my check-ins made me feel truly supported.',
    rating: 5,
    verifiedStakeholder: true,
    tag: 'Student Participant Feedback',
  },
  {
    id: 'review-5',
    name: 'Coach Darryl Washington',
    role: 'Head of Athletic Performance',
    organization: 'National Junior Athletics Institute',
    content:
      'Student athletes often hide mental frustration until it impacts performance on the field. WTF gave our coaching staff the vocabulary and structured assessment workflows to support athletes before burnout occurs.',
    rating: 5,
    verifiedStakeholder: true,
    tag: 'Athletic Department Partner',
  },
];
