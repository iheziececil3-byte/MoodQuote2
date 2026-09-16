# MoodQuote Development Journal

I built MoodQuote as a step-by-step project while learning web development. I did not try to build everything at once. I started with the interface, then added the data, connected the JavaScript functionality, added the mood-based behavior, and finally worked on responsiveness and accessibility.

Looking back at the project, the biggest thing I learned was how each part connects to the next. The interface gave me the structure, the data gave the application something to work with, and JavaScript brought the interaction to life.

---

## Stage 1 — Foundation

**Commit:** `3a7d450 — Created MoodQuote project foundation and initial interface`

I started with the basic structure of the application instead of jumping straight into JavaScript.

I created the HTML structure for the page, including the MoodQuote heading, the six mood buttons, the quote card, the New Quote button, and the footer. I also created the initial styling in `style.css` so the application had a proper visual foundation.

At this point, the application was basically a static interface. The New Quote button was disabled because there was no functionality behind it yet.

This stage taught me something simple but important: it is easier to build the functionality when the structure you are working with is already clear.

---

## Stage 2 — Quote Dataset

**Commit:** `16d5d62 — Add MoodQuote quote dataset`

Next, I added the actual moods and quotes to `script.js`.

I created `moodData` and used it as the single source of truth for the application. Each mood contains its name, its color, and its list of quotes.

The six moods are Happy, Calm, Motivated, Sad, Anxious, and Grateful.

One thing I understood from this stage was why keeping the data in one place matters. Instead of putting quotes and colors all over the JavaScript, I could keep them together in `moodData` and let the application refer back to it.

I did not add the interaction yet. This stage was mainly about getting the data structure right before building the logic around it.

---

## Stage 3 — Core Functionality

**Commit:** `636ad3a — Implement mood selection and random quotes`

This was the stage where MoodQuote actually started behaving like an application.

I connected the mood buttons to the `moodData` array. Each button has a `data-mood` value, and JavaScript uses that value to find the correct mood inside the dataset.

When I click a mood, JavaScript finds the matching mood, chooses a random quote from that mood's quote array, and displays it in the quote card.

This stage helped me understand how the HTML, JavaScript, and data work together. The buttons were no longer just things on the screen. They were now connected to actual data and could change what the user sees.

---

## Stage 4 — Visual Behavior + New Quote

**Commit:** `e156159 — Add mood theming and New Quote functionality`

Stage 4 was where I added more behavior to the application.

One problem I needed to solve was that the app had to remember which mood the user had selected. I introduced `currentMood` and `currentQuoteText` so the application could keep track of the active mood and the quote currently being displayed.

I also connected the mood colors from `moodData` to the interface. JavaScript updates the `--accent-color` CSS custom property using the selected mood's existing color. This allowed the quote card and New Quote button to change their accent color depending on the selected mood.

Then I made the New Quote button functional.

The important part here was keeping the two buttons responsible for different things. Selecting a mood chooses the mood and displays a quote from it. The New Quote button does not choose a new mood; it generates another quote from the mood that is already active.

I also noticed that random selection could sometimes give me the same quote twice in a row. I fixed that by making the quote selection exclude the quote that is currently being displayed when the mood contains multiple quotes.

This was probably the stage where the application started feeling like a complete interaction instead of just a collection of buttons.

---

## Stage 5 — Responsive Design + Accessibility

**Commit:** `9d8d672 — Refine responsive design and accessibility`

After the main functionality was working, I focused on improving how the application behaves on smaller screens and making the existing controls easier to use.

I adjusted the layout for smaller viewport sizes, especially around the 320px–480px range. I also adjusted spacing and text wrapping so content would not unnecessarily overflow on smaller screens.

I made sure the mood buttons and New Quote button had a minimum height of 44px so they would be easier to use on touch screens.

I also looked at the contrast of the New Quote button. Some of the mood colors are quite bright, so white text was not a good choice for every theme. I changed the button text to the existing dark text color instead of changing the mood colors themselves.

For keyboard accessibility, the application already uses native HTML buttons, so they can be reached and activated using the keyboard. I also added visible focus styling so keyboard users can see which button is focused.

Finally, I added `aria-live="polite"` and `aria-atomic="true"` to the quote display so changes to the quote can be exposed to screen readers.

This stage taught me that getting the functionality to work is only part of building an application. The interface also needs to remain usable on different screen sizes and for different types of users.

