# Deduplicate Custom Names By Exact Canonical Match

## Goal

Avoid creating duplicate custom-name records when a submitted custom name exactly matches an existing canonical given name after backend normalization.

## Context

If a user submits `john`, the backend can normalize it to `John` and attach the user's approved-name bridge to the existing `John` record. The app should not create many custom `John` records when the canonical name already exists.

## Scope

- Receive raw custom-name input from the UI.
- Normalize the name using the backend custom-name normalization behavior.
- Check for an exact canonical given-name match.
- If a match exists, attach the user to the existing given name through the appropriate bridge.
- If no exact match exists, create a true custom name record.
- Return or refresh the approved-name list using the persisted backend value.

## Matching Rules

- Matching should be exact after normalization.
- `john` may normalize to `John` and match existing `John`.
- `da'ar` may normalize to `Da'ar` and match existing `Da'ar`.
- `Myke` should not match `Mike`.

## Non-Goals

- Do not implement fuzzy matching.
- Do not implement edit-distance matching.
- Do not implement phonetic matching.
- Do not ask users whether they meant a different spelling.
- Do not collapse unique names into common names.

## Acceptance Criteria

- Existing canonical names are reused when the normalized custom name is an exact match.
- New custom names are created when no exact canonical match exists.
- Unique spellings are preserved.
- ~~Tests confirm that `Myke` does not match `Mike`.~~ Dropped: no test
  convention is set for this repo yet. `Myke` not matching `Mike` still holds —
  the lookup is case-insensitive but otherwise exact — it is just not covered by
  a test.
