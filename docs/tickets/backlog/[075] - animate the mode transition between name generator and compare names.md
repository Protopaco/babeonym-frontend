# [075] - Animate The Mode Transition Between Name Generator And Compare Names

## Status

Backlog

## Summary

Animate what happens when the workspace switches between the two modes, so
changing tabs reads as one movement rather than three unrelated redraws.

## Context

`NameWorkspace` swaps `NameGenerator` for `CompareNamesMode` the moment the
`mode` search param changes. Three things change at once and none of them are
animated:

- the tab pill moves from one label to the other
- the filter drawer changes shape, because compare mode uses a minimized filter
  bar
- the content area replaces the evaluator with the compare pair

Today all three snap. The two modes also have different content heights, so the
page can jump as well.

## Requirements

- Animate the content swap between the evaluator and the compare pair.
- Animate the filter drawer changing between its two modes.
- Animate the active tab indicator moving between the two tabs.
- The three should read as one coordinated transition, not three that happen to
  fire together.
- Respect reduced motion.
- No layout jump when the two modes have different content heights.
- Preserve current filter behaviour: draft state, committed URL-backed state and
  the compare-mode minimized bar all keep working.

## Open Questions

- Whether the tab indicator slides between the two pills or cross-fades.
- Whether the content swap is a cross-fade, a slide in the direction of the tab
  that was clicked, or something else.
- Whether the filter drawer transition belongs to this ticket or to [049], which
  covers its open and close animation. They touch the same component.

## Implementation Notes

- `src/pages/NameWorkspace.tsx` owns the mode switch.
- `src/components/NameWorkspace/WorkspaceModeHeader/` owns the tabs.
- `src/components/NameWorkspace/WorkspaceModeContent/` wraps whichever mode is
  showing and is the natural place for an `AnimatePresence`.
- `CompareNamesMode` already animates its own chips in and out. Whatever this
  ticket adds has to sit outside that without fighting it.

## Dependencies

- [073] tokenizes motion durations and easing. Build that first so this uses the
  shared values rather than inventing its own.
- [049] animates the filter drawer opening and closing. Decide the boundary
  between the two tickets before starting either.

## Acceptance Criteria

- Switching modes in either direction is animated end to end.
- Nothing jumps vertically during the switch.
- Reduced motion is honoured.
- No filter behaviour changes ship as part of this work.

## Out Of Scope

- Changing what either mode does.
- Restyling the tabs, the filter drawer or the compare chips.
