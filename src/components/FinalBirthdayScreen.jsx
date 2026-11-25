import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, Heart, Images, RotateCcw, Sparkles, X } from 'lucide-react';
import {
  FINAL_SCREEN,
  LOVE_WHISPERS,
  PHOTOS,
} from '../config/surpriseConfig';

export default function FinalBirthdayScreen({ onReplay, onBackToGallery }) {
  const [locketError, setLocketError] = useState(false);
  const [whisperIndex, setWhisperIndex] = useState(-1);
  const [loveBurstCount, setLoveBurstCount] = useState(0);
  const [wishModalOpen, setWishModalOpen] = useState(false);
  const [wishText, setWishText] = useState('');
  const [wishSent, setWishSent] = useState(false);

  const featuredPhoto = PHOTOS.find((p) => p.isFinal) || PHOTOS[PHOTOS.length - 1];

  useEffect(() => {
    const colors = ['#F5CFD9', '#DCB876', '#FCF6F1', '#B54E6E'];

    confetti({
      particleCount: 72,
      spread: 88,
      origin: { y: 0.44 },
      colors,
      ticks: 220,
      gravity: 0.72,
    });

    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      confetti({
        particleCount: 16,
        angle: 90,
        spread: 112,
        startVelocity: 14,
        origin: { x: Math.random() * 0.8 + 0.1, y: -0.05 },
        colors,
        ticks: 260,
        gravity: 0.46,
        scalar: 0.88,
        drift: (Math.random() - 0.5) * 0.6,
      });
      if (count >= 8) {
        clearInterval(interval);
      }
    }, 950);

    return () => clearInterval(interval);
  }, []);

  const handleSendLove = () => {
    setLoveBurstCount((prev) => prev + 1);
    setWhisperIndex((prev) => (prev + 1) % LOVE_WHISPERS.length);
    confetti({
      particleCount: 28,
      spread: 64,
      origin: { y: 0.65 },
      colors: ['#F5CFD9', '#DCB876', '#FF9EB5', '#FCF6F1'],
      ticks: 150,
      gravity: 0.75,
      scalar: 0.9,
    });
  };

  const handleSendWishLantern = (e) => {
    e.preventDefault();
    setWishSent(true);
    confetti({
      particleCount: 36,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#F4E2B8', '#F5CFD9', '#FCF6F1'],
      ticks: 180,
      gravity: 0.6,
    });
  };

  return (
    <motion.section
      key="final-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85 }}
      style={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 18px 56px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Soft luminous halo behind birthday wish */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxWidth: '540px',
          height: '340px',
          borderRadius: '9999px',
          background:
            'radial-gradient(circle, rgba(245, 207, 217, 0.24) 0%, rgba(220, 184, 118, 0.16) 45%, transparent 72%)',
          filter: 'blur(38px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Keepsake circular locket portrait */}
        {featuredPhoto && !locketError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              width: '104px',
              height: '104px',
              borderRadius: '9999px',
              padding: '3px',
              background:
                'linear-gradient(135deg, #F6E4BE 0%, #DCB876 50%, #F5CFD9 100%)',
              boxShadow:
                '0 14px 34px rgba(10, 2, 5, 0.55), 0 0 28px rgba(220, 184, 118, 0.32)',
              marginBottom: '18px',
            }}
          >
            <img
              src={featuredPhoto.src}
              alt={featuredPhoto.caption || 'Us together'}
              onError={() => setLocketError(true)}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '9999px',
                objectFit: 'cover',
                objectPosition: featuredPhoto.objectPosition || '50% 24%',
                display: 'block',
                border: '2px solid #380B1C',
              }}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.78rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(244, 226, 184, 0.9)',
              marginBottom: '10px',
            }}
          >
            ✦ Today & Always ✦
          </span>

          <h1
            className="font-serif"
            style={{
              margin: '0 0 22px',
              lineHeight: 1.18,
              color: '#FCF6F1',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(1.28rem, 4.5vw, 1.75rem)',
                fontWeight: 500,
                letterSpacing: '0.18em',
                color: 'rgba(252, 246, 241, 0.92)',
                marginBottom: '6px',
              }}
            >
              {FINAL_SCREEN.headlinePrefix}
            </span>
            <span
              className="name-highlight"
              style={{
                display: 'inline-block',
                fontSize: 'clamp(2.5rem, 10.8vw, 4.1rem)',
                fontWeight: 700,
                letterSpacing: '0.06em',
              }}
            >
              {FINAL_SCREEN.recipient}
            </span>{' '}
            <span
              style={{
                display: 'inline-block',
                fontSize: 'clamp(1.8rem, 6.2vw, 2.7rem)',
                verticalAlign: 'middle',
              }}
            >
              {FINAL_SCREEN.headlineSuffix}
            </span>
          </h1>
        </motion.div>

        {/* Heartfelt birthday wish inside delicate velvet keepsake card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35 }}
          className="love-card"
          style={{
            width: '100%',
            maxWidth: '480px',
            padding: '24px 20px 22px',
            marginBottom: '22px',
          }}
        >
          <p
            className="font-serif"
            style={{
              margin: '0 0 16px',
              fontSize: 'clamp(1.12rem, 3.9vw, 1.32rem)',
              lineHeight: 1.64,
              color: 'rgba(252, 246, 241, 0.95)',
            }}
          >
            {FINAL_SCREEN.message}
          </p>

          <div
            aria-hidden="true"
            style={{
              width: '52px',
              height: '1px',
              margin: '0 auto 12px',
              background:
                'linear-gradient(90deg, transparent, rgba(244, 226, 184, 0.7), transparent)',
            }}
          />

          <p
            className="font-hand"
            style={{
              margin: 0,
              fontSize: '1.46rem',
              color: '#F4E2B8',
            }}
          >
            {FINAL_SCREEN.signature}
          </p>
        </motion.div>

        {/* Interactive Love Shower + Birthday Wish Lantern */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '12px',
          }}
        >
          <button
            type="button"
            onClick={handleSendLove}
            className="btn-romantic btn-romantic-cream"
            style={{ fontSize: '0.88rem', padding: '0.78rem 1.45rem' }}
          >
            <Heart size={15} fill="currentColor" />
            Tap for Extra Love {loveBurstCount > 0 ? `(${loveBurstCount})` : ''}
          </button>

          <button
            type="button"
            onClick={() => setWishModalOpen(true)}
            className="btn-romantic"
            style={{ fontSize: '0.88rem', padding: '0.78rem 1.4rem' }}
          >
            <Sparkles size={15} />
            {wishSent ? 'Wish Sent ✨' : 'Make a Wish ✨'}
          </button>
        </motion.div>

        {/* Cycled Love Whisper */}
        <div style={{ minHeight: '30px', marginBottom: '22px' }}>
          <AnimatePresence mode="wait">
            {whisperIndex >= 0 && (
              <motion.p
                key={`whisper-${loveBurstCount}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="font-hand"
                style={{
                  margin: 0,
                  fontSize: '1.3rem',
                  color: '#F5CFD9',
                }}
              >
                {LOVE_WHISPERS[whisperIndex]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Replay & Gallery Actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <button type="button" onClick={onReplay} className="btn-romantic">
            <RotateCcw size={16} />
            {FINAL_SCREEN.replayButton}
          </button>

          <button
            type="button"
            onClick={onBackToGallery}
            className="btn-romantic"
            style={{
              background: 'rgba(252, 246, 241, 0.06)',
              borderColor: 'rgba(245, 207, 217, 0.28)',
              fontSize: '0.88rem',
            }}
          >
            <Images size={15} />
            {FINAL_SCREEN.galleryButton}
          </button>
        </motion.div>
      </div>

      {/* Birthday Wish Sky Lantern Modal */}
      <AnimatePresence>
        {wishModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishModalOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 85,
              backgroundColor: 'rgba(14, 2, 7, 0.86)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 18px',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="love-card"
              style={{
                width: '100%',
                maxWidth: '380px',
                padding: '26px 22px 24px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setWishModalOpen(false)}
                aria-label="Close wish modal"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(244, 226, 184, 0.35)',
                  background: 'rgba(252, 246, 241, 0.08)',
                  color: '#FCF6F1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={15} />
              </button>

              {/* Glowing Sky Lantern Illustration */}
              <motion.div
                animate={
                  wishSent
                    ? { y: [-6, -24, -14], scale: [1, 1.06, 1] }
                    : { y: [0, -6, 0] }
                }
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '64px',
                  height: '78px',
                  margin: '4px auto 16px',
                  borderRadius: '26px 26px 12px 12px',
                  background:
                    'radial-gradient(circle at 50% 62%, #FFF7DB 0%, #F4C476 48%, #B8524C 100%)',
                  boxShadow:
                    '0 0 32px rgba(244, 196, 118, 0.55), inset 0 -10px 18px rgba(255, 247, 219, 0.7)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '8px',
                  color: '#FFF9E8',
                }}
              >
                <Flame size={18} />
              </motion.div>

              {!wishSent ? (
                <form onSubmit={handleSendWishLantern}>
                  <h3
                    className="font-serif"
                    style={{ margin: '0 0 8px', fontSize: '1.5rem', color: '#FCF6F1' }}
                  >
                    Make a Birthday Wish
                  </h3>
                  <p
                    style={{
                      margin: '0 0 14px',
                      fontSize: '0.86rem',
                      color: 'rgba(245, 207, 217, 0.88)',
                      lineHeight: 1.5,
                    }}
                  >
                    Close your eyes or whisper a wish below, then release your lantern into the sky.
                  </p>
                  <textarea
                    rows={3}
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="Type a secret wish (optional)…"
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid rgba(244, 226, 184, 0.3)',
                      background: 'rgba(20, 4, 10, 0.55)',
                      color: '#FCF6F1',
                      padding: '10px 12px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      resize: 'none',
                      marginBottom: '14px',
                      outline: 'none',
                    }}
                  />
                  <button type="submit" className="btn-romantic btn-romantic-cream">
                    Release Lantern ✨
                  </button>
                </form>
              ) : (
                <div>
                  <h3
                    className="font-serif"
                    style={{ margin: '0 0 8px', fontSize: '1.55rem', color: '#F4E2B8' }}
                  >
                    Sent to the Stars ♡
                  </h3>
                  <p
                    className="font-serif"
                    style={{
                      margin: '0 0 16px',
                      fontSize: '1.08rem',
                      lineHeight: 1.55,
                      color: '#FCF6F1',
                    }}
                  >
                    May every wish in your heart come true, my love — and I hope I get to stand right beside you for all of them.
                  </p>
                  <button
                    type="button"
                    onClick={() => setWishModalOpen(false)}
                    className="btn-romantic"
                  >
                    Back to Celebration
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
