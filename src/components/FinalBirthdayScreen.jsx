import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, Images } from 'lucide-react';
import { FINAL_SCREEN, PHOTOS } from '../config/surpriseConfig';

export default function FinalBirthdayScreen({ onReplay, onBackToGallery }) {
  const [locketError, setLocketError] = useState(false);
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
        padding: '44px 20px 48px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Soft luminous halo behind birthday wish */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '40%',
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
              marginBottom: '20px',
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
              marginBottom: '12px',
            }}
          >
            ✦ Today & Always ✦
          </span>

          <h1
            className="font-serif"
            style={{
              margin: '0 0 24px',
              lineHeight: 1.18,
              color: '#FCF6F1',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(1.3rem, 4.6vw, 1.8rem)',
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
                fontSize: 'clamp(2.55rem, 11vw, 4.15rem)',
                fontWeight: 700,
                letterSpacing: '0.06em',
              }}
            >
              {FINAL_SCREEN.recipient}
            </span>{' '}
            <span
              style={{
                display: 'inline-block',
                fontSize: 'clamp(1.85rem, 6.5vw, 2.75rem)',
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
          transition={{ duration: 0.85, delay: 0.38 }}
          className="love-card"
          style={{
            width: '100%',
            maxWidth: '480px',
            padding: '26px 22px 24px',
            marginBottom: '32px',
          }}
        >
          <p
            className="font-serif"
            style={{
              margin: '0 0 18px',
              fontSize: 'clamp(1.16rem, 4vw, 1.36rem)',
              lineHeight: 1.66,
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
              margin: '0 auto 14px',
              background:
                'linear-gradient(90deg, transparent, rgba(244, 226, 184, 0.7), transparent)',
            }}
          />

          <p
            className="font-hand"
            style={{
              margin: 0,
              fontSize: '1.48rem',
              color: '#F4E2B8',
            }}
          >
            {FINAL_SCREEN.signature}
          </p>
        </motion.div>

        {/* Replay & Gallery Actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={onReplay}
            className="btn-romantic"
          >
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
    </motion.section>
  );
}
