# Add Tutorial Enabled State

## Goal

Add shared state for whether tutorial/help mode is enabled.

## Notes

- The helper icon should control this state.
- A name like `tutorialEnabled` is reasonable, but final naming should match surrounding state patterns.
- This state should be accessible to tooltip components across the app.
- It may belong in a small provider/context or in an existing top-level state location.

## Likely Implementation Areas

- Shared tutorial/help state.
- App layout or provider composition.
- Floating helper icon click behavior.

## Constraints

- Keep the state small and focused.
- Do not introduce a broad state-management pattern.
- Preserve existing page behavior when tutorial mode is off.
