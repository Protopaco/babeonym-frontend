# [070] - style filter list scrollbars with theme colors

## Status

Backlog

## Summary

The scrollable filter lists render the browser's default scrollbar, which
ignores the theme and reads as unstyled against the rest of the surface. Style
it from theme tokens so it matches the app in both light and dark.

## Context

The desktop filter columns scroll independently inside the filter drawer, so
their scrollbars sit directly on a themed surface and are the most visible
case. The mobile filter lists scroll too and should follow the same rule
rather than getting their own treatment.

## Current State

Partially done. The shared `.themed-scrollbar` class already exists in
`src/styles/scrollbar.css`, imported globally from `src/styles/index.css`, and
styles the track, thumb, and thumb hover from tokens. It is applied on mobile,
to the filter option list in `MobileFilterList.tsx` and the applied-chip row in
`MobileNameFilters.tsx`.

What remains is desktop, which is the case this ticket was written for. The
filter option list in `FilterPicker.tsx` sets `overflow: auto` in
`FilterPicker.css` but does not carry the class, so it still renders the
browser default.

The mobile filter accordions named in the original requirements no longer
exist; the mobile drawer was rebuilt as a list during ticket `[043]`.

## Requirements

- Style the scrollbar track, thumb, and thumb hover state in the filter lists.
- Use semantic theme tokens only. No hex, rgb, hsl, named colors, or alpha
  literals.
- If no suitable token exists for the track or thumb, propose adding one rather
  than hardcoding a value.
- Keep the styling owned by the component that owns the scroll container.
- Apply the same treatment to the mobile filter accordion scroll areas.
- Cover both light and dark themes.
- Do not change scroll behavior, list height, or which lists scroll.

## Acceptance Criteria

- The filter list scrollbars read as part of the app in both themes.
- No hardcoded colors are introduced.
- Scroll position, height, and overflow behavior are unchanged.
- Mobile and desktop filter scroll areas look consistent with each other.
