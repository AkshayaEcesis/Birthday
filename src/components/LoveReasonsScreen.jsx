import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { LOVE_REASONS_SCREEN } from '../config/surpriseConfig';

export default function LoveReasonsScreen({ onNext }) {
  const [flippedIds, setFlippedIds] = useState([]);

  const cards = LOVE_REASONS_SCREEN.cards;
  const allFlipped = flippedIds.length >= cards.length;

  const toggleCard = (id) => {
    setFlippedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const revealAll = () => {
    setFlippedIds(cards.map((c) => c.id));
  };

  return (
    <motion.section
      key="love-reasons-screen"
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
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            marginBottom: '12px',
          }}
        >
          <Sparkles size={11} />
          {LOVE_REASONS_SCREEN.badge}
        </motion.span>

        <h2
          className="font-serif"
          style={{
            margin: '0 0 8px',
            fontSize: 'clamp(1.5rem, 5vw, 2.05rem)',
            fontWeight: 600,
            lineHeight: 1.3,
            color: '#FCF6F1',
          }}
        >
          {LOVE_REASONS_SCREEN.heading}
        </h2>

        {/* Progress & optional reveal-all */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
            fontSize: '0.84rem',
            color: 'rgba(245, 207, 217, 0.88)',
          }}
        >
          <span>
            {allFlipped
              ? 'All 4 opened ♡'
              : `${LOVE_REASONS_SCREEN.hint} (${flippedIds.length}/${cards.length})`}
          </span>
          {!allFlipped && (
            <button
              type="button"
              onClick={revealAll}
              style={{
                border: '1px solid rgba(244, 226, 184, 0.32)',
                background: 'rgba(252, 246, 241, 0.07)',
                color: '#F4E2B8',
                fontSize: '0.74rem',
                padding: '3px 10px',
                borderRadius: '9999px',
                cursor: 'pointer',
              }}
            >
              Open all
            </button>
          )}
        </div>

        {/* 2x2 Grid of 3D Flip Love Cards */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '14px',
            marginBottom: '28px',
          }}
        >
          {cards.map((card, idx) => {
            const isFlipped = flippedIds.includes(card.id);
            return (
              <motion.button
                key={card.id}
                type="button"
                onClick={() => toggleCard(card.id)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: idx * 0.09 }}
                whileTap={{ scale: 0.97 }}
                className="flip-card"
                aria-label={`${card.label} — ${isFlipped ? 'opened' : 'tap to open'}`}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  height: '188px',
                  cursor: isFlipped ? 'default' : 'pointer',
                  textAlign: 'center',
                }}
              >
                <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                  {/* Front (Sealed Velvet Note) */}
                  <div
                    className="flip-card-face love-card"
                    style={{
                      borderRadius: '18px',
                      padding: '16px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '9999px',
                        background:
                          'radial-gradient(circle at 35% 30%, #A93458 0%, #6D1431 75%)',
                        border: '1px solid rgba(244, 226, 184, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F4E2B8',
                        boxShadow: '0 6px 14px rgba(10, 2, 5, 0.42)',
                      }}
                    >
                      <Heart size={16} fill="currentColor" />
                    </div>
                    <span
                      className="font-serif"
                      style={{
                        fontSize: '1.18rem',
                        fontWeight: 600,
                        color: '#FCF6F1',
                      }}
                    >
                      {card.label}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(244, 226, 184, 0.8)',
                      }}
                    >
                      Tap to open
                    </span>
                  </div>

                  {/* Back (Warm Cream Love Note) */}
                  <div
                    className="flip-card-face flip-card-back"
                    style={{
                      borderRadius: '18px',
                      padding: '14px 12px',
                      background: 'linear-gradient(165deg, #FFFDF9 0%, #F7EAE1 100%)',
                      border: '1.5px solid rgba(220, 184, 118, 0.65)',
                      boxShadow:
                        '0 18px 38px rgba(10, 2, 5, 0.48), 0 0 22px rgba(245, 207, 217, 0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2F111B',
                    }}
                  >
                    <span
                      className="font-hand"
                      style={{
                        fontSize: '1.08rem',
                        color: '#9C3B5B',
                        marginBottom: '4px',
                      }}
                    >
                      {card.label} ♡
                    </span>
                    <p
                      className="font-serif"
                      style={{
                        margin: 0,
                        fontSize: '0.96rem',
                        lineHeight: 1.4,
                        fontWeight: 500,
                        color: '#34131E',
                      }}
                    >
                      {card.note}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Continue Button once all 4 cards are flipped */}
        <div style={{ minHeight: '54px', display: 'flex', alignItems: 'center' }}>
          <AnimatePresence>
            {allFlipped && (
              <motion.button
                type="button"
                onClick={onNext}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="btn-romantic btn-romantic-cream"
              >
                {LOVE_REASONS_SCREEN.continueButton}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

