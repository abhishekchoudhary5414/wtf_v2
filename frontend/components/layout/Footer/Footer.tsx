import React from 'react';
import Link from 'next/link';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import { FOOTER_SECTIONS } from '@/data/navigation';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {/* 988 Safety & Crisis Lifeline Banner */}
      <div className={styles.crisisBanner}>
        <div className={`container ${styles.crisisBannerInner}`}>
          <div className={styles.crisisInfo}>
            <div className={styles.crisisIconWrap}>
              <PhoneInTalkOutlinedIcon />
            </div>
            <div>
              <span className={styles.crisisTitle}>Immediate 24/7 Crisis Support Available</span>
              <p className={styles.crisisText}>
                If you or someone you know is struggling or in crisis, help is available. Call or text <strong>988</strong> to connect with the Suicide & Crisis Lifeline. In an emergency, dial <strong>911</strong>.
              </p>
            </div>
          </div>
          <div className={styles.crisisActions}>
            <a href="tel:988" className={styles.crisisCallBtn}>
              Dial 988 Lifeline
            </a>
            <a href="sms:741741" className={styles.crisisTextBtn}>
              Text HOME to 741741
            </a>
          </div>
        </div>
      </div>

      <div className={`container ${styles.mainFooter}`}>
        <div className={styles.grid}>
          {/* Brand & Mission Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoLink}>
              <div className={styles.logoBadge}>
                <SpaOutlinedIcon />
              </div>
              <div className={styles.logoText}>
                <span className={styles.brandName}>WTF University</span>
                <span className={styles.brandTagline}>Behavioral Wellness Ecosystem</span>
              </div>
            </Link>
            <p className={styles.brandBio}>
              WTF University connects institutions, students, life coaches, and qualified providers through structured assessment, guided learning, professional supervision, and integrated Telehealth.
            </p>
            <div className={styles.complianceBadges}>
              <div className={styles.complianceItem}>
                <SecurityOutlinedIcon className={styles.badgeIcon} />
                <span>HIPAA Aligned</span>
              </div>
              <div className={styles.complianceItem}>
                <VerifiedUserOutlinedIcon className={styles.badgeIcon} />
                <span>FERPA Compliant</span>
              </div>
              <div className={styles.complianceItem}>
                <HealthAndSafetyOutlinedIcon className={styles.badgeIcon} />
                <span>Licensed Provider Oversight</span>
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className={styles.navCol}>
              <h4 className={styles.navTitle}>{section.title}</h4>
              <ul className={styles.linkList}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Clinical Disclaimer & Regulatory Safeguards */}
        <div className={styles.disclaimerSection}>
          <div className={styles.disclaimerBox}>
            <h5 className={styles.disclaimerTitle}>Clinical Scope & Healthcare Safeguards</h5>
            <p className={styles.disclaimerText}>
              WTF University is a technology-enabled behavioral wellness and care-coordination SaaS platform. WTF University is not an acute emergency dispatch service. The platform provides structured self-guided learning, non-clinical behavioral life coaching, and coordinated access to independent licensed healthcare providers. Life coaches provide educational and habit mentorship within defined non-clinical scopes and do not provide medical diagnosis, psychotherapy, or psychiatric treatment.
            </p>
            <p className={styles.disclaimerText}>
              AI features on WTF University function strictly as assistive administrative documentation tools and do not make autonomous clinical judgments. Final clinical determinations, therapy prescriptions, and medical evaluations are made exclusively by licensed human healthcare professionals.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} WTF University, Inc. All rights reserved. Transforming behavioral wellness through structured care.
          </p>
          <div className={styles.legalLinks}>
            <a href="#privacy" className={styles.legalLink}>Privacy Policy</a>
            <span className={styles.legalDot}>•</span>
            <a href="#terms" className={styles.legalLink}>Terms of Service</a>
            <span className={styles.legalDot}>•</span>
            <a href="#baa" className={styles.legalLink}>HIPAA BAA</a>
            <span className={styles.legalDot}>•</span>
            <a href="#security" className={styles.legalLink}>Security & Trust Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
