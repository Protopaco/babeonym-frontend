# [049] - animate filter drawer open and close

## Status

Backlog

## Summary

Add a polished open and close animation for the desktop filter drawer so it feels like it rolls out from the filter bar instead of snapping open or closed.

## Context

An initial CSS-only animation attempt was not accepted. Revisit the interaction deliberately before implementing.

## Requirements

- Animate the filter drawer opening.
- Animate the filter drawer closing.
- Preserve current filter selection behavior.
- Preserve draft filter behavior.
- Preserve committed URL-backed filter behavior.
- Respect reduced motion settings.
- Decide intentionally whether the implementation should use CSS transitions or the existing motion library.
- Avoid layout jumps when the drawer opens or closes.

## Acceptance Criteria

- Opening the filter drawer feels smooth and intentional.
- Closing the filter drawer feels smooth and intentional.
- The filter bar remains stable when the drawer is closed.
- Compare mode minimized filter bar behavior is preserved.
- No filter behavior changes are introduced as part of the animation work.
