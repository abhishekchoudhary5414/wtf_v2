import React from 'react';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { PROBLEMS_DATA } from '@/data/problems';
import styles from './ProblemSection.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  WidgetsOutlined: <WidgetsOutlinedIcon />,
  MedicalServicesOutlined: <MedicalServicesOutlinedIcon />,
  AltRouteOutlinedIcon: <AltRouteOutlinedIcon />,
  AltRouteOutlined: <AltRouteOutlinedIcon />,
  HubOutlined: <HubOutlinedIcon />,
};

export const ProblemSection: React.FC = () => {
  return (
    <section className={`sectionPadding ${styles.problemSection}`} id="problems">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Current Behavioral Wellness Gaps"
          badgeVariant="warning"
          title="The Problem We're Solving"
          subtitle="Educational institutions and independent mentors want to support students, but broken escalation chains and siloed tools create systemic risks."
          align="center"
        />

        {/* 4 Problem Cards Grid */}
        <div className={styles.problemsGrid}>
          {PROBLEMS_DATA.map((problem) => (
            <div key={problem.id} className={styles.problemCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  {ICON_MAP[problem.iconName] || <WarningAmberOutlinedIcon />}
                </div>
                <span className={styles.categoryBadge}>{problem.category}</span>
              </div>

              <h3 className={styles.problemTitle}>{problem.title}</h3>
              <p className={styles.problemDesc}>{problem.description}</p>

              {/* The Risk / Bottleneck */}
              <div className={styles.riskBox}>
                <span className={styles.riskLabel}>Systemic Impact:</span>
                <p className={styles.riskText}>{problem.impactNote}</p>
              </div>

              {/* WTF Solution */}
              <div className={styles.solutionBox}>
                <div className={styles.solutionHeader}>
                  <CheckCircleOutlineIcon className={styles.solutionIcon} />
                  <span className={styles.solutionLabel}>The WTF Solution:</span>
                </div>
                <p className={styles.solutionText}>{problem.wtfSolution}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Transformation Transition Banner */}
        <div className={styles.transformationBanner}>
          <div className={styles.transformInner}>
            <div className={styles.transformSideLeft}>
              <div className={styles.transformStatusDotRed} />
              <div className={styles.transformTextCol}>
                <span className={styles.transformTag}>Status Quo</span>
                <span className={styles.transformTitle}>Fragmented Support & Siloed Tools</span>
                <span className={styles.transformSub}>Uncoordinated coaches, lost assessments, delayed clinical intervention</span>
              </div>
            </div>

            <div className={styles.transformArrowWrap}>
              <div className={styles.transformPulseLine} />
              <div className={styles.transformArrowCircle}>
                <ArrowForwardIcon />
              </div>
              <span className={styles.transformPill}>WTF Bridges the Gap</span>
            </div>

            <div className={styles.transformSideRight}>
              <div className={styles.transformStatusDotGreen} />
              <div className={styles.transformTextCol}>
                <span className={styles.transformTagGreen}>WTF Solution</span>
                <span className={styles.transformTitleGreen}>WTF Unified Wellness Platform</span>
                <span className={styles.transformSubGreen}>Connected institutions, coaches, licensed providers, and EHR workflows</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
