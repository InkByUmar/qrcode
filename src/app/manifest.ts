
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QR CANVAS',
    short_name: 'QR CANVAS',
    description: 'Premium AI-Powered Branded QR Code Generator',
    start_url: '/',
    display: 'standalone',
    background_color: '#060907',
    theme_color: '#26EA56',
    icons: [
      {
        src: '/icon?size=192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon?size=512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
