'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { Hero } from '@/components/home/Hero/Hero';
import { ProblemSection } from '@/components/home/ProblemSection/ProblemSection';
import { SolutionSection } from '@/components/home/SolutionSection/SolutionSection';
import { EngagementModels } from '@/components/home/EngagementModels/EngagementModels';
import { HowItWorks } from '@/components/home/HowItWorks/HowItWorks';
import { Curriculum } from '@/components/home/Curriculum/Curriculum';
import { AssessmentWorkflow } from '@/components/home/AssessmentWorkflow/AssessmentWorkflow';
import { TherapyMedicalNecessity } from '@/components/home/TherapyMedicalNecessity/TherapyMedicalNecessity';
import { PlatformEcosystem } from '@/components/home/PlatformEcosystem/PlatformEcosystem';
import { ProviderNetwork } from '@/components/home/ProviderNetwork/ProviderNetwork';
import { AvatarEngagement } from '@/components/home/AvatarEngagement/AvatarEngagement';
import { CrisisHandling } from '@/components/home/CrisisHandling/CrisisHandling';
import { Integrations } from '@/components/home/Integrations/Integrations';
import { Benefits } from '@/components/home/Benefits/Benefits';
import { UserJourney } from '@/components/home/UserJourney/UserJourney';
import { Reviews } from '@/components/home/Reviews/Reviews';
import { FAQ } from '@/components/home/FAQ/FAQ';
import { FinalCTA } from '@/components/home/FinalCTA/FinalCTA';
import { OnboardingModal } from '@/components/home/OnboardingModal/OnboardingModal';
import { Modal } from '@/components/common/Modal/Modal';
import { Button } from '@/components/common/Button/Button';
import { authApi, User } from '@/lib/api';

export default function HomePage() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [selectedModelRole, setSelectedModelRole] = useState('student');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signedInUser, setSignedInUser] = useState<User | null>(null);

  const handleOpenGetStarted = (role = 'student') => {
    setSelectedModelRole(role);
    setIsOnboardingOpen(true);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setSignInError(null);
    try {
      const res = await authApi.login({ email: signInEmail, password: signInPassword });
      setSignedInUser(res.user);
      alert(`Authenticated successfully as ${res.user.full_name} (${res.user.role}). Redirecting to portal...`);
      setIsSignInOpen(false);
    } catch (err: any) {
      setSignInError(err.message || 'Authentication failed');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main>
      {/* Sticky Header */}
      <Header
        onOpenGetStarted={() => handleOpenGetStarted('student')}
        onOpenSignIn={() => setIsSignInOpen(true)}
      />

      {/* 1. Hero Section */}
      <Hero
        onGetStarted={() => handleOpenGetStarted('student')}
        onExploreWorks={() => {
          const el = document.getElementById('how-it-works');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Problem Section */}
      <ProblemSection />

      {/* 3. Solution Section: One Platform. One Connected Wellness Journey */}
      <SolutionSection />

      {/* 4. Three Engagement Models */}
      <EngagementModels
        onSelectModel={(modelId) => {
          if (modelId === 'institution-partnership') handleOpenGetStarted('institution');
          else if (modelId === 'certified-life-coach') handleOpenGetStarted('coach');
          else handleOpenGetStarted('student');
        }}
      />

      {/* 5. How WTF Works (10-Step Care Workflow Stepper) */}
      <HowItWorks />

      {/* 6. 16-Week Curriculum Section */}
      <Curriculum />

      {/* 7. Assessment & Professional Review Section */}
      <AssessmentWorkflow />

      {/* 8. Therapy & Medical Necessity Section */}
      <TherapyMedicalNecessity />

      {/* 9. Platform Ecosystem Section (Multi-Role Portals) */}
      <PlatformEcosystem />

      {/* 10. Provider Network Directory Preview */}
      <ProviderNetwork />

      {/* 11. Avatar & Engagement Section */}
      <AvatarEngagement />

      {/* 12. Crisis Handling & Safety Protocol Section */}
      <CrisisHandling />

      {/* 13. Integrated Technology Ecosystem */}
      <Integrations />

      {/* 14. Benefits Section by Stakeholder */}
      <Benefits />

      {/* 15. User Journey Visualization (End-to-End Pipeline) */}
      <UserJourney />

      {/* 16. Reviews & Stakeholder Evaluations */}
      <Reviews />

      {/* 17. FAQ Section */}
      <FAQ />

      {/* 18. Final Closing Call to Action */}
      <FinalCTA
        onGetStarted={() => handleOpenGetStarted('institution')}
        onContact={() => {
          window.location.href = 'mailto:partners@wtfuniversity.com';
        }}
      />

      {/* Footer */}
      <Footer />

      {/* Interactive Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        initialRole={selectedModelRole}
      />

      {/* Sign In Modal */}
      <Modal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        title="Sign In to WTF University"
        subtitle="Access your institutional dashboard, coaching portal, or student wellness journal."
        maxWidth="480px"
      >
        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {signInError && (
            <div style={{
              padding: '10px 14px',
              backgroundColor: '#fee2e2',
              border: '1px solid #f87171',
              borderRadius: '8px',
              color: '#b91c1c',
              fontSize: '0.85rem'
            }}>
              {signInError}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-heading)' }}>
              Work or Student Email
            </label>
            <input
              type="email"
              required
              placeholder="e.g. yourname@university.edu"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-heading)' }}>
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            disabled={isSigningIn}
          >
            {isSigningIn ? 'Authenticating...' : 'Authenticate & Enter Portal'}
          </Button>

          <div style={{ textAlign: 'center', marginTop: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Protected by Single Sign-On (SSO) &amp; 2-Factor Authentication
            </span>
          </div>
        </form>
      </Modal>
    </main>
  );
}
