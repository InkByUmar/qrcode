
import type {Metadata, Viewport} from 'next';
import './globals.css';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#26EA56',
};

export const metadata: Metadata = {
  title: 'Free QR Code Generator with Logo & Bulk Support | QR Canvas Studio',
  description: 'The world\'s most advanced professional QR code generator. Create high-resolution custom QR codes with logos, backgrounds, and bulk processing. 100% free, no sign-up required. Export SVG and PNG for marketing campaigns.',
  keywords: 'free qr code generator, bulk qr code generator, qr code with logo, custom qr code background, professional qr maker, high quality qr code, wifi qr code generator, vcard creator, whatsapp qr code, batch qr code generation, marketing qr tools, branded qr codes, high res qr export, how to generate qr code, scan qr code online, download qr app, best free qr generator 2025, no expiry qr code, secure wifi qr maker',
  authors: [{ name: 'QR Canvas Studio Team' }],
  icons: {
    icon: [
      { url: 'https://picsum.photos/seed/qr-brand-logo/32/32', sizes: '32x32' },
      { url: 'https://picsum.photos/seed/qr-brand-logo/192/192', sizes: '192x192' },
    ],
    apple: [
      { url: 'https://picsum.photos/seed/qr-brand-logo/180/180', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'QR Canvas',
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: 'https://qrcanvas.online',
  },
  openGraph: {
    title: 'QR Canvas Studio | Premium AI-Powered Bulk QR Generator',
    description: 'Create professional, branded QR codes in seconds. Support for logos, full-image backgrounds, and bulk processing. Perfect for agencies and brands.',
    type: 'website',
    url: 'https://qrcanvas.online',
    siteName: 'QR Canvas Studio',
    locale: 'en_US',
    images: [
      {
        url: 'https://picsum.photos/seed/qr-seo-premium/1200/630',
        width: 1200,
        height: 630,
        alt: 'QR Canvas Premium Studio Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional QR Code Generator with Logo & Bulk Export',
    description: 'The ultimate tool for branded QR codes. Bulk mode, high-res SVG/PNG, and live scanning utilities.',
    images: ['https://picsum.photos/seed/qr-seo-premium/1200/630'],
    creator: '@qrcanvas',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="ehD2Cnt6BXzxvDFlICggBRQB2Jb_i-YE" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        {/* Apple PWA Support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="QR Canvas" />
        <link rel="apple-touch-icon" href="https://picsum.photos/seed/qr-brand-logo/180/180" />
        
        <Script 
          src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/lib/qr-code-styling.min.js" 
          strategy="afterInteractive"
        />
        <Script id="schema-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "QR Canvas Studio",
            "alternateName": ["QRCanvas", "QR Canvas Professional"],
            "url": "https://qrcanvas.online"
          })}
        </Script>
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
