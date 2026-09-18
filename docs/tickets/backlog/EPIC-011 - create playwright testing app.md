# EPIC-011 - Create Playwright Testing App

## Requirements Reference

- None. Paul's call, recorded to scope the work before any of it starts.

## Goal

An end-to-end test suite that exercises the real app in a browser, so a change to
a shared component is caught before it reaches a screen Paul wasn't looking at.

## Why

- The frontend's shared components are deeply chained — `PrimaryButton` →
  `PrimaryTextButton` → `GoogleSignInButton`, plus ten other call sites. A change
  to the base is only verified by whichever screen happens to be open.
- `tsc` and the build catch broken imports and types. Neither catches a button
  that renders at the wrong width, a stylesheet that targets a class no longer
  rendered, or an animation that leaves an element clipped.
- Both of those have already happened.

## Product Direction

1. **End-to-end, against a built app.** Not unit tests of components in
   isolation.
2. **Flows first, assertions second.** Generate a name, approve it, filter,
   clear filters, compare, sign in.
3. **Visual regression where it earns its place.** Screenshot comparison on the
   handful of surfaces where layout is the thing being tested.
4. **Runs locally on demand before it runs anywhere automatically.**

## Open Questions

- **Its own repo, or a folder in `babeonym-frontend`?** The title says app, which
  suggests separate. Separate means it can point at deployed environments;
  in-repo means it moves with the code it tests.
- **What does it run against** — a local dev server, a local production build, or
  the Vercel preview?
- **Authentication.** Google sign-in can't be driven by a test. Does the backend
  need a test-only session route, or do the tests stay anonymous?
- **Test data.** Tests that approve names write to a real database. Which one.
- **Does this settle the unit-test convention too**, or stay strictly end-to-end?

## Candidate Child Tickets

- Decide placement and target environment, and scaffold the project.
- Establish the selector convention (`data-testid` vs role-based queries).
- Cover the core flow: generate, approve, reorder, delete.
- Cover filters, including the clear-all confirmation.
- Cover compare mode, including the too-few-names empty state.
- Cover the error page's four paths, each showing its own title, message and
  buttons: `/error?error=oauth` (Try again, Return home),
  `/error?error=oauth&details=access_denied` (sign-in cancelled, same buttons),
  `/error?error=session` (Try again only — Return home would bounce straight
  back), and bare `/error` (Return home only). They are only reachable by a
  failure, so nothing exercises them day to day.
- Solve authenticated runs.
- Add visual regression on the workspace at mobile and desktop widths.
- Wire into CI.
