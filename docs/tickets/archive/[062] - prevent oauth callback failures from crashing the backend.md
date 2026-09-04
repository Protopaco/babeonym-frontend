# [062] - Prevent OAuth callback failures from crashing the backend

## Summary

Backend work. A database or network failure during the OAuth callback currently takes the entire backend process down instead of returning the user to the error page.

## Context

`src/routes/v1/auth/getGoogleCallback.ts` passes an `async` callback to `passport.authenticate(...)`. That callback is invoked by Passport internals, not by Express, so a rejected promise inside it is never routed to Express's error handling. Express 5 forwards rejections from route handlers automatically, but that mechanism does not reach into this callback. The rejection surfaces as an unhandled rejection, and Node terminates the process.

This is not theoretical. During sign-in testing, `link_auth_provider` failed at `getGoogleCallback.ts:103` and the whole server exited. The browser then showed `ERR_CONNECTION_REFUSED` on the next request, and the backend had to be restarted by hand. The underlying SQL bug has since been fixed, but the fragility it exposed has not: any future database hiccup, connection-pool exhaustion, or timeout during sign-in will crash the server the same way.

The same structure exists in `src/routes/v1/auth/getMicrosoftCallback.ts`.

## Scope

- Ensure a failure anywhere inside the Google OAuth callback results in a redirect to the frontend error page rather than a process exit.
- Apply the same protection to the Microsoft callback.
- Preserve the existing redirect contract: `/error?error=oauth` with the established `details` values.
- Log the underlying error with the error object as the first argument, so the cause is not swallowed.
- Do not change the authentication flow, the branching logic, or the session behavior.

## Acceptance Criteria

- A database failure during the provider-linking step redirects the user to the error page and the backend stays running.
- A database failure during user creation behaves the same way.
- The failing error is written to the logs with its message and stack intact.
- Both the Google and Microsoft callbacks are covered.
- Successful sign-in, account linking, and returning-user login paths are unchanged.

## Notes

- A process-level `unhandledRejection` handler could be added as a second layer of defense, but that is a broader decision about backend error policy and should be agreed separately rather than folded into this ticket.
- Related logging bug, not yet fixed: several calls pass the message string first and the error object second, for example `logger.error("Error logging in anonymous user:", err)` in `src/routes/v1/auth/getAnonymous.ts:45`. Pino treats trailing arguments as printf interpolation values, so with no placeholder in the string the error is silently discarded. Two instances in `getGoogleCallback.ts` were corrected while debugging; the remaining ones were left alone.
