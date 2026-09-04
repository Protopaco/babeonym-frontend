# [081] - Extend Tutorial Tooltips Across The Site

## Status

Backlog

## Summary

Apply tutorial tooltips to the rest of the app. The mechanism is built and
proven, but it is deployed on two controls, both in the name generator.

## Context

EPIC-001 built the whole tutorial system: a tutorial enabled state, a themed
`BaseTooltip`, the `TutorialTooltip` wrapper that renders its children bare when
tutorial mode is off, a mobile presentation, session persistence, and the
floating toggle button.

[022] then applied "first home page tooltips" — deliberately a first pass. That
pass is still the only deployment. `TutorialTooltip` is used in
`EvaluatedNameDisplay` and `NameEvaluationActions`, and `MobileTutorialHint` in
`EvaluatedNameDisplay` alone.

So a user turns tutorial mode on, sees help on the generator, and finds nothing
anywhere else. The button implies site-wide help that does not exist.

## Requirements

- Tutorial coverage on the surfaces a new user meets: the filter surface, Your
  Names including the add-name and delete affordances, Compare Names, the
  header and account entry points, and Settings.
- Copy explains what a control does or why it matters, not what it is named.
- Mobile is covered. `TutorialTooltip` is hover-driven and a touchscreen has no
  hover, which is why `MobileTutorialHint` exists; every tooltip added needs a
  decision about its mobile equivalent.
- Turning tutorial mode off returns every surface to its normal appearance with
  no leftover spacing or wrappers.
- No control changes behaviour, position or size because it gained a tooltip.

## Open Questions

- **How much is too much.** Every control having a tooltip is as unhelpful as
  none. The set needs to be chosen, and the ticket should record why each one
  was picked.
- Who writes the copy. This is product writing, not implementation, and there is
  a lot of it.
- Whether the mobile story stays "a hint block under the thing" or needs a
  different presentation for controls where there is no room beneath.
- Whether tutorial mode should have a first-run state that turns itself on, or
  stays opt-in via the floating button. Today a user has to discover the button
  to discover the tutorial.
- Whether Compare Names needs tooltips at all, given the mode is already
  explanatory.

## Implementation Notes

- `src/components/Shared/TutorialTooltip/TutorialTooltip.tsx` returns children
  untouched when tutorial mode is off, so wrapping is cheap and reversible.
- `src/components/Shared/MobileTutorialHint/MobileTutorialHint.tsx` is the
  touch counterpart and renders null when off.
- `[021]` in the archive defines the deployment pattern; follow it rather than
  inventing a second one.
- `useTutorial` from `@/state/tutorial/tutorial.context` is the state hook.
- `FloatingTutorialIcon` is the toggle and is already hidden while the mobile
  filter drawer is open ([025]).

## Acceptance Criteria

- Every surface listed above has tutorial coverage on desktop and on touch.
- Tutorial off is visually identical to today.
- Copy is written and reviewed, not placeholder.
- No layout shifts when tutorial mode is toggled.

## Out Of Scope

- Redesigning the tooltip or the hint block.
- Changing the tutorial toggle or its persistence.
- A guided or sequential walkthrough, which is a different feature.
