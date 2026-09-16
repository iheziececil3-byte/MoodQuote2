/**
 * MoodQuote - Main JavaScript Entrypoint
 * -------------------------------------
 * Stage 4: Mood-Based Visual Theming & New Quote Functionality
 * 
 * Connects mood buttons to display random quotes, updates --accent-color CSS
 * custom property for visual theming, and enables the New Quote button for
 * the active mood state.
 */

'use strict';

// Master Dataset of Moods and Quotes (Single Source of Truth)
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

// DOM Element References
const moodButtons = document.querySelectorAll('.mood-btn');
const quoteCard = document.getElementById('quoteCard');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const savedQuotesList = document.getElementById('savedQuotesList');

// Active State Tracking
let currentMood = null;
let currentQuoteText = null;

// Favorite State (persisted to localStorage under one key)
const STORAGE_KEY = 'moodquote_favorites';
let favorites = [];

/**
 * Selects and displays a quote from the given mood.
 * Prevents immediate quote repetition if the mood has multiple quotes.
 * 
 * @param {Object} mood - The selected mood object from moodData.
 */
function displayMoodQuote(mood) {
  if (!mood || !mood.quotes || mood.quotes.length === 0) return;

  let availableQuotes = mood.quotes;
  if (mood.quotes.length > 1 && currentQuoteText) {
    availableQuotes = mood.quotes.filter(q => q !== currentQuoteText);
  }

  const randomIndex = Math.floor(Math.random() * availableQuotes.length);
  const selectedQuote = availableQuotes[randomIndex];

  currentQuoteText = selectedQuote;

  // Update the quote display card text
  quoteCard.innerHTML = `<p class="welcome-message">"${selectedQuote}"</p>`;

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
   Favorites: load/save, toggle, and render
   -------------------------------------------------------------------------- */

/**
 * Reads the saved favorites from localStorage.
 * Returns an empty array when nothing is stored or the data is invalid.
 */
function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

/**
 * Writes the current favorites array to localStorage.
 * If storage is unavailable, the app keeps working with in-memory favorites.
 */
function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    // Storage unavailable (private mode/quota full): favorites stay in memory only
  }
}

/**
 * Checks whether the given quote text is already saved.
 */
function isFavorite(quoteText) {
  return favorites.some(item => item.text === quoteText);
}

/**
 * Updates the favorite button so it shows whether the current quote is saved.
 */
function updateFavoriteButtonUI() {
  if (!favoriteBtn) return;

  const saved = currentQuoteText && isFavorite(currentQuoteText);
  favoriteBtn.classList.toggle('is-favorite', saved);
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
  if (!currentMood || !currentQuoteText) return;

  if (isFavorite(currentQuoteText)) {
    removeFavorite(currentQuoteText);
  } else {
    favorites.push({ text: currentQuoteText, mood: currentMood.name });
    saveFavorites();
    updateFavoriteButtonUI();
    renderSavedQuotes();
  }
}

/**
 * Removes a saved quote by its text and refreshes the UI.
 */
function removeFavorite(quoteText) {
  favorites = favorites.filter(item => item.text !== quoteText);
  saveFavorites();
  renderSavedQuotes();
  updateFavoriteButtonUI();
}

/**
 * Rebuilds the Saved Quotes section. Shows an empty-state message when empty.
 */
function renderSavedQuotes() {
  if (!savedQuotesList) return;

  if (favorites.length === 0) {
    savedQuotesList.innerHTML =
      '<p class="saved-quotes-empty">No saved quotes yet. Click the heart button to save your favorites!</p>';
    return;
  }

  const itemsHtml = favorites.map((item, index) => {
    const mood = moodData.find(m => m.name === item.mood);
    const color = mood ? mood.color : 'var(--border-light)';
    return `
      <article class="saved-quote-item" style="--item-color: ${color}">
        <div class="saved-quote-info">
          <span class="saved-quote-mood">${item.mood}</span>
          <p class="saved-quote-text">"${item.text}"</p>
        </div>
        <button type="button" class="saved-quote-remove" data-index="${index}" aria-label="Remove this saved quote">Remove</button>
      </article>`;
  }).join('');

  savedQuotesList.innerHTML = itemsHtml;
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
favorites = loadFavorites();
renderSavedQuotes();
updateFavoriteButtonUI();
