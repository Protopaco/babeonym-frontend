# [081] - Extend Tutorial Tooltips Across The Site

## Status

Backlog

## Summary

Tutorial tooltips now cover seventeen controls across the generator, Your Names,
Compare Names, the filter surfaces at both widths, the header and Settings. On a
touch device they reveal one at a time on tap.

## Context

EPIC-001 built the whole tutorial system: a tutorial enabled state, a themed
`BaseTooltip`, the `TutorialTooltip` wrapper that renders its children bare when
tutorial mode is off, persistence, and the toggle button.

[022] applied a first pass to two controls in the generator. Until this ticket
that was the only deployment, so a user who turned tutorial mode on found help on
the generator and nothing anywhere else.

## How The Set Was Chosen

A full pass over the UI produced 23 candidate controls. The first cut applied a
test — a hint earns its place when the control is **unlabelled**, its **outcome
is irreversible**, or its **affordance is invisible** — and kept nine.

That set was then **deliberately widened** to cover labelled controls too: the
workspace tabs, the Filters toggle, the Your Names header, the settings gear,
the theme picker and the surname row. The reasoning is that a user who has
switched tutorial mode on has asked for help, and a hint that explains what a
labelled section is *for* is still worth having in that mode. The test is kept
here as the history of the first cut, not as the rule for what gets a hint.

## Requirements

The live set. Copy is short, plain, and says what a control is for rather than
repeating its name.

### Name generator

| Control | Copy |
|---|---|
| Candidate name | Do you like this name? |
| Approve 👍 | Save this name |
| Snooze 🌙 | Show it again later |
| Reject 👎 | Don't show it again |

The three buttons are one voice — save, later, never — and the two that get
confused share a construction, so the difference between them is the words
"later" and "Don't".

### Workspace

| Control | Copy |
|---|---|
| Name Generator tab | Find new names |
| Compare Names tab | Rank the ones you saved |
| Your Names header | Your favourites, best first |
| Drag grip | Drag to reorder |
| Delete name drawer | Takes it off your list for good |
| Add (+) | Add your own name |
| Compare name chips | Pick the one you like better |

The two tabs pair — find vs rank, new vs saved — because on touch they are
likely to be read together.

### Filters

| Control | Copy |
|---|---|
| Filters toggle (desktop) | Narrows the names you're shown |
| Mobile filter tray (the button row) | Narrows the names you're shown |

### Header and Settings

| Control | Copy |
|---|---|
| Settings gear | Your surname and the app's colours |
| Settings back link | Back to your names |
| Theme label | Changes the color scheme |
| Sur Name row | Shown under every name so you can hear them together |

### Behaviour

- **On a mouse,** hints show on hover, one at a time, and every control behaves
  exactly as it does with tutorial mode off.
- **On touch,** hints reveal on tap. The first tap on a hinted control shows its
  hint and does nothing else; the second tap does what the control normally
  does. Only one hint is open at a time, and tapping anywhere that is not a
  hinted control dismisses it.
- **This replaces the earlier rule** that no control changes behaviour because it
  gained a tooltip. That rule held while touch hints were all held open at once,
  which stopped working at this many hints — they covered the screen, the
  controls they described, and each other. Changing the first tap is the accepted
  cost: tutorial mode is something the user switches on, and switches off to use
  the app.
- Turning tutorial mode off returns every surface to its normal appearance and
  behaviour.

## Open Questions

- **Whether the delete drawer is reachable on touch.** It opens on `:hover` and
  `:focus-within`, so a finger may never open it — in which case its hint points
  at something that cannot be opened, and the drawer itself is the bug.
- Whether tutorial mode should have a first-run state that turns itself on, or
  stays opt-in via the toggle. Today a user has to discover the button to
  discover the tutorial.
- **Answered:** the compare chips keep their hint despite the permanent "Which do
  you prefer?" prompt, on both chips with the same words.

## Implementation Notes

- `TutorialTooltip` returns children untouched when tutorial mode is off.
- **Touch is handled inside the wrapper.** It reads `TOUCH_POINTER` from
  `src/constants/mediaQueries.ts`. On a coarse pointer each instance takes a
  `useId()`, shows when its id matches `activeTutorialHintId` in the tutorial
  context, and intercepts the first tap with an `onClickCapture` that calls
  `preventDefault` and `stopPropagation`.
- **One open hint** is enforced by `activeTutorialHintId` in
  `tutorial.provider.tsx`. It is not persisted, and it clears when tutorial mode
  is switched off. The provider holds a single document click listener, live only
  while a hint is open, to dismiss it. The opening tap never reaches that
  listener, because the tooltip stops it in the capture phase.
- **Controls that repeat per row are hinted on the first row only** — the drag
  grip and the delete drawer — so the hint explains the control without
  appearing on every name. `ListNameChip` takes a `showTutorialHint` prop for
  this.
- **The Compare tab renders one tooltip or the other.** Disabled, it shows the
  always-on `BaseTooltip` explaining why; enabled, it shows the tutorial hint.
  Nesting the two would let both fire.
- **The theme picker is hinted on its label**, not its four swatches.
- **`TutorialTooltip` wraps its child in spans**, which become the flex item in
  place of the control. Where that matters, the unhinted case is rendered bare
  rather than wrapped with an empty title.
- **The mobile filter tray is hinted on its button row**, not on each button and
  not on the tray. Wrapped individually, the buttons stopped shrinking — a span
  in place of a button keeps `min-width: auto` — and at a narrow width LANGUAGE
  ran off the screen. The tray itself is `position: fixed`, so a span around it
  has nothing in flow to measure and the bubble would anchor to the wrong place.
  The applied chips sit outside the hint, so their delete buttons act on the
  first tap.
- `BaseTooltip` takes an optional `open` and disables its own listeners when it
  is supplied.
- Tooltips are Popper-rendered into a portal, so an ancestor's `overflow:
  hidden` does not clip them.
- `useTutorial` from `@/state/tutorial/tutorial.context` is the state hook.
- The toggle is `FloatingTutorialIcon` on desktop and `MobileTutorialToggle` in
  the header on mobile.

## Acceptance Criteria

- Every control in the tables has a hint, working on desktop and on touch.
- Copy matches the tables, or the change is recorded here.
- On touch, the first tap reveals and the second acts, and only one hint is open
  at a time.
- Tutorial off is visually and behaviourally identical to having no tutorial.

## Optional Additions

Not built. Both are labelled controls whose hint would teach a consequence rather
than a control.

| Control | Copy | The consequence it teaches |
|---|---|---|
| Set Filters | Applies your choices and refills the names | The refill is a side effect the label does not mention. |
| Sign In / Sign Up | Saves your names so they're here next time | Until you do, the list is only on this device. |

## Out Of Scope

- Redesigning the tooltip.
- Changing the tutorial toggle or its persistence.
- A guided or sequential walkthrough, which is a different feature.
- Controls still without a hint: the column search fields, the applied filter
  chips, the save-draft check, the drawer's Clear All and Set Filters, the
  filter row's Clear All, the tutorial toggle itself, Close and Cancel buttons,
  the account control, and delete account. Adding any of them should be a
  deliberate decision.
