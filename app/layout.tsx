import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Projet Échec - Chess Learning Platform',
  description: 'Bilingual chess learning platform for students and instructors',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
