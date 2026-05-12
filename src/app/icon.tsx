
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
          background: '#060907',
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
            background: '#26EA56',
            width: '400px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '88px',
            position: 'relative',
          }}
        >
          {/* Finder Patterns (Black) */}
          <div style={{ position: 'absolute', top: 60, left: 60, width: 110, height: 110, border: '28px solid black', borderRadius: '15px' }}>
            <div style={{ position: 'absolute', top: 18, left: 18, width: 20, height: 20, background: '#26EA56', borderRadius: '4px' }} />
          </div>
          <div style={{ position: 'absolute', top: 60, right: 60, width: 110, height: 110, border: '28px solid black', borderRadius: '15px' }}>
            <div style={{ position: 'absolute', top: 18, left: 18, width: 20, height: 20, background: '#26EA56', borderRadius: '4px' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 60, left: 60, width: 110, height: 110, border: '28px solid black', borderRadius: '15px' }}>
            <div style={{ position: 'absolute', top: 18, left: 18, width: 20, height: 20, background: '#26EA56', borderRadius: '4px' }} />
          </div>

          {/* Central QR Typography (Black) - Clean and Simple */}
          <div style={{ 
            fontSize: 140, 
            color: 'black',
            fontWeight: 900,
            fontFamily: 'sans-serif',
            letterSpacing: '-6px',
            position: 'absolute',
            bottom: 70,
            right: 70
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
