import './globals.css';
import type { Metadata } from 'next';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';

export const metadata: Metadata = {
  title: 'ApexDent 3D | Luxury Dental Clinic & Smile Studio',
  description: 'Experience luxury dental care with interactive 3D technology, board-certified dental specialists, pain-free root canals, teeth whitening, and real-time appointment booking.',
  keywords: 'dental clinic, 3D dentistry, teeth whitening, dental implants, root canal, teeth cleaning, smile makeover, dentist appointment',
  authors: [{ name: 'ApexDent Luxury Healthcare' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-dental-blue selection:text-white relative">
        <Preloader />
        <ScrollProgressBar />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
