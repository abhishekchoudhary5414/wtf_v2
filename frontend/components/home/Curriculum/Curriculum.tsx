'use client';

import React, { useState } from 'react';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { CURRICULUM_WEEKS } from '@/data/curriculumWeeks';
import styles from './Curriculum.module.css';

const PHASES = [
  { id: 'all', label: 'All 16 Weeks' },
  { id: 'p1', label: 'Phase 1: Baseline & Regulation (Weeks 1–4)' },
  { id: 'p2', label: 'Phase 2: Triggers & Distortions (Weeks 5–8)' },
  { id: 'p3', label: 'Phase 3: Relational & Mood Activation (Weeks 9–12)' },
  { id: 'p4', label: 'Phase 4: Resilience & Autonomy (Weeks 13–16)' },
];

export const Curriculum: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [expandedWeek, setExpandedWeek] = useState<number>(1);

  const filteredWeeks = CURRICULUM_WEEKS.filter((item) => {
    if (selectedPhase === 'p1') return item.week >= 1 && item.week <= 4;
    if (selectedPhase === 'p2') return item.week >= 5 && item.week <= 8;
    if (selectedPhase === 'p3') return item.week >= 9 && item.week <= 12;
    if (selectedPhase === 'p4') return item.week >= 13 && item.week <= 16;
    return true;
  });

  return (
    <section className={`sectionPadding ${styles.curriculumSection}`} id="curriculum">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Progressive Behavioral Architecture"
          badgeVariant="primary"
          title="A Structured 16-Week Wellness Journey"
          subtitle="A modular, evidence-informed curriculum addressing real-world stressors, emotional dysregulation, and habit formation. Paced to build sustained psychological agility."
          align="center"
        />

        {/* Milestone Progression Bar */}
        <div className={styles.milestoneBarCard}>
          <div className={styles.milestoneHeader}>
            <EmojiEventsOutlinedIcon className={styles.milestoneIcon} />
            <span className={styles.milestoneHeading}>
              Four Strategic Clinical Milestones
            </span>
          </div>

          <div className={styles.milestoneTrack}>
            <div className={styles.milestoneNode}>
              <span className={styles.milestoneWeek}>Week 01</span>
              <span className={styles.milestoneLabel}>Baseline Assessment</span>
            </div>
            <div className={styles.trackLine} />
            <div className={styles.milestoneNode}>
              <span className={styles.milestoneWeek}>Week 04</span>
              <span className={styles.milestoneLabel}>Regulation Check</span>
            </div>
            <div className={styles.trackLine} />
            <div className={styles.milestoneNode}>
              <span className={styles.milestoneWeek}>Week 08</span>
              <span className={styles.milestoneLabel}>Midpoint Audit</span>
            </div>
            <div className={styles.trackLine} />
            <div className={styles.milestoneNode}>
              <span className={styles.milestoneWeek}>Week 12</span>
              <span className={styles.milestoneLabel}>Resilience Gate</span>
            </div>
            <div className={styles.trackLine} />
            <div className={styles.milestoneNode}>
              <span className={styles.milestoneWeek}>Week 16</span>
              <span className={styles.milestoneLabel}>Capstone & Plan</span>
            </div>
          </div>
        </div>

        {/* Universal Closed-Loop Weekly Cycle Banner */}
        <div className={styles.cycleBanner}>
          <span className={styles.cycleTitle}>The Weekly Closed-Loop Protocol:</span>
          <div className={styles.cycleFlow}>
            <div className={styles.cycleStep}>
              <AutoStoriesOutlinedIcon className={styles.cycleIcon} />
              <span>Learn</span>
            </div>
            <ArrowForwardIcon className={styles.cycleArrow} />
            <div className={styles.cycleStep}>
              <FactCheckOutlinedIcon className={styles.cycleIcon} />
              <span>Complete Assessment</span>
            </div>
            <ArrowForwardIcon className={styles.cycleArrow} />
            <div className={styles.cycleStep}>
              <SmartToyOutlinedIcon className={styles.cycleIcon} />
              <span>AI-Assisted Processing</span>
            </div>
            <ArrowForwardIcon className={styles.cycleArrow} />
            <div className={styles.cycleStep}>
              <VerifiedUserOutlinedIcon className={styles.cycleIcon} />
              <span>Provider Review</span>
            </div>
            <ArrowForwardIcon className={styles.cycleArrow} />
            <div className={styles.cycleStep}>
              <span className={styles.cyclePill}>Continue / Escalate</span>
            </div>
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className={styles.phaseTabs}>
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              className={`${styles.phaseTabBtn} ${selectedPhase === phase.id ? styles.phaseTabBtnActive : ''}`}
              onClick={() => setSelectedPhase(phase.id)}
            >
              {phase.label}
            </button>
          ))}
        </div>

        {/* 16 Weeks Grid */}
        <div className={styles.weeksGrid}>
          {filteredWeeks.map((item) => {
            const isExpanded = expandedWeek === item.week;

            return (
              <div
                key={item.week}
                className={`${styles.weekCard} ${item.isMilestone ? styles.milestoneWeekCard : ''} ${
                  isExpanded ? styles.weekCardExpanded : ''
                }`}
                onClick={() => setExpandedWeek(item.week)}
              >
                <div className={styles.weekCardTop}>
                  <div className={styles.weekBadgeArea}>
                    <span className={styles.weekNumberPill}>
                      Week {item.week < 10 ? `0${item.week}` : item.week}
                    </span>
                    {item.isMilestone && (
                      <span className={styles.milestoneBadge}>
                        <EmojiEventsOutlinedIcon /> Milestone
                      </span>
                    )}
                  </div>
                  <span className={styles.domainTag}>{item.domain}</span>
                </div>

                <h4 className={styles.weekTitle}>{item.title}</h4>
                <p className={styles.weekObjective}>{item.coreObjective}</p>

                {/* Closed-loop inspection on click */}
                <div className={styles.weeklyCycleDetails}>
                  <div className={styles.cycleDetailRow}>
                    <span className={styles.cycleDetailKey}>Learn:</span>
                    <span className={styles.cycleDetailVal}>{item.weeklyCycle.learn}</span>
                  </div>
                  <div className={styles.cycleDetailRow}>
                    <span className={styles.cycleDetailKey}>Assessment:</span>
                    <span className={styles.cycleDetailVal}>{item.weeklyCycle.assessment}</span>
                  </div>
                  <div className={styles.cycleDetailRow}>
                    <span className={styles.cycleDetailKey}>Clinical Gate:</span>
                    <span className={styles.cycleDetailVal}>{item.weeklyCycle.review}</span>
                  </div>
                </div>

                <div className={styles.weekCardFooter}>
                  <span className={styles.viewCyclePrompt}>
                    {isExpanded ? 'Active Week Selected' : 'Click to inspect weekly cycle'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Non-Medical Claim Disclaimer Callout */}
        <div className={styles.disclaimerBox}>
          <InfoOutlinedIcon className={styles.infoIcon} />
          <p className={styles.disclaimerContent}>
            <strong>Educational & Behavioral Wellness Notice:</strong> The WTF 16-Week Curriculum provides structured educational self-awareness, distress tolerance drills, and habit restructuring. It does not claim to &quot;cure&quot; clinical depression or anxiety disorders. Clinical psychotherapy and medical diagnoses are conducted exclusively by licensed in-house providers when clinically warranted.
          </p>
        </div>
      </div>
    </section>
  );
};
