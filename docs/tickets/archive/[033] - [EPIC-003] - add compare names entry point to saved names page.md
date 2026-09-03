# Add Compare Names Entry Point To Saved Names Page

## Goal

Add a clear entry point from the `Your Names` page into the compare names flow.

## Requirements

- Add a `Compare Names` button or link on the saved names page.
- Route the entry point to `/compare`.
- Only show or enable the entry point when there are enough saved names to compare.
- Preserve the existing saved names list behavior.

## Likely Implementation Areas

- `src/components/NameList/NameList.tsx`
- `src/components/NameList/NameList.css`
- Existing shared button/link patterns.

## Out Of Scope

- Compare page voting behavior.
- Name ranking logic.
- Compare history/results presentation.
- Backend changes.
