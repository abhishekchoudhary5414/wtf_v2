'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { HEADER_NAV_LINKS } from '@/data/navigation';
import { Button } from '@/components/common/Button/Button';
import styles from './Header.module.css';

export interface HeaderProps {
  onOpenGetStarted?: () => void;
  onOpenSignIn?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGetStarted, onOpenSignIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerInner}`}>
        {/* Brand Logo */}
        <Link href="/" className={styles.logoLink} onClick={handleLinkClick}>
          <div className={styles.logoBadge}>
            <SpaOutlinedIcon className={styles.logoIcon} />
          </div>
          <div className={styles.logoTextContainer}>
            <span className={styles.logoTitle}>WTF University</span>
            <span className={styles.logoSubtitle}>Behavioral Wellness SaaS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {HEADER_NAV_LINKS.map((link) => (
              <li key={link.href} className={styles.navItem}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className={styles.actionGroup}>
          <Button
            variant="text"
            size="sm"
            leftIcon={<LoginOutlinedIcon />}
            onClick={onOpenSignIn}
            className={styles.signInBtn}
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            size="sm"
            rightIcon={<ArrowForwardOutlinedIcon />}
            onClick={onOpenGetStarted}
            className={styles.getStartedBtn}
          >
            Get Started
          </Button>

          {/* Mobile Hamburger Button */}
          <button
            className={styles.hamburgerBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.mobileNavHeader}>
          <div className={styles.mobileNavBrand}>
            <SpaOutlinedIcon className={styles.logoIcon} />
            <span>WTF University</span>
          </div>
          <button
            className={styles.mobileCloseBtn}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        <nav className={styles.mobileNav} aria-label="Mobile Navigation">
          <ul className={styles.mobileNavList}>
            {HEADER_NAV_LINKS.map((link) => (
              <li key={link.href} className={styles.mobileNavItem}>
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileActionGroup}>
          <Button
            variant="outline"
            size="md"
            fullWidth
            leftIcon={<LoginOutlinedIcon />}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSignIn?.();
            }}
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            rightIcon={<ArrowForwardOutlinedIcon />}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGetStarted?.();
            }}
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className={styles.drawerBackdrop}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};
