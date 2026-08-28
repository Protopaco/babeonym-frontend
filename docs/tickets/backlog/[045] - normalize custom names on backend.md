# Normalize Custom Names On Backend

## Goal

Normalize custom given-name input on the backend before persistence or lookup, while preserving user intent.

## Context

The UI should send the custom name exactly as entered. Name cleanup should live in the backend controller/service so every client gets consistent behavior.

## Scope

- Trim leading and trailing whitespace.
- Normalize obvious casing issues.
- Preserve punctuation and user-provided spelling.
- Run validation/content checks as part of the backend custom-name flow.
- Use the normalized display value for persistence and exact lookup.

## Examples

- `da'ar` -> `Da'ar`
- `o'Donnel` -> `O'Donnel`
- `O'Donnel` remains `O'Donnel`
- `Myke` remains `Myke`

## Non-Goals

- Do not implement fuzzy matching.
- Do not implement phonetic matching.
- Do not suggest alternative spellings.
- Do not strip meaningful punctuation.
- Do not infer culture or language from the submitted custom name.

## Acceptance Criteria

- Custom-name normalization happens in the backend.
- The UI can continue sending raw user input.
- Normalized names preserve intentional spelling and punctuation.
- Unit tests cover casing, apostrophes, existing correct casing, and unique spellings.
