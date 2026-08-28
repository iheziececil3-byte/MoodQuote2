/**
 * MoodQuote - Main JavaScript Entrypoint
 * -------------------------------------
 * Stage 2: Mood & Quote Dataset Definition
 * 
 * Single source of truth array containing mood objects with names,
 * hex accent colors, and curated quote lists for all 6 moods.
 */

'use strict';

// Master Dataset of Moods and Quotes
const moodData = [
  {
    name: 'Happy',
    color: '#eab308', // Warm Golden Yellow
    quotes: [
      "Happiness is not something ready-made. It comes from your own actions.",
      "Joy is the simplest form of gratitude.",
      "The most wasted of all days is one without laughter.",
      "Spread love everywhere you go. Let no one leave without feeling happier.",
      "Smile, it is the key that fits the lock of everybody's heart."
    ]
  },
  {
    name: 'Calm',
    color: '#38bdf8', // Soft Sky Blue
    quotes: [
      "Peace begins with a conscious choice to quiet the mind.",
      "Within you, there is a stillness and a sanctuary to which you can retreat at any time.",
      "Calmness is the cradle of power.",
      "Feelings come and go like clouds in a windy sky. Conscious breathing is the anchor.",
      "Quiet the mind, and the soul will speak."
    ]
  },
  {
    name: 'Motivated',
    color: '#f97316', // Warm Orange
    quotes: [
      "It always seems impossible until it's done.",
      "The secret of getting ahead is getting started.",
      "Small daily improvements over time lead to remarkable results.",
      "Focus on progress, not perfection. Keep striving forward.",
      "Do what you can, with what you have, right where you are."
    ]
  },
  {
    name: 'Sad',
    color: '#64748b', // Muted Slate Blue
    quotes: [
      "It is okay to feel sad. Giving yourself permission to feel is the first step toward healing.",
      "Tears are words that need to be felt without judgment.",
      "Heavy hearts just need time to rest. Be gentle with yourself today.",
      "Sadness is a natural visitor, not a permanent resident. Allow yourself room to breathe.",
      "You don't have to carry the weight of everything all at once."
    ]
  },
  {
    name: 'Anxious',
    color: '#14b8a6', // Soft Teal
    quotes: [
      "Take a slow, deep breath. You are safe right now in this moment.",
      "Anxiety tells stories that haven't happened yet. Focus on the ground beneath your feet.",
      "You don't have to control your thoughts; you just have to stop letting them control you.",
      "Slow down. You don't have to figure everything out today.",
      "Breathe through the feeling. It will pass just like every wave before it."
    ]
  },
  {
    name: 'Grateful',
    color: '#d97706', // Warm Amber
    quotes: [
      "Gratitude turns what we have into enough.",
      "When you focus on the good, the good gets better.",
      "Appreciate the little things; one day you may look back and realize they were the big things.",
      "Gratitude is a gentle reminder of how much light already exists around us.",
      "Wear gratitude like a cloak, and it will nourish every corner of your life."
    ]
  }
];
