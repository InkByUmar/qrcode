import type {Metadata} from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Free QR Code Generator with Logo & Background | Custom QR Codes',
  description: 'Create professional QR codes for free. Add brand logos, custom background images, and premium colors. High-resolution SVG and PNG exports. No signup required.',
  keywords: 'free qr code generator, qr code generator with logo, custom qr code background, professional qr maker, high quality qr code, wifi qr code generator, vcard creator, whatsapp qr code',
  openGraph: {
    title: 'QR Canvas | Premium AI-Powered QR Generator',
    description: 'The world\'s most advanced professional QR code generator with logo and background support.',
    type: 'website',
    url: 'https://qrcanvas.pro',
  }
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
