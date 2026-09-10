# [080] - Define Tablet Styling

## Status

Backlog

## Summary

Decide what each surface does between 600px and 899px, and implement it. Today
almost everything jumps straight from the mobile layout to the desktop one at
600.

## Context

[072] established the three tiers and gave CSS named queries for them. It
deliberately changed no rendering, so `@media (--tablet)` is defined and unused.

Exactly one surface has any tablet behaviour: `WorkspaceFilterLayout` halves its
filter columns from four to two below 900. Everything else treats 600 as the
only seam, which means a 700px viewport gets the full desktop layout — desktop
column widths, desktop type, the 135px icon buttons — in a space that was never
designed for it.

The style guide has a tablet tier and a tablet type scale (H1 70, H2 55, H3 32,
B1 20), and `typography.theme.ts` already implements it, so type is the one
thing that does adapt. Layout does not.

There is also a tablet layout PDF in `docs/`, though the app has drifted from the
design docs and it should be treated as a reference rather than a spec.

## Requirements

- Each surface has a deliberate decision for 600-899, even if the decision is
  that the desktop layout is fine.
- The generator's icon buttons fit alongside the name without crowding.
- The workspace column, which is capped at `--width-workspace-column`, behaves
  sensibly when the viewport is narrower than the cap.
- The filter surface works at tablet width, including its two-column form.
- Compare Names fits its pair side by side, or stacks deliberately.
- Your Names picks a column count suited to the width.
- Nothing below 600 or at or above 900 changes.

## Open Questions

- Whether tablet is closer to desktop or closer to mobile as a starting point.
  The filter surface currently treats it as a narrower desktop; the generator
  arguably wants the mobile treatment.
- Whether tablet gets the desktop header or the mobile one. The header currently
  swaps at 600, so tablet gets the desktop two-tier header today.
- Whether the icon buttons need a third size between the 135px desktop and the
  96px mobile variants.
- Whether the existing `--below-desktop` query in `WorkspaceFilterLayout` should
  be re-expressed once tablet is deliberate.

## Implementation Notes

- Named queries from [072]: `--mobile`, `--tablet`, `--desktop`,
  `--below-desktop`, defined in `src/styles/breakpoints.css`.
- `--tablet` and `--desktop` are currently unused. If this ticket is not going
  to be built, they should be removed rather than left as decoration.
- `PrimaryButton.css` sizes the icon buttons and currently has only a mobile
  override.
- `NameWorkspace.css` caps the shared column at 1200px, above the tablet range,
  so the column is fluid throughout tablet.
- `docs/BabeOnym - Tablet Light Mode Layout.pdf` is the design reference.

## Dependencies

- [079] reviews mobile. Doing that first means tablet decisions are made against
  a mobile layout that is known good rather than one still being corrected.

## Acceptance Criteria

- Every surface has a stated tablet behaviour.
- The app is usable and uncrowded across 600-899.
- Mobile and desktop render identically to before.
- No breakpoint pixel literals are introduced.

## Out Of Scope

- Mobile fixes, which are [079].
- Changing what any screen does.
- Reconciling the app with the design PDFs generally.
