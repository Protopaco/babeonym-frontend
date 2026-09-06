# [083] - Add A Browser Tab Icon

## Status

Backlog

## Summary

Give the app a favicon. The tab currently shows a blank page icon on every
route.

## Context

`index.html` still carries Vite's scaffold link:

```html
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
```

There is no `public/` directory in the project, so that file does not exist and
the request 404s. This is not a missing favicon so much as a broken one — the
browser falls back to its generic page icon.

The mark already exists. `src/assets/icons/icon-baby.svg` is the baby figure
`FloatingTutorialIcon` renders, and it is the only asset that reads at favicon
size. `icon-full.svg` is the wordmark at a 1728x313 aspect ratio and is
unusable this small. `Final_Refined Logo-White.svg` is a light-on-dark variant.

Two properties of the baby asset matter here:

- It is **not square** — `viewBox="0 0 368.64 331.2"`, roughly 1.11:1. A favicon
  is square, so it needs padding rather than stretching.
- Both its paths are `fill="currentColor"`. That works when it is inlined
  through svgr and coloured by CSS, but a favicon is loaded as a standalone
  document with no inherited colour, so `currentColor` resolves to black. The
  file used as a favicon needs an explicit fill and cannot simply be the same
  file.

## Requirements

- The tab shows the Babeonym mark on every route.
- The icon is legible at 16px, not just at 32px and above.
- The scaffold reference to `/vite.svg` is gone.
- The asset used as a favicon has an explicit fill rather than `currentColor`.
- The mark is padded to square rather than distorted.
- The favicon is not broken in production; whatever path is used resolves in a
  built bundle, not only in dev.

## Open Questions

- **How far to take format coverage.** An SVG favicon alone covers current
  browsers. The fuller set adds a PNG fallback, an `apple-touch-icon` for iOS
  home screens, and a web manifest. The fuller set is only worth it if the app
  is meant to be installable or pinned, which has not been decided.
- **Whether the icon adapts to dark mode.** The browser's tab strip has its own
  light and dark chrome, independent of the app's four themes. A single dark
  mark can disappear against a dark tab strip. An SVG favicon can carry its own
  `prefers-color-scheme` media query, which is the cheapest way to handle it.
- Which colour the mark should be. It is currently drawn in whatever the parent
  sets; as a favicon it needs a decision, and the palettes differ per theme
  while the favicon cannot.
- Whether the asset lives in `public/` or is imported and hashed by Vite.
  `public/` is the conventional home for a favicon and keeps the path stable.

## Implementation Notes

- `index.html` holds the link tag and already has the correct `<title>`.
- `src/assets/icons/icon-baby.svg` is 2KB with two paths — small enough to use
  directly once its fill is settled.
- The project has no `public/` directory yet; creating one is part of this.
- `FloatingTutorialIcon` imports the same asset through svgr. If the file is
  changed rather than copied, check that component still renders correctly —
  hardcoding a fill would break its themed colouring.

## Acceptance Criteria

- The Babeonym mark appears in the browser tab in dev and in a production
  build.
- No 404 for a favicon in the network log.
- The mark is recognisable at 16px.
- `FloatingTutorialIcon` still takes its colour from the theme.

## Out Of Scope

- Designing a new mark.
- Social sharing images (Open Graph, Twitter cards).
- Making the app installable as a PWA, beyond whatever the format decision
  above implies.
