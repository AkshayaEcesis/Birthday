import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ImagePlus, Sparkles, X } from 'lucide-react';
import { GALLERY_SCREEN, PHOTOS } from '../config/surpriseConfig';

function PolaroidPlaceholder({ label, index }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '4 / 5',
        borderRadius: '4px',
        background: 'linear-gradient(145deg, #F5E6EA 0%, #EAD4DC 100%)',
        border: '1px dashed rgba(159, 82, 106, 0.45)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        textAlign: 'center',
        color: '#6F4653',
      }}
    >
      <ImagePlus size={26} style={{ marginBottom: '8px', opacity: 0.7 }} />
      <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>
        Memory #{index + 1}
      </span>
      <span style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '4px' }}>
        {label || 'Add photo to public/photos/'}
      </span>
    </div>
  );
}

function PolaroidCard({ photo, index, isVisible, isLiked, onToggleLike, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const useWashiTape = !photo.isFinal && index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.84, y: 28, rotate: 0 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: photo.rotation ?? (index % 2 === 0 ? -2 : 2),
            }
          : { opacity: 0, scale: 0.84, y: 28 }
      }
      whileHover={isVisible ? { scale: 1.03, rotate: 0, zIndex: 12 } : undefined}
      whileTap={isVisible ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => isVisible && !imgError && onSelect(index)}
      style={{
        gridColumn: photo.isFinal ? '1 / -1' : undefined,
        justifySelf: photo.isFinal ? 'center' : undefined,
        width: '100%',
        maxWidth: photo.isFinal ? '320px' : undefined,
        marginTop: photo.isFinal ? '10px' : undefined,
        background: 'linear-gradient(165deg, #FFFDF9 0%, #F7EDE4 100%)',
        padding: photo.isFinal ? '13px 13px 22px' : '9px 9px 16px',
        borderRadius: '6px',
        boxShadow: photo.isFinal
          ? '0 26px 56px rgba(10, 2, 5, 0.6), 0 0 38px rgba(220, 184, 118, 0.3)'
          : '0 16px 34px rgba(10, 2, 5, 0.48)',
        border: photo.isFinal
          ? '1.5px solid rgba(220, 184, 118, 0.78)'
          : '1px solid rgba(220, 184, 118, 0.28)',
        position: 'relative',
        cursor: !imgError ? 'pointer' : 'default',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/* Scrapbook Washi Tape or Heart Pin */}
      {useWashiTape ? (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-9px',
            left: '50%',
            transform: `translateX(-50%) rotate(${index % 4 === 1 ? '-4deg' : '4deg'})`,
            width: '56px',
            height: '16px',
            background:
              'linear-gradient(90deg, rgba(245, 207, 217, 0.78), rgba(244, 226, 184, 0.72))',
            borderLeft: '1px dashed rgba(255,255,255,0.55)',
            borderRight: '1px dashed rgba(255,255,255,0.55)',
            boxShadow: '0 2px 6px rgba(15, 2, 7, 0.2)',
            borderRadius: '2px',
          }}
        />
      ) : (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-9px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '21px',
            height: '21px',
            borderRadius: '9999px',
            background: photo.isFinal
              ? 'linear-gradient(135deg, #F6E4BE, #D4AD66)'
              : 'linear-gradient(135deg, #F5CFD9, #D98FA5)',
            boxShadow: '0 3px 9px rgba(15, 2, 7, 0.38)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#380B1C',
          }}
        >
          <Heart size={10} fill="currentColor" />
        </span>
      )}

      {/* Photo Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: photo.isFinal ? '4 / 4.35' : '4 / 4.7',
          overflow: 'hidden',
          borderRadius: '3px',
          backgroundColor: '#EADAD2',
        }}
      >
        {/* Heart React Pill */}
        {!imgError && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(photo.id);
            }}
            aria-label={isLiked ? 'Remove heart' : 'Love this memory'}
            style={{
              position: 'absolute',
              right: '6px',
              bottom: '6px',
              zIndex: 4,
              width: '28px',
              height: '28px',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.55)',
              backgroundColor: isLiked ? 'rgba(145, 35, 73, 0.9)' : 'rgba(24, 5, 11, 0.45)',
              backdropFilter: 'blur(6px)',
              color: isLiked ? '#F5CFD9' : '#FCF6F1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <Heart size={13} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        )}
        {imgError || !photo.src ? (
          <PolaroidPlaceholder label={photo.src} index={index} />
        ) : (
          <img
            src={photo.src}
            alt={photo.caption || `Memory ${index + 1}`}
            loading="eager"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: photo.objectPosition || '50% 25%',
              display: 'block',
            }}
          />
        )}
      </div>

      {/* Polaroid Caption */}
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          color: '#3A1824',
          textAlign: 'center',
        }}
      >
        <span
          className="font-hand"
          style={{
            fontSize: photo.isFinal ? '1.42rem' : '1.14rem',
            lineHeight: 1.15,
            fontWeight: 600,
          }}
        >
          {photo.caption}
        </span>
        {photo.isFinal && (
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#9C5169',
              marginTop: '3px',
            }}
          >
            ✦ My Favourite Memory ✦
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function PhotoGalleryScreen({ onContinue }) {
  const hasPhotos = PHOTOS.length > 0;
  const [revealedCount, setRevealedCount] = useState(hasPhotos ? 1 : 0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [likedIds, setLikedIds] = useState([]);

  const toggleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allRevealed = !hasPhotos || revealedCount >= PHOTOS.length;
  const selectedPhoto = selectedIndex !== null ? PHOTOS[selectedIndex] : null;

  useEffect(() => {
    if (!hasPhotos || revealedCount >= PHOTOS.length) return;

    const timer = setTimeout(() => {
      setRevealedCount((prev) => Math.min(prev + 1, PHOTOS.length));
    }, 480);

    return () => clearTimeout(timer);
  }, [hasPhotos, revealedCount]);

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : PHOTOS.length - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < PHOTOS.length - 1 ? prev + 1 : 0));
  };

  return (
    <motion.section
      key="gallery-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.7 }}
      style={{
        minHeight: '100dvh',
        width: '100%',
        padding: '68px 16px 56px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: '510px', marginBottom: '28px' }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              border: '1px solid rgba(244, 226, 184, 0.25)',
              background: 'rgba(252, 246, 241, 0.05)',
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#F4E2B8',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={12} /> Our Memories
          </span>
          <h2
            className="font-serif"
            style={{
              margin: 0,
              fontSize: 'clamp(1.6rem, 5.1vw, 2.25rem)',
              fontWeight: 600,
              lineHeight: 1.32,
              color: '#FCF6F1',
              textShadow: '0 4px 22px rgba(10, 2, 5, 0.45)',
            }}
          >
            {GALLERY_SCREEN.heading}
          </h2>
        </motion.div>

        {/* Reveal status / subtle skip button while photos appear one by one */}
        {hasPhotos && !allRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '22px',
            }}
          >
            <span style={{ fontSize: '0.84rem', color: 'rgba(245, 207, 217, 0.88)' }}>
              Revealing memory {revealedCount} of {PHOTOS.length}…
            </span>
            <button
              type="button"
              onClick={() => setRevealedCount(PHOTOS.length)}
              style={{
                border: '1px solid rgba(244, 226, 184, 0.35)',
                background: 'rgba(252, 246, 241, 0.08)',
                color: '#F4E2B8',
                fontSize: '0.76rem',
                padding: '4px 10px',
                borderRadius: '9999px',
                cursor: 'pointer',
              }}
            >
              Show all
            </button>
          </motion.div>
        )}

        {/* Empty Folder Placeholder State */}
        {!hasPhotos ? (
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: 'rgba(250, 243, 236, 0.95)',
              color: '#2F111B',
              borderRadius: '10px',
              padding: '24px 20px',
              textAlign: 'center',
              boxShadow: '0 20px 44px rgba(10, 2, 5, 0.45)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '12px',
                marginBottom: '18px',
              }}
            >
              <PolaroidPlaceholder label="public/photos/photo-01.jpg" index={0} />
              <PolaroidPlaceholder label="public/photos/photo-02.jpg" index={1} />
            </div>
            <h3 className="font-serif" style={{ margin: '0 0 6px', fontSize: '1.3rem' }}>
              {GALLERY_SCREEN.emptyTitle}
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#6F4653', lineHeight: 1.5 }}>
              {GALLERY_SCREEN.emptySubtitle}
            </p>
          </div>
        ) : (
          <div
            className="polaroid-grid"
            style={{
              width: '100%',
            }}
          >
            {PHOTOS.map((photo, index) => (
              <PolaroidCard
                key={photo.id}
                photo={photo}
                index={index}
                isVisible={index < revealedCount}
                isLiked={likedIds.includes(photo.id)}
                onToggleLike={toggleLike}
                onSelect={setSelectedIndex}
              />
            ))}
          </div>
        )}

        {/* Continue to Final Birthday Reveal */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{
                marginTop: '36px',
                textAlign: 'center',
              }}
            >
              <p
                className="font-hand"
                style={{
                  margin: '0 0 14px',
                  fontSize: '1.3rem',
                  color: 'rgba(245, 207, 217, 0.92)',
                }}
              >
                Tap any photo to zoom, or open your final wish ♡
              </p>
              <button
                type="button"
                onClick={onContinue}
                className="btn-romantic btn-romantic-cream"
              >
                {GALLERY_SCREEN.continueButton}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Album Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 80,
              backgroundColor: 'rgba(16, 2, 7, 0.88)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 18px',
            }}
          >
            <motion.div
              key={selectedPhoto.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '390px',
                background: 'linear-gradient(165deg, #FFFDF9 0%, #F7EDE4 100%)',
                padding: '12px 12px 18px',
                borderRadius: '8px',
                boxShadow: '0 28px 64px rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(220, 184, 118, 0.45)',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close photo preview"
                style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '-10px',
                  width: '34px',
                  height: '34px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(244, 226, 184, 0.65)',
                  backgroundColor: '#380B1C',
                  color: '#FCF6F1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.45)',
                }}
              >
                <X size={16} />
              </button>

              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                style={{
                  width: '100%',
                  maxHeight: '64dvh',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  display: 'block',
                  backgroundColor: '#1E050E',
                }}
              />

              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  color: '#3A1824',
                }}
              >
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  aria-label="Previous photo"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(112, 69, 83, 0.25)',
                    background: 'rgba(112, 69, 83, 0.08)',
                    color: '#3A1824',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={17} />
                </button>

                <div style={{ textAlign: 'center' }}>
                  <p
                    className="font-hand"
                    style={{
                      margin: 0,
                      fontSize: '1.42rem',
                      lineHeight: 1.15,
                    }}
                  >
                    {selectedPhoto.caption}
                  </p>
                  <span style={{ fontSize: '0.7rem', color: '#704553' }}>
                    {selectedIndex + 1} / {PHOTOS.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNextPhoto}
                  aria-label="Next photo"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(112, 69, 83, 0.25)',
                    background: 'rgba(112, 69, 83, 0.08)',
                    color: '#3A1824',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
