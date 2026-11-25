import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { WISH_STARS_SCREEN } from '../config/surpriseConfig';

export default function WishStarsScreen({ onNext }) {
  const stars = WISH_STARS_SCREEN.stars;
  const [litOrder, setLitOrder] = useState([]);
  const [activeStar, setActiveStar] = useState(null);

  const allLit = litOrder.length >= stars.length;

  const handleTapStar = (star) => {
    setActiveStar(star);
    if (litOrder.includes(star.id)) return;

    const nextOrder = [...litOrder, star.id];
    setLitOrder(nextOrder);

    if (nextOrder.length === stars.length) {
      confetti({
        particleCount: 40,
        spread: 68,
        origin: { y: 0.45 },
        colors: ['#F4E2B8', '#F5CFD9', '#FCF6F1'],
        ticks: 160,
        gravity: 0.7,
        scalar: 0.85,
      });
    }
  };

  // Build connected line segments along the heart path for lit stars
  const segments = [];
  for (let i = 0; i < stars.length; i += 1) {
    const a = stars[i];
    const b = stars[(i + 1) % stars.length];
    const bothLit = litOrder.includes(a.id) && litOrder.includes(b.id);
    if (bothLit) {
      segments.push({ id: `${a.id}-${b.id}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    }
  }

  return (
    <motion.section
      key="wish-stars-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, filter: 'blur(3px)' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 18px 44px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '9999px',
            border: '1px solid rgba(244, 226, 184, 0.28)',
            background: 'rgba(252, 246, 241, 0.05)',
            fontSize: '0.73rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#F4E2B8',
            marginBottom: '10px',
          }}
        >
          <Sparkles size={11} />
          {WISH_STARS_SCREEN.badge}
        </span>

        <h2
          className="font-serif"
          style={{
            margin: '0 0 6px',
            fontSize: 'clamp(1.48rem, 5vw, 2rem)',
            fontWeight: 600,
            lineHeight: 1.3,
            color: '#FCF6F1',
          }}
        >
          {allLit ? WISH_STARS_SCREEN.completedHeading : WISH_STARS_SCREEN.heading}
        </h2>

        <p
          style={{
            margin: '0 0 18px',
            fontSize: '0.84rem',
            color: 'rgba(245, 207, 217, 0.85)',
          }}
        >
          {allLit
            ? 'Our heart constellation is complete ♡'
            : `${litOrder.length} of ${stars.length} stars lit`}
        </p>

        {/* Interactive Night-Sky Heart Constellation */}
        <div
          className="love-card"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '360px',
            aspectRatio: '1 / 0.88',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '20px',
            background:
              'radial-gradient(circle at 50% 45%, rgba(168, 84, 110, 0.16) 0%, rgba(22, 4, 11, 0.72) 72%)',
          }}
        >
          {/* Constellation Lines SVG */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            {/* Faint guide outline of the heart */}
            <path
              d="M50 35 L24 22 L18 54 L50 84 L82 54 L76 22 Z"
              fill="none"
              stroke="rgba(244, 226, 184, 0.12)"
              strokeWidth="0.6"
              strokeDasharray="1.8 2"
            />
            {segments.map((seg) => (
              <motion.line
                key={seg.id}
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke="#F4E2B8"
                strokeWidth={allLit ? '1.3' : '1'}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: 1, opacity: allLit ? 0.95 : 0.75 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            ))}
          </svg>

          {/* Interactive Star Buttons */}
          {stars.map((star, idx) => {
            const isLit = litOrder.includes(star.id);
            const isActive = activeStar?.id === star.id;
            return (
              <motion.button
                key={star.id}
                type="button"
                onClick={() => handleTapStar(star)}
                aria-label={`Star ${idx + 1}: ${star.title}`}
                animate={
                  isLit
                    ? { scale: isActive ? 1.18 : 1.05 }
                    : { scale: [1, 1.14, 1], opacity: [0.75, 1, 0.75] }
                }
                transition={
                  isLit
                    ? { duration: 0.3 }
                    : { duration: 2.1, repeat: Infinity, delay: idx * 0.25 }
                }
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute',
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '44px',
                  height: '44px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                {/* Glow ring */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    width: isLit ? '34px' : '24px',
                    height: isLit ? '34px' : '24px',
                    borderRadius: '9999px',
                    background: isLit
                      ? 'radial-gradient(circle, rgba(244, 226, 184, 0.55) 0%, transparent 72%)'
                      : 'radial-gradient(circle, rgba(245, 207, 217, 0.28) 0%, transparent 72%)',
                  }}
                />
                {/* Star Glyph */}
                <span
                  style={{
                    position: 'relative',
                    fontSize: isLit ? '1.35rem' : '1.05rem',
                    color: isLit ? '#F4E2B8' : 'rgba(252, 246, 241, 0.72)',
                    textShadow: isLit
                      ? '0 0 14px rgba(244, 226, 184, 0.95)'
                      : '0 0 8px rgba(245, 207, 217, 0.5)',
                  }}
                >
                  {isLit ? '✦' : '✧'}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Active Star Whisper Card */}
        <div style={{ width: '100%', minHeight: '94px', marginBottom: '22px' }}>
          <AnimatePresence mode="wait">
            {activeStar ? (
              <motion.div
                key={activeStar.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="love-card"
                style={{
                  padding: '16px 18px',
                  borderRadius: '16px',
                }}
              >
                <span
                  className="font-hand"
                  style={{
                    display: 'block',
                    fontSize: '1.15rem',
                    color: '#F4E2B8',
                    marginBottom: '4px',
                  }}
                >
                  ✦ {activeStar.title}
                </span>
                <p
                  className="font-serif"
                  style={{
                    margin: 0,
                    fontSize: '1.08rem',
                    lineHeight: 1.48,
                    color: '#FCF6F1',
                  }}
                >
                  {activeStar.whisper}
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="star-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                className="font-serif"
                style={{
                  margin: '20px 0 0',
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  color: 'rgba(245, 207, 217, 0.82)',
                }}
              >
                Each star holds a little whisper just for you…
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Continue to Gift Box */}
        <div style={{ minHeight: '52px', display: 'flex', alignItems: 'center' }}>
          <AnimatePresence>
            {allLit && (
              <motion.button
                type="button"
                onClick={onNext}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="btn-romantic btn-romantic-cream"
              >
                {WISH_STARS_SCREEN.continueButton}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