---

## Stage 6 — Documentation and Finalization

This final stage is about documenting what I built rather than adding more functionality.

I created `README.md` to explain what MoodQuote is, how it works, the technologies I used, the project structure, and the stages I went through.

I also created this journal to record how I built the project and what I learned along the way.

At this point, I am deliberately leaving the application code alone. The goal is to finish the project cleanly without changing functionality just for the sake of adding something else.

---

## Iteration 1 — Favorites + localStorage

**Commit:** `29a9b66 — Add quote favorites with localStorage persistence`

After the original stages and the documentation were finished, I went back to the application and added two more rounds of features. The first one was letting the user save a quote they liked.

I added a heart button next to the New Quote button. When a quote is on screen, the user can save it, and it shows up in a new Saved Quotes section below. Each saved quote stores its text and the mood it came from.

I did not want a backend or a database for this. The application still stays fully client-side, and the favorites are kept in the browser's `localStorage`, so they remain after a page refresh.

There were a few details I had to handle. The favorite button is disabled before a quote exists, because there is nothing to save yet. A quote can only be saved once, so I added a check to stop duplicates. Saved quotes can be removed, and removing one also updates the heart button if it matches the quote currently on screen. The heart button and the Saved Quotes list always stay in sync, so they cannot disagree about whether the current quote is saved.

I also used `aria-pressed` and a label that changes between "Save" and "Saved" on the favorite button, so the saved state is also part of the button's accessibility state.

I kept `moodData` as the single source of truth for the moods. The favorites are stored separately, because they are the user's own list and not part of the mood data itself.

For testing, I ran 11 manual tests covering the initial state, selecting a mood, saving a quote, duplicate protection, persistence after refresh, removing saved quotes, the synchronization between the saved list and the favorite button, New Quote behavior, quote repetition, keyboard accessibility, and the mobile layout. All 11 passed.

I also wrote a small Node test harness that checked the JavaScript logic without a browser. It passed 38 out of 38 checks, and `node --check script.js` passed as well.

This round taught me that a feature does not automatically need a server. `localStorage` lets a simple application remember things on the user's own device.

---

## Iteration 2 — Mood States + Interaction Feedback

**Commit:** `2b87cd9 — Improve mood states and interaction feedback`

The second round came from testing more than from a plan. While using the application I noticed small interaction problems that made it feel less polished, and I decided to fix them.

The first problem was the selected mood. After clicking a mood, the theme changed, but the button itself did not clearly stay selected once I clicked somewhere else or moved the keyboard focus. I learned that a selected state and keyboard focus are two different things. Focus shows which element the keyboard is on, while selection shows the active choice. I wanted the chosen mood to stay visibly selected no matter where the focus went.

I added an `is-selected` class and kept it in sync with `aria-pressed`, so exactly one mood is selected at a time. The selected mood now stays highlighted after clicking elsewhere, after using the keyboard, after saving a quote, and after generating a new quote.

I also gave the mood buttons visible hover feedback. Instead of creating six separate hardcoded color styles, I kept it data-driven. Each button reads its color from `moodData`, so the mood colors still live in only one place.

While testing the visual states, I also changed two of the mood colors. Calm became `#0284c7` and Sad became `#7c3aed`. The other four mood colors stayed the same.

I added a subtle background tint to the quote card based on the selected mood's accent color. I kept the existing border behavior and made sure the quote text stays readable on top of the tint.

The New Quote button also received hover, active, and focus-visible states for when it is enabled, and the disabled state is still protected.

I made the "How are you feeling right now?" heading slightly more prominent. I scoped that change to the mood section only, so the Saved Quotes heading was not affected.

Throughout this round I was careful not to break what already worked. The favorites, the `localStorage` persistence, quote generation, duplicate protection, the no-immediate-repeat behavior, the responsive layout, and keyboard interaction all remained in place. The implementation fit inside the existing architecture and did not add any backend, API, or database.

There was also an interesting discovery about quote repetition. I investigated whether the quote logic was failing because a quote could show up again after a few clicks. The actual behavior is that the application only prevents the immediate previous quote from being selected again while staying in the same mood. It does not keep a complete history, so a sequence like A, B, A can happen. I confirmed this behavior existed before Iteration 2, meaning the new changes did not introduce it. I decided to leave it unchanged, because the original requirement was only to prevent an immediate back-to-back repeat, and that is working. Preventing all repeats would need a different quote-history mechanism and would be a separate feature.

