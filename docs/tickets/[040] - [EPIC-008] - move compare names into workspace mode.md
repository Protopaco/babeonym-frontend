# Move Compare Names Into Workspace Mode

## Requirements Reference

- `docs/application-requirements.md`

## Goal

Move compare voting into the unified name workspace as an internal mode instead of a standalone page.

## Context

Compare names is part of the same approved-name loop as the name list and rankings. Users should be able to compare names without leaving the main workspace context.

## Scope

- Add a `Compare Names` workspace mode.
- Reuse existing compare pair selection behavior.
- Reuse existing optimistic vote behavior.
- Show compare voting in the top workspace panel.
- Remove redundant return-to-list behavior from the compare flow.
- Preserve ranked-list updates from the approved-name provider.
- Keep compare styling owned by compare components.

## Acceptance Criteria

- Users can switch to `Compare Names` from the unified workspace.
- Voting still advances to a new random pair.
- Votes are still sent optimistically.
- Users remain on the main workspace while comparing names.
- The old standalone compare-page behavior is no longer required for normal navigation.
- No parent/page CSS styles compare component internals.
- Every new or modified `.tsx` component has a sibling `.css` file.

## Notes

- Styling polish and animation improvements can remain separate.
- SSE/live ranking updates remain a separate ticket.
