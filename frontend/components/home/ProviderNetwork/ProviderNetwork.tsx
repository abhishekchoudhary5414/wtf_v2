'use client';

import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { Button } from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal/Modal';
import { PROVIDERS_DATA } from '@/data/providers';
import { ProviderData } from '@/types';
import styles from './ProviderNetwork.module.css';

const TYPES = ['All Types', 'Licensed Therapist', 'Psychiatrist', 'Clinical Psychologist', 'Certified Life Coach'];

export const ProviderNetwork: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [activeModalProvider, setActiveModalProvider] = useState<ProviderData | null>(null);

  const filteredProviders = PROVIDERS_DATA.filter((p) => {
    if (selectedType !== 'All Types' && p.providerType !== selectedType) return false;
    if (availableOnly && !p.isAvailableNow) return false;
    return true;
  });

  return (
    <section className={`sectionPadding ${styles.providerSection}`} id="providers">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Vetted Clinical Network"
          badgeVariant="primary"
          title="Qualified Providers & Certified Coaches"
          subtitle="WTF pairs every student with certified life coaches for weekly habit restructuring, backed by board-certified psychiatrists and licensed therapists for clinical care."
          align="center"
        />

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterGroupLeft}>
            <FilterAltOutlinedIcon className={styles.filterIcon} />
            <span className={styles.filterLabel}>Filter Network:</span>

            <div className={styles.typeButtons}>
              {TYPES.map((type) => (
                <button
                  key={type}
                  className={`${styles.typeBtn} ${selectedType === type ? styles.typeBtnActive : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Available Now */}
          <div className={styles.toggleWrap}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className={styles.checkboxInput}
              />
              <span className={styles.toggleCustom} />
              <span className={styles.toggleText}>Available Today Only</span>
            </label>
          </div>
        </div>

        {/* Providers Grid */}
        <div className={styles.providersGrid}>
          {filteredProviders.map((provider) => (
            <div key={provider.id} className={styles.providerCard}>
              {/* Card Top */}
              <div className={styles.cardHeader}>
                <div className={styles.avatarWrap}>
                  <div className={styles.avatar}>
                    {provider.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div className={styles.verifiedBadge} title="WTF Credential Verified">
                    <VerifiedIcon />
                  </div>
                </div>

                <div className={styles.headerInfo}>
                  <div className={styles.availabilityPill}>
                    <span
                      className={`${styles.availDot} ${
                        provider.isAvailableNow ? styles.availGreen : styles.availAmber
                      }`}
                    />
                    {provider.availability}
                  </div>
                  <h3 className={styles.providerName}>{provider.name}</h3>
                  <span className={styles.providerTitle}>{provider.title}</span>
                  <span className={styles.providerCredentials}>{provider.credentials}</span>
                </div>
              </div>

              {/* Rating Strip */}
              <div className={styles.ratingStrip}>
                <div className={styles.starsWrap}>
                  <StarIcon className={styles.starFilled} />
                  <StarIcon className={styles.starFilled} />
                  <StarIcon className={styles.starFilled} />
                  <StarIcon className={styles.starFilled} />
                  <StarHalfIcon className={styles.starFilled} />
                </div>
                <span className={styles.ratingScore}>{provider.rating}</span>
                <span className={styles.reviewCount}>({provider.reviewCount} reviews)</span>
              </div>

              {/* About snippet */}
              <p className={styles.aboutText}>{provider.about}</p>

              {/* Specialties */}
              <div className={styles.specialtiesBox}>
                <span className={styles.specLabel}>Specialties:</span>
                <div className={styles.specTags}>
                  {provider.specialties.slice(0, 3).map((spec, i) => (
                    <span key={i} className={styles.specTag}>
                      {spec}
                    </span>
                  ))}
                  {provider.specialties.length > 3 && (
                    <span className={styles.specTagMore}>+{provider.specialties.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className={styles.cardAction}>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setActiveModalProvider(provider)}
                >
                  View Profile &amp; Availability
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Provider Profile Modal */}
        {activeModalProvider && (
          <Modal
            isOpen={Boolean(activeModalProvider)}
            onClose={() => setActiveModalProvider(null)}
            title={activeModalProvider.name}
            subtitle={`${activeModalProvider.title} • ${activeModalProvider.credentials}`}
            maxWidth="680px"
          >
            <div className={styles.modalContent}>
              <div className={styles.modalMetaRow}>
                <div className={styles.modalMetaItem}>
                  <WorkOutlineOutlinedIcon className={styles.modalMetaIcon} />
                  <span>{activeModalProvider.experienceYears} Years Clinical Experience</span>
                </div>
                <div className={styles.modalMetaItem}>
                  <LanguageOutlinedIcon className={styles.modalMetaIcon} />
                  <span>Languages: {activeModalProvider.languages.join(', ')}</span>
                </div>
                <div className={styles.modalMetaItem}>
                  <VideoCameraFrontOutlinedIcon className={styles.modalMetaIcon} />
                  <span>WebRTC Telehealth Supported</span>
                </div>
              </div>

              <div className={styles.modalSection}>
                <h5 className={styles.modalSectionTitle}>About Practitioner:</h5>
                <p className={styles.modalBioText}>{activeModalProvider.about}</p>
              </div>

              <div className={styles.modalSection}>
                <h5 className={styles.modalSectionTitle}>Clinical Specialties &amp; Focus Areas:</h5>
                <div className={styles.modalSpecGrid}>
                  {activeModalProvider.specialties.map((spec, i) => (
                    <div key={i} className={styles.modalSpecPill}>
                      <CheckCircleOutlineIcon className={styles.modalCheck} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.modalSection}>
                <h5 className={styles.modalSectionTitle}>WTF Scope &amp; Escalation Standard:</h5>
                <p className={styles.modalScopeNote}>
                  All appointments are coordinated directly through the WTF assessment-to-support loop. Licensed clinicians conduct confidential, 1-on-1 virtual psychotherapy and medical consultations adhering to state licensure guidelines.
                </p>
              </div>

              <div className={styles.modalActions}>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setActiveModalProvider(null);
                    alert(`Consultation inquiry for ${activeModalProvider.name} initiated.`);
                  }}
                >
                  Schedule Telehealth Consultation
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};
