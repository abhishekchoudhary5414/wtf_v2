import React from 'react';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import styles from './AvatarEngagement.module.css';

export const AvatarEngagement: React.FC = () => {
  return (
    <section className={`sectionPadding ${styles.avatarSection}`} id="personal-engagement">
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Purpose & Design Philosophy */}
          <div className={styles.leftCol}>
            <SectionHeader
              badge="Meaningful Personalization"
              badgeVariant="primary"
              title="Make Wellness More Personal"
              subtitle="Users create a personalized Avatar that reflects their individual wellness path. It anchors their reflection journal, weekly milestones, and support team interactions."
              align="left"
            />

            <div className={styles.philosophyCard}>
              <h4 className={styles.philosophyTitle}>
                Engagement Without Trivialization
              </h4>
              <p className={styles.philosophyDesc}>
                Healthcare should never feel like an arcade. WTF’s avatar and streak systems are carefully designed to foster self-compassion, agency, and steady behavioral reflection—never superficial points or distracting competition.
              </p>

              <ul className={styles.principlesList}>
                <li className={styles.principleItem}>
                  <CheckCircleOutlineIcon className={styles.checkIcon} />
                  <div>
                    <strong>Visualizes Non-Linear Growth:</strong>
                    <span> Avatars evolve subtly as students master emotional regulation chapters and complete check-ins.</span>
                  </div>
                </li>
                <li className={styles.principleItem}>
                  <CheckCircleOutlineIcon className={styles.checkIcon} />
                  <div>
                    <strong>Stigma-Free Identity:</strong>
                    <span> Provides students a safe, comforting persona during self-assessment and reflection journaling.</span>
                  </div>
                </li>
                <li className={styles.principleItem}>
                  <CheckCircleOutlineIcon className={styles.checkIcon} />
                  <div>
                    <strong>Clear Care Team Attachment:</strong>
                    <span> The avatar profile visibly displays their assigned certified life coach and supervising licensed clinician.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Student Profile Mockup Card */}
          <div className={styles.rightCol}>
            <div className={styles.profileMockupCard}>
              {/* Profile Card Header */}
              <div className={styles.profileHeader}>
                <div className={styles.avatarVisual}>
                  <div className={styles.avatarCircle}>
                    <FaceOutlinedIcon className={styles.avatarIcon} />
                  </div>
                  <span className={styles.levelBadge}>Phase 2 Journeyer</span>
                </div>

                <div className={styles.profileMeta}>
                  <div className={styles.profileNameRow}>
                    <h3 className={styles.studentName}>Alex Chen</h3>
                    <span className={styles.statusPill}>Active Learner</span>
                  </div>
                  <span className={styles.cohortTag}>University Cohort • Fall Semester</span>

                  <div className={styles.quickStatsRow}>
                    <div className={styles.qStat}>
                      <LocalFireDepartmentOutlinedIcon className={styles.fireIcon} />
                      <span><strong>19-Day</strong> Reflection Streak</span>
                    </div>
                    <div className={styles.qStat}>
                      <EmojiEventsOutlinedIcon className={styles.trophyIcon} />
                      <span><strong>Milestone 1</strong> Mastered</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Curriculum Progress Meter */}
              <div className={styles.progressModule}>
                <div className={styles.progressHeader}>
                  <div className={styles.progressTitle}>
                    <AutoStoriesOutlinedIcon className={styles.bookIcon} />
                    <span>16-Week Curriculum Progress</span>
                  </div>
                  <span className={styles.progressPct}>Week 6 of 16 (38%)</span>
                </div>

                <div className={styles.progressBarTrack}>
                  <div className={styles.progressBarFill} style={{ width: '38%' }} />
                </div>
                <span className={styles.progressSubtext}>
                  Current Chapter: <strong>Anxiety Recognition &amp; Calming Protocols</strong>
                </span>
              </div>

              {/* Assigned Support Team */}
              <div className={styles.supportTeamModule}>
                <div className={styles.teamHeader}>
                  <GroupsOutlinedIcon className={styles.teamIcon} />
                  <span className={styles.teamHeading}>Your Assigned Care &amp; Mentorship Team</span>
                </div>

                <div className={styles.teamGrid}>
                  <div className={styles.teamMemberCard}>
                    <div className={styles.memberAvatar}>AM</div>
                    <div>
                      <span className={styles.memberName}>Alicia Martinez</span>
                      <span className={styles.memberRole}>WTF Certified Life Coach</span>
                      <span className={styles.memberTouch}>Next Check-in: Thursday</span>
                    </div>
                  </div>

                  <div className={styles.teamMemberCard}>
                    <div className={styles.memberAvatarClinician}>SJ</div>
                    <div>
                      <span className={styles.memberName}>Dr. Sarah Jenkins</span>
                      <span className={styles.memberRole}>Supervising Psychiatrist (MD)</span>
                      <span className={styles.memberTouch}>Assessment Review: Signed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Reflection & Check-in Badge */}
              <div className={styles.profileFooter}>
                <span className={styles.footerNote}>
                  ✓ Weekly assessment submitted • AI Scribe summarized • Provider sign-off completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
