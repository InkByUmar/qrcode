import type {Metadata} from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'QR Canvas - Professional Free QR Code Generator with Logo',
  description: 'Create beautiful, custom QR codes for URLs, WiFi, Business Cards (vCard), and more. Real-time preview, high-quality SVG/PNG downloads, and AI-powered content refining. 100% free.',
  keywords: 'qr code generator, free qr code, qr code with logo, vcard qr code, wifi qr code, custom qr design',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <Script 
          src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/lib/qr-code-styling.min.js" 
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-body bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
