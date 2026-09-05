# [076] - Restrict Custom Name Input Characters

## Status

Backlog

## Summary

Stop a custom name containing digits or arbitrary punctuation from being entered
in the first place, so the user finds out while typing rather than on save.

## Context

[045] covers normalizing a custom name on the backend before it is stored —
trimming, casing, preserving intentional spelling. That is about what gets
persisted. This ticket is the other half: what the input accepts as you type.

`useCustomNameDraftChip` currently governs the draft chip's value and its
`errorMessage`, and `CustomNameChip` renders the invalid state. The rules for
what a name may contain are not stated anywhere.

## Requirements

- Letters are allowed.
- Apostrophe `'` and hyphen `-` are allowed.
- Digits are not allowed.
- No other punctuation or symbols are allowed.
- Leading and trailing whitespace is not allowed in the committed value.
- The user is told what is wrong, in the existing error affordance, rather than
  having input silently dropped.
- Whatever this rejects stays consistent with what [045] accepts, so a name that
  passes here is never rewritten unrecognisably by the backend.

## Open Questions

- Whether a disallowed character is blocked as it is typed, or accepted and
  flagged as an error until corrected. Blocking is less surprising for a digit
  and more surprising for a paste.
- Whether internal whitespace is allowed at all — some names are two words.
- Whether accented and non-Latin letters count as letters. They should, but the
  check has to be written to allow them rather than matching `a-z`.
- Where the rule lives so both the input and any future caller share it.

## Implementation Notes

- `src/components/NameWorkspace/WorkspaceApprovedNames/useCustomNameDraftChip.ts`
  owns the draft value and the error message.
- `CustomNameChip` already has an `invalid` state and renders `errorMessage`,
  so the affordance exists.
- The backend counterpart is [045].

## Acceptance Criteria

- A digit cannot end up in a saved custom name.
- `'` and `-` survive.
- The user sees why input was refused.
- Accented letters are not treated as invalid.

## Out Of Scope

- Backend normalization, which is [045].
- Duplicate detection, which is [046].
- Any change to how custom names are saved or listed.
