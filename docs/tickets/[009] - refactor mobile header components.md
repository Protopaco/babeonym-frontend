# Refactor mobile header components

Split mobile header/menu concerns out of the current `TopBar` first-pass implementation.

Current issue:
- Desktop top bar, mobile top bar, and mobile nav overlay now live together in `TopBar`.
- This was acceptable for the first mobile shell mock, but it should not be the long-term component boundary.

Potential direction:
- `DesktopTopBar`
- `MobileTopBar`
- `MobileNavOverlay`
- Or similarly named components that better match the app's existing component conventions.

Constraints:
- Preserve the current first-pass mobile behavior.
- Keep desktop header behavior unchanged.
- Do not introduce a new styling pattern without discussion.
