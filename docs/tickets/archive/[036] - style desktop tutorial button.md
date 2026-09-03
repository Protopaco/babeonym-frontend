# [036] - Style desktop tutorial button

## Summary

Update the desktop floating tutorial button styling so it has the polished circular treatment shown in the reference screenshot.

## Context

The desktop tutorial button should feel more intentional and finished. The provided reference shows a circular white button surface with a purple outer ring, centered baby icon, and subtle dimensional shadowing.

Reference image:

- `/Users/paulstevens/Desktop/Screenshot 2026-08-27 at 10.40.05 PM.png`

## Scope

- Update desktop styling for the floating tutorial button.
- Preserve the current tutorial toggle behavior.
- Preserve existing mobile tutorial behavior unless a desktop-only style requires an explicit responsive override.
- Keep styling owned by the tutorial button component.
- Use theme tokens for all colors, shadows, borders, and other design-system values.

## Acceptance Criteria

- Desktop floating tutorial button visually matches the reference direction:
  - circular white button surface
  - purple outer ring
  - centered tutorial/baby icon
  - subtle shadow/depth treatment
- Button remains clickable and accessible.
- Tutorial enabled/disabled behavior is unchanged.
- Mobile layout and mobile tutorial presentation are unchanged.
- No hardcoded color values are added in component/page CSS.
- Any required new design values are added as semantic theme tokens before use.
- The component has a sibling `.css` file and owns its visual styling there.

## Notes

- This is styling-only work.
- Do not use parent/page CSS to style the tutorial button internals.
