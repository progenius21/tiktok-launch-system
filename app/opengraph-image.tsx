import { ImageResponse } from 'next/og';

export const alt = 'TikTok Launch System — 0 to 10K Users, $0 Ad Spend';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 100px',
          position: 'relative',
          fontFamily: 'Arial Black, Arial, sans-serif',
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '6px',
            background: '#FF2D55',
            display: 'flex',
          }}
        />

        {/* Top border line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: '#1E1E1E',
            display: 'flex',
          }}
        />

        {/* Bottom border line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: '#1E1E1E',
            display: 'flex',
          }}
        />

        {/* Section label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background: '#FF2D55',
              display: 'flex',
            }}
          />
          <span
            style={{
              fontSize: 13,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FF2D55',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 400,
            }}
          >
            The Organic Growth Playbook
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            lineHeight: 0.88,
          }}
        >
          <span
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: '#F2EDE4',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              display: 'block',
              lineHeight: 0.9,
            }}
          >
            0 TO 10,000
          </span>
          <span
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: '#FF2D55',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              display: 'block',
              lineHeight: 0.9,
            }}
          >
            USERS.
          </span>
        </div>

        {/* Sub headline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#A89F92',
            marginTop: 28,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          ZERO AD SPEND.
        </div>

        {/* Brand — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: 52,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#A89F92' }}>TIKTOK</span>
          <span style={{ color: '#FF2D55' }}>.</span>
          <span style={{ color: '#A89F92' }}>LAUNCH</span>
        </div>

        {/* Price badge — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: 46,
            left: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            border: '1px solid #1E1E1E',
            padding: '10px 20px',
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: '#A89F92',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            One-time
          </span>
          <span style={{ color: '#1E1E1E', fontSize: 13 }}>·</span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: '#F2EDE4',
            }}
          >
            $149
          </span>
          <span style={{ color: '#1E1E1E', fontSize: 13 }}>·</span>
          <span
            style={{
              fontSize: 13,
              color: '#A89F92',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Lifetime access
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
