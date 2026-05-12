
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
            borderRadius: '28px',
            position: 'relative',
          }}
        >
          {/* Simplified Finder Patterns for Small Sizes */}
          <div style={{ position: 'absolute', top: 18, left: 18, width: 35, height: 35, border: '8px solid black', borderRadius: '6px' }} />
          <div style={{ position: 'absolute', top: 18, right: 18, width: 35, height: 35, border: '8px solid black', borderRadius: '6px' }} />
          <div style={{ position: 'absolute', bottom: 18, left: 18, width: 35, height: 35, border: '8px solid black', borderRadius: '6px' }} />
          
          {/* QR Text (Black) */}
          <div style={{ 
            fontSize: 48, 
            color: 'black',
            fontWeight: 900,
            fontFamily: 'sans-serif'
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
