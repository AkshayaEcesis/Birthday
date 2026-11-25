import { useMemo } from 'react';

/**
 * Romantic ambient atmosphere: velvet vignette, warm candlelight bokeh,
 * twinkling gold/blush stars, and delicate rising hearts.
 */
export default function AmbientBackdrop({ intensity = 'normal' }) {
  const starCount = intensity === 'finale' ? 38 : 28;
  const heartCount = intensity === 'finale' ? 11 : 7;

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        id: `star-${i}`,
        left: `${(i * 37 + 9) % 96}%`,
        top: `${(i * 53 + 6) % 94}%`,
        size: (i % 3) + 1.5,
        duration: `${3.0 + (i % 5) * 0.85}s`,
        delay: `${(i % 7) * 0.42}s`,
        gold: i % 3 === 0,
      })),
    [starCount]
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: heartCount }, (_, i) => ({
        id: `heart-${i}`,
        left: `${(i * 17 + 7) % 92}%`,
        size: 10 + (i % 3) * 4,
        duration: `${13.5 + (i % 4) * 3.2}s`,
        delay: `${i * 1.85}s`,
        drift: `${(i % 2 === 0 ? 1 : -1) * (14 + (i % 3) * 8)}px`,
        opacity: 0.15 + (i % 3) * 0.06,
      })),
    [heartCount]
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Soft velvet vignette for depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 42%, rgba(16, 2, 7, 0.56) 100%)',
        }}
      />

      {/* Warm candlelight & blush bokeh orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-12%',
          width: '60vw',
          height: '60vw',
          maxWidth: '480px',
          maxHeight: '480px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(245, 207, 217, 0.18) 0%, transparent 70%)',
          filter: 'blur(42px)',
          animation: 'pulse-glow 8.5s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-14%',
          right: '-10%',
          width: '66vw',
          height: '66vw',
          maxWidth: '540px',
          maxHeight: '540px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(220, 184, 118, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'pulse-glow 10.5s ease-in-out infinite 2s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '38%',
          right: '8%',
          width: '34vw',
          height: '34vw',
          maxWidth: '280px',
          maxHeight: '280px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(196, 108, 134, 0.14) 0%, transparent 72%)',
          filter: 'blur(36px)',
          animation: 'pulse-glow 12s ease-in-out infinite 4s',
        }}
      />

      {/* Tiny glowing stars */}
      {stars.map((star) => (
        <span
          key={star.id}
          style={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '9999px',
            backgroundColor: star.gold ? '#F4E2B8' : '#FCE9EF',
            boxShadow: star.gold
              ? '0 0 9px rgba(244, 226, 184, 0.85)'
              : '0 0 8px rgba(245, 207, 217, 0.7)',
            animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}

      {/* Delicate floating SVG hearts */}
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          viewBox="0 0 24 24"
          width={heart.size}
          height={heart.size}
          style={{
            position: 'absolute',
            bottom: '-32px',
            left: heart.left,
            color: '#F5CFD9',
            opacity: heart.opacity,
            '--drift': heart.drift,
            animation: `float-up ${heart.duration} linear ${heart.delay} infinite`,
          }}
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
}