For testing, I ran 20 manual tests covering the initial state, the selected state, mood switching, the hover states, New Quote interaction, favorites integration, keyboard accessibility, persistence, quote repetition, disabled-state protection, all of the mood colors, saved quote colors, removal, duplicate protection, the responsive layout, and full keyboard navigation. All 20 passed.

The final audit also passed: `node --check script.js` and `git diff --check` were clean, only the three app files changed, and the favorites and quote-display logic were verified unchanged.

This round reminded me that testing is not only about finding errors. It is also how I notice the small interaction details that make an application feel complete. Not everything here was planned perfectly, and most of it came from paying attention while using the app.

---

## What I Learned

The biggest lesson from MoodQuote was that I understand the code better when I build it in small stages instead of trying to solve everything at once.

I learned how to separate data from the logic that uses it. `moodData` became the single source of truth, which made it easier for the JavaScript to find the right mood, quote, and color.

I also got a better understanding of DOM manipulation and event listeners because I had to connect the mood buttons to the JavaScript and then update the quote card when a button was clicked.

State was another important lesson. Variables like `currentMood` and `currentQuoteText` showed me why an application sometimes needs to remember what the user is currently doing.

I also learned how CSS custom properties can be changed with JavaScript. Using `--accent-color` meant I could change the mood theme without creating a completely separate set of colors for JavaScript.

The responsive and accessibility work also changed how I think about finishing a project. A page looking good on my screen does not automatically mean it is comfortable to use on a phone or with a keyboard.

Finally, I became more comfortable with Git. I learned to use commits as checkpoints, check the working tree before committing, and push completed stages to GitHub instead of treating Git as something I only need at the very end.

After the original stages, I also learned that an application can remember the user's data without a server, because the favorites are handled entirely on the client side with `localStorage`. The mood interaction work also taught me the difference between a selected state and keyboard focus, since keeping the chosen mood visible needed a state that does not depend on focus at all.

---

## Challenges and Decisions

One of the things I had to be careful about was keeping the quote data separate from the application logic. I wanted `moodData` to remain the single source of truth rather than having quotes or colors duplicated in different parts of the code.

Another decision was how the New Quote button should work. I did not want the user to have to select the same mood again every time they wanted another quote. That is why the application keeps track of `currentMood`.

I also had to deal with the possibility of a random quote being selected twice in a row. Random selection alone does not guarantee that the next quote will be different, so I added logic to exclude the currently displayed quote when there are multiple quotes available.

When I added the mood colors, I wanted the colors to continue coming from `moodData`. I did not want to create a second color system somewhere else in the application.

During the accessibility refinement, I also had to improve the contrast of the New Quote button without changing the existing mood colors. Using the existing dark text color was a better solution than changing the colors that were already part of the dataset.

For mobile usability, I focused on improving the existing layout rather than creating a completely different mobile version. The goal was to refine what was already there, not redesign the application.

---

## Git Checkpoints

The project was built through these Git checkpoints:

| Stage | Commit | What Changed |
|---|---|---|
| Stage 1 | `3a7d450` | Created the initial MoodQuote interface and styling. |
| Stage 2 | `16d5d62` | Added the mood and quote dataset. |
| Stage 3 | `636ad3a` | Connected the mood buttons to the dataset and quote display. |
| Stage 4 | `e156159` | Added mood theming, current mood tracking, and New Quote functionality. |
| Stage 5 | `9d8d672` | Refined responsive behavior and accessibility. |
| Iteration 1 | `29a9b66` | Added quote favorites with `localStorage` persistence. |
| Iteration 2 | `2b87cd9` | Added persistent mood selection, mood-specific hover, and interaction feedback. |

These checkpoints made it easier to see how the project developed instead of having one large change at the end.

---

## Final Reflection

MoodQuote started as a simple interface, but building it stage by stage helped me understand how a real interactive web application comes together.

I started with HTML and CSS, added the data, connected the JavaScript, introduced state and dynamic styling, and then went back to improve the experience on smaller screens and for accessibility.

What I like most about the project is not that it is a complicated application. It is that I can look at the different stages and understand why each piece of code is there and how it contributes to the final result.

There is still a lot more for me to learn, but MoodQuote gave me a practical project where I could apply the concepts instead of only reading about them.
