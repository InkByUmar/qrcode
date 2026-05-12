
import type {Metadata} from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Free QR Code Generator with Logo & Bulk Support | QR Canvas Studio',
  description: 'The world\'s most advanced professional QR code generator. Create high-resolution custom QR codes with logos, backgrounds, and bulk processing. 100% free, no sign-up required. Export SVG and PNG for marketing campaigns.',
  keywords: 'free qr code generator, bulk qr code generator, qr code with logo, custom qr code background, professional qr maker, high quality qr code, wifi qr code generator, vcard creator, whatsapp qr code, batch qr code generation, marketing qr tools, branded qr codes, high res qr export, how to generate qr code, scan qr code online',
  authors: [{ name: 'QR Canvas Studio Team' }],
  viewport: 'width=device-width, initial-scale=1',
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
        {/* Site Name Structured Data */}
        <Script id="schema-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "QR Canvas Studio",
            "alternateName": ["QRCanvas", "QR Canvas Professional"],
            "url": "https://qrcanvas.online"
          })}
        </Script>
        {/* Organization Structured Data */}
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
            "description": "Professional QR code generation studio for brands and marketing agencies.",
            "sameAs": [
              "https://twitter.com/qrcanvas",
              "https://linkedin.com/company/qrcanvas"
            ]
          })}
        </Script>
        {/* Breadcrumb Structured Data */}
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
                "name": "QR Generator",
                "item": "https://qrcanvas.online/#generator"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Bulk Export",
                "item": "https://qrcanvas.online/#bulk-mode-info"
              }
            ]
          })}
        </Script>
        {/* Software Application Structured Data */}
        <Script id="schema-software" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "QR Canvas Studio",
            "operatingSystem": "Web",
            "applicationCategory": "DesignApplication",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "1540"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "screenshot": "https://picsum.photos/seed/qr-app-preview/1200/800"
          })}
        </Script>
        {/* HowTo Structured Data for Rich Results */}
        <Script id="schema-howto" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Create a Branded QR Code",
            "description": "Learn how to generate professional QR codes with logos and custom styles for your business.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Choose Content Type",
                "text": "Select your QR code type like URL, WiFi, or vCard from the dashboard."
              },
              {
                "@type": "HowToStep",
                "name": "Input Data",
                "text": "Enter the URL or data you want to encode into the QR pattern."
              },
              {
                "@type": "HowToStep",
                "name": "Add Branding",
                "text": "Upload your company logo and choose a background image for artistic styling."
              },
              {
                "@type": "HowToStep",
                "name": "Customize Style",
                "text": "Select from dot engines like Lux Rounded or Soft Flow and pick your brand colors."
              },
              {
                "@type": "HowToStep",
                "name": "Export High-Res",
                "text": "Download your QR code as a 1024px PNG or vector SVG file."
              }
            ],
            "totalTime": "PT1M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            }
          })}
        </Script>
        {/* FAQ Structured Data */}
        <Script id="schema-faq" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this QR code generator truly free for commercial use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, QR Canvas Studio is 100% free for both personal and commercial use. You can generate unlimited high-resolution QR codes with no subscription or account required."
                }
              },
              {
                "@type": "Question",
                "name": "How does Bulk QR Mode work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bulk Mode allows you to generate multiple professional QR codes at once. Simply paste a list of URLs, apply your branding (logos/colors), and the system will process them all into a high-res ZIP bundle."
                }
              },
              {
                "@type": "Question",
                "name": "What is an Image QR code?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "An Image QR code integrates a background image directly into the QR pattern. Using our proprietary reliability guard and Level H error correction, we ensure these artistic codes remain fully scannable."
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
