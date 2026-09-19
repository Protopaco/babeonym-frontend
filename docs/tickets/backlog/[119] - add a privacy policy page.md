# [119] Add a privacy policy page

## Status

Backlog

## Summary

A short, plain privacy page at `/privacy`, styled like the Settings and Error
pages, linked from the About modal and the sign-in modal.

## Context

What is actually true today, so the page stays honest:

- One cookie keeps you signed in. Your list and votes are stored on our server
  against it. No analytics or ad tracking.
- With an account we store your email and your Google account ID. Google handles
  the sign-in itself.
- Theme and tutorial preferences live in your browser's local storage.
- The site runs on third-party hosting, which stores this data only to run the
  site. Nothing is sold or shared beyond that.
- Deleting your account deletes the account and all its name data.

## Open

- About modal or Settings for the second link. Leaning About modal: it's where
  the contact email already lives.
- Confirm account deletion removes votes and list rows, not just the user row,
  before the page says so.

## Acceptance Criteria

- `/privacy` renders in the Settings/Error page style.
- Linked from the About modal and the sign-in modal.
- Every statement on the page matches the Context above.
