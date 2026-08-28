# Move Approved Name Rankings Into Persistent Workspace List

## Requirements Reference

- `docs/application-requirements.md`

## Goal

Make approved-name rankings the persistent list section in the unified workspace.

## Context

The approved-name list is the thing users are building. It should remain visible below the active workspace mode so approvals, comparisons, manual additions, and future drag interactions all point back to the same artifact.

## Scope

- Place ranked approved names below the active workspace mode.
- Reuse the approved-name chip component for visual consistency.
- Keep ranking numbers subtle.
- Do not expose internal score/rating values.
- Ensure the list can update from generated-name approval and compare vote results.
- Preserve empty and loading states.

## Acceptance Criteria

- Approved names appear as a persistent ranked list in the unified workspace.
- Rankings are visible below both `Add Name` and `Compare Names` modes.
- The list uses approved-name chips.
- Internal rating/score values are not displayed.
- Empty and loading states still work.
- Component styling is owned by list/ranking components.

## Notes

- Future drag-to-rerank behavior is out of scope.
- Backend ranking math remains the source of truth.
