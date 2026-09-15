# [107] - Make The Mobile Filter Tray Primary

## Status

Backlog

## Summary

Change the mobile filter tray from the secondary colour to primary, so it
matches the header and desktop's filter strip, and add Clear All to its applied
filter row.

## Context

- **Tray:** `MobileNameFilters.css` sets `.mobile-name-filters` to
  `--color-secondary`.
- **Category buttons:** `SecondaryButton` is an MUI contained button in the
  primary colour, so it disappears on a primary tray.
- **Desktop:** the filter strip is `--color-primary`, with white chips and
  contrast-coloured Filters and Clear All controls.
- **Clear All:** `WorkspaceClearFiltersButton` is styled for a primary strip,
  so on a primary tray it can be reused unchanged. This covers [104].

## Requirements

- The tray is primary.
- The category buttons are white with primary text, pill-shaped to match the
  applied filter chips.
- Applied filters have a Clear All pinned at the end of the chip row, outside
  the scroll, appearing and disappearing with the row.

## Open Questions

- Restyle `SecondaryButton` itself, or give it a named variant for primary
  backgrounds? Check its other uses first.

## Out Of Scope

- The category drawer sheet and its footer buttons.
