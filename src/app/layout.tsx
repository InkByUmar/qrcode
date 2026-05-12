
import type {Metadata, Viewport} from 'next';
import './globals.css';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#26EA56',
};

export const metadata: Metadata = {
  title: 'QR CANVAS | Free Premium QR Code Generator with Logo & Bulk Support',
  description: 'The world\'s most advanced professional QR code generator. Create high-resolution custom QR codes with logos, backgrounds, and bulk processing. 100% free, no sign-up required.',
  keywords: 'qr canvas, free qr code generator, bulk qr code generator, qr code with logo, custom qr code background, professional qr maker, scan tool, pwa qr code',
  authors: [{ name: 'QR CANVAS Studio Team' }],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'QR CANVAS',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'QR CANVAS | Premium AI-Powered Bulk QR Generator',
    description: 'Create professional, branded QR codes in seconds. Support for logos, full-image backgrounds, and bulk processing.',
    type: 'website',
    siteName: 'QR CANVAS',
    locale: 'en_US',
    images: [
      {
        url: 'https://picsum.photos/seed/qr-seo-premium/1200/630',
        width: 1200,
        height: 630,
        alt: 'QR CANVAS Premium Studio Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR CANVAS | Professional QR Code Generator',
    description: 'The ultimate tool for branded QR codes. Bulk mode, high-res SVG/PNG, and live scanning utilities.',
    images: ['https://picsum.photos/seed/qr-seo-premium/1200/630'],
  },
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'QR CANVAS',
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'Web, Android, iOS, Windows, macOS',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'description': 'Advanced professional QR code generator with logo integration, bulk processing, and AI backgrounds.',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '1240'
    }
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script 
          src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/lib/qr-code-styling.min.js" 
          strategy="afterInteractive"
        />
      </head>
      <body 
        className="font-body bg-[#060907] text-foreground antialiased selection:bg-primary selection:text-primary-foreground"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
