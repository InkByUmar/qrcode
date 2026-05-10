import type {Metadata} from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'QR Canvas - Professional Free QR Code Generator with Logo & Background',
  description: 'Create stunning, high-resolution custom QR codes for free. Add your logo, custom background images, and brand colors. Perfect for URLs, WiFi, vCards, and Business Cards. No sign-up required.',
  keywords: 'free qr code generator, qr code with logo, custom qr code background, professional qr generator, high quality qr code, wifi qr code generator, vcard qr code creator',
  openGraph: {
    title: 'QR Canvas | Premium AI-Powered QR Generator',
    description: 'The world\'s most advanced professional QR code generator with logo and background support.',
    type: 'website',
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
      <body className="font-body bg-[#060907] text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        {children}
      </body>
    </html>
  );
}
