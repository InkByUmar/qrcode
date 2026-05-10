import type {Metadata} from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'QR Canvas - Free QR Code Generator with Logo',
  description: 'Generate modern, beautiful, and customizable QR codes in real-time. Support for URLs, WiFi, Phone, and more with AI-powered content refinement.',
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
