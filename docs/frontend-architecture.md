# Babeonym Frontend Architecture

This document captures the default React architecture rules for Babeonym UI work. Use it with the React frontend engineering skill when designing, reviewing, or implementing components.

## Component Ownership

- Page and workspace components compose sections.
- Page and workspace components should not own detailed visual styling for child components.
- Section components own their own section structure, spacing, labels, loading states, and empty states.
- List components own list ordering and list layout.
- List item components own the layout for one rendered item.
- Reusable visual components own their own visual styling.
- Parents may place children, size available regions, and choose layout between sections.
- Parents should not style child internals from parent stylesheets.

## Styling Rules

- Every `.tsx` component or page must have a sibling `.css` file, even if the CSS file is empty.
- Components import their own CSS files.
- Component CSS should target the component's own classes.
- Avoid parent selectors that reach into child component classes.
- If a shared component needs a visual variation, add an explicit prop or variant.
- Keep variants named by intent, such as `size="wide"` or `variant="compact"`.
- Do not create one-off parent overrides for reusable components.

## Breakpoints

- The app has three tiers: mobile `<600px`, tablet `600px-899px`, desktop `>=900px`.
- The values match MUI's defaults and the style guide's three type scales.
- Component CSS must not write breakpoint pixel values. Use the named queries:
  - `@media (--mobile)` - mobile only
  - `@media (--tablet)` - tablet only
  - `@media (--desktop)` - desktop only
  - `@media (--below-desktop)` - mobile and tablet together
- The names are defined in `src/styles/breakpoints.css` and resolved at build
  time by `postcss-custom-media`, wired up in `vite.config.ts`. That file is
  loaded as global data, so it is never imported by a stylesheet and emits
  nothing.
- The JS side declares the same tiers in `src/themes/breakpoints.theme.ts` for
  MUI. A media query condition cannot read a custom property, so the two cannot
  share one definition and a change has to be made in both.

## Motion

The app animates with two systems. Which one to use is decided by what is being
animated, not by preference.

- **`motion/react`** for anything CSS cannot express: an element animating out
  before it unmounts, and `layout` animation, which measures position before and
  after a reflow. `AnimatePresence` and `layout` are the tells.
- **Plain CSS** for state transitions and loops: a hover or data-attribute
  change moving between two declared states, and keyframe animations that
  repeat. Doing these in `motion/react` would mean lifting hover into React
  state and re-rendering on pointer move, which is worse on every axis.
- **Springs** only for interruptible layout animation, where a list can reorder
  while items are still moving. A spring has no duration, so it consumes no
  duration token; everything else should.

Durations and easing come from `src/themes/motion.theme.ts` — TS values for
`motion/react`, CSS custom properties for stylesheets. Travel distance stays
component-owned, because it scales with the size of the thing moving.

Reduced motion is handled centrally in two places and nowhere else:
`MotionConfig reducedMotion="user"` in `src/main.tsx` for the library, and a
global `prefers-reduced-motion` block in `src/styles/index.css` for CSS. No
component should call `useReducedMotion` or write its own guard.

## Theme Tokens

- Never hardcode raw colors in component or page CSS.
- Use theme tokens for colors, shadows, borders, focus states, and design-system values.
- If a needed token does not exist, add or propose a semantic token instead of hardcoding.
- Typography, radius, spacing, sizing, and motion values should use project tokens when they represent reusable design decisions.

## Component Shape

- One component should do one clear thing.
- Functions or components over 50 lines should be reviewed for possible extraction.
- Split by responsibility:
  - UI section -> component
  - list item -> component
  - reusable behavior -> hook
  - pure transformation -> helper
  - shared contract -> type/model file following project convention
- Avoid large render helper functions inside page components.

## Workspace Pattern

The unified name workspace should follow this ownership model:

- `NameWorkspace` owns URL-backed workspace mode and places workspace sections.
- Mode components own the active interaction for a workspace mode.
- The approved-name list owns ranked list presentation.
- Approved-name chips own chip visuals.
- Filter components own filter presentation and interactions.
- Workspace parents should not style approved-name chip internals, compare button internals, filter option internals, or generated-name action internals.

## Ticket Review Checklist

Use this checklist in ticket acceptance criteria when frontend work changes UI structure or styling:

- New `.tsx` components include sibling `.css` files.
- Component CSS does not style child internals from a parent stylesheet.
- Reusable visual variation is represented by a named prop or variant.
- Colors, shadows, borders, and focus styles use theme tokens.
- Components do one clear thing.
- Functions or components over 50 lines were reviewed for extraction.
