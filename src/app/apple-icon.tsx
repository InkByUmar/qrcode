import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'QR Canvas Apple Icon';
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
            background: '#2563eb',
            width: '140px',
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '32px',
            position: 'relative',
            boxShadow: '0 15px 40px -10px rgba(37, 99, 235, 0.4)'
          }}
        >
           <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '80px',
            height: '80px',
          }}>
            <div style={{ display: 'flex', gap: 10, height: '35px' }}>
              <div style={{ width: '35px', height: '35px', border: '10px solid white', borderRadius: '4px' }} />
              <div style={{ width: '35px', height: '35px', background: 'rgba(255, 255, 255, 0.4)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', gap: 10, height: '35px' }}>
               <div style={{ width: '35px', height: '35px', background: 'rgba(255, 255, 255, 0.4)', borderRadius: '4px' }} />
               <div style={{ width: '35px', height: '35px', background: 'white', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}