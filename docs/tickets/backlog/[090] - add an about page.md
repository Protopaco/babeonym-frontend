# [090] - Add An About Page

## Status

Backlog

## Summary

The app is a portfolio piece and says nothing about who built it or why. It
needs an about page, and eventually a link out to the portfolio site.

## Context

There is no page describing the project. A reviewer looking at this app has no
route from it to anything else of Paul's.

A footer was considered and rejected: mobile has a filter drawer fixed to the
bottom of the viewport, so a footer either fights it or exists on desktop only.
A page also gives room for what a reviewer actually wants — what the app is, what
it is built with, who made it — where a footer link gives one line.

Settings is where someone poking around expects to find it, so that is the entry
point rather than new header chrome.

## Requirements

- An `/about` route.
- Reachable from Settings.
- Copy covering what Babeonym is and who built it.
- A place for an outbound portfolio link, which does not exist yet.
- A way back, matching whatever [089] settles on.

## Open Questions

- What the copy says, and how much of it is about the app versus the build. This
  is writing, not implementation.
- Whether the tech stack is listed. It is the part a portfolio reviewer wants and
  the part a user does not.
- Whether the portfolio link ships disabled, absent, or pointing at a
  placeholder until the site exists.
- Whether Settings links to it as a row, or something lighter.

## Implementation Notes

- Routes live in `src/router.tsx`, as children of the `AppLayout` route — the
  same level as `settings`, `theme` and `error`.
- `src/pages/Settings.tsx` composes `SettingsRow` entries; a link row would be a
  new variant rather than a reuse, since that component is an editable field.
- [089] decides the way back; this page should use the same one.

## Acceptance Criteria

- `/about` exists, is reachable from Settings, and can be left again.
- Copy is written, not placeholder.
- Adding the portfolio URL later is a one-line change.

## Out Of Scope

- Building the portfolio site.
- A footer, on either breakpoint.
