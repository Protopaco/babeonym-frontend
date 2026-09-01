# [059] - [EPIC-008] - Align Add Name Button With Other Buttons

## Goal

Adjust the custom-name Add Name button placement so it lines up cleanly with the approved-name buttons.

## User Story

As a user, I want the custom-name Add Name action to align with the name buttons so the approved names area feels intentional and easy to scan.

## Requirements

- Align the custom-name Add Name button with the approved-name buttons.
- Preserve existing Add Name behavior.
- Preserve existing custom-name draft behavior.
- Keep button visual styling owned by the button/component.
- Keep parent styles limited to placement and layout.
- Do not redesign the broader workspace controls in this ticket.

## Implementation Notes

- Prefer existing button components and variants before adding new styling.
- Use theme tokens for any styling changes.

## Acceptance Criteria

- The custom-name Add Name button is visually aligned with the approved-name buttons.
- Existing Add Name interactions still work.
- No unrelated workspace layout or filter behavior changes.
