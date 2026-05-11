import type {Metadata} from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Free QR Code Generator with Logo & Bulk Support | QR Canvas',
  description: 'Create professional custom QR codes for free. Add logos, backgrounds, and generate QR codes in bulk. Export high-resolution SVG/PNG. No sign-up required.',
  keywords: 'free qr code generator, bulk qr code generator, qr code with logo, custom qr code background, professional qr maker, high quality qr code, wifi qr code generator, vcard creator, whatsapp qr code, batch qr code generation',
  authors: [{ name: 'QR Canvas Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://qrcanvas.pro',
  },
  openGraph: {
    title: 'QR Canvas | Premium AI-Powered Bulk QR Generator',
    description: 'The world\'s most advanced professional QR code generator with logo and bulk background support. Perfect for brands and agencies.',
    type: 'website',
    url: 'https://qrcanvas.pro',
    siteName: 'QR Canvas',
    images: [
      {
        url: 'https://picsum.photos/seed/qr-seo/1200/630',
        width: 1200,
        height: 630,
        alt: 'QR Canvas Premium Generator Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator with Logo & Bulk Support',
    description: 'Generate professional, branded QR codes in seconds. Bulk mode available.',
    images: ['https://picsum.photos/seed/qr-seo/1200/630'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <Script 
          src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/lib/qr-code-styling.min.js" 
          strategy="beforeInteractive"
        />
        {/* JSON-LD Structured Data for SEO */}
        <Script id="schema-software" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "QR Canvas",
            "operatingSystem": "Web",
            "applicationCategory": "DesignApplication",
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
        <Script id="schema-faq" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this QR code generator truly free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, QRCanvas is 100% free for both personal and commercial use. You can generate unlimited single or bulk QR codes with no account required and no hidden fees."
                }
              },
              {
                "@type": "Question",
                "name": "What is Bulk QR Mode?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bulk Mode allows you to generate multiple QR codes at once. Just paste a list of URLs or text strings, and the engine will apply your branding to all of them and bundle them into a ZIP file."
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
        
        {/* Adsterra Social Bar */}
        <Script 
          src="https://archaicmsflip.com/f8/d2/33/f8d2333ae12f97dc648dbb943b8bf90d.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
