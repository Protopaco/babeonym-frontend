# [047] - [EPIC-008] - Align Unified Workspace Page Layout

## Status

Open

## Epic

[EPIC-008] - Unified Name Workspace

## Context

The unified workspace is starting to pull Add Name, Compare Names, and Your Names into one user loop, but the current page layout still carries older page assumptions:

- Name Generator still behaves like a full-page view.
- The generated-name area is visually shifted because of old filter drawer spacing.
- The approved names list is pushed far enough down that users have to scroll to see the current names.
- The `Your Names` label should use the same subsection/header treatment as the rest of the form.

This ticket should clean up the high-level workspace layout before the filter drawer is redesigned in ticket 043.

## Goal

Make the Name workspace feel like one cohesive page where the active interaction area and the approved names list are visible, aligned, and visually consistent.

## Scope

- Reduce the Name Generator / Name Evaluator vertical footprint inside the unified workspace.
- Remove or neutralize the old filter drawer offset affecting the generated-name area while the old drawer is disabled.
- Keep the active mode section and `Your Names` section visually connected on the same page.
- Update the workspace `Your Names` label to use the same subsection/header style as the rest of the form.
- Preserve current Add Name, Compare Names, and approved-name list behavior.

## Out Of Scope

- Redesigning the filter drawer.
- Implementing the new filter summary/drawer behavior.
- Changing approved-name ranking behavior.
- Changing custom-name save/cancel behavior.
- Changing route behavior.
- API changes.

## Acceptance Criteria

- On desktop, the generated-name interaction no longer consumes the full page height.
- On desktop, the generated-name interaction is not pushed right by stale drawer spacing.
- On desktop, users can see the active interaction area and the start of the `Your Names` section without unnecessary scrolling.
- `Your Names` uses the shared subsection/header styling pattern used elsewhere in the app.
- Component styling ownership remains clean:
  - Workspace owns section placement and spacing.
  - Name Generator / Name Evaluator owns generated-name visual styling.
  - Workspace Approved Names owns its own header and list styling.
- No child component internals are styled from parent CSS.
- No hardcoded colors are introduced.
- Every touched `.tsx` component continues to have a sibling `.css` file.

## Notes

- This ticket is intentionally separate from ticket 043 so the layout can be stabilized before filter behavior is redesigned.
- The old drawer CSS should not continue to affect the workspace while the filter drawer is disabled.
