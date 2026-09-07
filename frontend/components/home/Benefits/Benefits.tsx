'use client';

import React, { useState } from 'react';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { BENEFITS_DATA } from '@/data/benefits';
import styles from './Benefits.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  institutions: <SchoolOutlinedIcon />,
  students: <PersonOutlineIcon />,
  coaches: <SelfImprovementOutlinedIcon />,
  providers: <HealthAndSafetyOutlinedIcon />,
  admin: <AdminPanelSettingsOutlinedIcon />,
};

export const Benefits: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('institutions');
  const activeBenefit = BENEFITS_DATA.find((b) => b.id === activeTabId) || BENEFITS_DATA[0];

  return (
    <section className={`sectionPadding ${styles.benefitsSection}`} id="benefits">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Measurable Value Across Stakeholders"
          badgeVariant="primary"
          title="Why WTF University Delivers Lasting Value"
          subtitle="A truly systemic behavioral wellness solution must solve the distinct operational, clinical, and mentoring hurdles faced by every community participant."
          align="center"
        />

        {/* Audience Selector Tabs */}
        <div className={styles.tabsContainer}>
          {BENEFITS_DATA.map((item) => {
            const isActive = item.id === activeTabId;

            return (
              <button
                key={item.id}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTabId(item.id)}
              >
                <div className={styles.tabIcon}>
                  {ICON_MAP[item.id] || <SchoolOutlinedIcon />}
                </div>
                <span>{item.audience}</span>
              </button>
            );
          })}
        </div>

        {/* Active Benefit Card */}
        <div className={styles.benefitDisplayCard}>
          <div className={styles.benefitDisplayInner}>
            <div className={styles.benefitContent}>
              <div className={styles.audienceTagRow}>
                <span className={styles.audienceBadge}>{activeBenefit.audience}</span>
              </div>

              <h3 className={styles.benefitHeadline}>{activeBenefit.headline}</h3>
              <p className={styles.benefitSub}>{activeBenefit.subheadline}</p>

              {/* 4 Feature Items Grid */}
              <div className={styles.benefitsGrid}>
                {activeBenefit.benefits.map((b, idx) => (
                  <div key={idx} className={styles.benefitItem}>
                    <CheckCircleOutlineIcon className={styles.checkIcon} />
                    <div>
                      <h4 className={styles.bTitle}>{b.title}</h4>
                      <p className={styles.bDesc}>{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Callout Card */}
            <div className={styles.metricCallout}>
              <div className={styles.metricCardInner}>
                <div className={styles.metricIconWrap}>
                  <TrendingUpOutlinedIcon />
                </div>
                <span className={styles.metricStat}>{activeBenefit.keyMetric.stat}</span>
                <p className={styles.metricLabel}>{activeBenefit.keyMetric.label}</p>
                <span className={styles.metricAuditBadge}>
                  ✓ Verified Platform Benchmark
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
