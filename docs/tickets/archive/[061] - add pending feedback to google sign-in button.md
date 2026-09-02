# [061] - Add pending feedback to Google sign-in button

## Summary

Give the user visible feedback after they click "Continue with Google" in the auth modal, so the button does not appear unresponsive while the browser leaves the app.

## Context

`src/components/Account/AuthModal/AuthModal.tsx` renders a "Continue with Google" button. Its handler lives in `src/components/Header/AccountLink/AccountLink.tsx`, which calls `window.location.assign()` to send the browser to the backend's `/api/v1/auth/google`.

Between the click and the browser actually navigating away there is a noticeable gap: the request has to reach the backend, which then issues a 302 to Google's consent screen. During that window nothing on screen changes — the modal sits there with the button looking idle, and there is no indication the click registered. A user is likely to click a second time.

This is a real pattern in practice, not hypothetical: backend logs during testing showed two consecutive `GET /api/v1/auth/google` requests from a single sign-in attempt, consistent with a double click caused by the missing feedback.

## Scope

- Add a pending/loading state to the Google sign-in button, shown from the moment it is clicked until the browser navigates away.
- Prevent repeat submissions while the pending state is active.
- Keep the pending state owned by the component that renders the button.
- Add the Google logo to the button alongside its label.
- Do not change the sign-in flow itself or where the handler lives, beyond what the pending state requires.

## Acceptance Criteria

- Clicking "Continue with Google" immediately produces a visible change of state on the button.
- The button cannot be triggered again while pending.
- The button displays the Google logo.
- The logo asset is committed to the project rather than hot-linked from an external host.
- Any new colors, shadows, or sizing values come from semantic theme tokens.
- The component owns its visual styling in its sibling `.css` file; no parent stylesheet reaches into the button's internals.
- Existing "Keep using Babeonym" behavior and modal dismissal are unchanged.

## Notes

- The exact treatment is not decided. A spinner inside the button, a disabled state with changed label text, or both are all reasonable; pick one during implementation review.
- The pending state has no natural "success" end — the page is being replaced by a redirect. It only needs to persist until navigation occurs, and does not need to be cleared.
- Google publishes branding guidelines for sign-in buttons covering logo, wordmark, minimum sizing, and clear space. Worth checking those before finalizing, since this is a user-facing third-party mark.
- `src/assets/icons/` currently has no Google asset; one will need to be added.
