# [077] - Show The Surname In Both Modes

## Status

Backlog

## Summary

Give the surname a deliberate style in the Name Generator, show it in Compare
Names too, and open up the workspace spacing so a full name has room to sit.

## Context

The surname is already rendered in the generator, as a bare `Typography
variant="h3"` with `id="user-surname"` and `margin: 0` — no colour, no
relationship to the given name above it. It was added to prove the value was
available, not designed.

Compare Names shows given names only, so the same person sees a full name in one
mode and a bare first name in the other. Deciding between two names is partly
about how each sounds with the surname, so the comparison is weaker without it.

The generator's given name is now 120px. The display row has `padding-bottom:
3vh` and the workspace content has `min-height: 360px`, both set before the name
grew. With a surname underneath it is already tight, and it will be tighter once
the surname is styled deliberately.

## Requirements

- The surname has an intentional style in the Name Generator, related to the
  given name rather than a default heading.
- The surname appears in Compare Names.
- Spacing in the workspace content accommodates a full name in both modes without
  crowding or clipping.
- Nothing regresses when a user has no surname set, which is the common case for
  an anonymous session.
- The compare chips still fit their pair side by side with the surname added.
- Mobile is handled, not just desktop.

## Open Questions

- What the surname should look like — smaller and quieter beneath the given
  name, same weight, a different colour. Nothing has been decided.
- Whether the surname sits inside the compare chip with the given name, or
  underneath each chip, or once beneath the pair since it is the same for both.
- Whether `#user-surname` should become a component. It is currently markup and
  an id selector inside `NameEvaluator`, which is the only place it exists.
- Whether the surname belongs in the name-chip family, given [034] built
  `BaseNameChip` for exactly this kind of reuse.

## Implementation Notes

- `src/components/NameGenerator/NameEvaluator/NameEvaluator.tsx` renders the
  surname today; `NameEvaluator.css` has the `#user-surname` rule.
- `src/components/CompareNames/CompareNamesMode.tsx` and `CompareNameChip` are
  where it would need to appear.
- `WorkspaceModeContent.css` sets `min-height: 360px`; the generator's display
  row sets `padding-bottom: 3vh`. Both predate the 120px name.
- `NameEvaluator.css` still carries `grid-template-rows` and `row-gap` in its
  mobile block for an element that is no longer a grid. Dead, worth removing
  while in there.

## Acceptance Criteria

- The surname reads as deliberate in both modes.
- A user with no surname sees no empty space where it would be.
- Neither mode crowds or clips with a long surname.
- The compare pair still fits side by side on desktop and stacks on mobile.

## Out Of Scope

- Where the surname is set or edited, which is Settings.
- Changing what either mode does.
