import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WTF University | Mental & Behavioral Wellness SaaS Platform',
  description:
    'Technology-enabled mental and behavioral wellness ecosystem connecting institutions, students, certified life coaches, and licensed healthcare providers through structured assessments, guided 16-week learning, and Telehealth.',
  keywords: [
    'mental wellness',
    'behavioral health SaaS',
    'student wellness',
    'life coach certification',
    'AI medical scribe',
    'telehealth therapy',
    'university mental health',
    'behavioral curriculum',
  ],
  authors: [{ name: 'WTF University' }],
  robots: 'index, follow',
};

export const viewport: Viewport = {
  themeColor: '#1e7048',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
