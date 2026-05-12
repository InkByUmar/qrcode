
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'QR CANVAS Apple Studio Icon';
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
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            background: '#26EA56',
            width: '140px',
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '32px',
            position: 'relative',
          }}
        >
          {/* Finder Patterns */}
          <div style={{ position: 'absolute', top: 22, left: 22, width: 38, height: 38, border: '10px solid black', borderRadius: '6px' }} />
          <div style={{ position: 'absolute', top: 22, right: 22, width: 38, height: 38, border: '10px solid black', borderRadius: '6px' }} />
          <div style={{ position: 'absolute', bottom: 22, left: 22, width: 38, height: 38, border: '10px solid black', borderRadius: '6px' }} />
          
          {/* Black QR Text */}
          <div style={{ 
            fontSize: 48, 
            color: 'black',
            fontWeight: 900,
            fontFamily: 'sans-serif',
            position: 'absolute',
            bottom: 25,
            right: 25
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
