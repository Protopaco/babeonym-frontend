# [102] - Revise Name Logo

## Status

Backlog

## Summary

Revise the Babeonym name logo.

## Context

- **The logo is an SVG,** `src/assets/icons/icon-full.svg`, imported as a
  component by `src/components/Header/LogoFull/LogoFull.tsx`.
- **It appears in both top bars,** `DesktopTopBar` and `MobileTopBar`, as the
  home link.
- **It is coloured by `currentColor`** from `LogoFull.css`: primary on desktop,
  primary-contrast on mobile. A replacement SVG has to keep using
  `currentColor` to follow the theme.

## Open Questions

- Whether `public/favicon.svg` changes with it.

## Implementation Notes

- **Mobile size is constrained.** The logo is 24px tall on mobile because at
  26px it overlapped the header's controls at 360px wide. A wider mark needs
  checking at that width.
- `LogoFull.css` sets `height` and lets `width` follow, so a new aspect ratio
  changes the logo's width in the bar.

## Out Of Scope

- The header's layout.
