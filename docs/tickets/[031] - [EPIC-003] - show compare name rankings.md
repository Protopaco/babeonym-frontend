# Show Compare Name Rankings

## Goal

Display name rankings for the compare names flow.

## Requirements

- Show ranked or remaining saved names in the compare page.
- Reflect vote outcomes/current ordering where the existing data path supports it.
- Use existing saved-name chip language where appropriate.
- Keep rankings readable as the saved-name set grows.

## Likely Implementation Areas

- `src/pages/CompareNames.tsx`
- Compare names page styling.
- Existing given-name state/provider data.
- Existing compare API client methods.

## Out Of Scope

- Selected-name pair voting interaction if not already complete.
- Full history/result presentation.
- Backend changes unless an existing endpoint contract is missing.
