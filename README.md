# MoodQuote

## Overview

MoodQuote is a simple mood-based quote application.

The user chooses one of six moods: Happy, Calm, Motivated, Sad, Anxious, or Grateful.

The application then displays a quote associated with that mood. The user can also use the New Quote button to get another quote from the currently selected mood.

The application also changes its accent color based on the selected mood.

## Why I Built It

"I built MoodQuote as a hands-on project while learning web development. I wanted to take a simple idea and build it step by step, starting with the interface and gradually adding data, JavaScript functionality, visual behavior, responsive design, and accessibility."

## Features

- Six mood selections:
  - Happy
  - Calm
  - Motivated
  - Sad
  - Anxious
  - Grateful
- Mood-specific quotes
- Random quote selection
- New Quote button
- Prevention of immediate quote repetition when multiple quotes are available
- Mood-based accent color theming
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
├── README.md
└── journal.md
```

- `index.html`: Main HTML structure containing header, mood buttons grid, quote card display area, action controls, and footer.
- `style.css`: Primary stylesheet containing design tokens, CSS variables (`--accent-color`), responsive media queries, focus states, and button styles.
- `script.js`: Core JavaScript file containing the master `moodData` array, event listeners, active mood state tracking, and quote selection logic.
- `README.md`: Project overview, features, technology stack, setup instructions, and development stage documentation.
- `journal.md`: Stage-by-stage personal development journal recording the learning process, decisions, and reflections.

## How It Works

1. The user selects a mood.
2. JavaScript reads the mood from the selected button's `data-mood` attribute.
3. It finds the matching mood inside `moodData`.
4. A quote is selected from that mood's quote array.
5. The quote is displayed inside the quote card.
6. The mood's existing color is applied through the `--accent-color` CSS custom property.
7. The New Quote button becomes available.
8. The user can request another quote without selecting the mood again.
9. When multiple quotes exist, the currently displayed quote is excluded from the next selection so it does not immediately repeat.

`moodData` is the single source of truth for the mood names, colors, and quotes.

## Accessibility

- Native HTML `<button>` elements for standard focus and activation behavior.
- Full keyboard navigation support (Tab, Enter, Space).
- Clear visible focus indicator rings using `:focus-visible`.
- Touch-friendly interactive buttons with a 44px minimum height.
- Responsive text wrapping to prevent text truncation.
- Live region announcement support configured via `aria-live="polite"` and `aria-atomic="true"` on the quote card.
- Clear accessible button labels.

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
| Stage 6 | Documentation / Finalization | Current |

## Current Status

The MoodQuote application is complete through Stage 5, and Stage 6 completes the project documentation and finalization.

## Limitations

MoodQuote:
- is client-side
- uses a static quote dataset
- has no backend
- has no database
- has no user accounts
- has no persistent storage
- does not use external APIs
