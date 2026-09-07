'use client';

import React, { useState } from 'react';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { Button } from '@/components/common/Button/Button';
import { HOW_IT_WORKS_STEPS } from '@/data/howItWorksSteps';
import styles from './HowItWorks.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  LoginOutlined: <LoginOutlinedIcon />,
  AssignmentTurnedInOutlined: <AssignmentTurnedInOutlinedIcon />,
  SmartToyOutlined: <SmartToyOutlinedIcon />,
  VerifiedUserOutlined: <VerifiedUserOutlinedIcon />,
  RouteOutlined: <RouteOutlinedIcon />,
  MenuBookOutlined: <MenuBookOutlinedIcon />,
  FactCheckOutlined: <FactCheckOutlinedIcon />,
  NotificationImportantOutlined: <NotificationImportantOutlinedIcon />,
  VideoCameraFrontOutlined: <VideoCameraFrontOutlinedIcon />,
  ReceiptLongOutlined: <ReceiptLongOutlinedIcon />,
};

export const HowItWorks: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = HOW_IT_WORKS_STEPS[activeStepIndex];

  return (
    <section className={`sectionPadding ${styles.howSection}`} id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="10-Step Care Workflow"
          badgeVariant="primary"
          title="From First Assessment to Ongoing Support"
          subtitle="Every student follows an accountable, clinically validated 10-step protocol. Explore each phase of the assessment-to-intervention journey below."
          align="center"
        />

        {/* Stepper Navigation Strip */}
        <div className={styles.stepperStrip}>
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={step.stepNumber}
                className={`${styles.stepNavBtn} ${isActive ? styles.stepNavBtnActive : ''} ${
                  isCompleted ? styles.stepNavBtnCompleted : ''
                }`}
                onClick={() => setActiveStepIndex(idx)}
                aria-label={`Step ${step.stepNumber}: ${step.title}`}
              >
                <div className={styles.stepNumCircle}>
                  {isCompleted ? '✓' : step.stepNumber}
                </div>
                <span className={styles.stepNavLabel}>{step.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className={styles.showcaseCard}>
          <div className={styles.showcaseGrid}>
            {/* Left: Step Context & Details */}
            <div className={styles.showcaseLeft}>
              <div className={styles.stepHeaderRow}>
                <div className={styles.stepIconBox}>
                  {ICON_MAP[currentStep.iconName] || <VerifiedUserOutlinedIcon />}
                </div>
                <div>
                  <span className={styles.stepCounter}>
                    Step {currentStep.stepNumber} of 10
                  </span>
                  <h3 className={styles.stepTitle}>{currentStep.title}</h3>
                </div>
              </div>

              <div className={styles.actorRow}>
                <span className={styles.actorLabel}>Primary Actor:</span>
                <span className={styles.actorValue}>{currentStep.actor}</span>
              </div>

              <p className={styles.stepDescription}>{currentStep.description}</p>

              {/* Concrete Output */}
              <div className={styles.outputBox}>
                <div className={styles.outputHeader}>
                  <CheckCircleOutlineIcon className={styles.outputIcon} />
                  <span className={styles.outputLabel}>Standardized Output:</span>
                </div>
                <p className={styles.outputText}>{currentStep.output}</p>
              </div>

              {/* Clinical Safeguard */}
              {currentStep.clinicalSafeguard && (
                <div className={styles.safeguardBox}>
                  <ShieldOutlinedIcon className={styles.safeguardIcon} />
                  <div>
                    <span className={styles.safeguardLabel}>Clinical Safeguard:</span>
                    <p className={styles.safeguardText}>{currentStep.clinicalSafeguard}</p>
                  </div>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className={styles.navControls}>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<ArrowBackIcon />}
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                >
                  Previous Step
                </Button>
                <span className={styles.progressCounterText}>
                  {activeStepIndex + 1} / 10
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowForwardIcon />}
                  disabled={activeStepIndex === HOW_IT_WORKS_STEPS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(HOW_IT_WORKS_STEPS.length - 1, prev + 1))}
                >
                  Next Step
                </Button>
              </div>
            </div>

            {/* Right: Step Workflow Graphic / Terminal-style Preview */}
            <div className={styles.showcaseRight}>
              <div className={styles.graphicBox}>
                <div className={styles.graphicTopBar}>
                  <div className={styles.terminalDots}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                  </div>
                  <span className={styles.terminalTitle}>
                    WTF Care Orchestrator • Phase {currentStep.stepNumber}
                  </span>
                </div>

                <div className={styles.terminalBody}>
                  <div className={styles.workflowStage}>
                    <span className={styles.stageLabel}>Active Protocol:</span>
                    <span className={styles.stageCode}>WTF-PROTO-{100 + currentStep.stepNumber * 10}</span>
                  </div>

                  <div className={styles.codeSnippet}>
                    <span className={styles.codeComment}>{'// Phase '}{currentStep.stepNumber}: {currentStep.title}</span>
                    <span className={styles.codeKey}>Actor: <span className={styles.codeVal}>&quot;{currentStep.actor}&quot;</span></span>
                    <span className={styles.codeKey}>Status: <span className={styles.codeActive}>COMPLIANT_IN_FLIGHT</span></span>
                    <span className={styles.codeKey}>Human_Oversight: <span className={styles.codeTrue}>MANDATORY</span></span>
                  </div>

                  <div className={styles.pipelineFlow}>
                    <div className={styles.pipelineNode}>
                      <span className={styles.pipeLabel}>Input Data</span>
                      <span className={styles.pipeValue}>Structured Questionnaire</span>
                    </div>
                    <div className={styles.pipeArrow}>↓</div>
                    <div className={styles.pipelineNodeActive}>
                      <span className={styles.pipeLabel}>Current Processing</span>
                      <span className={styles.pipeValue}>{currentStep.title}</span>
                    </div>
                    <div className={styles.pipeArrow}>↓</div>
                    <div className={styles.pipelineNode}>
                      <span className={styles.pipeLabel}>Next Verification</span>
                      <span className={styles.pipeValue}>
                        {activeStepIndex < HOW_IT_WORKS_STEPS.length - 1
                          ? HOW_IT_WORKS_STEPS[activeStepIndex + 1].title
                          : 'Comprehensive Graduation & Maintenance'}
                      </span>
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
