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
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ 
              fontSize: '38px', 
              fontWeight: 900, 
              color: 'white', 
              letterSpacing: '-3px',
              marginBottom: '2px'
            }}>QR</span>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              width: '60px',
              height: '60px',
            }}>
              <div style={{ display: 'flex', gap: 6, height: '27px' }}>
                <div style={{ width: '27px', height: '27px', border: '6px solid rgba(255, 255, 255, 0.6)', borderRadius: '4px' }} />
                <div style={{ width: '27px', height: '27px', background: 'rgba(255, 255, 255, 0.3)', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', gap: 6, height: '27px' }}>
                 <div style={{ width: '27px', height: '27px', background: 'rgba(255, 255, 255, 0.3)', borderRadius: '4px' }} />
                 <div style={{ width: '27px', height: '27px', background: 'white', borderRadius: '4px' }} />
              </div>
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