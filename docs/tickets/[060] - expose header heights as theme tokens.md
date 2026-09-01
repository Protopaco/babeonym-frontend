# [060] - Expose header heights as theme tokens

## Summary

Record both the desktop and mobile header heights as semantic theme tokens, and consume those tokens everywhere the header height is referenced.

## Context

The desktop header height is already tokenized as `--height-header` (`124px`) in `src/themes/palette.theme.ts`. The mobile header height has no token — it is written as a literal `96px` in every place that needs it.

That means the mobile header height is defined in one component and silently duplicated by the layouts and pages that must subtract or offset by it. Changing the mobile header requires finding and editing every copy, and a missed copy produces a layout that is off by exactly the header height.

Current mobile header height references:

- `src/components/Header/TopBar/MobileTopBar.css:12` — `height: 96px` (the de facto definition)
- `src/AppLayout.css:10` — `padding-top: 96px`
- `src/pages/NameWorkspace.css:8` — `min-height: calc(100vh - 96px)`
- `src/pages/ErrorPage.css:28` — `min-height: calc(100vh - 96px)`

Note that other `96px` values exist in the codebase (button sizing, min-widths, bottom padding) that are unrelated to the header and must not be swept into this change.

## Scope

- Add a semantic token for the mobile header height alongside `--height-header` in `src/themes/palette.theme.ts`.
- Replace the four header-height literals listed above with the token.
- Leave unrelated `96px` values untouched.
- Do not change any rendered layout or spacing — this is a refactor, not a visual change.

## Acceptance Criteria

- A mobile header height token is defined in the theme and available as a CSS variable.
- `MobileTopBar.css`, `AppLayout.css`, `NameWorkspace.css`, and `ErrorPage.css` reference the token instead of a literal.
- No hardcoded header height values remain in component or page CSS.
- Desktop and mobile layouts render identically to before the change at both breakpoints.
- Unrelated `96px` values elsewhere in the codebase are unchanged.

## Notes

- The token name needs to be agreed before implementation; `--height-header-mobile` is the obvious candidate but has not been approved.
- The breakpoint that switches between the two heights is `max-width: 599px`; that value is itself repeated across stylesheets and may deserve its own ticket.
