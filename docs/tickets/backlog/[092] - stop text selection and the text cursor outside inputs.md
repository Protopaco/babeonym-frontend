# [092] - Stop Text Selection And The Text Cursor Outside Inputs

## Status

Backlog

## Summary

On desktop the text cursor shows over labels, headers and names that cannot be
edited, and clicking or dragging across the interface highlights it. Make text
non-selectable, with the default cursor, everywhere except the places that
actually take typing — and give the About dialog's email address a copy button,
since it would otherwise become impossible to copy.

## Context

Browsers default to `cursor: auto`, which shows the text cursor over any
selectable text. Nothing in `src/styles/` sets `cursor` or `user-select`, so
every label, tab, header and name in the app gets the text cursor and can be
highlighted by a click-drag or double-click.

The usual convention is that content is selectable and interface chrome is not —
message text copies, buttons and labels do not. That was considered here and
rejected in favour of making names non-selectable too:

- **Names in Your Names** cannot be drag-selected on desktop anyway: a mouse drag
  anywhere on the row starts a reorder.
- **The compare chips** are buttons, so selecting their text fights the click
  that casts the vote.
- That left only the candidate name in the generator, which is the place a user
  is least likely to want to copy from. Two out of three not being selectable
  argued for making it consistent. Names are short enough to type.

So nothing outside an input is selectable, with one problem that follows from
it.

### The About email

The About dialog shows `babeonym@gmail.com` as a `mailto:` link. For anyone
without a default mail app — which includes anyone who uses webmail — the link
does nothing useful, and copying the address is the only way to use it. Trying to
select a link's text also tends to click it by accident. Making the text
non-selectable would remove even that.

The answer is a copy button beside the address rather than an exception to the
rule. It is a common pattern in developer tools (clone URLs, code blocks, API
keys) and increasingly on portfolio and personal sites for exactly this reason,
and a portfolio's reviewers are likely to have the same annoyance.

## Requirements

- Text is not selectable and shows the default cursor across the app.
- Anything that takes typing keeps normal selection and the text cursor: the Sur
  Name field, the custom name draft, and the filter search fields on both
  desktop and mobile.
- The About dialog keeps its `mailto:` link and gains an icon button beside it
  that copies the address to the clipboard.
- Copying confirms in place — the copy icon swaps to a check for a couple of
  seconds — not through a toast. The app has no toast layer, and feedback stays
  in the UI.
- The button is icon-sized and quiet, so it sits beside the address rather than
  competing with it.

## Open Questions

- **Where the global rule lives.** `src/styles/index.css` is the global
  stylesheet imported in `main.tsx`; `palette.theme.ts` already uses
  `MuiCssBaseline.styleOverrides` for the CSS variables. Either works — the first
  keeps it with the other global CSS, the second with MUI's baseline.
- How the copied state is announced to a screen reader — an `aria-live` region,
  or swapping the button's `aria-label` from "Copy email address" to "Copied".
- What happens if the clipboard write fails, since `navigator.clipboard` can be
  unavailable or refused. Leaving the icon unchanged is the quiet option; the
  address is still visible to type.

## Implementation Notes

- **Restore selection explicitly on editable elements** — `input`, `textarea`
  and `[contenteditable]` get `user-select: text` and `cursor: text`. Inherited
  `user-select: none` can interfere with caret placement and focus inside inputs
  on iOS Safari, so relying on inputs being exempt by default is not safe. Verify
  on a real device.
- Only the cursor half of this is desktop-specific; `user-select` applies on
  touch too, where it stops long-press text selection on labels. That is
  consistent with the rest of the decision.
- The About dialog is `src/components/Settings/AboutButton/AboutModal.tsx`. The
  address is an MUI `Link` with class `about-modal-email` inside
  `.about-modal-credit`, and the string is the `CONTACT_EMAIL` constant — the
  copy button should read the same constant.
- `navigator.clipboard.writeText` needs a secure context. Both `localhost` and
  production are.
- Candidate icons are MUI's `ContentCopy` swapping to `Check`.
- The copy button is new UI inside `AboutModal`, so it owns its own styling in
  that component's CSS or its own component, per the frontend conventions.

## Acceptance Criteria

- On desktop, no label, header, tab, button or name shows the text cursor or can
  be highlighted by click-drag or double-click.
- Every input still places a caret, selects text and shows the text cursor, on
  desktop and on iOS Safari.
- The About dialog's copy button puts `babeonym@gmail.com` on the clipboard and
  confirms with a check icon in place.
- The `mailto:` link still works for anyone with a mail app.

## Out Of Scope

- A general copy-to-clipboard component for other parts of the app.
- Making any name selectable. That was decided against — see Context.
