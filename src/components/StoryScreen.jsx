import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';

export default function StoryScreen({
  stepData,
  stepIndex,
  totalSteps,
  onNext,
}) {
  return (
    <motion.section
      key={stepData.id}
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
        padding: '28px 20px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Subtle candlelight glow behind the love-letter card */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '86vw',
          maxWidth: '420px',
          height: '280px',
          borderRadius: '9999px',
          background:
            'radial-gradient(circle, rgba(245, 207, 217, 0.16) 0%, rgba(220, 184, 118, 0.1) 48%, transparent 74%)',
          filter: 'blur(36px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Minimal gold/rose chapter indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          aria-label={`Chapter ${stepIndex + 1} of ${totalSteps}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '26px',
          }}
        >
          {Array.from({ length: totalSteps }, (_, idx) => {
            const active = idx === stepIndex;
            const passed = idx < stepIndex;
            return (
              <span
                key={idx}
                style={{
                  width: active ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '9999px',
                  backgroundColor: active
                    ? '#F4E2B8'
                    : passed
                      ? 'rgba(245, 207, 217, 0.65)'
                      : 'rgba(252, 246, 241, 0.22)',
                  boxShadow: active ? '0 0 10px rgba(244, 226, 184, 0.55)' : 'none',
                  transition: 'all 0.35s ease',
                }}
              />
            );
          })}
        </motion.div>

        {/* Velvet Love-Letter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="love-card"
          style={{
            width: '100%',
            padding: '38px 26px 36px',
            marginBottom: '32px',
          }}
        >
          {/* Ornamental Top Flourish */}
          <div
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '22px',
              color: 'rgba(244, 226, 184, 0.78)',
              fontSize: '0.78rem',
            }}
          >
            <span
              style={{
                width: '32px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(244, 226, 184, 0.65))',
              }}
            />
            <span>♡</span>
            <span
              style={{
                width: '32px',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(244, 226, 184, 0.65), transparent)',
              }}
            />
          </div>

          {/* Emotional Message */}
          <h2
            className="font-serif"
            style={{
              margin: 0,
              fontSize: 'clamp(1.55rem, 5vw, 2.15rem)',
              fontWeight: 500,
              lineHeight: 1.45,
              letterSpacing: '0.01em',
              color: '#FCF6F1',
              minHeight: '3.2em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textShadow: '0 4px 24px rgba(15, 2, 7, 0.45)',
            }}
          >
            {stepData.typewriter ? (
              <TypewriterText text={stepData.text} speedMs={32} />
            ) : (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.15 }}
              >
                {stepData.text}
              </motion.span>
            )}
          </h2>

          {/* Subtle Bottom Flourish */}
          <div
            aria-hidden="true"
            style={{
              width: '44px',
              height: '1px',
              margin: '24px auto 0',
              background:
                'linear-gradient(90deg, transparent, rgba(245, 207, 217, 0.45), transparent)',
            }}
          />
        </motion.div>

        {/* Continue Button */}
        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="btn-romantic"
        >
          {stepData.buttonText}
        </motion.button>
      </div>
    </motion.section>
  );
}
