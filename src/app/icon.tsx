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
          {/* Stylish QR Label inside icon */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ 
              fontSize: '110px', 
              fontWeight: 900, 
              color: 'white', 
              letterSpacing: '-10px',
              marginBottom: '10px'
            }}>QR</span>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
              width: '160px',
              height: '160px',
            }}>
              <div style={{ display: 'flex', gap: 15, height: '70px' }}>
                <div style={{ width: '70px', height: '70px', border: '18px solid rgba(255, 255, 255, 0.6)', borderRadius: '12px' }} />
                <div style={{ width: '70px', height: '70px', background: 'rgba(255, 255, 255, 0.3)', borderRadius: '12px' }} />
              </div>
              <div style={{ display: 'flex', gap: 15, height: '70px' }}>
                 <div style={{ width: '70px', height: '70px', background: 'rgba(255, 255, 255, 0.3)', borderRadius: '12px' }} />
                 <div style={{ width: '70px', height: '70px', background: 'white', borderRadius: '12px' }} />
              </div>
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