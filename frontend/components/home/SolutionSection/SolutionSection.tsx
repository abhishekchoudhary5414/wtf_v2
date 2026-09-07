'use client';

import React, { useState } from 'react';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { ECOSYSTEM_ENTITIES } from '@/data/ecosystem';
import { EcosystemEntity } from '@/types';
import styles from './SolutionSection.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  SchoolOutlined: <SchoolOutlinedIcon />,
  LocalLibraryOutlined: <LocalLibraryOutlinedIcon />,
  PsychologyOutlined: <PsychologyOutlinedIcon />,
  ManageAccountsOutlined: <ManageAccountsOutlinedIcon />,
  SelfImprovementOutlined: <SelfImprovementOutlinedIcon />,
  PersonOutline: <PersonOutlineIcon />,
  HealthAndSafetyOutlined: <HealthAndSafetyOutlinedIcon />,
  VolunteerActivismOutlined: <VolunteerActivismOutlinedIcon />,
  AdminPanelSettingsOutlined: <AdminPanelSettingsOutlinedIcon />,
};

const CATEGORIES = [
  { id: 'all', label: 'All 9 Ecosystem Roles' },
  { id: 'institution', label: 'Institutions & Faculty' },
  { id: 'coach', label: 'Life Coaches' },
  { id: 'student', label: 'Students & Patients' },
  { id: 'clinical', label: 'Providers & Therapists' },
  { id: 'admin', label: 'Governance & Admin' },
];

export const SolutionSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeEntity, setActiveEntity] = useState<EcosystemEntity>(ECOSYSTEM_ENTITIES[0]);

  const filteredEntities = selectedCategory === 'all'
    ? ECOSYSTEM_ENTITIES
    : ECOSYSTEM_ENTITIES.filter((e) => e.category === selectedCategory);

  return (
    <section className={`sectionPadding ${styles.solutionSection}`} id="solution">
      <div className="container">
        {/* Header */}
        <SectionHeader
          badge="WTF Unified Architecture"
          badgeVariant="primary"
          title="One Platform. One Connected Wellness Journey."
          subtitle="WTF brings 9 essential stakeholders into a single, synchronized behavioral care loop. No dropped handoffs, no unmonitored students, and no clinical liability ambiguity."
          align="center"
        />

        {/* Filter Pills */}
        <div className={styles.categoryFilters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.filterBtnActive : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Two-Column Interactive Ecosystem Layout */}
        <div className={styles.ecosystemLayout}>
          {/* Left: Entity Grid */}
          <div className={styles.entityGrid}>
            {filteredEntities.map((entity) => {
              const isSelected = activeEntity.id === entity.id;

              return (
                <div
                  key={entity.id}
                  className={`${styles.entityCard} ${isSelected ? styles.entityCardActive : ''}`}
                  onClick={() => setActiveEntity(entity)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveEntity(entity);
                    }
                  }}
                >
                  <div className={styles.entityIconWrap}>
                    {ICON_MAP[entity.iconName] || <HubOutlinedIcon />}
                  </div>
                  <div className={styles.entityMeta}>
                    <h4 className={styles.entityTitle}>{entity.title}</h4>
                    <span className={styles.entityRole}>{entity.role}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Active Role Inspector Card */}
          <div className={styles.inspectorContainer}>
            <div className={styles.inspectorCard}>
              <div className={styles.inspectorHeader}>
                <div className={styles.inspectorIconLarge}>
                  {ICON_MAP[activeEntity.iconName] || <HubOutlinedIcon />}
                </div>
                <div className={styles.inspectorTitleBlock}>
                  <span className={styles.inspectorCategoryPill}>
                    Role in WTF Care Loop
                  </span>
                  <h3 className={styles.inspectorTitle}>{activeEntity.title}</h3>
                  <span className={styles.inspectorRoleTag}>{activeEntity.role}</span>
                </div>
              </div>

              <p className={styles.inspectorDesc}>{activeEntity.description}</p>

              <div className={styles.responsibilitiesBlock}>
                <h5 className={styles.respHeading}>Core Responsibilities & Workflow Integration:</h5>
                <ul className={styles.respList}>
                  {activeEntity.responsibilities.map((resp, i) => (
                    <li key={i} className={styles.respItem}>
                      <CheckCircleOutlineIcon className={styles.respCheckIcon} />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.inspectorFooter}>
                <span className={styles.inspectorSafeBadge}>
                  ✓ Governed by WTF scope protocols & clinical supervisory guardrails
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
