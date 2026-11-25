/**
 * Easy-to-edit configuration for Princettaa's Birthday Surprise.
 *
 * - Edit `STORY_MESSAGES` to customize any screen text or button label.
 * - Edit `PHOTOS` to add, remove, or reorder photos placed inside `public/photos/`.
 * - Replace `MUSIC_CONFIG.customTrackUrl` (or drop `romantic-melody.mp3` into `public/music/`)
 *   to use your own song.
 */

export const RECIPIENT_NAME = 'PRINCETTAA';

export const OPENING_SCREEN = {
  greeting: 'Hey my love… 💌',
  lines: [
    'I tucked a little piece of my heart inside this.',
    'Open it slowly, one moment at a time.',
  ],
  buttonText: 'Open this little surprise',
};

export const STORY_MESSAGES = [
  {
    id: 'screen-1',
    text: 'Out of everyone in this world, you are effortlessly my favourite one.',
    buttonText: 'Keep reading ♡',
    typewriter: true,
  },
  {
    id: 'screen-2',
    text: 'You turn my quietest, most ordinary days into moments I want to live in forever.',
    buttonText: 'Tell me more…',
    typewriter: false,
  },
  {
    id: 'screen-3',
    text: 'One smile from you is enough to calm my heart and light up my whole world.',
    buttonText: 'Always you ♡',
    typewriter: true,
  },
  {
    id: 'screen-4',
    text: 'Every laugh we share, every late-night call, every memory — I treasure all of it with you.',
    buttonText: 'Look what’s next ✨',
    typewriter: false,
  },
  {
    id: 'screen-5',
    text: 'Today is all about you, my favourite one — and how deeply I love you.',
    buttonText: 'Reveal your surprise ✨',
    typewriter: true,
  },
];

export const GIFT_SCREEN = {
  lead: 'No more waiting, my love…',
  subtitle: 'A little piece of us is waiting inside.',
  tapHint: 'Tap the gift box to open',
};

export const GALLERY_SCREEN = {
  heading: 'Every favourite memory of mine begins and ends with you. ♡',
  continueButton: 'One last wish… ✨',
  emptyTitle: 'Add your favourite memories to public/photos/',
  emptySubtitle:
    'Drop your photos inside public/photos/ and list them in src/config/surpriseConfig.js to watch them appear one by one.',
};

export const FINAL_SCREEN = {
  headlinePrefix: 'HAPPY BIRTHDAY',
  recipient: 'PRINCETTAA',
  headlineSuffix: '❤️',
  message:
    'You are my favourite person, my safe place, and my greatest happiness. May every day bring you the same warmth, peace, and love you bring into my life. I love you forever. ♡',
  signature: 'Forever yours, with all my love.',
  replayButton: 'Replay the surprise ↻',
  galleryButton: 'View photos again',
};

export const LOVE_REASONS_SCREEN = {
  badge: 'From My Heart',
  heading: 'A few reasons why you are my favourite one',
  hint: 'Tap each card to open it',
  continueButton: 'One more sky to light up ✨',
  cards: [
    {
      id: 'reason-1',
      label: 'Your Smile',
      note: 'The second you smile, my whole day softens and everything in my world feels right again.',
    },
    {
      id: 'reason-2',
      label: 'Your Voice',
      note: 'Even on my loudest, hardest days, just hearing your voice feels like coming straight home.',
    },
    {
      id: 'reason-3',
      label: 'Your Heart',
      note: 'You care so gently and love so deeply — I notice every little thing you do for us.',
    },
    {
      id: 'reason-4',
      label: 'Always You',
      note: 'Out of every place and every lifetime, my heart will always choose you. I love you.',
    },
  ],
};

