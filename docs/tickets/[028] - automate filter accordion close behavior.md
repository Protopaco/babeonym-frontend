# Automate Filter Accordion Close Behavior

## Goal

Make filter accordion close behavior automated in the same way accordion open behavior is automated.

## Notes

- Current accordion open behavior is controlled/automated.
- Close behavior should follow the same state-management pattern rather than relying on disconnected local/default behavior.
- This should apply wherever the shared filter accordion behavior is used, including desktop and mobile drawers if they share the same components.
- Preserve explicit collapse behavior such as `Collapse All`.

## Likely Implementation Areas

- Filter accordion state handling.
- Desktop filter drawer.
- Mobile filter drawer.
- Shared filter accordion components.

## Constraints

- Keep the change behavioral, not visual.
- Do not redesign the filter drawer or accordion components.
- Preserve existing selected filter behavior.
