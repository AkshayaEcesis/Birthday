import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { OPENING_SCREEN } from '../config/surpriseConfig';

export default function OpeningEnvelopeScreen({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 980);
  };

  return (
    <motion.section
      key="opening-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
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
          maxWidth: '410px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Subtle romantic postmark pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '9999px',
            border: '1px solid rgba(244, 226, 184, 0.28)',
            background: 'rgba(252, 246, 241, 0.06)',
            color: 'rgba(244, 226, 184, 0.9)',
            fontSize: '0.72rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: '26px',
          }}
        >
          <Sparkles size={11} />
          Sealed With Love
        </motion.div>

        {/* Interactive Sealed Envelope */}
        <motion.div
          onClick={handleOpenClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenClick();
            }
          }}
          aria-label="Open sealed envelope"
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: isOpening ? 1 : 1.025, y: isOpening ? 0 : -2 }}
          whileTap={{ scale: 0.98 }}
          style={{
            position: 'relative',
            width: '248px',
            height: '168px',
            marginBottom: '34px',
            cursor: 'pointer',
            perspective: '900px',
          }}
        >
          {/* Ambient rose-gold glow behind envelope */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.55, 0.9, 0.55], scale: [0.96, 1.05, 0.96] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: '-26px',
              borderRadius: '36px',
              background:
                'radial-gradient(circle, rgba(245, 207, 217, 0.28) 0%, rgba(220, 184, 118, 0.16) 46%, transparent 72%)',
              filter: 'blur(20px)',
              zIndex: 0,
            }}
          />

          {/* Letter Card Sliding Up on Open */}
          <motion.div
            animate={isOpening ? { y: -68, opacity: 1 } : { y: 4, opacity: 0.96 }}
            transition={{ duration: 0.72, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: '16px',
              right: '16px',
              top: '14px',
              height: '130px',
              borderRadius: '10px',
              background: 'linear-gradient(180deg, #FFFDFB 0%, #F7ECE4 100%)',
              border: '1px solid rgba(220, 184, 118, 0.52)',
              boxShadow: '0 10px 26px rgba(15, 2, 7, 0.28)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#A8546E',
                marginBottom: '6px',
              }}
            >
              ✦ For You ✦
            </span>
            <span
              className="font-hand"
              style={{
                color: '#6D1633',
                fontSize: '1.32rem',
                lineHeight: 1.2,
              }}
            >
              A little secret inside ♡
            </span>
          </motion.div>

          {/* Envelope Back Body */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '14px',
              background: 'linear-gradient(155deg, #FCF5EE 0%, #EEDDD4 100%)',
              border: '1px solid rgba(220, 184, 118, 0.58)',
              boxShadow: '0 24px 52px rgba(10, 2, 5, 0.58)',
              overflow: 'hidden',
              zIndex: 1,
            }}
          />

          {/* Envelope Bottom & Side Fold Lines */}
          <svg
            viewBox="0 0 248 168"
            width="248"
            height="168"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              pointerEvents: 'none',
              borderRadius: '14px',
            }}
          >
            <path d="M0 168 L124 86 L248 168 Z" fill="#F8ECE4" />
            <path d="M0 0 L124 92 L0 168 Z" fill="#F3E3D9" opacity="0.9" />
            <path d="M248 0 L124 92 L248 168 Z" fill="#EEDBD0" opacity="0.92" />
            <path
              d="M0 168 L124 86 L248 168"
              fill="none"
              stroke="rgba(180, 128, 142, 0.36)"
              strokeWidth="1.2"
            />
            {/* Delicate rose-gold trim line along bottom edge */}
            <path
              d="M18 156 H230"
              stroke="rgba(220, 184, 118, 0.38)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          </svg>

          {/* Top Flap */}
          <motion.div
            animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '98px',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: isOpening ? 1 : 4,
              pointerEvents: 'none',
            }}
          >
            <svg viewBox="0 0 248 98" width="248" height="98">
              <defs>
                <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFBF7" />
                  <stop offset="100%" stopColor="#EAD5CA" />
                </linearGradient>
              </defs>
              <path
                d="M2 2 L124 92 L246 2 Z"
                fill="url(#flapGrad)"
                stroke="rgba(220, 184, 118, 0.55)"
                strokeWidth="1.2"
              />
            </svg>
          </motion.div>

          {/* Wax Seal */}
          <motion.div
            animate={
              isOpening
                ? { scale: 0.65, opacity: 0, y: -12 }
                : { scale: [1, 1.06, 1], opacity: 1, y: 0 }
            }
            transition={
              isOpening
                ? { duration: 0.35 }
                : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
            }
            style={{
              position: 'absolute',
              left: '50%',
              top: '80px',
              transform: 'translate(-50%, -50%)',
              width: '46px',
              height: '46px',
              borderRadius: '9999px',
              background:
                'radial-gradient(circle at 35% 30%, #A93458 0%, #711534 68%, #4E0B21 100%)',
              border: '1.5px solid rgba(244, 226, 184, 0.78)',
              boxShadow:
                '0 8px 20px rgba(24, 4, 11, 0.5), 0 0 18px rgba(220, 184, 118, 0.25), inset 0 1px 4px rgba(255,255,255,0.32)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F4E2B8',
              fontSize: '1.05rem',
              zIndex: 5,
            }}
          >
            ♥
          </motion.div>
        </motion.div>

        {/* Opening Typography */}
        <motion.h1
          className="font-serif"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            margin: '0 0 12px',
            fontSize: 'clamp(1.95rem, 6.2vw, 2.6rem)',
            fontWeight: 600,
            letterSpacing: '0.015em',
            color: '#FCF6F1',
            textShadow: '0 4px 24px rgba(10, 2, 5, 0.45)',
          }}
        >
          {OPENING_SCREEN.greeting}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45 }}
          style={{
            marginBottom: '34px',
            color: 'rgba(245, 207, 217, 0.94)',
            fontSize: 'clamp(1.06rem, 3.9vw, 1.2rem)',
            lineHeight: 1.65,
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
          }}
        >
          {OPENING_SCREEN.lines.map((line) => (
            <p key={line} style={{ margin: '2px 0' }}>
              {line}
            </p>
          ))}
        </motion.div>

        <motion.button
          type="button"
          onClick={handleOpenClick}
          disabled={isOpening}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="btn-romantic btn-romantic-cream"
        >
          {isOpening ? 'Opening…' : OPENING_SCREEN.buttonText}
        </motion.button>
      </div>
    </motion.section>
  );
}
