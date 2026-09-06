# [086] - Route Client Failures To The Error Page

## Status

Backlog

## Summary

`/error` exists and works, but only the backend ever sends anyone to it. No
failure originating in the client navigates there, so a request that cannot be
retried ends in a console log and a screen that does not say anything is wrong.

## Context

This came out of [085]. Rate limiting returns 429, and the question "what does
the user see?" turned out to have the same answer as every other client-side
failure: nothing.

What already exists:

- `router.tsx:17` routes `/error` to `src/pages/ErrorPage.tsx`.
- The page reads `?error=<category>&details=<detail>` and passes them to
  `resolveErrorPageContent`, which returns a title, a message and whether to
  offer a retry-sign-in button. It handles two authentication cases and falls
  back to a generic "Something went wrong".
- `getGoogleCallback.ts` redirects there from ten places, always with
  `error=oauth`.

So the page, the route, the parameter contract and the generic fallback are all
in place. A new failure category is a new branch in `resolveErrorPageContent`,
not new plumbing.

What is missing is anything on the client side calling `navigate('/error')`.
Every provider catches its own error, writes it to the console and carries on.
`retryRequest` retries `FetchError` and `>= 500` twice, so transient blips are
already absorbed — this is about what happens when those retries are spent, or
when the status was never retryable to begin with.

Three failures worth naming, because they fail differently and probably should
not all be treated the same:

- **A refill that fails.** `refillCandidates` catches and logs. If the queue is
  already empty, `candidatesExhausted` stays false and `currentCandidate` stays
  null, which is exactly the state `EvaluatedNameDisplay` reads as "a request is
  still in flight" — so it shows `GeneratedNameSkeleton` and never stops. A
  permanent shimmer is the most likely thing anyone actually sees, and it reads
  as a hang rather than an error.
- **An action that fails.** The optimistic update rolls back, so the name snaps
  back where it was. Correct, but unexplained — it looks like the click missed.
- **A boot that fails.** `getUser` dispatches `USER_PROVIDER_LOADED` from a
  `finally`, so the app proceeds with no user rather than stopping. This is the
  one that most deserves the page: nothing downstream can work.

## Open Questions

- **Which failures earn a navigation.** A failed top-up, a failed action and a
  failed boot are not the same size of problem. Sending all three to `/error`
  would make the app feel far more broken than it is. A failed boot is the
  clearest candidate; the other two may want an in-place message instead, and
  the refill case may just need the skeleton to stop.
- **What the new categories are.** The existing contract is a category plus an
  optional detail. `error=network`, `error=ratelimit` and `error=server` are the
  obvious ones, but the naming is a decision, and whatever is chosen has to read
  sensibly in a URL the user can see.
- **Whether 429 reads differently from the rest.** "Too many requests, wait a
  moment" is recoverable and worth saying plainly; a 500 is not the user's doing
  and there is nothing for them to act on. The backend returns `Retry-After` on a
  limited request, so the wait is knowable if it is worth showing.
- **Where the navigation is triggered from.** Providers cannot call `useNavigate`
  from inside a `catch` without being inside the router, and putting navigation
  into state providers couples them to routing. A shared error state that a
  layout component watches is the other shape. This is the main design decision
  in the ticket.
- **Whether `resolveErrorPageContent` stays in the page file.** It is already the
  largest thing in `ErrorPage.tsx` and will grow with every category added.

## Implementation Notes

- `src/pages/ErrorPage.tsx` holds `resolveErrorPageContent` and the two existing
  categories.
- `src/utils/retryRequest.ts` decides what is retried; anything it rethrows is
  what this has to handle.
- `src/state/givenName/givenName.provider.tsx` and
  `src/state/user/user.provider.tsx` hold the `catch` blocks in question.
- `EvaluatedNameDisplay` already picks between a skeleton, a name and two
  messages, so an in-place failure state would be a fourth branch there rather
  than a new component in that slot.
- `getCustomNameErrorMessage` is the existing example of mapping a status to
  user-facing copy, and it maps every 400 to a single string.

## Acceptance Criteria

- A failed request that cannot be retried tells the user something.
- The generator does not sit on a loading skeleton after a fetch has failed.
- A failed boot is distinguishable from an empty account.
- Rate limiting reads as "wait a moment", not as a crash.
- The existing OAuth categories still resolve to the copy they resolve to now.

## Out Of Scope

- Reporting errors anywhere but the screen, which is [057].
- Changing what `retryRequest` retries.
- Any change to the limits themselves, which are [085].
- Redesigning the error page itself; this is about what reaches it.
