import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Red left bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            background: '#FF2D55',
            display: 'flex',
          }}
        />
        {/* TL letters */}
        <span
          style={{
            fontSize: 14,
            fontWeight: 900,
            color: '#F2EDE4',
            fontFamily: 'Arial Black, Arial, sans-serif',
            letterSpacing: '-0.5px',
            marginLeft: 2,
          }}
        >
          TL
        </span>
        {/* Red dot */}
        <div
          style={{
            position: 'absolute',
            bottom: 5,
            right: 5,
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: '#FF2D55',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
