# Convert mobile filters to drawer or sheet

The current mobile filters render inline below the name generator as a first mobile layout mock.

This looks promising, but it is probably not the final interaction model. Explore converting mobile filters into a drawer or sheet.

Notes:
- Preserve the light-purple filter surface.
- Reuse the existing accordion/filter behavior where possible.
- Keep the hamburger menu navigation-only unless we intentionally change that.
- Decide where the filter trigger belongs: near the generator actions, below the name, or in the mobile header.
- Make sure the mobile filter interaction does not disrupt the desktop permanent drawer.
