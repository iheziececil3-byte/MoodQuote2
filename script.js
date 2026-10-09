/**
 * MoodQuote - Main JavaScript Entrypoint
 * -------------------------------------
 * Stage 4: Mood-Based Visual Theming & New Quote Functionality
 * Iteration 3: Expanded Quotes (10 per mood, 60 total) & Author Attribution
 * 
 * Connects mood buttons to display random quotes, updates --accent-color CSS
 * custom property for visual theming, enables the New Quote button for
 * the active mood state, and supports favorites with author attribution.
 */

'use strict';

// Master Dataset of Moods and Quotes (Single Source of Truth)
const moodData = [
  {
    name: 'Happy',
    color: '#eab308', // Warm Golden Yellow
    icon: '😊',
    quotes: [
      { text: "Happiness is not something ready-made. It comes from your own actions.", author: "" },
      { text: "Joy is the simplest form of gratitude.", author: "" },
      { text: "The most wasted of all days is one without laughter.", author: "" },
      { text: "Spread love everywhere you go. Let no one leave without feeling happier.", author: "" },
      { text: "Smile, it is the key that fits the lock of everybody's heart.", author: "" },
      { text: "Most folks are about as happy as they make up their minds to be.", author: "Abraham Lincoln" },
      { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson" },
      { text: "Happiness depends upon ourselves.", author: "Aristotle" },
      { text: "There is no path to happiness: happiness is the path.", author: "Thich Nhat Hanh" },
      { text: "Keep your face to the sunshine and you cannot see a shadow.", author: "Helen Keller" }
    ]
  },
  {
    name: 'Calm',
    color: '#0284c7', // Oceanic Blue
    icon: '😌',
    quotes: [
      { text: "Peace begins with a conscious choice to quiet the mind.", author: "" },
      { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "" },
      { text: "Calmness is the cradle of power.", author: "" },
      { text: "Feelings come and go like clouds in a windy sky. Conscious breathing is the anchor.", author: "" },
      { text: "Quiet the mind, and the soul will speak.", author: "" },
      { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
      { text: "The nearer a man comes to a calm mind, the closer he is to strength.", author: "Marcus Aurelius" },
      { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra" },
      { text: "Silence is a source of great strength.", author: "Lao Tzu" },
      { text: "Nothing can bring you peace but yourself.", author: "Ralph Waldo Emerson" }
    ]
  },
  {
    name: 'Motivated',
    color: '#f97316', // Warm Orange
    icon: '🔥',
    quotes: [
      { text: "It always seems impossible until it's done.", author: "" },
      { text: "The secret of getting ahead is getting started.", author: "" },
      { text: "Small daily improvements over time lead to remarkable results.", author: "" },
      { text: "Focus on progress, not perfection. Keep striving forward.", author: "" },
      { text: "Do what you can, with what you have, right where you are.", author: "" },
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
      { text: "I never dreamed about success. I worked for it.", author: "Estée Lauder" },
      { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
      { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" }
    ]
  },
  {
    name: 'Sad',
    color: '#7c3aed', // Purple
    icon: '😢',
    quotes: [
      { text: "It is okay to feel sad. Giving yourself permission to feel is the first step toward healing.", author: "" },
      { text: "Tears are words that need to be felt without judgment.", author: "" },
      { text: "Heavy hearts just need time to rest. Be gentle with yourself today.", author: "" },
      { text: "Sadness is a natural visitor, not a permanent resident. Allow yourself room to breathe.", author: "" },
      { text: "You don't have to carry the weight of everything all at once.", author: "" },
      { text: "The wound is the place where the Light enters you.", author: "Rumi" },
      { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
      { text: "There is a crack in everything. That's how the light gets in.", author: "Leonard Cohen" },
      { text: "In the depth of winter, I finally learned that within me there lay an invincible summer.", author: "Albert Camus" },
      { text: "This too shall pass.", author: "Persian Proverb" }
    ]
  },
  {
    name: 'Anxious',
    color: '#14b8a6', // Soft Teal
    icon: '😰',
    quotes: [
      { text: "Take a slow, deep breath. You are safe right now in this moment.", author: "" },
      { text: "Anxiety tells stories that haven't happened yet. Focus on the ground beneath your feet.", author: "" },
      { text: "You don't have to control your thoughts; you just have to stop letting them control you.", author: "" },
      { text: "Slow down. You don't have to figure everything out today.", author: "" },
      { text: "Breathe through the feeling. It will pass just like every wave before it.", author: "" },
      { text: "You do not have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr." },
      { text: "Do not anticipate trouble, or worry about what may never happen. Keep in the sunlight.", author: "Benjamin Franklin" },
      { text: "Nothing diminishes anxiety faster than action.", author: "Walter Anderson" },
      { text: "Smile, breathe, and go slowly.", author: "Thich Nhat Hanh" },
      { text: "No amount of regretting can change the past, and no amount of worrying can change the future.", author: "Roy T. Bennett" }
    ]
  },
  {
    name: 'Grateful',
    color: '#d97706', // Warm Amber
    icon: '🙏',
    quotes: [
      { text: "Gratitude turns what we have into enough.", author: "" },
      { text: "When you focus on the good, the good gets better.", author: "" },
      { text: "Appreciate the little things; one day you may look back and realize they were the big things.", author: "" },
      { text: "Gratitude is a gentle reminder of how much light already exists around us.", author: "" },
      { text: "Wear gratitude like a cloak, and it will nourish every corner of your life.", author: "" },
      { text: "Gratitude is not only the greatest of virtues, but the parent of all the others.", author: "Cicero" },
      { text: "Acknowledging the good that you already have in your life is the foundation for all abundance.", author: "Eckhart Tolle" },
      { text: "Silent gratitude isn't much use to anyone.", author: "Gertrude Stein" },
      { text: "Enough is a feast.", author: "Buddhist Proverb" },
      { text: "When I started counting my blessings, my whole life turned around.", author: "Willie Nelson" }
    ]
  }
];

// DOM Element References
const moodButtons = document.querySelectorAll('.mood-btn');
const quoteCard = document.getElementById('quoteCard');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const savedQuotesList = document.getElementById('savedQuotesList');

// Active State Tracking
let currentMood = null;
let currentQuote = null;
let currentQuoteText = null; // Retained for compatibility

// Storage Keys
const STORAGE_KEY = 'moodquote_favorites';
const BACKUP_STORAGE_KEY = 'moodquote_favorites_backup';

let favorites = [];

/**
 * Canonical normalization helper for quote matching.
 * Trims surrounding whitespace, strips enclosing quotation marks,
 * and collapses internal whitespace sequences.
 * Leaves the original display text unchanged.
 *
 * @param {string} text
 * @returns {string}
 */
function normalizeQuoteText(text) {
  if (typeof text !== 'string') return '';
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').trim();
  return cleaned.replace(/\s+/g, ' ');
}

/**
 * Looks up a quote in moodData using canonical quote text comparison.
 *
 * @param {string} text
 * @returns {{ quote: Object, author: string, moodName: string } | null}
 */
function findQuoteInDataset(text) {
  const targetNorm = normalizeQuoteText(text);
  if (!targetNorm) return null;
  for (const mood of moodData) {
    for (const q of mood.quotes) {
      if (normalizeQuoteText(q.text) === targetNorm) {
        return { quote: q, author: q.author, moodName: mood.name };
      }
    }
  }
  return null;
}

// Apply each mood's color and icon from moodData to its button.
// This keeps moodData as the single source of truth for mood visual properties.
moodButtons.forEach(button => {
  const moodKey = button.getAttribute('data-mood');
  const mood = moodData.find(
    item => item.name.toLowerCase() === moodKey.toLowerCase()
  );
  if (mood) {
    button.style.setProperty('--mood-color', mood.color);
    const iconContainer = button.querySelector('.mood-icon');
    if (iconContainer && mood.icon) {
      iconContainer.textContent = mood.icon;
    }
  }
});

/**
 * Marks one mood button as selected and clears the others.
 * Uses the is-selected class for visuals and aria-pressed for accessibility,
 * so the selected state does not depend on browser focus.
 *
 * @param {string} selectedMoodKey - Lowercase mood identifier from data-mood attribute.
 */
function updateSelectedMood(selectedMoodKey) {
  moodButtons.forEach(button => {
    const isSelected = button.getAttribute('data-mood') === selectedMoodKey;
    button.classList.toggle('is-selected', isSelected);
    button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
  });

  // Signal that a mood is active so the quote card can display its tint.
  document.body.classList.add('has-mood');
}

/**
 * Selects and displays a quote from the given mood.
 * Prevents immediate quote repetition if the mood has multiple quotes.
 * Inserts quote text and author strictly via textContent on separate lines.
 * 
 * @param {Object} mood - The selected mood object from moodData.
 */
function displayMoodQuote(mood) {
  if (!mood || !mood.quotes || mood.quotes.length === 0) return;

  let availableQuotes = mood.quotes;
  if (mood.quotes.length > 1 && currentQuote) {
    const currentNorm = normalizeQuoteText(currentQuote.text);
    availableQuotes = mood.quotes.filter(q => normalizeQuoteText(q.text) !== currentNorm);
  }

  const randomIndex = Math.floor(Math.random() * availableQuotes.length);
  const selectedQuote = availableQuotes[randomIndex];

  currentQuote = selectedQuote;
  currentQuoteText = selectedQuote.text;

  // Clear previous content safely
  quoteCard.textContent = '';

  const quotePara = document.createElement('p');
  quotePara.className = 'welcome-message quote-text';
  quotePara.textContent = `"${selectedQuote.text}"`;
  quoteCard.appendChild(quotePara);

  if (selectedQuote.author && selectedQuote.author.trim() !== '') {
    const authorPara = document.createElement('p');
    authorPara.className = 'quote-author';
    authorPara.textContent = `— ${selectedQuote.author.trim()}`;
    quoteCard.appendChild(authorPara);
  }

  // Enable the favorite button and reflect whether this quote is already saved
  if (favoriteBtn) {
    favoriteBtn.disabled = false;
    favoriteBtn.setAttribute('aria-disabled', 'false');
  }
  updateFavoriteButtonUI();
}

/**
 * Handles mood selection click events.
 * Updates current mood, applies accent color theme, enables New Quote button,
 * and displays a quote for the selected mood.
 * 
 * @param {string} selectedMoodKey - Lowercase mood identifier from data-mood attribute.
 */
function handleMoodSelect(selectedMoodKey) {
  const mood = moodData.find(
    item => item.name.toLowerCase() === selectedMoodKey.toLowerCase()
  );

  if (!mood) return;

  // Update current active mood reference
  currentMood = mood;

  // Mark this mood as the selected one and clear any previous selection
  updateSelectedMood(selectedMoodKey);

  // Apply mood accent color to CSS custom property
  document.documentElement.style.setProperty('--accent-color', mood.color);

  // Enable the New Quote button and update accessibility state
  if (newQuoteBtn) {
    newQuoteBtn.disabled = false;
    newQuoteBtn.setAttribute('aria-disabled', 'false');
  }

  // Display a quote for the newly selected mood
  displayMoodQuote(currentMood);
}

/* --------------------------------------------------------------------------
   Favorites: load/backup/migration, save, toggle, and render
   -------------------------------------------------------------------------- */

/**
 * Reads, backs up, and safely migrates favorites from localStorage to
 * the consistent { text, mood, author } structure.
 *
 * @returns {Array<Object>}
 */
function initializeFavorites() {
  let rawStored = null;
  try {
    rawStored = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return [];
  }

  if (!rawStored) {
    return [];
  }

  // Backup original value if it exists and backup does not exist yet
  try {
    const existingBackup = localStorage.getItem(BACKUP_STORAGE_KEY);
    if (existingBackup === null) {
      localStorage.setItem(BACKUP_STORAGE_KEY, rawStored);
    }
  } catch (error) {
    // If backup storage write fails, do not crash
  }

  let parsed = null;
  try {
    parsed = JSON.parse(rawStored);
  } catch (error) {
    // Parsing failed: DO NOT overwrite raw stored value or backup.
    console.warn('Could not parse stored favorites; preserving original data.');
    return [];
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  let needsPersistence = false;
  const migrated = [];
  const seenCanonical = new Set();

  for (const item of parsed) {
    if (!item) continue;

    let itemText = '';
    let itemMood = '';
    let itemAuthor = '';

    if (typeof item === 'string') {
      itemText = item;
      needsPersistence = true;
    } else if (typeof item === 'object') {
      itemText = typeof item.text === 'string' ? item.text : '';
      itemMood = typeof item.mood === 'string' ? item.mood : '';
      itemAuthor = typeof item.author === 'string' ? item.author : '';
    }

    if (!itemText) continue;

    const canonical = normalizeQuoteText(itemText);
    if (!canonical) continue;

    // Deduplicate while preserving distinct user data
    if (seenCanonical.has(canonical)) {
      needsPersistence = true;
      continue;
    }
    seenCanonical.add(canonical);

    // If author is missing or empty, match against master dataset
    if (!itemAuthor) {
      const match = findQuoteInDataset(itemText);
      if (match && match.author) {
        itemAuthor = match.author;
        needsPersistence = true;
      } else {
        itemAuthor = '';
      }
    }

    // If mood is missing, match against master dataset
    if (!itemMood) {
      const match = findQuoteInDataset(itemText);
      if (match && match.moodName) {
        itemMood = match.moodName;
        needsPersistence = true;
      }
    }

    migrated.push({
      text: itemText,
      mood: itemMood,
      author: itemAuthor
    });
  }

  // Only write back normalized data if updates or normalization occurred
  if (needsPersistence) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    } catch (error) {
      // Storage unavailable or quota full: favorites stay in memory
    }
  }

  return migrated;
}

/**
 * Writes the current favorites array to localStorage.
 * If storage is unavailable, favorites remain in memory.
 */
function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    // Storage unavailable
  }
}

/**
 * Checks whether the given quote text is already saved using canonical comparison.
 *
 * @param {string} quoteText
 * @returns {boolean}
 */
function isFavorite(quoteText) {
  if (!quoteText) return false;
  const targetNorm = normalizeQuoteText(quoteText);
  return favorites.some(item => normalizeQuoteText(item.text) === targetNorm);
}

/**
 * Updates the favorite button so it shows whether the current quote is saved.
 */
function updateFavoriteButtonUI() {
  if (!favoriteBtn) return;

  const saved = currentQuote && isFavorite(currentQuote.text);
  favoriteBtn.classList.toggle('is-favorite', Boolean(saved));
  favoriteBtn.setAttribute('aria-pressed', saved ? 'true' : 'false');

  const label = favoriteBtn.querySelector('.fav-label');
  if (label) label.textContent = saved ? 'Saved' : 'Save';
  favoriteBtn.setAttribute(
    'aria-label',
    saved ? 'Remove this quote from favorites' : 'Save this quote'
  );
}

/**
 * Adds or removes the currently displayed quote from favorites.
 */
function toggleFavorite() {
  if (!currentMood || !currentQuote) return;

  if (isFavorite(currentQuote.text)) {
    removeFavorite(currentQuote.text);
  } else {
    favorites.push({
      text: currentQuote.text,
      mood: currentMood.name,
      author: currentQuote.author || ''
    });
    saveFavorites();
    updateFavoriteButtonUI();
    renderSavedQuotes();
  }
}

/**
 * Removes a saved quote by its text and refreshes the UI.
 *
 * @param {string} quoteText
 */
function removeFavorite(quoteText) {
  const targetNorm = normalizeQuoteText(quoteText);
  favorites = favorites.filter(item => normalizeQuoteText(item.text) !== targetNorm);
  saveFavorites();
  renderSavedQuotes();
  updateFavoriteButtonUI();
}

/**
 * Rebuilds the Saved Quotes section using document.createElement and textContent.
 * Shows an empty-state message when empty.
 */
function renderSavedQuotes() {
  if (!savedQuotesList) return;

  savedQuotesList.textContent = '';

  if (favorites.length === 0) {
    const emptyP = document.createElement('p');
    emptyP.className = 'saved-quotes-empty';
    emptyP.textContent = 'No saved quotes yet. Click the heart button to save your favorites!';
    savedQuotesList.appendChild(emptyP);
    return;
  }

  favorites.forEach((item, index) => {
    const mood = moodData.find(m => m.name.toLowerCase() === (item.mood || '').toLowerCase());
    const color = mood ? mood.color : 'var(--border-light)';

    const article = document.createElement('article');
    article.className = 'saved-quote-item';
    article.style.setProperty('--item-color', color);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'saved-quote-info';

    const moodSpan = document.createElement('span');
    moodSpan.className = 'saved-quote-mood';
    moodSpan.textContent = item.mood || '';
    infoDiv.appendChild(moodSpan);

    const textP = document.createElement('p');
    textP.className = 'saved-quote-text';
    textP.textContent = `"${item.text}"`;
    infoDiv.appendChild(textP);

    if (item.author && item.author.trim() !== '') {
      const authorP = document.createElement('p');
      authorP.className = 'saved-quote-author';
      authorP.textContent = `— ${item.author.trim()}`;
      infoDiv.appendChild(authorP);
    }

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'saved-quote-remove';
    removeBtn.setAttribute('data-index', String(index));
    removeBtn.setAttribute('aria-label', 'Remove this saved quote');
    removeBtn.textContent = 'Remove';

    article.appendChild(infoDiv);
    article.appendChild(removeBtn);

    savedQuotesList.appendChild(article);
  });
}

// Attach Event Listeners to Mood Buttons
moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    const moodKey = button.getAttribute('data-mood');
    handleMoodSelect(moodKey);
  });
});

// Attach Event Listener to New Quote Button
if (newQuoteBtn) {
  newQuoteBtn.addEventListener('click', () => {
    if (currentMood) {
      displayMoodQuote(currentMood);
    }
  });
}

// Attach Event Listener to Favorite Button
if (favoriteBtn) {
  favoriteBtn.addEventListener('click', toggleFavorite);
}

// Attach Event Listener to the Saved Quotes list (Remove buttons)
if (savedQuotesList) {
  savedQuotesList.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('.saved-quote-remove');
    if (!removeBtn) return;

    const index = Number(removeBtn.getAttribute('data-index'));
    const item = favorites[index];
    if (item) {
      removeFavorite(item.text);
    }
  });
}

// Load saved favorites on startup and build the Saved Quotes section
favorites = initializeFavorites();
renderSavedQuotes();
updateFavoriteButtonUI();
