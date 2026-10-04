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

## Decisions

- **Its own repo.** Not a folder in `babeonym-frontend`. It keeps the app free of
  test bloat and keeps the suite to what a browser can touch. The e2e repo carries
  its own integration test documentation.
- **Runs on demand locally, and nightly against production.** One `baseURL`
  setting; the same specs serve both.
- **Authentication is a saved Google session.** Sign in once by hand, save
  Playwright's `storageState`, reuse it, and re-capture it when it expires. No
  test-only backend route: a test through a backdoor tests the backdoor, not the
  app. Creating an account through Google stays a manual check.
- **Selectors are `data-testid`**, named `location-form-descriptor`, with a
  trailing identifier for repeated items (for example
  `generator-button-approve`, `workspace-chip-name-rocco`). Locations come from a
  closed list in `docs/testing/locationReference.md`.
- **Unit tests are separate from this epic.** Their conventions, like the rest of
  the testing conventions, live in the `ui-testing` skill.
- **Conventions live in the `ui-testing` skill**, which applies to every UI
  project. The Babeonym-specific location list is
  `docs/testing/locationReference.md`.

## Open Questions

- **Test data.** Tests that approve names write to a real database. Which one,
  and how does the nightly test account stay out of the preserved-accounts list in
  [123]?
- **Where does the nightly run?** CI host not chosen.

## Candidate Child Tickets

- Scaffold the e2e repo (Playwright, `baseURL` environment setting, local and
  production scripts).
- Add `data-testid` attributes to the components the first flows touch, following
  the location reference.
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
