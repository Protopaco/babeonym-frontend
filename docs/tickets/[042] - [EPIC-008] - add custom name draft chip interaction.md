# Add Custom Name Draft Chip Interaction

## Goal

Allow users to manually add a custom name directly from the approved-name list area.

## Context

Custom names should feel attached to the list the user is building. A visible `+` affordance near the ranked list is more intuitive than hiding custom-name entry inside the generated-name display.

## Scope

- Add a `+` affordance in the approved-name list area.
- When clicked, create an inline draft chip.
- Put a focused text field inside the draft chip.
- Add a save affordance using the same interaction family as the existing delete slider.
- Use a distinct semantic styling treatment for save.
- Remove the draft chip if the user cancels or leaves it empty.
- Submit the custom name through the existing custom-name API path if available.

## Acceptance Criteria

- Users can start adding a custom name from the list area.
- A draft chip appears inline with the approved-name chips.
- The draft chip owns its own visual styling.
- The save affordance uses the chip action pattern and is visually distinct from delete.
- Empty custom names are not saved.
- Successful custom names appear in the approved-name list.

## Notes

- Do not implement hidden click-to-edit generated names as part of this ticket.
- Generated-name editing may be considered later as a power-user enhancement.