export const WISH_STARS_SCREEN = {
  badge: 'Written In The Stars',
  heading: 'Tap each glowing star to light up our heart',
  completedHeading: 'Every star led me right to you. ♡',
  continueButton: 'Open your birthday gift 🎁',
  stars: [
    {
      id: 'star-1',
      x: 50,
      y: 35,
      title: 'First Spark',
      whisper: 'Every wish I quietly make somehow always has your name in it.',
    },
    {
      id: 'star-2',
      x: 24,
      y: 22,
      title: 'My Calm',
      whisper: 'You are the peace I look for at the end of every single day.',
    },
    {
      id: 'star-3',
      x: 18,
      y: 54,
      title: 'Our Moments',
      whisper: 'My favourite rides, my favourite calls, my favourite laughs — all with you.',
    },
    {
      id: 'star-4',
      x: 50,
      y: 84,
      title: 'My Home',
      whisper: 'No matter how many miles lie between us, my heart lives right beside yours.',
    },
    {
      id: 'star-5',
      x: 82,
      y: 54,
      title: 'My Forever',
      whisper: 'Today and every tomorrow, you are my favourite one. I love you endlessly.',
    },
    {
      id: 'star-6',
      x: 76,
      y: 22,
      title: 'Always Us',
      whisper: 'Happy birthday in advance to my whole heart — now unwrap what is waiting. ♡',
    },
  ],
};

export const LOVE_WHISPERS = [
  'You are so deeply loved today and every day. ♡',
  'Sending you the biggest birthday hug & kiss right now! 💕',
  'My favourite person in the whole wide world — I love you! ✨',
  'Thank you for being the best part of my life. ♡',
  'Forever proud of you, forever yours. ❤️',
];

/**
 * Photos placed in `public/photos/`.
 * Paths start with `/photos/...` so they work seamlessly in Vite dev and Vercel production builds.
 * `photo-13-final.jpg` is intentionally placed last as the final featured memory.
 */
export const PHOTOS = [
  {
    id: 'mem-01',
    src: '/photos/photo-01.jpg',
    caption: 'The smile I fell for',
    rotation: -2.4,
    objectPosition: '50% 25%',
  },
  {
    id: 'mem-02',
    src: '/photos/photo-02.jpg',
    caption: 'My favourite ride partner',
    rotation: 2.1,
    objectPosition: '50% 22%',
  },
  {
    id: 'mem-03',
    src: '/photos/photo-03.jpg',
    caption: 'Sunshine & you',
    rotation: -1.8,
    objectPosition: '50% 22%',
  },
  {
    id: 'mem-04',
    src: '/photos/photo-04.jpg',
    caption: 'My favourite view',
    rotation: 2.6,
    objectPosition: '50% 18%',
  },
  {
    id: 'mem-05',
    src: '/photos/photo-05.jpg',
    caption: 'That laugh I adore',
    rotation: -2.2,
    objectPosition: '50% 22%',
  },
  {
    id: 'mem-06',
    src: '/photos/photo-06.jpg',
    caption: 'Date nights with you',
    rotation: 1.7,
    objectPosition: '50% 20%',
  },
  {
    id: 'mem-07',
    src: '/photos/photo-07.jpg',
    caption: 'Miles apart, still my home',
    rotation: -2.5,
    objectPosition: '50% 24%',
  },
  {
    id: 'mem-08',
    src: '/photos/photo-08.jpg',
    caption: 'Handsome always',
    rotation: 2.2,
    objectPosition: '50% 26%',
  },
  {
    id: 'mem-09',
    src: '/photos/photo-09.jpg',
    caption: 'Coolest guy in my world',
    rotation: -1.6,
    objectPosition: '50% 20%',
  },
  {
    id: 'mem-10',
    src: '/photos/photo-10.jpg',
    caption: 'Missing you in every call',
    rotation: 2.4,
    objectPosition: '50% 28%',
  },
  {
    id: 'mem-11',
    src: '/photos/photo-11.jpg',
    caption: '12:24 — still my favourite call',
    rotation: -2.0,
    objectPosition: '50% 34%',
  },
  {
    id: 'mem-12',
    src: '/photos/photo-12.jpg',
    caption: 'Golden like you',
    rotation: 1.9,
    objectPosition: '50% 20%',
  },
  {
    id: 'mem-13-final',
    src: '/photos/photo-13-final.jpg',
    caption: 'You & me, always. I love you ♡',
    rotation: -0.8,
    objectPosition: '50% 24%',
    isFinal: true,
  },
];

export const MUSIC_CONFIG = {
  // Place an MP3 at `public/music/romantic-melody.mp3` to override the built-in soft piano melody.
  customTrackUrl: '/music/romantic-melody.mp3',
  trackLabel: 'Our Melody',
  volume: 0.45,
};

