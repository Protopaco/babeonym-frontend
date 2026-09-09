# [090] - Add An About Dialog

## Status

Backlog

## Summary

The app is a portfolio piece and says nothing about what it is, who built it, or
how to reach him. It needs an about dialog, opened from Settings, and eventually
a link out to the portfolio site.

## Context

There is nothing in the app describing the project. A reviewer looking at it has
no route from it to anything else of Paul's.

**A full page was considered and rejected.** The about content's job is to point
somewhere else — once the portfolio site exists, this is "here is what the app
is, here is me, here is the link." A page is the wrong shape for a signpost, and
it drags a route, an entry point and a way back along with it, which is the
problem [089] had just finished solving.

The trade-off was weighed and accepted: a dialog is not a URL, so there is no
`babeonym.com/about` to put on a résumé and nothing for a crawler to index. That
matters less than it sounds, because the portfolio site is the thing anyone would
link to. If it ever stops being true, the copy is the hard part and it moves
into a page easily.

A footer was rejected earlier for the same family of reasons: mobile has a
filter drawer fixed to the bottom of the viewport, so a footer either fights it
or exists on desktop only.

## The Copy

Settled. Three beats — what it is, who made it, how to reach him:

> **About Babeonym**
>
> Babeonym helps you find a name you can agree on.
>
> Built by Paul Stevens
> babeonym@gmail.com

"Portfolio project" is deliberately absent. A reviewer arrived from the
portfolio or is about to click through to it, so it is redundant there; to an
actual user it reads as "this is not a real product," which undersells it.

## The Email

`babeonym@gmail.com`, as a plain `mailto:`. It forwards to Paul's own address,
so if it ever attracts spam the forward changes and nothing else does.

Obfuscation — CSS reversal, runtime string assembly — was considered and
rejected. This is a client-rendered SPA, so the address sits in a minified JS
bundle rather than in served HTML, which is the protection the JS trick buys.
The alias is the real control. Both techniques cost either the working link or
the accessibility of it.

## Requirements

- An `AboutModal` holding the copy above.
- Opened from Settings.
- The email is a working `mailto:` link.
- A place for an outbound portfolio link, which does not exist yet.

## Open Questions

- Whether the tech stack is listed. The lean is no — it is the part a reviewer
  wants and a user does not, it dates fast, and the portfolio link puts it one
  click away.
- Whether the portfolio link ships disabled, absent, or pointing at a
  placeholder until the site exists.
- What the Settings entry looks like. `SettingsRow` is an editable field, so a
  link or button row is a new thing rather than a reuse of it.

## Implementation Notes

- `BaseTextModal` and `InformationalModal` both take plain strings
  (`body: string[]`), so neither can hold a `mailto:` or a portfolio link. This
  needs its own component composing `BaseModal` with children.
- `AuthModal` is that pattern already: `BaseModal` with `open`, `onClose`,
  `title` and `size="wide"`, and its own copy and controls as children. Follow
  it rather than inventing a second shape.
- `BaseModal`'s `closeLabel` defaults to "Cancel", which is wrong for something
  informational — `InformationalModal` passes "Got it" instead. Pass something
  similar.
- `src/pages/Settings.tsx` composes `SettingsRow` entries and
  `DeleteAccountButton`; the entry point goes among those.

## Acceptance Criteria

- The dialog opens from Settings and closes again.
- The copy is the text above, not placeholder.
- The email opens a mail client.
- Adding the portfolio URL later is a one-line change.

## Out Of Scope

- Building the portfolio site.
- An `/about` route or page.
- A footer, on either breakpoint.
- Listing the tech stack, unless the open question above is settled otherwise.
