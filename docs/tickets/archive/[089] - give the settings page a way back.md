# [089] - Give The Settings Page A Way Back

## Status

Backlog

## Summary

There is no visible way to leave `/settings`. The wordmark in the header is a
home link, but nothing says so, and on mobile it reads as branding.

## Context

Settings is reached from the gear in the header — on mobile since the hamburger
was deleted, on desktop from the top bar. Once there, the only ways out are the
wordmark, which does not look like a control, or the browser's own back.

The header was considered as the place to fix this and rejected. A back arrow in
the icon group wedges it between account and tutorial; moving it to the left slot
makes the header route-aware, which it is not today and does not otherwise need
to be. The page has room and can own its own way out.

## Requirements

- A visible way back to the workspace from `/settings`.
- It lives on the page, not in the header. No route-aware header chrome.
- Works on both breakpoints.

## Open Questions

- Back arrow or a close X. Back is the convention for a page navigated into; X
  reads as dismissing something modal, and settings is a route.
- Whether it sits in `SectionHeader`'s `action` slot beside the title, or above
  the title as a row of its own.
- Whether it navigates to `/` or uses history. History is the truer back, but
  lands somewhere unexpected when `/settings` was opened directly.

## Implementation Notes

- `SectionHeader` already takes a `title` and an `action` — that is how
  `WorkspaceModeHeader` puts two controls on one line. Reusing that slot means
  no new layout.
- `src/pages/Settings.tsx` renders `<SectionHeader title="Settings" />`.
- Whatever is chosen should apply to any later page reached the same way, so it
  is a pattern rather than a one-off. See [090].

## Acceptance Criteria

- `/settings` has an obvious control that returns to the workspace.
- The header renders identically on every route.

## Out Of Scope

- Changing the header, the gear, or how Settings is reached.
