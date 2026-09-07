'use client';

import React, { useState } from 'react';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { PLATFORM_MODULES } from '@/data/platformModules';
import styles from './PlatformEcosystem.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  AdminPanelSettingsOutlined: <AdminPanelSettingsOutlinedIcon />,
  MedicalServicesOutlined: <MedicalServicesOutlinedIcon />,
  SchoolOutlined: <SchoolOutlinedIcon />,
  PsychologyOutlined: <PsychologyOutlinedIcon />,
  PersonOutline: <PersonOutlineIcon />,
};

export const PlatformEcosystem: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>('provider');
  const activeModule = PLATFORM_MODULES.find((m) => m.id === activeModuleId) || PLATFORM_MODULES[0];

  return (
    <section className={`sectionPadding ${styles.ecosystemSection}`} id="portals">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Role-Tailored Portals"
          badgeVariant="primary"
          title="Five Dedicated Portals. One Cohesive Ecosystem."
          subtitle="Every participant experiences a purpose-built workspace engineered for their clinical, educational, or mentoring responsibilities."
          align="center"
        />

        {/* Portal Role Tabs */}
        <div className={styles.roleTabs}>
          {PLATFORM_MODULES.map((m) => {
            const isActive = m.id === activeModuleId;

            return (
              <button
                key={m.id}
                className={`${styles.roleTabBtn} ${isActive ? styles.roleTabBtnActive : ''}`}
                onClick={() => setActiveModuleId(m.id)}
              >
                <div className={styles.tabIconWrap}>
                  {ICON_MAP[m.iconName] || <DashboardOutlinedIcon />}
                </div>
                <span>{m.roleTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard Showcase Card */}
        <div className={styles.dashboardShowcase}>
          {/* Top Window Bar */}
          <div className={styles.windowHeader}>
            <div className={styles.windowControls}>
              <span className={`${styles.circleDot} ${styles.dotRed}`} />
              <span className={`${styles.circleDot} ${styles.dotYellow}`} />
              <span className={`${styles.circleDot} ${styles.dotGreen}`} />
            </div>
            <div className={styles.windowAddressBar}>
              <span>app.wtfuniversity.com/{activeModule.id}</span>
            </div>
            <span className={styles.secureTag}>🔒 256-Bit Encrypted Portal</span>
          </div>

          <div className={styles.dashboardBody}>
            {/* Left Column: Role Details & Core Modules */}
            <div className={styles.leftCol}>
              <div className={styles.moduleTitleRow}>
                <div className={styles.moduleIconLarge}>
                  {ICON_MAP[activeModule.iconName] || <DashboardOutlinedIcon />}
                </div>
                <div>
                  <span className={styles.moduleBadge}>Active Workspace Preview</span>
                  <h3 className={styles.moduleTitle}>{activeModule.roleTitle}</h3>
                  <p className={styles.moduleSub}>{activeModule.subtitle}</p>
                </div>
              </div>

              {/* Mock Stat Badges */}
              <div className={styles.statsRow}>
                {activeModule.mockStats.map((stat, i) => (
                  <div key={i} className={styles.statCard}>
                    <span className={styles.statVal}>{stat.value}</span>
                    <span className={styles.statLbl}>{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Module Feature Checklist */}
              <div className={styles.featuresArea}>
                <h5 className={styles.featuresHeading}>Dedicated Capabilities:</h5>
                <div className={styles.featuresGrid}>
                  {activeModule.features.map((feat, i) => (
                    <div key={i} className={styles.featureItem}>
                      <CheckCircleOutlineIcon className={styles.featCheck} />
                      <div>
                        <span className={styles.featName}>{feat.name}</span>
                        <p className={styles.featDesc}>{feat.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Portal UI Mockup Panel */}
            <div className={styles.rightCol}>
              <div className={styles.uiMockup}>
                <div className={styles.mockupHeader}>
                  <div className={styles.mockupUser}>
                    <div className={styles.userAvatar}>
                      {activeModule.roleTitle[0]}
                    </div>
                    <div>
                      <span className={styles.userName}>Authorized User</span>
                      <span className={styles.userRoleTag}>{activeModule.roleTitle}</span>
                    </div>
                  </div>
                  <span className={styles.liveIndicator}>
                    <span className={styles.liveDot} /> Live Session
                  </span>
                </div>

                <div className={styles.mockupMainFeed}>
                  <div className={styles.feedCardHighlight}>
                    <div className={styles.feedCardTop}>
                      <TrendingUpOutlinedIcon className={styles.feedIcon} />
                      <span className={styles.feedTitle}>Real-Time Operational Feed</span>
                    </div>
                    <ul className={styles.highlightList}>
                      {activeModule.dashboardHighlights.map((hl, idx) => (
                        <li key={idx} className={styles.highlightItem}>
                          <span className={styles.highlightDot}>•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.quickActionsMock}>
                    <span className={styles.actionHeader}>Common Task Shortcuts:</span>
                    <div className={styles.shortcutButtons}>
                      <span className={styles.shortcutBtn}>Export Compliance Log</span>
                      <span className={styles.shortcutBtn}>Launch Video Suite</span>
                      <span className={styles.shortcutBtn}>Review Escalations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
