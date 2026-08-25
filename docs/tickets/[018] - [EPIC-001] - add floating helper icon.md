# Add Floating Helper Icon

## Goal

Introduce the reusable helper/tutorial icon so it can hover above app content independently of any one page.

## Notes

- This is the first visible piece of `EPIC-001`.
- The icon should be its own component.
- It should sit outside individual page layouts so it can eventually appear across the app.
- It should layer above page content without disrupting header, drawer, or main page layout.
- Desktop, tablet, and mobile placement may need different positioning.

## Likely Implementation Areas

- Shared/helper component folder.
- App layout or a similar top-level shell location.
- Component CSS using theme variables.

## Constraints

- Use theme variables only for color.
- Do not tie the icon to the name generator page specifically.
- Do not implement full tooltip behavior in this ticket.
