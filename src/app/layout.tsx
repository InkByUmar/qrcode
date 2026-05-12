
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
      { url: 'https://picsum.photos/seed/qrc-logo/32/32', sizes: '32x32' },
      { url: 'https://picsum.photos/seed/qrc-logo/192/192', sizes: '192x192' },
    ],
    apple: [
      { url: 'https://picsum.photos/seed/qrc-logo/180/180', sizes: '180x180' },
    ],
  },
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
        <Script 
          src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/lib/qr-code-styling.min.js" 
          strategy="afterInteractive"
        />
        {/* Adsterra Social Bar */}
        <Script 
          src="https://archaicmsflip.com/f8/d2/33/f8d2333ae12f97dc648dbb943b8bf90d.js" 
          strategy="afterInteractive"
        />
        {/* Adsterra Native Banner Script */}
        <Script 
          async
          src="https://archaicmsflip.com/8a0d2340102217c81755459d2df8b6d0/invoke.js" 
          strategy="afterInteractive"
          {...({ 'data-cfasync': 'false' } as any)}
        />
        
        {/* JSON-LD Structured Data - Site & Organization */}
        <Script id="schema-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "QR Canvas Studio",
            "alternateName": ["QRCanvas", "QR Canvas Professional"],
            "url": "https://qrcanvas.online"
          })}
        </Script>
        <Script id="schema-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "QR Canvas Studio",
            "url": "https://qrcanvas.online",
            "logo": {
              "@type": "ImageObject",
              "url": "https://qrcanvas.online/logo.png",
              "width": "512",
              "height": "512"
            },
            "description": "Professional QR code generation studio for brands and marketing agencies."
          })}
        </Script>

        {/* JSON-LD Structured Data - Breadcrumbs */}
        <Script id="schema-breadcrumbs" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://qrcanvas.online"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "QR Studio",
                "item": "https://qrcanvas.online#generator"
              }
            ]
          })}
        </Script>

        {/* JSON-LD Structured Data - Software Application */}
        <Script id="schema-software" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "QR Canvas Studio",
            "operatingSystem": "All",
            "applicationCategory": "MultimediaApplication",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "1250"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </Script>

        {/* JSON-LD Structured Data - HowTo */}
        <Script id="schema-howto" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Create a Custom Branded QR Code",
            "description": "Follow these steps to generate a professional QR code with your logo and high-resolution export.",
            "step": [
              {
                "@type": "HowToStep",
                "text": "Select your content type like URL, WiFi, or vCard."
              },
              {
                "@type": "HowToStep",
                "text": "Input your data into the payload field."
              },
              {
                "@type": "HowToStep",
                "text": "Upload your brand logo and customize dot styles and colors."
              },
              {
                "@type": "HowToStep",
                "text": "Preview the result and download as high-res PNG or SVG."
              }
            ]
          })}
        </Script>

        {/* JSON-LD Structured Data - FAQ */}
        <Script id="schema-faq" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is QR Canvas Studio free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, QR Canvas Studio is 100% free for individual creators. You can generate unlimited branded QR codes without sign-up."
                }
              },
              {
                "@type": "Question",
                "name": "Can I add my company logo to the QR code?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. You can upload any PNG or JPG logo, and our engine will automatically adjust scannability settings to ensure it works perfectly."
                }
              },
              {
                "@type": "Question",
                "name": "How does Bulk Export work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bulk mode allows you to paste a list of URLs and generate high-resolution QR codes for all of them at once, packaged in a single ZIP file."
                }
              }
            ]
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
