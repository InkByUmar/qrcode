
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
        <div style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, border: '6px solid #26EA56', borderRadius: '6px' }}>
          <div style={{ position: 'absolute', top: 7, left: 7, width: 14, height: 14, background: '#26EA56', borderRadius: '2px' }} />
        </div>
        <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, border: '6px solid #26EA56', borderRadius: '6px' }}>
          <div style={{ position: 'absolute', top: 7, left: 7, width: 14, height: 14, background: '#26EA56', borderRadius: '2px' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 20, left: 20, width: 40, height: 40, border: '6px solid #26EA56', borderRadius: '6px' }}>
          <div style={{ position: 'absolute', top: 7, left: 7, width: 14, height: 14, background: '#26EA56', borderRadius: '2px' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 12, right: 18, fontSize: 80, color: 'white' }}>
          QR
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
