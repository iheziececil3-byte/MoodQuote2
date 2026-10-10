# MoodQuote

## Overview

MoodQuote is a simple mood-based quote application.

The user chooses one of six moods: Happy, Calm, Motivated, Sad, Anxious, or Grateful.

The application then displays a quote associated with that mood, along with author attribution where available. The user can also use the New Quote button to get another quote from the currently selected mood.

The application also changes its accent color based on the selected mood and features a subtle organic line-art background overlay.

The user can save any quote they like as a favorite, and saved favorites stay in the browser between refreshes.

## Why I Built It

"I built MoodQuote as a hands-on project while learning web development. I wanted to take a simple idea and build it step by step, starting with the interface and gradually adding data, JavaScript functionality, visual behavior, responsive design, and accessibility."

## Features

- Six mood selections with data-driven emoji icons:
  - Happy (😊)
  - Calm (😌)
  - Motivated (🔥)
  - Sad (😢)
  - Anxious (😰)
  - Grateful (🙏)
- 60 curated quotes (10 quotes per mood: five foundational and five attributed)
- Author attribution display on a separate, subordinate line for attributed quotes
- Mood-specific quotes
- Random quote selection
- New Quote button
- Prevention of immediate quote repetition when multiple quotes are available (canonical text comparison)
- Mood-based accent color theming
- Persistent selected mood state that does not depend on keyboard focus (using `is-selected` and `aria-pressed`)
- Mood-specific hover feedback using each mood's existing color from `moodData`
- Subtle organic line-art background overlay (`contours.svg`) layered with atmospheric radial gradients
- A subtle mood-colored tint on the quote card
- A slightly more prominent mood question heading, scoped so other headings stay unchanged
- Hover, active, and focus-visible states for the New Quote button when enabled
- Favorites: save the currently displayed quote with a heart button
- Saved Quotes section displaying mood, quote text, and author attribution
- Automatic backward-compatible favorites migration with immutable `localStorage` backup (`moodquote_favorites_backup`)
- Canonical quote text normalization for duplicate prevention and matching
- Saved quotes can be removed
- Favorites persist across page refreshes using the browser's `localStorage`
- Responsive layout
- Keyboard-accessible native buttons
- Visible keyboard focus states
- Touch-friendly button sizing (44px minimum height)
- Screen-reader quote announcements using the existing aria-live region

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Git and GitHub for version control

## Project Structure

```text
MoodQuote2/
├── index.html
├── style.css
├── script.js
├── contours.svg
├── README.md
└── journal.md
```

- `index.html`: Main HTML structure containing header, mood buttons grid, quote card display area, action controls, and footer.
- `style.css`: Primary stylesheet containing design tokens, CSS variables (`--accent-color`), responsive media queries, focus states, and button styles.
- `script.js`: Core JavaScript file containing the master `moodData` array, event listeners, active mood state tracking, quote selection logic, and favorites handling.
- `contours.svg`: Decorative organic line-art SVG overlay rendered in `body::after`.
- `README.md`: Project overview, features, technology stack, setup instructions, and development stage documentation.
- `journal.md`: Stage-by-stage personal development journal recording the learning process, decisions, and reflections.

## How It Works

1. The user selects a mood.
2. JavaScript reads the mood from the selected button's `data-mood` attribute.
3. It finds the matching mood inside `moodData`.
4. A quote is selected from that mood's quote array.
5. The quote text and author (when present) are displayed inside the quote card.
6. The mood's existing color is applied through the `--accent-color` CSS custom property.
7. The New Quote button becomes available.
8. The user can request another quote without selecting the mood again.
9. When multiple quotes exist, the currently displayed quote is excluded from the next selection so it does not immediately repeat.

`moodData` is the single source of truth for the mood names, colors, icons, quotes, and authors.

During development, two of the mood colors were adjusted: Calm is `#0284c7` and Sad is `#7c3aed`. The other four mood colors were left unchanged. The mood hover, selected styles, and button emojis also take their values from `moodData`, so there is still only one place where the mood properties live.

## Favorites

The user can save the currently displayed quote with the heart button next to the New Quote button. Saved quotes appear in the Saved Quotes section.

- Favorites are stored in the browser's `localStorage`, so they remain after a page refresh.
- Each saved favorite stores the quote `text`, the `mood` it came from, and its `author`.
- On load, older saved favorites are safely migrated to include author attributions matched from `moodData`.
- An immutable backup of existing stored favorites is created under `moodquote_favorites_backup` before any migration write.
- Unmatched legacy favorites preserve their original text and mood without an author.
- Canonical quote text normalization ensures quotes cannot be saved twice even with whitespace or quote formatting differences.
- Saved quotes can be removed, and removing one also updates the heart button if the current quote is the one being removed.
- The heart button and the Saved Quotes list stay synchronized.

## Accessibility

- Native HTML `<button>` elements for standard focus and activation behavior.
- Full keyboard navigation support (Tab, Enter, Space).
- Clear visible focus indicator rings using `:focus-visible`.
- Touch-friendly interactive buttons with a 44px minimum height.
- Responsive text wrapping to prevent text truncation.
- Live region announcement support configured via `aria-live="polite"` and `aria-atomic="true"` on the quote card.
- Clear accessible button labels.
- Selected states for the mood buttons and the favorite button are exposed with `aria-pressed`.
- The favorite button's label changes between "Save" and "Saved" to reflect the current quote.

"A formal WCAG audit and manual screen-reader testing were not performed, so this project does not claim formal WCAG compliance."

## Responsive Design

The layout was refined for narrow mobile screens through desktop widths, including approximately 320px–480px mobile widths.

Refinements include:
- Responsive spacing
- Touch-friendly button sizing
- Text wrapping
- Flexible quote card sizing
- Prevention of horizontal viewport overflow

## Running the Project

1. Clone or download the repository to your local machine.
2. Open `index.html` in any modern web browser.

Alternatively, a local development server such as VS Code Live Server can also be used. No installation, package management, or build process is required.

## Development Stages

| Stage | Description | Commit |
|---|---|---|
| Stage 1 | Foundation | `3a7d450` |
| Stage 2 | Quote Dataset | `16d5d62` |
| Stage 3 | Core Functionality | `636ad3a` |
| Stage 4 | Visual Behavior + New Quote | `e156159` |
| Stage 5 | Responsive + Accessibility | `9d8d672` |
| Stage 6 | Documentation / Finalization | `736a8c6` |
| Iteration 1 | Favorites + localStorage | `29a9b66` |
| Iteration 2 | Mood States + Interaction Feedback | `2b87cd9` |
| Iteration 3a | Mood Selector Iconography | `b06aadf` |
| Iteration 3b | Subtle Line-Art Background | `573fcf5` |
| Iteration 3c | Quotes Expansion & Author Attribution | `6350a8c` |

## Current Status

The MoodQuote application was built through Stage 5, and Stage 6 completed the initial project documentation and finalization. Subsequent iterations added favorites with `localStorage` persistence, interaction feedback, mood selector iconography, background decoration, an expanded 60-quote library with author attributions, and safe favorites migration. The application remains fully client-side with no backend.

## Limitations

MoodQuote:
- is client-side
- uses a static quote dataset
- has no backend
- has no database
- has no user accounts
- has no server-side storage (favorites are saved only in the browser's `localStorage`)
- does not use external APIs
