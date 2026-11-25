import { Music, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { MUSIC_CONFIG } from '../config/surpriseConfig';

export default function MusicPlayer({ isPlaying, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      title={isPlaying ? 'Pause music' : `Play ${MUSIC_CONFIG.trackLabel}`}
      className="music-pill"
      style={{
        position: 'fixed',
        top: 'max(14px, env(safe-area-inset-top))',
        right: '14px',
        zIndex: 60,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        borderRadius: '9999px',
        border: '1px solid rgba(242, 223, 179, 0.35)',
        background: 'rgba(36, 7, 17, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#FCF6F1',
        fontSize: '0.78rem',
        fontWeight: 500,
        letterSpacing: '0.02em',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(10, 2, 5, 0.42)',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '22px',
          height: '22px',
          borderRadius: '9999px',
          background: isPlaying
            ? 'linear-gradient(135deg, rgba(216, 181, 115, 0.34), rgba(243, 205, 216, 0.25))'
            : 'rgba(255, 255, 255, 0.08)',
          color: '#F2DFB3',
        }}
      >
        {isPlaying ? <Pause size={12} /> : <Music size={12} />}
      </span>

      <span style={{ color: 'rgba(252, 246, 241, 0.92)' }}>
        {isPlaying ? 'Playing' : 'Music'}
      </span>

      {isPlaying && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex',
            alignItems: 'flex-end',
            gap: '2px',
            height: '12px',
          }}
        >
          {[0, 1, 2].map((bar) => (
            <motion.span
              key={bar}
              animate={{ height: ['4px', '11px', '5px'] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: bar * 0.18,
                ease: 'easeInOut',
              }}
              style={{
                width: '2px',
                borderRadius: '2px',
                backgroundColor: '#F2DFB3',
              }}
            />
          ))}
        </span>
      )}
    </motion.button>
  );
}

