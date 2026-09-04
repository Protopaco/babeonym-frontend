# Polish Compare Voting Interaction

## Goal

Make the compare voting loop feel intentional, playful, and satisfying after the functional interaction is in place.

## Requirements

- Restyle the comparison pair so it no longer feels like default utility cards.
- Improve the `OR` comparison treatment.
- Preserve the optimistic vote behavior.
- Keep the interaction responsive on desktop and mobile.

## Likely Implementation Areas

- `src/pages/CompareNames.css`
- `src/components/CompareNames/CompareNameButton.tsx`
- `src/components/CompareNames/CompareNamesContent.tsx`
- Compare page animation/state if needed.

## Out Of Scope

- Vote transition animation, which is ticket `[063]`.
- Name ranking logic.
- Compare history/results presentation.
- Backend changes.
- Changing the random pair selection behavior.
