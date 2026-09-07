import React from 'react';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import VideoChatOutlinedIcon from '@mui/icons-material/VideoChatOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { INTEGRATIONS_DATA } from '@/data/integrations';
import styles from './Integrations.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  StorageOutlined: <StorageOutlinedIcon />,
  ReceiptLongOutlined: <ReceiptLongOutlinedIcon />,
  PsychologyAltOutlined: <PsychologyAltOutlinedIcon />,
  VideoChatOutlined: <VideoChatOutlinedIcon />,
  SmsOutlined: <SmsOutlinedIcon />,
  CreditCardOutlined: <CreditCardOutlinedIcon />,
};

export const Integrations: React.FC = () => {
  return (
    <section className={`sectionPadding ${styles.integrationSection}`} id="integrations">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Enterprise Interoperability"
          badgeVariant="primary"
          title="Everything Connected in One Ecosystem"
          subtitle="WTF integrates seamlessly with hospital EHRs, national billing clearinghouses, carrier-grade SMS gateways, and secure video infrastructure via open clinical standards."
          align="center"
        />

        {/* Central Connected Hub Banner */}
        <div className={styles.hubVisualBanner}>
          <div className={styles.hubCenter}>
            <div className={styles.hubLogoCircle}>
              <HubOutlinedIcon className={styles.hubCenterIcon} />
            </div>
            <span className={styles.hubTitle}>WTF Core Platform</span>
            <span className={styles.hubSubtitle}>Central API Gateway &amp; FHIR Bridge</span>
          </div>

          <div className={styles.hubConnectors}>
            <span className={styles.hubTag}>HL7 FHIR v4</span>
            <span className={styles.hubTag}>ANSI X12 EDI</span>
            <span className={styles.hubTag}>WebRTC / AES-256</span>
            <span className={styles.hubTag}>HIPAA BAA Secure</span>
            <span className={styles.hubTag}>SAML 2.0 / OAuth SSO</span>
          </div>
        </div>

        {/* 6 Integration Cards Grid */}
        <div className={styles.integrationsGrid}>
          {INTEGRATIONS_DATA.map((item) => (
            <div key={item.id} className={styles.integrationCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}>
                  {ICON_MAP[item.iconName] || <HubOutlinedIcon />}
                </div>
                <span className={styles.categoryBadge}>{item.category}</span>
              </div>

              <h3 className={styles.integrationName}>{item.name}</h3>
              <span className={styles.standardPill}>Standard: {item.standard}</span>

              <p className={styles.integrationDesc}>{item.description}</p>

              <div className={styles.benefitBox}>
                <CheckCircleOutlineIcon className={styles.benefitIcon} />
                <p className={styles.benefitText}>{item.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
