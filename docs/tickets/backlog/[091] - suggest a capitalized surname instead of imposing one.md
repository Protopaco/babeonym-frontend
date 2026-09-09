# [091] - Suggest A Capitalized Surname Instead Of Imposing One

## Status

Backlog

## Summary

A surname typed in lower case stays in lower case. It is displayed under every
candidate name and both compare chips, so `stevens` sits under `Emily`
everywhere. The app should offer to capitalize it, and never do so on its own.

## Context

Custom given names are already capitalized on save.
`babeonym-backend/src/utils/normalizeCustomGivenName.ts` capitalizes each
segment — `anne-marie` becomes `Anne-Marie` — and is called from
`postCustomGivenName`. Surnames get none of it: `updateUserSettings` trims and
runs the bad-word check, and stores whatever is left.

So a lower-case surname reads as a bug next to a capitalized given name, and the
user has no signal that anything is wrong.

### Why not just capitalize it

**Auto-capitalizing is sticky, and the user cannot win.** If the app rewrites
`van der Berg` to `Van der Berg` on save, retyping it produces the same rewrite.
There is no path back to the spelling the user meant.

That matters more for surnames than for given names, because lower-case
particles are normal in surnames and vanishingly rare in given names — `van der
Berg`, `de la Cruz`, `bin Rashid`, `ó Súilleabháin`. Dutch convention keeps the
particle lower case when a given name precedes it, which is exactly how this app
displays it: the given name above, the surname below.

Neither available rule avoids the problem, because the particle *is* the first
character:

| Typed | Do nothing | First letter only | Every segment |
|---|---|---|---|
| `stevens` | `stevens` | `Stevens` | `Stevens` |
| `McKenna` | `McKenna` | `McKenna` | `McKenna` |
| `van der Berg` | `van der Berg` | `Van der Berg` | `Van Der Berg` |
| `de la Cruz` | `de la Cruz` | `De la Cruz` | `De La Cruz` |

Every rule that fixes `stevens` also damages `van der Berg`. So the app should
not pick — it should ask, once, and accept the answer.

### Why not a modal

A confirmation modal was considered and rejected. It blocks a save the user has
already committed to, it interrupts everyone who types lower case in order to
help the few who meant it, and anyone in a hurry clicks through without reading —
which lands back at a wrong value, with an extra step.

## Requirements

- **Two gates decide whether a suggestion appears at all**, and the first does
  most of the work:
  1. The saved value is entirely lower case. A capital anywhere means the user
     was thinking about case, so `van der Berg` and `McKenna` are never
     touched.
  2. The capitalized form differs from what was saved.
- **The suggestion capitalizes the first letter of every segment**, where a
  segment starts at the beginning or after a space or hyphen. `smith-jones`
  offers `Smith-Jones`, which first-letter-only would get wrong as
  `Smith-jones` — and hyphenated surnames are far more common here than
  particles. `van der berg` offers `Van Der Berg`, which is wrong, and harmless:
  it is an offer, and ignoring it costs nothing.
- **It appears on save**, not on blur. Blur fires when the user tabs toward the
  save button, so a suggestion there can arrive mid-thought.
- Tapping the suggestion sets the field to the capitalized form and saves it.
- **It is transient and nothing is persisted.** It clears when the field changes
  again or the page unmounts. No dismissed flag, no per-user state, no session
  storage — ignoring it makes it go away.
- The app never rewrites the surname on its own. The stored value is always what
  the user chose.
- Nothing changes for a surname that is already capitalized — no suggestion, no
  extra render.

## Decisions Already Made

- **Given names are left alone.** They are capitalized on the backend, silently,
  every segment, and the sticky problem technically applies to them too. It
  applies far less often, because a given name almost never wants a lower-case
  segment, and changing it would mean pulling normalization out of the API into
  the client. Deliberate, not an oversight.
- **The capitalizer is duplicated on the client.** `normalizeCustomGivenName` in
  the backend already implements this rule. Sharing it would need an endpoint;
  the logic is a single regex replace, so two copies in two languages is the
  cheaper answer for now.
- **The choice of rule stopped being fraught once the app stopped rewriting.**
  Every rule that fixes `stevens` also damages `van der Berg` — but only if it
  is imposed. As a suggestion, the right rule is the one that helps the most
  people, and the rest ignore it.

## Implementation Notes

- `SettingsRow` already renders `helperText` under the field for
  `errorMessage`, so there is a slot for this. It is currently typed as a
  string; a tappable suggestion needs a node, or its own prop.
- `useSettings` owns the draft, the dirty check and `saveSurName`, so the
  suggestion state belongs there rather than in the component.
- `src/utils/normalizeNameInput.ts` handles characters and length for both a
  custom given name and a surname. Capitalization is deliberately not in it —
  doing it while the user types would make a lower-case first letter
  untypeable.
- The backend does not capitalize surnames and does not need to. This ticket
  keeps the decision on the client, where the user is.

## Acceptance Criteria

- Saving `stevens` offers `Stevens`, and one tap stores it.
- Saving `smith-jones` offers `Smith-Jones`.
- Saving `van der Berg` stores exactly that and shows nothing, because it
  already contains a capital.
- Saving `Stevens` shows nothing.
- Ignoring a suggestion and editing the field clears it, and it does not come
  back until the next save.
- No stored surname is ever different from what the user chose.

## Out Of Scope

- A confirmation modal.
- Changing how custom given names are capitalized.
- Backend surname validation of any kind.
