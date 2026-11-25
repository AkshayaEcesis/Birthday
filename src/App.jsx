import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { STORY_MESSAGES } from './config/surpriseConfig';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import AmbientBackdrop from './components/AmbientBackdrop';
import MusicPlayer from './components/MusicPlayer';
import OpeningEnvelopeScreen from './components/OpeningEnvelopeScreen';
import StoryScreen from './components/StoryScreen';
import LoveReasonsScreen from './components/LoveReasonsScreen';
import WishStarsScreen from './components/WishStarsScreen';
import GiftRevealScreen from './components/GiftRevealScreen';
import PhotoGalleryScreen from './components/PhotoGalleryScreen';
import FinalBirthdayScreen from './components/FinalBirthdayScreen';

export default function App() {
  // Stages: 'opening' | 'story' | 'reasons' | 'stars' | 'gift' | 'gallery' | 'finale'
  const [stage, setStage] = useState('opening');
  const [storyIndex, setStoryIndex] = useState(0);
  const [journeyKey, setJourneyKey] = useState(0);

  const music = useBackgroundMusic();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage, storyIndex]);

  const handleOpenEnvelope = () => {
    // Start music gently after the recipient's first interaction
    music.start();
    setStoryIndex(0);
    setStage('story');
  };

  const handleNextStory = () => {
    if (storyIndex < STORY_MESSAGES.length - 1) {
      setStoryIndex((prev) => prev + 1);
    } else {
      setStage('reasons');
    }
  };

  const handleGiftRevealed = () => {
    setStage('gallery');
  };

  const handleFinishGallery = () => {
    setStage('finale');
  };

  const handleReplay = () => {
    setJourneyKey((prev) => prev + 1);
    setStoryIndex(0);
    setStage('opening');
  };

  return (
    <main style={{ position: 'relative', minHeight: '100dvh', width: '100%' }}>
      <AmbientBackdrop intensity={stage === 'finale' ? 'finale' : 'normal'} />

      <MusicPlayer isPlaying={music.isPlaying} onToggle={music.toggle} />

      <AnimatePresence mode="wait">
        {stage === 'opening' && (
          <OpeningEnvelopeScreen
            key={`opening-${journeyKey}`}
            onOpen={handleOpenEnvelope}
          />
        )}

        {stage === 'story' && (
          <StoryScreen
            key={`story-${journeyKey}-${STORY_MESSAGES[storyIndex].id}`}
            stepData={STORY_MESSAGES[storyIndex]}
            stepIndex={storyIndex}
            totalSteps={STORY_MESSAGES.length}
            onNext={handleNextStory}
          />
        )}

        {stage === 'reasons' && (
          <LoveReasonsScreen
            key={`reasons-${journeyKey}`}
            onNext={() => setStage('stars')}
          />
        )}

        {stage === 'stars' && (
          <WishStarsScreen
            key={`stars-${journeyKey}`}
            onNext={() => setStage('gift')}
          />
        )}

        {stage === 'gift' && (
          <GiftRevealScreen
            key={`gift-${journeyKey}`}
            onReveal={handleGiftRevealed}
          />
        )}

        {stage === 'gallery' && (
          <PhotoGalleryScreen
            key={`gallery-${journeyKey}`}
            onContinue={handleFinishGallery}
          />
        )}

        {stage === 'finale' && (
          <FinalBirthdayScreen
            key={`finale-${journeyKey}`}
            onReplay={handleReplay}
            onBackToGallery={() => setStage('gallery')}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
