
import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'QR Canvas Official Logo';
export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

/**
 * Generates the official branded icon for the PWA and Favicon.
 * Features a technical QR structure with "QR" text.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 240,
          background: '#060907',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#26EA56',
          borderRadius: '128px',
          border: '20px solid rgba(38, 234, 86, 0.2)',
          position: 'relative',
          fontWeight: 900,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Left Finder Pattern */}
        <div style={{ position: 'absolute', top: 60, left: 60, width: 100, height: 100, border: '15px solid #26EA56', borderRadius: '15px' }}>
          <div style={{ position: 'absolute', top: 18, left: 18, width: 34, height: 34, background: '#26EA56', borderRadius: '4px' }} />
        </div>
        
        {/* Top Right Finder Pattern */}
        <div style={{ position: 'absolute', top: 60, right: 60, width: 100, height: 100, border: '15px solid #26EA56', borderRadius: '15px' }}>
          <div style={{ position: 'absolute', top: 18, left: 18, width: 34, height: 34, background: '#26EA56', borderRadius: '4px' }} />
        </div>

        {/* Bottom Left Finder Pattern */}
        <div style={{ position: 'absolute', bottom: 60, left: 60, width: 100, height: 100, border: '15px solid #26EA56', borderRadius: '15px' }}>
          <div style={{ position: 'absolute', top: 18, left: 18, width: 34, height: 34, background: '#26EA56', borderRadius: '4px' }} />
        </div>

        {/* Brand Text */}
        <div style={{ position: 'absolute', bottom: 40, right: 50, display: 'flex' }}>
          QR
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
