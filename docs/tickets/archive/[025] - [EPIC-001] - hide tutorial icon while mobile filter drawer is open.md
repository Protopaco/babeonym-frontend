# [025] - [EPIC-001] - Hide Tutorial Icon While Mobile Filter Drawer Is Open

## Goal

Hide the floating tutorial icon on mobile while the bottom filter drawer is open.

## Context

The floating tutorial icon works as a page-level affordance, but on mobile it competes with the bottom filter drawer when that drawer is open. During the drawer interaction, the drawer should own the user's attention and touch space.

## Requirements

- Hide the floating tutorial icon only when the mobile filter drawer is open.
- Preserve desktop behavior.
- Preserve the tutorial enabled state while the icon is hidden.
- Keep this separate from the mobile tutorial hint implementation.
- Avoid page-level placement hacks if the visibility can be handled through clean component state.

## Likely Files To Inspect

- `src/components/Shared/FloatingTutorialIcon/FloatingTutorialIcon.tsx`
- `src/components/Shared/FloatingTutorialIcon/FloatingTutorialIcon.css`
- `src/components/NameGenerator/MobileNameFilters/MobileNameFilters.tsx`
- `src/components/NameGenerator/MobileNameFilters/MobileNameFilters.css`
- `src/state/tutorial/tutorial.context.ts`
- `src/state/tutorial/tutorial.provider.tsx`

## Notes

We may need a shared UI state hook/provider if the mobile drawer open state is not already available at the same level as the floating tutorial icon.
