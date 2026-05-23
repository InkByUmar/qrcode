import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Navbar } from '@/components/qr-canvas/navbar';
import { Footer } from '@/components/qr-canvas/footer';
import { Toaster } from '@/components/ui/toaster';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
};

export const metadata: Metadata = {
  title: 'QR CANVAS | Professional AI-Powered QR Code Studio',
  description: 'The ultimate free professional QR code generator. Create high-resolution branded QR codes with logos, AI backgrounds, and bulk processing in seconds. 100% private and permanent.',
  keywords: 'qr code generator, free qr code maker, bulk qr code generator, qr code with logo, qr code scanner, custom qr code background, professional qr studio, qr canvas',
  authors: [{ name: 'QR CANVAS Studio Team' }],
  metadataBase: new URL('https://qrcanvas.app'), 
  openGraph: {
    title: 'QR CANVAS | Premium Branded QR Code Studio',
    description: 'Design high-resolution, branded QR codes for your marketing campaigns. Support for logos, AI backgrounds, and bulk production.',
    type: 'website',
    url: 'https://qrcanvas.app',
    siteName: 'QR CANVAS',
    images: [{ url: 'https://picsum.photos/seed/qr-seo/1200/630' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR CANVAS | Free Professional QR Generator',
    description: 'Create beautiful, branded QR codes with logos and AI backgrounds for free.',
    images: ['https://picsum.photos/seed/qr-twitter/1200/630'],
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
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
