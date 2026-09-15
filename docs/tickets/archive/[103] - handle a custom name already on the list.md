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

## Findings

- **Refused on the client.** `useCustomNameDraftChip` checks the approved
  list before calling `addCustomGivenName`. A match keeps the draft open with
  its text, shows "That name is already on your list." in the error line, and
  returns focus to the input. Typing clears it, as with the profanity refusal.
- **Accepted without a write on the server.** `postCustomGivenName` reads the
  approved list once. When the normalized name is already on it, the route
  returns 200 with the current list and skips `add_custom_given_name`. This
  catches requests that skip the client, such as a stale tab or a direct call.
- **Checked ahead of the limit.** A listed name re-entered on a full list now
  gets a quiet 200 rather than the 400 that read as "That name can't be used."
- **Matching.** Both sides trim and then compare case-insensitively, mirroring
  the canonical lookup in 007. This also closes a gap: custom names were
  matched case-sensitively in the database, so "MYKE" alongside "Myke" used to
  add a second entry.
- **Position and `date_updated`.** Moot. A duplicate no longer reaches the
  upsert, so neither is touched.
- **No contract change.** The response shape is unchanged, and the OpenAPI
  spec and client did not need regenerating.

## Implementation Notes

- **Same path as the profanity refusal.** The draft stays open with its text,
  the message shows in the draft's error line, focus returns to the input, and
  typing clears it.
- Feedback goes in the UI, not a snackbar.

## Out Of Scope

- The 400 copy for hitting the name limit.
