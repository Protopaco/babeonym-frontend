# Handle Unexpected Routes

## Goal

Update routing so unexpected paths do not show the default 404 behavior.

## MVP Decision

Unexpected routes should redirect to the home page.

## Notes

- Add a catch-all route.
- Keep behavior simple for MVP.
- A styled not-found page can be reconsidered later if needed.

## Acceptance Criteria

- Visiting an unknown path redirects to the home page.
- Existing app routes continue to work.
