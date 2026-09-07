'use client';

import React from 'react';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { Button } from '@/components/common/Button/Button';
import { HeroEcosystem } from './HeroEcosystem';
import styles from './Hero.module.css';

export interface HeroProps {
  onGetStarted?: () => void;
  onExploreWorks?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onExploreWorks }) => {
  return (
    <section className={styles.heroSection} id="about">
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroGrid}>
          {/* Left Column: Messaging & Value Prop */}
          <div className={styles.heroContent}>
            {/* Wellness Badge */}
            <div className={styles.heroBadge}>
              <VerifiedUserOutlinedIcon className={styles.badgeIcon} />
              <span>Technology-Enabled Mental & Behavioral Wellness</span>
            </div>

            {/* Headline */}
            <h1 className={styles.heroHeadline}>
              A Structured Path to Better <span className={styles.gradientText}>Mental & Behavioral</span> Wellness
            </h1>

            {/* Supporting Text */}
            <p className={styles.heroSubtext}>
              WTF University connects institutions, students, life coaches and qualified providers through structured assessment, guided learning, professional supervision and Telehealth support.
            </p>

            {/* CTAs */}
            <div className={styles.heroCtaGroup}>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowForwardOutlinedIcon />}
                onClick={onGetStarted}
                className={styles.primaryCta}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<PlayCircleOutlineOutlinedIcon />}
                onClick={onExploreWorks}
                asLink
                href="#how-it-works"
                className={styles.secondaryCta}
              >
                Explore How It Works
              </Button>
            </div>

            {/* Reassurance Points */}
            <div className={styles.heroReassurances}>
              <div className={styles.reassuranceItem}>
                <CheckCircleOutlineIcon className={styles.checkIcon} />
                <span>HIPAA & FERPA Aligned</span>
              </div>
              <div className={styles.reassuranceItem}>
                <CheckCircleOutlineIcon className={styles.checkIcon} />
                <span>Qualified Clinical Oversight</span>
              </div>
              <div className={styles.reassuranceItem}>
                <CheckCircleOutlineIcon className={styles.checkIcon} />
                <span>988 Crisis Safety Integration</span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className={styles.metricsBar}>
              <div className={styles.metricItem}>
                <div className={styles.metricIconWrap}>
                  <GroupsOutlinedIcon />
                </div>
                <div>
                  <span className={styles.metricValue}>3-Way</span>
                  <span className={styles.metricLabel}>Unified Ecosystem</span>
                </div>
              </div>

              <div className={styles.metricDivider} />

              <div className={styles.metricItem}>
                <div className={styles.metricIconWrap}>
                  <LocalHospitalOutlinedIcon />
                </div>
                <div>
                  <span className={styles.metricValue}>100%</span>
                  <span className={styles.metricLabel}>Human Provider Sign-Off</span>
                </div>
              </div>

              <div className={styles.metricDivider} />

              <div className={styles.metricItem}>
                <div className={styles.metricIconWrap}>
                  <VerifiedUserOutlinedIcon />
                </div>
                <div>
                  <span className={styles.metricValue}>16 Weeks</span>
                  <span className={styles.metricLabel}>Structured Curriculum</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Connected Care Ecosystem */}
          <div className={styles.heroVisual}>
            <HeroEcosystem />
          </div>
        </div>
      </div>
    </section>
  );
};
