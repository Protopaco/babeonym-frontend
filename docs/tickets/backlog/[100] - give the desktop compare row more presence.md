# [100] - Give The Desktop Compare Row More Presence

## Status

Backlog

## Summary

On desktop, Compare Names is flat — two outlined chips and a plain primary "OR"
between them. It needs some spice. Draw the OR as the filled primary pill it
already is on mobile.

## Context

Two options were raised: make the compare chips bigger, or give the OR a primary
background. The OR was chosen.

- **On mobile the OR is already a filled pill** — primary background,
  primary-contrast text, rounded — in the mobile block of
  `CompareNamesMode.css`. It was drawn that way so it reads as a separator by
  its own weight. On desktop it is plain text.
- Filling it adds one accent to the row, makes the two widths match, and changes
  nothing about layout.
- **Bigger chips were considered and set aside.** The chip's `8vh` height is
  written in two places that must agree (`BaseNameChip.css`, compare size, and
  `.compare-names-mode-chip-area`), inside a 340px frame that clips. The
  surname's indent and the OR's alignment also depend on the chip's width and
  padding (`--compare-slot-width`, `--compare-text-inset`).

## Requirements

- On desktop, the OR is a filled primary pill with primary-contrast text.
- It stays centred between the two names.

## Open Questions

- **Size on desktop.** The mobile pill is small because it sits in a tight
  stack. The desktop row has room, so the pill can be larger — judge it on
  screen.

## Implementation Notes

- `.compare-names-content-or` in `src/components/CompareNames/CompareNamesMode.css`.
  The desktop rule currently sets a fixed `height: 88px` to centre the word; a
  pill needs that box to size to its content instead, while the separator keeps
  the row lined up.
- Consider moving the shared pill styles out of the mobile block so both widths
  use one rule, with only the size differing.
- Colours come from the existing tokens, `--color-primary` and
  `--color-primary-contrast`.

## Acceptance Criteria

- On desktop, the OR is a filled primary pill centred between the two chips.
- The chips, surnames and row alignment are unchanged.
- Mobile is unchanged.

## Out Of Scope

- Resizing the compare chips.
- The "Which do you prefer?" prompt.
