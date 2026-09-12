# [094] - Size The Mobile Filter Tray To Its Buttons

## Status

Backlog

## Summary

The mobile filter tray at the bottom of the screen is taller than the four buttons
in it. The buttons sit near the top with roughly twice as much empty space below
them as above. Size the tray to its buttons, with even padding above and below.

## Context

`.mobile-name-filters` in `MobileNameFilters.css` is a fixed, top-down flex column
with `padding: 16px` and `min-height: var(--height-filter-drawer-closed)`, which is
`88px` in `palette.theme.ts`. The buttons take their natural height at the top of
the column, and the `min-height` fills out the rest underneath them — so the gap
above the buttons is the 16px of padding, and the gap below is that plus whatever
the `min-height` adds.

The same token decides how much room the page leaves for the tray, so the tray and
the page have to change together:

| Where | Use |
|---|---|
| `MobileNameFilters.css` | The tray's `min-height`. |
| `NameWorkspace.css`, mobile block | The page's base `padding-bottom`, so the last saved name clears the tray. |
| `NameWorkspace.css`, `:has(.mobile-name-filters--has-chips)` | The page's larger `padding-bottom` when the applied chip row is showing: the token plus `--height-filter-chip-row` plus the tray's 8px gap. |

If the tray's real height and the token disagree, the last row of Your Names either
hides under the tray or gets a gap below it.

## Requirements

- The tray's height fits its buttons, with equal space above and below them.
- The page's bottom clearance matches the tray's new height exactly, both with and
  without the applied chip row.
- The tray still grows by the chip row when filters are applied, as it does today.

## Open Questions

- **How much padding.** 16px is what shows above the buttons today and is the
  obvious starting point, but it is worth judging on a device once the extra
  bottom space is gone.

## Implementation Notes

- **Keep the token and set it to the tray's measured height**, rather than
  removing the `min-height` and letting the tray size itself. The page's clearance
  needs an actual number, and one token is what keeps the tray and the clearance in
  agreement. The value is the padding above, the button height, and the padding
  below.
- **Measure the rendered button height first.** The buttons are `SecondaryButton` —
  MUI's contained button at `size="small"` — with `padding: 6px 10px` overridden
  from the tray's CSS. Measure it in the browser rather than working it out from
  MUI's defaults.
- **Check the safe area on a real iPhone.** Nothing in the app handles
  `env(safe-area-inset-bottom)`, and the viewport meta in `index.html` has no
  `viewport-fit=cover`. The current excess below the buttons may be keeping them
  clear of the home indicator by accident, so tightening it could put them against
  the bottom edge. Verify before settling on a value.
- **Do this before or with [093].** [093] animates the chip row and the tray.
  Settling the height first avoids tuning those animations against a height that is
  about to change.
- **Unused token, recorded not removed:** `--bottom-floating-tutorial-icon-mobile`
  in `palette.theme.ts` is derived from `--height-filter-drawer-closed` and used
  nowhere. It dates from when the tutorial icon floated over the page on mobile;
  that toggle now lives in the header. It can go, but that is a separate decision.

## Acceptance Criteria

- The tray's space above and below the buttons is equal.
- With no filters applied, the last saved name sits just clear of the tray, with
  no gap and nothing hidden.
- With filters applied, the same holds with the chip row showing.
- On an iPhone with a home indicator, the buttons are not crowded against the
  bottom edge.

## Out Of Scope

- The applied chip row's own height (`--height-filter-chip-row`).
- The category drawer that slides up (`--height-filter-drawer-open`).
- Animating any of it — that is [093].
