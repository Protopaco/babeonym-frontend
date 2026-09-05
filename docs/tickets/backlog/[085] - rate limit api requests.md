# [085] - Rate Limit API Requests

## Status

Backlog

## Summary

Bound how often a caller can hit the API. There is no rate limiting anywhere in
the backend today.

## Context

`grep` for rate limiting across `babeonym-backend/src` returns nothing, and the
dependency list has no `express-rate-limit` or equivalent. `src/middleware/`
holds only `ensureAuthenticated`, `mapErrorResponse` and `setCookie`. Every
route is served as fast as the process can answer.

Two endpoints are worth singling out:

- `GET /api/v1/auth/anonymous` creates a user row and a session with no
  credential, no challenge and no cost. It is the cheapest way to manufacture
  identities, and it is what makes a per-user limit insufficient on its own — an
  abuser rotates accounts rather than exceeding any single account's budget. So
  this one wants limiting by address rather than by user.
- `POST /api/v1/givenName/custom` writes on every call and runs two profanity
  filters. It is the most expensive authenticated write.

`POST /api/v1/givenName/action` is the highest-volume legitimate endpoint, since
it fires on every swipe in the generator. Any limit has to sit well above real
swiping speed or it will hit ordinary users first.

## Open Questions

- Where the limiter keys off. Session or user id is the natural key for
  authenticated routes, but anonymous-session creation has neither yet, so that
  route needs an address-based limit. Whether the app sits behind a proxy
  determines whether the address is even trustworthy — Express needs
  `trust proxy` set correctly or every request appears to come from one host.
- Whether limits are per route or global. The right budget for swiping is
  nowhere near the right budget for account creation.
- What a limited caller receives. `429` with `Retry-After` is the standard; the
  frontend's `retryRequest` would need to not treat it as a retryable failure,
  or it will make the problem worse.
- Whether limit state lives in process memory or in Postgres. In-memory is
  simpler and resets on deploy; it is also per-instance, so it stops being a real
  limit the moment there is more than one.

## Implementation Notes

- `src/app.ts` is where middleware is registered.
- `src/middleware/` is the home for a limiter.
- `src/utils/retryRequest.ts` in the frontend retries failed requests; it needs
  checking against whatever status is returned so a limited client backs off
  rather than retrying into the limit.
- The session store is already Postgres via `connect-pg-simple`, so a
  database-backed limiter would not be introducing new infrastructure.

## Acceptance Criteria

- A caller exceeding the limit is refused rather than served.
- Anonymous account creation is limited by something other than the account it
  is about to create.
- Ordinary use — including sustained swiping in the generator — never hits a
  limit.

## Out Of Scope

- Caps on how much a single user can accumulate, which is [084].
- Authentication or account verification changes.
