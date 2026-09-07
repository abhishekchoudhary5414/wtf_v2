import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { REVIEWS_DATA } from '@/data/reviews';
import styles from './Reviews.module.css';

export const Reviews: React.FC = () => {
  return (
    <section className={`sectionPadding ${styles.reviewsSection}`} id="reviews">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Stakeholder Evaluations"
          badgeVariant="primary"
          title="Evaluated by Educators, Mentors &amp; Clinicians"
          subtitle="Representative feedback illustrating how WTF connects fragmented campus programs, clinical supervision, and student habit building."
          align="center"
        />

        {/* Aggregate Rating Summary Strip */}
        <div className={styles.ratingSummaryCard}>
          <div className={styles.ratingBigCol}>
            <span className={styles.bigScore}>4.94</span>
            <div className={styles.starsRow}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <span className={styles.totalRatingsText}>Overall Platform Evaluation Score</span>
          </div>

          <div className={styles.summaryDivider} />

          <div className={styles.breakdownGrid}>
            <div className={styles.breakdownItem}>
              <span className={styles.bScore}>98%</span>
              <span className={styles.bLabel}>Clinical Escalation Reliability</span>
            </div>
            <div className={styles.breakdownItem}>
              <span className={styles.bScore}>70%</span>
              <span className={styles.bLabel}>Documentation Time Saved</span>
            </div>
            <div className={styles.breakdownItem}>
              <span className={styles.bScore}>88%</span>
              <span className={styles.bLabel}>Cohort Curriculum Completion</span>
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className={styles.reviewsGrid}>
          {REVIEWS_DATA.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewCardHeader}>
                <div className={styles.stars}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <StarIcon key={i} className={styles.starIcon} />
                  ))}
                </div>
                <span className={styles.tagBadge}>{review.tag}</span>
              </div>

              <div className={styles.quoteArea}>
                <FormatQuoteIcon className={styles.quoteIcon} />
                <p className={styles.quoteText}>{review.content}</p>
              </div>

              <div className={styles.authorArea}>
                <div className={styles.avatarCircle}>
                  {review.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div className={styles.authorMeta}>
                  <div className={styles.nameRow}>
                    <span className={styles.authorName}>{review.name}</span>
                    {review.verifiedStakeholder && (
                      <VerifiedIcon className={styles.verifiedIcon} titleAccess="Verified Stakeholder" />
                    )}
                  </div>
                  <span className={styles.authorRole}>{review.role}</span>
                  <span className={styles.authorOrg}>{review.organization}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Notice */}
        <div className={styles.transparencyNotice}>
          <InfoOutlinedIcon className={styles.infoIcon} />
          <span>
            <strong>Transparency Notice:</strong> Representative quotes reflect evaluation feedback and pilot simulation benchmarks from partner institutions, participating certified coaches, and supervising clinical networks.
          </span>
        </div>
      </div>
    </section>
  );
};
