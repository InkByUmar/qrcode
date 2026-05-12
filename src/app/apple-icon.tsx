
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'QR CANVAS Apple Touch Icon';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
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
          borderRadius: '40px',
          border: '8px solid rgba(38, 234, 86, 0.2)',
          position: 'relative',
          fontWeight: 900,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Simplified Finder Patterns for Small Sizes */}
        <div style={{ position: 'absolute', top: 20, left: 20, width: 45, height: 45, border: '7px solid #26EA56', borderRadius: '6px' }}>
          <div style={{ position: 'absolute', top: 10, left: 10, width: 11, height: 11, background: '#26EA56', borderRadius: '2px' }} />
        </div>
        <div style={{ position: 'absolute', top: 20, right: 20, width: 45, height: 45, border: '7px solid #26EA56', borderRadius: '6px' }}>
          <div style={{ position: 'absolute', top: 10, left: 10, width: 11, height: 11, background: '#26EA56', borderRadius: '2px' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 20, left: 20, width: 45, height: 45, border: '7px solid #26EA56', borderRadius: '6px' }}>
          <div style={{ position: 'absolute', top: 10, left: 10, width: 11, height: 11, background: '#26EA56', borderRadius: '2px' }} />
        </div>
        
        {/* Integrated Branding: QR (White) */}
        <div style={{ 
          position: 'absolute', 
          bottom: 25, 
          right: 25, 
          fontSize: 42, 
          color: 'white', 
          fontWeight: 900 
        }}>
          QR
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
