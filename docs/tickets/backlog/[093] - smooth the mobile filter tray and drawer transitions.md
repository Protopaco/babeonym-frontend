# [093] - Smooth The Mobile Filter Tray And Drawer Transitions

## Status

Backlog

## Summary

On mobile, the filter tray and the category drawer appear and disappear with no
motion. Four transitions should animate: the applied chip row, the individual
chips, the category drawer opening and closing, and the tray itself when leaving
or returning to Name Generator. While doing it, look across the whole app for
other transitions that are jarring and record them here.

## Context

Every one of these jumps has the same cause: the thing is unmounted the moment it
is no longer needed, so there is never an exit to animate — and in the drawer's
case, never an entrance either.

- **The applied chip row** in the bottom tray is rendered with
  `appliedFilterChips.length > 0 && (...)`, with no `AnimatePresence`. Applying
  the first filter makes the tray 48px taller at once (the 40px row plus the
  tray's 8px gap); removing the last shrinks it at once.
- **The page underneath** reserves room for that row through
  `.name-workspace:has(.mobile-name-filters--has-chips)`, which raises
  `padding-bottom` by the same amount. It jumps with the row.
- **The category drawer** — the sheet that opens from GENDER, DECADE and so on —
  is `<Drawer open={true}>` in `MobileFilterDrawer.tsx`, and the component
  returns `null` when `category` is cleared. Closing therefore unmounts the
  drawer before MUI can slide it out. It does not slide *in* either: MUI's
  `Drawer` deliberately skips its appear transition when it mounts already open
  (`appear: mounted.current` in `@mui/material/Drawer/Drawer.js`, which is false
  on the first render).
- **The tray on mode switch** is rendered in `pages/NameWorkspace.tsx` only while
  `workspaceMode === 'add'`, so switching to Compare Names removes it instantly
  while the workspace modes themselves slide.

## Requirements

1. **The chip row** grows from zero height when the first filter is applied and
   collapses when the last is removed.
2. **Individual chips** fade in and out as filters are added and removed, and the
   remaining chips close the gap smoothly rather than snapping.
3. **The category drawer** slides up when it opens and back down when it closes,
   whether closed by the arrow, by Set Filters, or by tapping outside.
4. **The tray** slides down off the screen when leaving Name Generator, and back
   up when returning to it.
5. **The page's bottom clearance** moves in step with the chip row rather than
   jumping ahead of it.
6. **Audit the rest of the app while doing this.** Look for any other transition
   that is abrupt enough to feel wrong — anything that pops, jumps, or
   disappears where the surrounding interface moves. Record each one under
   Findings below with where it is and what it does. Do not fix them inline:
   each is a decision about whether it belongs in this ticket or its own.

## Findings

_To be filled in during the work — see requirement 6._

## Implementation Notes

- **Precedent for the chip row:** `WorkspaceFilterSurface.tsx` already animates a
  height between `0` and `auto` with `AnimatePresence` on desktop, at
  `motionTokens.durationSeconds[300]`. Follow it rather than inventing a second
  approach.
- **Chips:** `motion` wrappers with `layout`, so removing one lets the rest
  reflow instead of jumping. The row scrolls horizontally, so check a chip
  leaving while the row is scrolled.
- **The page clearance** is set by a `:has()` rule, which cannot be driven by
  motion. A CSS `transition` on `padding-bottom` at the same duration keeps it in
  step — a transition applies however the value changes, including through
  `:has()`. It lives in `NameWorkspace.css`, in the mobile block.
- **The category drawer** should stay mounted with `open={category !== null}` so
  MUI's own slide runs both ways. The catch is the exit: `category` is cleared
  the moment it closes, so the drawer would blank mid-slide. Keep rendering the
  last category until the transition has finished — for example by holding it
  in state and clearing it from the slide's `onExited`. The effect that seeds the
  draft from the URL currently runs on `[category]`; make sure it still seeds on
  open and does not reseed during the exit.
- **The tray** is `position: fixed` at the bottom, so a `y` transform slides it
  cleanly without affecting layout. Wrap it in `AnimatePresence` where
  `NameWorkspace.tsx` renders it, and match the 300ms the workspace modes use so
  the two move together. `MobileNameFilters` clears `mobileFilterDrawerOpen` in
  an unmount cleanup; with `AnimatePresence` that runs after the exit, which is
  what should happen.
- **The page does not move when the tray leaves.** The base mobile clearance on
  `.name-workspace` is applied regardless of mode. Only the extra chip-row
  clearance comes off when leaving with filters applied, and requirement 5
  already smooths that.
- **Reduced motion is already handled globally** — `MotionConfig
  reducedMotion="user"` in `main.tsx` for motion, and the
  `prefers-reduced-motion` block in `src/styles/index.css` for CSS transitions
  and MUI's own. Nothing extra is needed per animation.
- **Related to [094],** which changes the tray's height token. Doing [094] first,
  or both together, avoids tuning the tray's and the chip row's animations
  against a height that is about to change.

## Acceptance Criteria

- Applying the first filter and removing the last both animate the tray's height,
  and the page below moves with it rather than ahead of it.
- Adding and removing a chip fades it, and the remaining chips reflow smoothly.
- The category drawer slides up on open and down on close, with its content
  intact throughout the slide.
- Switching from Name Generator to Compare Names slides the tray down; switching
  back slides it up.
- With reduced motion enabled, all of the above resolve without sliding.
- Findings is filled in, or states that nothing else was found.

## Out Of Scope

- Fixing transitions found during the audit — they are recorded, and each gets a
  decision.
- Desktop filter transitions, which already animate.
- Changing the tray's height — that is [094].
