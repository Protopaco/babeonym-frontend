# Hide Empty Filter Sections

## Goal

Remove filter sections that have no child filter items from the UI.

## Context

Some language/culture filter groupings can render as empty sections. They are not useful to users and can be confusing because they look interactive but contain no available choices.

This should probably also be cleaned up by the backend eventually, but the frontend can provide a UI guard for now.

## Notes

- Applies first to language and culture filter trees.
- Hide continent and region accordions when they do not contain any child filters.
- Preserve existing filter behavior for sections with children.
- Use existing component patterns and avoid broad refactors unless needed.

## Acceptance Criteria

- Empty grouped filter sections do not render.
- Non-empty grouped filter sections continue to render and behave normally.
- Existing search and selection behavior is preserved.
