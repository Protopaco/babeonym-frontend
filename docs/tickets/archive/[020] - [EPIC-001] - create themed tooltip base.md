# Create Themed Tooltip Base

## Goal

Create the base BabeOnym tooltip component and styling.

## Notes

- This ticket defines what a tooltip looks like.
- Tooltip styling should feel on-theme and work in light mode first.
- It should be reusable across pages and components.
- It should account for hover, focus, and tutorial-enabled display behavior where appropriate.

## Likely Implementation Areas

- Shared tooltip component folder.
- Component CSS using theme variables.
- MUI tooltip/popover primitives if they fit cleanly.

## Constraints

- Use theme variables only for color.
- Do not hard-code tooltip placement into individual use cases.
- Keep the component flexible enough for future page-level usage.
