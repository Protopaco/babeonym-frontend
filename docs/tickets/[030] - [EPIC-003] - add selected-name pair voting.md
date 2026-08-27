# Add Selected-Name Pair Voting

## Goal

Add the active selected-name pair display and voting interaction for the compare names flow.

## Requirements

- Display the active pair of saved names.
- Include the `OR` comparison treatment from the design references.
- Add vote controls/interactions for choosing between the two names.
- Handle no saved names or insufficient saved names states if the layout ticket does not already cover them.
- Use the existing compare API/data path if available.

## Likely Implementation Areas

- `src/pages/CompareNames.tsx`
- Compare names page styling.
- Existing given-name state/provider data.
- Existing compare API client methods.

## Out Of Scope

- Full ranking presentation.
- Full comparison history/results presentation.
- Backend changes unless an existing endpoint contract is missing.
