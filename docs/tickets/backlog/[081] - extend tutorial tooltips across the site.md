# [081] - Extend Tutorial Tooltips Across The Site

## Status

Backlog

## Summary

Apply tutorial tooltips to the eight controls listed below. The mechanism is
built and proven, but it is deployed on two controls, both in the name
generator.

## Context

EPIC-001 built the whole tutorial system: a tutorial enabled state, a themed
`BaseTooltip`, the `TutorialTooltip` wrapper that renders its children bare when
tutorial mode is off, session persistence, and the toggle button.

[022] then applied "first home page tooltips" — deliberately a first pass. That
pass is still the only deployment. `TutorialTooltip` is used in
`EvaluatedNameDisplay` and `NameEvaluationActions`.

So a user turns tutorial mode on, sees help on the generator, and finds nothing
anywhere else. The button implies site-wide help that does not exist.

A full pass over the UI produced 23 candidate controls. Adding all 23 is the
failure this ticket has to avoid — a bubble on every control is as unhelpful as
none. The set below is the subset that survived a test.

## The Test

A hint earns its place when the control is **unlabelled**, when its **outcome is
irreversible**, or when the **affordance is invisible**. A labelled button doing
what its label says fails all three, and gets nothing.

## Requirements

Eight controls, each with the copy below. Copy says why the control matters, not
what it is named, and is short enough to sit in the pill.

| Control | Copy | Why it qualifies |
|---|---|---|
| Candidate name | *Do you like this name?* | Already deployed. Frames the three buttons under it. |
| Approve 👍 | Keeps it, and adds it to Your Names | Unlabelled. A thumbs up does not say a list gets built. |
| Snooze 🌙 | *Skip this name for now* | Already deployed. Unlabelled, and a crescent moon is genuinely ambiguous. |
| Reject 👎 | Passes — you won't see it again | Unlabelled and irreversible. |
| Drag grip | Drag to reorder — 1 is your top pick | Invisible affordance. Ranking is the product's whole point and nothing says the order means anything. |
| Delete name drawer | Takes it off your list for good | Hidden behind a hover drawer, and irreversible. |
| Add (+) | Add a name the generator hasn't shown you | Unlabelled. Nothing says you can enter a name yourself. |
| Compare name chips | Pick the one you like better | The gesture is stated nowhere — nothing says the chip is the vote. |

Two of these are already live and only need to be left alone: the candidate name
and Snooze.

All eight sit on the two screens a new user actually lands on, which is where a
tutorial is worth having.

Also required:

- Turning tutorial mode off returns every surface to its normal appearance with
  no leftover spacing or wrappers.
- No control changes behaviour, position or size because it gained a tooltip.

## Two Optional Additions

Both are labelled controls, so they fail the test above. They pass a different
one — whether a user would regret not knowing. Decide during the work; they are
not required.

| Control | Copy | The consequence it teaches |
|---|---|---|
| Set Filters | Applies your choices and refills the names | The refill is a side effect the label does not mention. |
| Sign In / Sign Up | Saves your names so they're here next time | Until you do, the list is only on this device. |

## Open Questions

- **Whether the compare chips still need their hint.** Compare Names now carries
  a permanent "Which do you prefer?" prompt above the chips, which states the
  gesture the tooltip was going to state. The hint may now be a second voice
  saying the same thing.
- Whether tutorial mode should have a first-run state that turns itself on, or
  stays opt-in via the toggle. Today a user has to discover the button to
  discover the tutorial.
- Whether the delete drawer is reachable at all on touch — it opens on `:hover`
  and `:focus-within`, so a finger may never open it. If it is not reachable,
  its tooltip is moot on mobile and the drawer itself is the bug.

## Implementation Notes

- `src/components/Shared/TutorialTooltip/TutorialTooltip.tsx` returns children
  untouched when tutorial mode is off, so wrapping is cheap and reversible.
- **One wrap per control, not two.** `TutorialTooltip` reads
  `TOUCH_POINTER` from `src/constants/mediaQueries.ts` and holds the tooltip
  open on a coarse pointer, so touch is handled inside the wrapper.
  `MobileTutorialHint` was deleted and is not the mobile story any more.
- `BaseTooltip` takes an optional `open`, and disables its own hover, focus and
  touch listeners when that prop is supplied. That is what `TutorialTooltip`
  uses; nothing else should need it.
- Tooltips are Popper-rendered into a portal, so an ancestor's `overflow:
  hidden` does not clip them and placement flips automatically. Placement is
  still worth setting per control — they will overlap each other sometimes and
  that is accepted.
- `[021]` in the archive defines the deployment pattern; follow it rather than
  inventing a second one.
- `useTutorial` from `@/state/tutorial/tutorial.context` is the state hook.
- The toggle is `FloatingTutorialIcon` on desktop and `MobileTutorialToggle` in
  the header on mobile.

## Acceptance Criteria

- The eight controls above have tutorial coverage, working on desktop and on
  touch.
- Copy matches the table, or the change is recorded here.
- Tutorial off is visually identical to today.
- No layout shifts when tutorial mode is toggled.

## Out Of Scope

- Redesigning the tooltip.
- Changing the tutorial toggle or its persistence.
- A guided or sequential walkthrough, which is a different feature.
- The fifteen controls that failed the test and were deliberately dropped: the
  surname under the candidate name, the Filters toggle, the column search field,
  Clear All, the applied filter chips, the four mobile filter category buttons,
  the Your Names section header, the save-draft check, the Compare tab, the
  tutorial toggle itself, the settings gear, the theme swatches, and the surname
  row in Settings. They are labelled controls whose labels are accurate.
  Reopening any of them should be a deliberate decision, not a fresh pass.
- Close and Cancel buttons, the account control, and delete account — each
  already has a label or a confirm dialog.
