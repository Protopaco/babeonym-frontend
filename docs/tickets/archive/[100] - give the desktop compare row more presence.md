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
- "Which do you prefer?" sits close above the pair on desktop, as it does on
  mobile, and is larger (1.5rem, the surname's size).

## Open Questions

- **Size on desktop.** The mobile pill is small because it sits in a tight
  stack. The desktop row has room, so the pill can be larger — judge it on
  screen.

## Findings

- **OR is a filled pill at both widths.** One base rule for
  `.compare-names-content-or` sets the primary background, primary-contrast
  text and rounding; the mobile block only overrides size, padding and radius.
  Desktop is 1.5rem with `4px 20px` padding, and the fixed `height: 88px` is gone.
- **Centring.** The separator is a flex column with the slot's
  `--compare-surname-gap`. Without that gap its box was shorter than a slot and
  the pill sat about 4.5px below the chips' centre.
- **Prompt.** "Which do you prefer?" is 1.5rem on desktop. The pair's content
  is `flex: none` with no `min-height`, so the prompt and pair centre together
  instead of the prompt stranding far above.
- **Row gap.** The desktop content has a 24px gap. The separator used to take
  its width from the hidden surname, so with no surname the chips closed up
  against the OR.
- **One skeleton.** `NameChipSkeleton` is now `BaseNameChip` with a `size`
  prop, a highlight fill and a sweep, used by both Compare Names (`compare`) and
  Your Names (`large`), so every loading chip looks the same.
- **No jump on load.** The surname row always renders, empty until the user
  loads or for a user without one, so its fixed height is there from the first
  frame. The separator's hidden surname has `width: 0`, so the surname's length
  no longer shifts the names sideways.
- **Open question resolved.** The desktop pill size was judged on screen.
- **Mobile unchanged** apart from sharing the pill's base rule. The compare chips
  were not resized.

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
