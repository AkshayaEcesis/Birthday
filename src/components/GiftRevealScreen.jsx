import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GIFT_SCREEN } from '../config/surpriseConfig';

const BURST_HEARTS = [
  { id: 1, x: -78, y: -120, rotate: -22, delay: 0.05, size: 20 },
  { id: 2, x: -36, y: -152, rotate: -10, delay: 0.1, size: 16 },
  { id: 3, x: 10, y: -165, rotate: 8, delay: 0.04, size: 23 },
  { id: 4, x: 58, y: -140, rotate: 18, delay: 0.12, size: 17 },
  { id: 5, x: 86, y: -106, rotate: 26, delay: 0.08, size: 19 },
  { id: 6, x: -58, y: -86, rotate: -16, delay: 0.16, size: 15 },
  { id: 7, x: 46, y: -92, rotate: 14, delay: 0.14, size: 16 },
];

const ORBIT_SPARKLES = [
  { id: 'sp-1', top: '6%', left: '8%', delay: 0 },
  { id: 'sp-2', top: '14%', right: '6%', delay: 0.6 },
  { id: 'sp-3', bottom: '18%', left: '4%', delay: 1.1 },
  { id: 'sp-4', bottom: '14%', right: '8%', delay: 0.35 },
];

export default function GiftRevealScreen({ onReveal }) {
  const [opened, setOpened] = useState(false);

  const handleOpenGift = () => {
    if (opened) return;
    setOpened(true);

    const colors = ['#F5CFD9', '#DCB876', '#FCF6F1', '#C86D88'];
    confetti({
      particleCount: 60,
      spread: 74,
      origin: { y: 0.56 },
      colors,
      ticks: 190,
      gravity: 0.82,
      scalar: 0.95,
    });

    setTimeout(() => {
      confetti({
        particleCount: 38,
        angle: 60,
        spread: 58,
        origin: { x: 0.2, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 38,
        angle: 120,
        spread: 58,
        origin: { x: 0.8, y: 0.6 },
        colors,
      });
    }, 220);

    setTimeout(() => {
      onReveal();
    }, 1350);
  };

  return (
    <motion.section
      key="gift-screen"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(4px)' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 20px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.p
          className="font-serif"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{
            margin: '0 0 8px',
            fontSize: 'clamp(1.22rem, 4.2vw, 1.48rem)',
            fontStyle: 'italic',
            color: 'rgba(245, 207, 217, 0.94)',
          }}
        >
          {GIFT_SCREEN.lead}
        </motion.p>

        <motion.h2
          className="font-serif"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            margin: '0 0 44px',
            fontSize: 'clamp(1.7rem, 5.5vw, 2.25rem)',
            fontWeight: 600,
            color: '#FCF6F1',
            lineHeight: 1.35,
          }}
        >
          {GIFT_SCREEN.subtitle}
        </motion.h2>

        {/* Interactive Gift Box */}
        <motion.button
          type="button"
          onClick={handleOpenGift}
          aria-label="Open birthday gift box"
          disabled={opened}
          className={opened ? '' : 'gift-float-idle'}
          whileHover={{ scale: opened ? 1 : 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            position: 'relative',
            width: '206px',
            height: '198px',
            border: 'none',
            background: 'transparent',
            padding: 0,
            cursor: opened ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
          }}
        >
          {/* Radiant candlelight glow behind box */}
          <motion.div
            animate={
              opened
                ? { scale: 1.55, opacity: 0.95 }
                : { scale: [0.95, 1.08, 0.95], opacity: [0.48, 0.8, 0.48] }
            }
            transition={
              opened
                ? { duration: 0.7 }
                : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
            }
            style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '9999px',
              background:
                'radial-gradient(circle, rgba(220, 184, 118, 0.36) 0%, rgba(245, 207, 217, 0.18) 46%, transparent 72%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />

          {/* Orbiting gold sparkles */}
          {!opened &&
            ORBIT_SPARKLES.map((sp) => (
              <motion.span
                key={sp.id}
                animate={{ opacity: [0.25, 1, 0.25], scale: [0.7, 1.2, 0.7] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: sp.delay,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  top: sp.top,
                  bottom: sp.bottom,
                  left: sp.left,
                  right: sp.right,
                  color: '#F4E2B8',
                  fontSize: '0.85rem',
                  pointerEvents: 'none',
                  textShadow: '0 0 8px rgba(244, 226, 184, 0.85)',
                }}
              >
                ✦
              </motion.span>
            ))}

          {/* Rising golden light beam when opened */}
          {opened && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.2 }}
              animate={{ opacity: [0, 0.95, 0.7], scaleY: 1 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: '92px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '130px',
                height: '140px',
                transformOrigin: 'bottom center',
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(244, 226, 184, 0.48) 65%, rgba(255, 249, 236, 0.85) 100%)',
                clipPath: 'polygon(14% 0%, 86% 0%, 100% 100%, 0% 100%)',
                filter: 'blur(8px)',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Bursting Hearts when clicked */}
          {opened &&
            BURST_HEARTS.map((heart) => (
              <motion.svg
                key={heart.id}
                viewBox="0 0 24 24"
                width={heart.size}
                height={heart.size}
                fill="#F5CFD9"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: heart.x,
                  y: heart.y,
                  rotate: heart.rotate,
                  scale: [0.4, 1.18, 0.95],
                }}
                transition={{
                  duration: 1.1,
                  delay: heart.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: 'absolute',
                  top: '56px',
                  left: '50%',
                  marginLeft: `-${heart.size / 2}px`,
                  zIndex: 8,
                  filter: 'drop-shadow(0 0 8px rgba(245, 207, 217, 0.7))',
                }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
            ))}

          {/* Gift Box Assembly */}
          <div
            style={{
              position: 'relative',
              width: '158px',
              height: '150px',
              zIndex: 4,
            }}
          >
            {/* Gift Box Lid + Bow */}
            <motion.div
              animate={
                opened
                  ? { y: -58, rotate: -14, x: -18, opacity: 0.9 }
                  : { y: 0, rotate: 0, x: 0, opacity: 1 }
              }
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                zIndex: 6,
                width: '168px',
                marginLeft: '-5px',
              }}
            >
              {/* Satin Bow with flowing tails */}
              <svg
                viewBox="0 0 168 48"
                width="168"
                height="48"
                style={{ display: 'block', marginBottom: '-4px' }}
              >
                <defs>
                  <linearGradient id="ribbonGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F8E7BF" />
                    <stop offset="50%" stopColor="#DCB876" />
                    <stop offset="100%" stopColor="#B88E46" />
                  </linearGradient>
                </defs>
                {/* Ribbon tails */}
                <path d="M78 36 L58 47 L66 47 L82 37 Z" fill="#C99F54" />
                <path d="M90 36 L110 47 L102 47 L86 37 Z" fill="#C99F54" />
                {/* Left bow loop */}
                <path
                  d="M84 37 C56 39 34 22 43 9 C52 -3 78 13 84 35 Z"
                  fill="url(#ribbonGold)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.8"
                />
                {/* Right bow loop */}
                <path
                  d="M84 37 C112 39 134 22 125 9 C116 -3 90 13 84 35 Z"
                  fill="url(#ribbonGold)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.8"
                />
                {/* Center knot */}
                <rect
                  x="75"
                  y="24"
                  width="18"
                  height="16"
                  rx="6"
                  fill="#F1DCAB"
                  stroke="#A87D36"
                  strokeWidth="0.8"
                />
              </svg>

              {/* Lid Bar */}
              <div
                style={{
                  height: '32px',
                  width: '100%',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #912349 0%, #61102C 100%)',
                  border: '1px solid rgba(244, 226, 184, 0.54)',
                  boxShadow: '0 10px 24px rgba(10, 2, 5, 0.48)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '24px',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg, #C69B4F, #F4E2B8, #C69B4F)',
                  }}
                />
              </div>
            </motion.div>

            {/* Gift Box Base */}
            <div
              style={{
                position: 'relative',
                width: '152px',
                height: '94px',
                margin: '-2px auto 0',
                borderRadius: '0 0 15px 15px',
                background: 'linear-gradient(160deg, #77193A 0%, #4A0D23 100%)',
                border: '1px solid rgba(244, 226, 184, 0.46)',
                borderTop: 'none',
                boxShadow: '0 24px 48px rgba(10, 2, 5, 0.6)',
                overflow: 'hidden',
                zIndex: 4,
              }}
            >
              {/* Vertical Ribbon */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: '24px',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg, #BD9147, #F4E2B8, #BD9147)',
                }}
              />
              {/* Horizontal Ribbon */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '50%',
                  height: '18px',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(180deg, #F4E2B8, #C99E54)',
                  opacity: 0.94,
                }}
              />

              {/* Small hanging cream gift tag */}
              <div
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '12px',
                  transform: 'rotate(8deg)',
                  padding: '3px 7px',
                  borderRadius: '4px',
                  backgroundColor: '#FCF6F1',
                  border: '1px solid rgba(220, 184, 118, 0.6)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.28)',
                  color: '#5A1630',
                  fontFamily: 'var(--font-hand)',
                  fontSize: '0.82rem',
                  lineHeight: 1.1,
                  zIndex: 5,
                }}
              >
                Open me ♡
              </div>
            </div>
          </div>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: opened ? 0 : [0.58, 1, 0.58] }}
          transition={
            opened
              ? { duration: 0.2 }
              : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{
            margin: 0,
            fontSize: '0.88rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(244, 226, 184, 0.9)',
          }}
        >
          {opened ? 'Opening your memories…' : GIFT_SCREEN.tapHint}
        </motion.p>
      </div>
    </motion.section>
  );
}
