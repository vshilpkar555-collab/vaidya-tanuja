// ─── DOSHA QUIZ QUESTIONS ─────────────────────────────────────────────────────
export const QUIZ_QUESTIONS = [
  {
    q: 'How would you describe your body frame?',
    options: [
      { text: 'Thin, light, delicate — hard to gain weight', dosha: 'vata' },
      { text: 'Medium build, well-proportioned, athletic', dosha: 'pitta' },
      { text: 'Larger, sturdy frame — gain weight easily', dosha: 'kapha' },
    ],
  },
  {
    q: 'What describes your skin best?',
    options: [
      { text: 'Dry, rough, cool, thin — tends to crack', dosha: 'vata' },
      { text: 'Warm, oily, prone to redness or acne', dosha: 'pitta' },
      { text: 'Thick, oily, cool, smooth, pale', dosha: 'kapha' },
    ],
  },
  {
    q: 'How is your sleep quality?',
    options: [
      { text: 'Light, easily disturbed, often restless', dosha: 'vata' },
      { text: 'Moderate — I fall asleep easily but may wake', dosha: 'pitta' },
      { text: 'Deep, long, hard to wake up in the morning', dosha: 'kapha' },
    ],
  },
  {
    q: 'How would you describe your energy levels?',
    options: [
      { text: 'Variable — bursts of energy followed by fatigue', dosha: 'vata' },
      { text: 'Intense, driven, strong but can burn out', dosha: 'pitta' },
      { text: 'Slow to start but steady and enduring stamina', dosha: 'kapha' },
    ],
  },
  {
    q: 'How is your digestion typically?',
    options: [
      { text: 'Irregular — alternates between constipation and loose stools', dosha: 'vata' },
      { text: 'Sharp — strong hunger, acid reflux, diarrhea if late meals', dosha: 'pitta' },
      { text: 'Slow — feel heavy after eating, sluggish metabolism', dosha: 'kapha' },
    ],
  },
  {
    q: 'What is your mental / emotional tendency?',
    options: [
      { text: 'Anxious, creative, quick to change moods, worried', dosha: 'vata' },
      { text: 'Focused, intense, perfectionist, can get angry', dosha: 'pitta' },
      { text: 'Calm, steady, loving, but can be possessive or stubborn', dosha: 'kapha' },
    ],
  },
  {
    q: 'How do you handle stress?',
    options: [
      { text: 'I become anxious, fearful, and overwhelmed easily', dosha: 'vata' },
      { text: 'I become irritable, critical, and confrontational', dosha: 'pitta' },
      { text: 'I withdraw, procrastinate, and avoid the issue', dosha: 'kapha' },
    ],
  },
  {
    q: 'What is your preferred climate?',
    options: [
      { text: 'Warm — I dislike cold, wind, and dryness', dosha: 'vata' },
      { text: 'Cool — heat makes me irritable and uncomfortable', dosha: 'pitta' },
      { text: 'Warm and dry — damp or cold weather bothers me', dosha: 'kapha' },
    ],
  },
];

// ─── DOSHA RESULT INFO ────────────────────────────────────────────────────────
export const DOSHA_INFO = {
  vata: {
    title: 'Vata Prakriti',
    emoji: '💨',
    desc: 'You are the creative force of nature — imaginative, quick, and ever-changing like the wind.',
    color: '#4338CA',
    bg: '#EEF2FF',
    recommendations: [
      'Warm, nourishing foods (ghee, sesame, root vegetables)',
      'Regular sleep schedule — 10 PM bedtime',
      'Grounding practices: yoga, walking in nature',
      'Abhyanga (sesame oil self-massage) daily',
    ],
  },
  pitta: {
    title: 'Pitta Prakriti',
    emoji: '🔥',
    desc: 'You burn with the fire of transformation — passionate, focused, and brilliantly sharp-minded.',
    color: '#B45309',
    bg: '#FEF3C7',
    recommendations: [
      'Cooling foods: coconut water, cucumber, coriander',
      'Avoid excessive heat, spice, and midday sun',
      'Moon bathing and Sheetali pranayama',
      'Rose water rituals and sandalwood application',
    ],
  },
  kapha: {
    title: 'Kapha Prakriti',
    emoji: '🌊',
    desc: 'You carry the strength of the earth — steady, loving, and enduringly calm.',
    color: '#065F46',
    bg: '#ECFDF5',
    recommendations: [
      'Light, warm, spiced foods — avoid heavy dairy',
      'Vigorous exercise every morning',
      'Dry brushing (Garshana) ritual',
      'Energizing pranayama: Kapalabhati, Bhastrika',
    ],
  },
};
