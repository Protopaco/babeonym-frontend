# [078] - Drag To Rerank The Name List

## Status

Backlog

## Summary

Let the user drag a name to a new position in Your Names, so the ranking can be
adjusted directly instead of only through comparisons.

## Context

The list is ordered by `rating`, sorted in `WorkspaceApprovedNamesList` and
numbered by the sorted index. Rating is currently produced by voting in Compare
Names; there is no way to say "this one is second" without voting your way
there.

The list is already a `LayoutGroup` with `motion` items carrying `layout`, so
reordering animates on its own once the underlying order changes.

## Requirements

- A name can be dragged to a new position in the list.
- The new order survives a reload, so it is persisted rather than local.
- The displayed position numbers update to match.
- The list keeps working with the delete drawer and the add-name draft chip,
  neither of which should be draggable.
- Reduced motion is respected.
- Touch as well as pointer.

## Open Questions

- **What dragging does to `rating`, and whether it should.** Rating is the
  output of comparison votes. A manual reorder either has to rewrite ratings to
  fit the new order, or the list needs a separate manual-order field that takes
  precedence, or the two need reconciling some other way. This is the real
  decision in the ticket and it is a backend one as much as a frontend one.
- Whether a manual reorder is sticky — does a later compare vote move the name
  again, or is a manually placed name pinned?
- Whether the list stays a three-column wrap. Dragging within a wrapping
  multi-column list is materially harder than within a single column, and the
  drop target is more ambiguous.
- Whether this needs a drag handle or the whole chip is the grip. The chip is
  currently a plain element with a hover-revealed delete action.
- Whether `motion`'s own drag support is enough or this needs a dedicated
  library.

## Implementation Notes

- `src/components/NameWorkspace/WorkspaceApprovedNames/WorkspaceApprovedNamesList.tsx`
  sorts by rating and owns the `LayoutGroup`.
- `ListNameChip` is the draggable unit and already carries `layout` plus its own
  enter and exit animations.
- `WorkspaceAddNameItem` and `WorkspaceCustomNameDraftItem` sit in the same list
  and must be excluded.
- Persisting an order needs a backend change; nothing today accepts an explicit
  rank.

## Acceptance Criteria

- A name can be moved and stays where it was put after a reload.
- Position numbers stay correct.
- The add-name affordance and the draft chip cannot be dragged.
- Deleting still works.

## Out Of Scope

- Changing how comparison voting computes rating, beyond whatever the open
  question above forces.
- Multi-select or bulk reordering.
