import type {Metadata} from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Free QR Code Generator with Logo & Bulk Support | QR Canvas Studio',
  description: 'The world\'s most advanced professional QR code generator. Create high-resolution custom QR codes with logos, backgrounds, and bulk processing. 100% free, no sign-up required. Export SVG and PNG for marketing campaigns.',
  keywords: 'free qr code generator, bulk qr code generator, qr code with logo, custom qr code background, professional qr maker, high quality qr code, wifi qr code generator, vcard creator, whatsapp qr code, batch qr code generation, marketing qr tools, branded qr codes, high res qr export',
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
        <meta name="google-site-verification" content="ehD2Cnt6BXzxvDqIbX7bSo1vDFlICggBRQB2Jb_i-YE" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <Script 
          src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/lib/qr-code-styling.min.js" 
          strategy="afterInteractive"
        />
        <Script id="schema-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "QR Canvas Studio",
            "url": "https://qrcanvas.online",
            "logo": "https://qrcanvas.online/logo.png",
            "description": "Professional QR code generation studio for brands and marketing agencies.",
            "sameAs": [
              "https://twitter.com/qrcanvas",
              "https://linkedin.com/company/qrcanvas"
            ]
          })}
        </Script>
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
            }
          })}
        </Script>
        <Script id="schema-product" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "QR Canvas Professional Plan",
            "description": "Enterprise-grade QR code generation including unlimited bulk processing, high-res SVG exports, and advanced analytics.",
            "brand": {
              "@type": "Brand",
              "name": "QR Canvas"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://qrcanvas.online/#pricing",
              "priceCurrency": "USD",
              "price": "19.00",
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock"
            }
          })}
        </Script>
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
