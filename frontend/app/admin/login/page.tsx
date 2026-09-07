"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { API_BASE_URL } from '@/lib/api';
import styles from './AdminLogin.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.detail || 'Invalid administrative credentials. Please try again.');
        return;
      }

      const data = await res.json();
      localStorage.setItem('admin_token', data.access_token);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError('Unable to reach the authentication server. Ensure the backend API is online.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.loginCard}>
        {/* Card Header & Brand */}
        <div className={styles.cardHeader}>
          <div className={styles.brandBadge}>
            <AdminPanelSettingsOutlinedIcon />
          </div>
          <h1 className={styles.title}>Admin Console</h1>
          <p className={styles.subtitle}>
            Sign in to access WTF University clinical oversight &amp; partner management.
          </p>
          <div className={styles.securityPill}>
            <span className={styles.securityDot} />
            <span>HIPAA &amp; FERPA Secured Gateway</span>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className={styles.errorBanner}>
            <ErrorOutlineOutlinedIcon fontSize="small" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Work Email Address</label>
            <div className={styles.inputContainer}>
              <span className={styles.inputIcon}>
                <MailOutlineIcon fontSize="inherit" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@wtfuniversity.com"
                className={styles.input}
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <div className={`${styles.inputContainer} ${styles.hasToggle}`}>
              <span className={styles.inputIcon}>
                <LockOutlinedIcon fontSize="inherit" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className={styles.input}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.togglePasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>
          </div>

          <div className={styles.formOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" defaultChecked />
              <span>Remember session</span>
            </label>
            <span className={styles.securityNote}>Protected by JWT &amp; SSL</span>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowForwardOutlinedIcon fontSize="small" />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className={styles.footerActions}>
          <Link href="/" className={styles.backLink}>
            <ArrowBackOutlinedIcon fontSize="inherit" />
            <span>Return to WTF University Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
