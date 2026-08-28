# [037] - Consolidate approved name workflows into list page

## Summary

Consolidate approved-name workflows into a single `/list` workspace so saved names, rankings, compare voting, and custom-name creation live together instead of spreading similar UI across multiple pages.

## Product Direction

The app should have a clearer responsibility split:

- Name Generator handles individual generated candidate names.
- Your Names handles approved names.

`Name Generator` should remain focused on evaluating one generated name at a time with approve, snooze, reject, filters, and tutorial support.

`Your Names` should become the approved-name workspace for saved names, rankings, comparison voting, custom name creation, deletion, and future approved-name workflows.

## Problem

The Your Names list, Compare Names page, and future Custom Name page are achingly similar:

- each centers on the approved name list
- each manipulates or depends on approved names
- each needs similar layout, navigation, and list/ranking state

Keeping them as separate pages creates duplicated UI and unnecessary navigation friction.

## Proposed Approach

Make `/list` the single approved-name workspace.

Recommended layout direction:

- Keep `Your Names` as the page title.
- Keep the approved-name list/rankings visible as the persistent workspace context.
- Add a swappable panel or mode area for approved-name tasks:
  - compare names
  - add custom name
  - future approved-name actions
- Use URL-backed mode if helpful:
  - `/list`
  - `/list?mode=compare`
  - `/list?mode=add`

The standalone `/compare` route should become transitional:

- either redirect to `/list?mode=compare`
- or remain temporarily while the app migrates, then be removed from navigation

## Scope

- Refactor Compare Names from a standalone page into a panel/section inside the Your Names workspace.
- Plan for Custom Name creation as another panel/section inside the same workspace.
- Preserve approved-name list/ranking behavior.
- Preserve compare voting behavior.
- Remove or replace redundant "Return to List" navigation because the user is already in the approved-name workspace.
- Keep component styling owned by components.
- Use theme tokens for all colors and shadows.

## Acceptance Criteria

- `/list` is the central page for approved-name workflows.
- Users can see their approved names/rankings while using approved-name actions.
- Compare Names can be accessed from the Your Names workspace without leaving the approved-name context.
- Custom-name creation has a clear place in the same workspace, even if implemented in a later ticket.
- The Name Generator page remains focused on individual candidate evaluation.
- Existing compare vote behavior is preserved.
- Existing approved-name list behavior is preserved.
- No parent/page CSS styles child component internals.
- Every new or modified `.tsx` component has a sibling `.css` file.

## Notes

- This ticket is primarily a structural/product refactor.
- Styling polish can be handled separately after the workspace structure is settled.
- SSE/live approved-name updates remain a separate ticket.
