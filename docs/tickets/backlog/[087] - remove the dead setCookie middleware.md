# [087] - Remove The Dead setCookie Middleware

## Status

Backlog

## Summary

`babeonym-backend/src/middleware/setCookie.ts` is never called. Decide whether
it is dead weight or an unfinished fix, and then either delete it or finish it.

## Context

The file exports a middleware that, in production only, strips the `Set-Cookie`
header the session layer wrote and replaces it with one of its own. Nothing
imports it. Its single mention in the codebase is a commented-out call inside
the Google OAuth callback, at `getGoogleCallback.ts:135`, immediately after a
successful `req.logIn`.

It is not obviously safe to delete, because the cookie it writes is not the
cookie the app is otherwise configured to write. `app.ts:165` configures
`express-session` with `sameSite: "lax"` and no domain. `setCookie` writes
`Domain=.babeonym.com; SameSite=none; Max-Age=86400`.

Those differences are the shape of a cross-site cookie fix. `SameSite=none`
with an explicit parent domain is what a cookie needs in order to survive being
set on one host and sent from another — which is the situation an OAuth callback
creates, and which `lax` does not always cover. So this may be a workaround for
a real sign-in bug that was commented out rather than removed, and deleting it
would take the note with it.

## Open Questions

- Was it commented out because it did not work, or because the problem it
  addressed went away? The commit that commented it should say.
- Is the frontend served from the same origin as the API in production? If it is
  not, `sameSite: "lax"` on the session cookie is likely wrong for the OAuth
  handoff, and this file is a symptom rather than the disease.
- If the cookie attributes here are the correct ones, do they belong in the
  `express-session` config instead, where they would apply to every response
  rather than one branch of one route?

## Implementation Notes

- `src/middleware/setCookie.ts` is the file.
- `src/routes/v1/auth/getGoogleCallback.ts:135` is the commented call.
- `src/app.ts:165` holds the session cookie configuration it disagrees with.
- Sign-in through Google is the flow to exercise if the behaviour is tested
  rather than reasoned about; it cannot be checked locally if the local frontend
  and API share an origin, since that is the case the file does not apply to.

## Acceptance Criteria

- `setCookie.ts` is either deleted or wired in, not left commented.
- If it is deleted, Google sign-in still works in production, on a browser that
  did not already hold a session.
- If the cookie attributes were right, they live in one place rather than two.

## Out Of Scope

- Any other change to authentication.
- The Microsoft OAuth flow, unless the same question turns out to apply to it.
