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
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            background: '#3b82f6',
            width: '140px',
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '32px',
            position: 'relative',
            transform: 'rotate(-3deg)'
          }}
        >
          <div style={{ 
            fontSize: 64, 
            color: 'white',
            fontWeight: 900,
            fontFamily: 'sans-serif',
            letterSpacing: '-4px'
          }}>
            QR
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}