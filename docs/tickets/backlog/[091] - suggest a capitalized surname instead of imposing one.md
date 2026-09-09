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

- On save, when the surname differs from its capitalized form, show an inline
  suggestion under the field: the value as saved, and the capitalized form as a
  tappable alternative.
- Tapping the suggestion sets the field to the capitalized form and saves it.
- Ignoring the suggestion is a valid answer. It does not reappear for that
  value.
- The app never rewrites the surname on its own. The stored value is always what
  the user chose.
- Nothing changes for a surname that is already capitalized — no suggestion, no
  extra render.

## Open Questions

- **Which capitalization the suggestion offers.** First letter only, or every
  segment. First letter is the smaller error, but `mckenna` then suggests
  `Mckenna`, which is wrong in a different way. Possibly the suggestion should
  only appear when the whole value is lower case, where the intent is least
  ambiguous.
- **When the suggestion stops.** Per value, per session, or once dismissed
  never again for that user. Per value is the simplest and means a user who
  edits their surname later is asked again about the new one.
- Whether the suggestion appears on save or as soon as the field loses focus.
  Save is the moment the user has committed; blur fires while they may still be
  typing.
- Whether given names should move to the same model. They are capitalized
  silently today, and the sticky problem applies to them too — just far less
  often, since a given name rarely wants a lower-case segment. Out of scope
  here, but the answer should be deliberate.

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
- Saving `van der Berg` stores exactly that, and the suggestion does not
  reappear for it.
- Saving `Stevens` shows nothing.
- No stored surname is ever different from what the user chose.

## Out Of Scope

- A confirmation modal.
- Changing how custom given names are capitalized.
- Backend surname validation of any kind.
