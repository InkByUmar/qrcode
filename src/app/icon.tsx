
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
            borderRadius: '80px',
            position: 'relative',
          }}
        >
          {/* Finder Patterns (Black) */}
          <div style={{ position: 'absolute', top: 50, left: 50, width: 100, height: 100, border: '25px solid black', borderRadius: '15px' }}>
            <div style={{ position: 'absolute', top: 15, left: 15, width: 20, height: 20, background: '#26EA56', borderRadius: '4px' }} />
          </div>
          <div style={{ position: 'absolute', top: 50, right: 50, width: 100, height: 100, border: '25px solid black', borderRadius: '15px' }}>
            <div style={{ position: 'absolute', top: 15, left: 15, width: 20, height: 20, background: '#26EA56', borderRadius: '4px' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 50, left: 50, width: 100, height: 100, border: '25px solid black', borderRadius: '15px' }}>
            <div style={{ position: 'absolute', top: 15, left: 15, width: 20, height: 20, background: '#26EA56', borderRadius: '4px' }} />
          </div>

          {/* QR Text (Black) */}
          <div style={{ 
            fontSize: 140, 
            color: 'black',
            fontWeight: 900,
            fontFamily: 'sans-serif'
          }}>
            QR
          </div>
          
          {/* Bar style dots */}
          <div style={{ position: 'absolute', bottom: 60, right: 60, width: 35, height: 35, background: 'black', borderRadius: '6px' }} />
          <div style={{ position: 'absolute', bottom: 110, right: 60, width: 35, height: 35, background: 'black', borderRadius: '6px' }} />
          <div style={{ position: 'absolute', bottom: 60, right: 110, width: 35, height: 35, background: 'black', borderRadius: '6px' }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
