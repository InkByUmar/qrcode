import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Navbar } from '@/components/qr-canvas/navbar';
import { Footer } from '@/components/qr-canvas/footer';
import { Toaster } from '@/components/ui/toaster';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#26EA56',
};

export const metadata: Metadata = {
  title: 'QR CANVAS | Professional Artistic QR Code Studio',
  description: 'Create high-resolution custom QR codes with logos, AI backgrounds, and bulk processing. 100% free, no sign-up required, PWA ready.',
  keywords: 'qr canvas, free qr code generator, bulk qr code generator, qr code with logo, custom qr code background',
  authors: [{ name: 'QR CANVAS Studio Team' }],
  metadataBase: new URL('https://qrcanvas.app'), 
  openGraph: {
    title: 'QR CANVAS | Premium AI-Powered Bulk QR Generator',
    description: 'Create professional, branded QR codes in seconds. Support for logos, full-image backgrounds, and bulk processing.',
    type: 'website',
    images: [{ url: 'https://picsum.photos/seed/qr-seo/1200/630' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <script 
          src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/lib/qr-code-styling.min.js" 
          async
        />
      </head>
      <body 
        className="font-body bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
