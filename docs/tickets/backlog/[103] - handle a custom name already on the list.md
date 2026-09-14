# [103] - Handle A Custom Name Already On The List

## Status

Backlog

## Summary

Catch a custom name that is already on the list before it is sent to the
server, and say so inline on the draft, the same way a name with inappropriate
language is refused.

## Context

- **The draft always goes to the server.** `useCustomNameDraftChip` calls
  `addCustomGivenName` for any non-empty name and never checks the approved
  list it already has.
- **The server treats a duplicate as a no-op.** `add_custom_given_name` (007)
  matches canonical names case-insensitively and upserts the state to
  `approved`, so re-entering "john" when John is listed changes nothing and
  returns 200. The draft simply closes, with no sign the name was already there.
- **At the limit it reads as a refusal.** The route checks the 99-name cap
  before the write, so re-entering a listed name on a full list returns 400,
  and `getCustomNameErrorMessage` shows "That name can't be used."

## Open Questions

- Whether the match mirrors the server's (case-insensitive, otherwise exact).
- Whether the upsert moves the name's position or `date_updated` matters
  anywhere.

## Implementation Notes

- **Same path as the profanity refusal.** The draft stays open with its text,
  the message shows in the draft's error line, focus returns to the input, and
  typing clears it.
- Feedback goes in the UI, not a snackbar.

## Out Of Scope

- The 400 copy for hitting the name limit.
