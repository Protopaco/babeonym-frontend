# [113] Etymology modal can open empty on mobile

## Status

Backlog

## Summary

Observed in testing: a name with real etymology — Adrienne among them — opened an
empty modal on mobile, while the same name showed its metadata on desktop. Same
name, same data, different result by device.

## Context

Not reproduced by reading the code. This section records what has already been
ruled out, so the next pass does not repeat it.

Ruled out:

1. **A cultures-only etymology.** The first theory, and wrong: the reported names
   do have meanings and languages, and they render on desktop.
2. **`reuseUnchangedGivenNames` discarding etymology.** It compares etymology
   explicitly, by JSON, at `reuseUnchangedGivenNames.ts:23`.
3. **`@media (--mobile)` never applying.** Custom media is correctly wired —
   `postcss-global-data` plus `postcss-custom-media` in `vite.config.ts:16`,
   defined in `src/styles/breakpoints.css`. The 31 files using it work.
4. **Etymology being lost building state client-side.** Every `ADD_APPROVED`
   payload is the server's `response.approvedGivenNames`; nothing constructs a
   `GivenName` locally.
5. **A parent stylesheet hiding etymology at mobile widths.** No parent styles it.
   The only match in `WorkspaceApprovedNamesList.css` is a comment, and the sole
   mobile rule in `NameEtymologyModal.css` changes the language column basis from
   three to two.

## Open

- **Was the mobile session the deployed build and the desktop one local?** If so
  the likeliest answer is a bundle predating the etymology work, and this is not
  a bug. Settle this before investigating further.
- If both were the same build: was the modal chrome — title and "Got it" —
  present around an empty body, or was the whole dialog blank? The first points
  at the data arriving empty, the second at a render failure.
- Which surface: the generator's info button, or a name in the approved list.

## Out Of Scope

- [112]. Its gate is about names that legitimately have little to show; this is a
  name that has plenty and shows none of it.

## Acceptance Criteria

- The cause is identified rather than worked around.
- A name with etymology renders the same content on mobile as on desktop.
