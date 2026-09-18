# [116] Undo name removal with a snackbar

## Status

Backlog

## Summary

Removing a name is one click from the chip's drawer, with no confirmation. Show
"Rocco removed. Undo" after a removal, and let Undo put the name back on the
list.

## Context

- Removal is `rejectCandidate(givenCustomNameBridgeId)`, fired straight from
  `ListNameChip`'s delete action.
- The delete tooltip says "Takes it off your list for good" — that copy is wrong
  once undo exists.
- This is the app's first snackbar. Feedback has otherwise lived in the UI rather
  than a toast layer. That rule is deliberately broken here: a removed name has
  no place in the UI left to show a message.

## Open

- **Does Undo restore the name's rank, or append it to the bottom?** Re-approving
  likely appends. Restoring position probably needs the backend.
- How long the snackbar stays, and what happens when a second name is removed
  while it's showing.

## Acceptance Criteria

- Removing a name shows "<Name> removed. Undo".
- Undo returns the name to the list.
- The delete tooltip no longer says "for good".
