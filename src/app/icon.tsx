
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'QR CANVAS Official Logo';
export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#060907',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '128px',
          border: '20px solid rgba(38, 234, 86, 0.2)',
          position: 'relative',
          fontWeight: 900,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Finder Pattern: Top Left (Green) */}
        <div style={{ position: 'absolute', top: 60, left: 60, width: 100, height: 100, border: '15px solid #26EA56', borderRadius: '15px' }}>
          <div style={{ position: 'absolute', top: 18, left: 18, width: 34, height: 34, background: '#26EA56', borderRadius: '4px' }} />
        </div>
        
        {/* Finder Pattern: Top Right (Green) */}
        <div style={{ position: 'absolute', top: 60, right: 60, width: 100, height: 100, border: '15px solid #26EA56', borderRadius: '15px' }}>
          <div style={{ position: 'absolute', top: 18, left: 18, width: 34, height: 34, background: '#26EA56', borderRadius: '4px' }} />
        </div>

        {/* Finder Pattern: Bottom Left (Green) */}
        <div style={{ position: 'absolute', bottom: 60, left: 60, width: 100, height: 100, border: '15px solid #26EA56', borderRadius: '15px' }}>
          <div style={{ position: 'absolute', top: 18, left: 18, width: 34, height: 34, background: '#26EA56', borderRadius: '4px' }} />
        </div>

        {/* Integrated QR Text Branding (White) */}
        <div style={{ position: 'absolute', bottom: 60, right: 65, display: 'flex', letterSpacing: '-12px', fontSize: 240, color: 'white' }}>
          QR
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
