# [072] - Establish a shared breakpoint system

## Summary

Define the app's breakpoints in one place, add a tablet breakpoint, and move
every stylesheet onto the shared definition instead of repeating raw pixel
values.

## Context

The app has two breakpoint systems that are not connected to each other.

MUI's breakpoints are defined in `src/themes/breakpoints.theme.ts` at the stock
defaults (`xs: 0`, `sm: 600`, `md: 900`, `lg: 1200`, `xl: 1536`) and are used by
`src/themes/typography.theme.ts`.

Component CSS does not use them. It repeats `@media (max-width: 599px)` in 30
media queries across 30 files. That value was chosen to line up with `sm: 600`
and has been followed since because it was close enough, but nothing derives it
from the theme and nothing enforces the match. Changing `sm` in the theme
silently desynchronizes every stylesheet.

There is also a single `@media (max-width: 899px)` in
`src/components/NameWorkspace/WorkspaceFilterSurface/WorkspaceFilterLayout.css`.
This is an ad hoc value in one file, not an established tablet breakpoint — the
other 29 queries treat the viewport as mobile or desktop with nothing in
between.

Note that CSS media queries cannot read custom properties: `@media (max-width:
var(--x))` is invalid. The approach used in [060] for header heights does not
apply here, so this ticket needs a mechanism, not a token.

## Scope

- Agree the breakpoint values, including the tablet range, and record them in
  `src/themes/breakpoints.theme.ts` as the single source of truth.
- Agree and add the mechanism that lets component CSS reference those
  breakpoints without repeating literals.
- Migrate the 30 `max-width: 599px` queries onto the shared definition.
- Resolve the ad hoc `899px` query in `WorkspaceFilterLayout.css` — either onto
  the new tablet breakpoint or, if it is doing something unrelated to tablet,
  with a comment saying what.
- Document the breakpoints and how to use them from CSS.
- Do not change rendered layout at any width. Introducing a tablet breakpoint
  means layouts *may* change in that range later, but that is follow-up work
  and belongs in its own ticket.

## Acceptance Criteria

- Breakpoint values, including tablet, are defined in exactly one place.
- Component CSS references the shared breakpoints; no raw breakpoint pixel
  values remain in component or page CSS.
- The `899px` query is either migrated or explained.
- Mobile and desktop render identically to before at every width.
- The breakpoints and their CSS usage are documented.

## Notes

- **Tablet range needs to be agreed before implementation.** `600px–899px`
  matching MUI's `md` is the obvious candidate, but the app's layouts should be
  looked at to confirm that seam is where the design actually wants it.
- **The sync mechanism needs to be agreed before implementation.** The project
  has no PostCSS config and no Sass — component CSS is plain CSS through Vite.
  Adding `postcss-custom-media` would let CSS declare each breakpoint once as an
  `@custom-media` rule; the alternative is keeping the literals and documenting
  the coupling to the theme. The first is a real build-tooling addition, which is
  why it is called out here rather than assumed.
- Once tablet exists, deciding what each surface should actually *do* between
  600 and 899 is separate follow-up work.
