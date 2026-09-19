# [101] - Revise Color Themes, Add Contrasting Colors, Adjust Existing Colors

## Status

Backlog

## Summary

Revise the four colour themes. Add contrasting colours to the palette, and adjust
the existing ones.

## Context

- **Four themes:** `light`, `dark`, `blue` and `pink`, in `src/themes/themes/`,
  registered in `src/themes/themeRegistry.ts`.
- **Each defines the same eight colours** (`SemanticPaletteColors`): `primary`,
  `primaryContrast`, `secondary`, `secondaryContrast`, `selected`,
  `textPrimary`, `textSecondary`, `background`.
- **`src/themes/palette.theme.ts`** turns those into the MUI palette and the
  `--color-*` CSS variables every component uses. A few variables are derived
  there rather than set per theme — `--color-primary-highlight`,
  `--color-primary-edge`, `--color-border`, `--color-scroll-edge`, and the box
  shadow.
- **There is no colour that contrasts with primary.** Recent restyles — the
  filter surface and [100]'s OR pill — had only primary to reach for when
  something needed emphasis.

## Open Questions

- Which contrasting colours to add, and what to call them.
- Whether the derived variables in `palette.theme.ts` should become per-theme
  values.

## Implementation Notes

- A new colour means a new field on `SemanticPaletteColors`, a value in every
  theme, and a CSS variable in `palette.theme.ts`.
- `/theme` (`src/pages/ThemeTest.tsx`) is the page for checking a theme.
- `index.html` paints `babeonym:themeBackground` before React mounts, from the
  theme's `background`. Changing a background changes that first paint too.
- Error colours come from MUI's defaults, not the themes.

## Out Of Scope

- Adding or removing themes.
- The theme picker's design.
