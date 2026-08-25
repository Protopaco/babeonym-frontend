# Design Mobile Tutorial Presentation

## Goal

Define and implement a mobile-specific tutorial presentation pattern.

## Notes

- Mobile does not have hover, so desktop tooltip behavior will not translate directly.
- Avoid tap-to-tooltip behavior on controls where tapping already performs an action.
- Persistent tutorial hints, coach marks, or a lightweight guided overlay may be better fits.
- This should build on the desktop tooltip pattern after the first home-page tooltips exist.

## Likely Implementation Areas

- Tutorial tooltip system.
- Mobile name generator layout.
- Mobile filter drawer/sheet.
- Floating helper icon behavior.

## Constraints

- Do not rely blindly on default MUI touch tooltip behavior.
- Keep mobile tutorial behavior deliberate and easy to dismiss.
- Preserve the core mobile name-generation flow.
