import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'QR CANVAS Official Technical Logo';
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
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '128px',
          position: 'relative',
        }}
      >
        <div
          style={{
            background: '#3b82f6',
            width: '400px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '96px',
            position: 'relative',
            transform: 'rotate(-5deg)',
            boxShadow: '0 40px 100px -20px rgba(59, 130, 246, 0.4)'
          }}
        >
          {/* Main Logo Text */}
          <div style={{ 
            fontSize: 180, 
            color: 'white',
            fontWeight: 900,
            fontFamily: 'sans-serif',
            letterSpacing: '-10px',
          }}>
            QR
          </div>
          
          {/* Glass Overlay Element */}
          <div style={{
            position: 'absolute',
            top: 40,
            right: 40,
            width: 80,
            height: 80,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}