# Show Compare History And Results

## Goal

Present compare history and result states for the compare names flow.

## Requirements

- Show past comparisons or vote history.
- Present result/completion states when the comparison flow has enough data.
- Keep history/results readable after multiple votes.
- Preserve the selected-name pair voting and rankings behavior.

## Likely Implementation Areas

- `src/pages/CompareNames.tsx`
- Compare names page styling.
- Existing compare API client methods.

## Out Of Scope

- Initial compare page layout if not already complete.
- Initial selected-name pair voting if not already complete.
- Backend changes unless an existing endpoint contract is missing.
