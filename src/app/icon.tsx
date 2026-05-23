import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'QR Canvas Official Logo';
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
            background: '#2563eb',
            width: '400px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '96px',
            position: 'relative',
            boxShadow: '0 40px 100px -20px rgba(37, 99, 235, 0.4)',
            overflow: 'hidden'
          }}
        >
          {/* Simplified QR Symbol inside the icon */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            width: '240px',
            height: '240px',
          }}>
            <div style={{ display: 'flex', gap: 20, height: '110px' }}>
              <div style={{ width: '110px', height: '110px', border: '25px solid white', borderRadius: '15px' }} />
              <div style={{ width: '110px', height: '110px', background: 'rgba(255, 255, 255, 0.4)', borderRadius: '15px' }} />
            </div>
            <div style={{ display: 'flex', gap: 20, height: '110px' }}>
               <div style={{ width: '110px', height: '110px', background: 'rgba(255, 255, 255, 0.4)', borderRadius: '15px' }} />
               <div style={{ width: '110px', height: '110px', background: 'white', borderRadius: '15px' }} />
            </div>
          </div>
          {/* Glass Effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}