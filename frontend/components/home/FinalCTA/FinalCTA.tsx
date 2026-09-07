import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import { Button } from '@/components/common/Button/Button';
import styles from './FinalCTA.module.css';

export interface FinalCTAProps {
  onGetStarted?: () => void;
  onContact?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onGetStarted, onContact }) => {
  return (
    <section className={styles.ctaSection} id="get-started">
      <div className="container">
        <div className={styles.ctaCard}>
          {/* Subtle Ambient Icon */}
          <div className={styles.ambientIconWrap}>
            <SpaOutlinedIcon />
          </div>

          <div className={styles.ctaContent}>
            <span className={styles.ctaBadge}>Transform Behavioral Wellness Today</span>

            <h2 className={styles.ctaHeadline}>
              Build a More Structured Wellness Journey
            </h2>

            <p className={styles.ctaSubtext}>
              Connect your institution, students, life coaches, and qualified professional providers through one integrated WTF University platform.
            </p>

            <div className={styles.ctaButtons}>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowForwardIcon />}
                onClick={onGetStarted}
                className={styles.mainCtaBtn}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<ChatOutlinedIcon />}
                onClick={onContact}
                asLink
                href="mailto:partners@wtfuniversity.com"
                className={styles.secondaryCtaBtn}
              >
                Talk to WTF University
              </Button>
            </div>

            <div className={styles.reassurancesList}>
              <div className={styles.reassurance}>
                <CheckCircleOutlineIcon className={styles.checkIcon} />
                <span>HIPAA &amp; FERPA Aligned</span>
              </div>
              <div className={styles.reassurance}>
                <CheckCircleOutlineIcon className={styles.checkIcon} />
                <span>100% Human Clinician Sign-Off</span>
              </div>
              <div className={styles.reassurance}>
                <CheckCircleOutlineIcon className={styles.checkIcon} />
                <span>988 Crisis Protocol Integration</span>
              </div>
              <div className={styles.reassurance}>
                <CheckCircleOutlineIcon className={styles.checkIcon} />
                <span>Rapid Institutional Provisioning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
