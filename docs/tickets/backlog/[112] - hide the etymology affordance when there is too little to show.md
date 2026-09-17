# [112] Hide the etymology affordance when there is too little to show

## Status

Backlog

## Summary

A name whose etymology is nothing but a language or two still gets an info
button, and opening it shows "Language: English" and nothing else. Gate the
affordance on there being enough to be worth opening.

## Context

`get_given_name_etymology` returns a non-null object when *any* of meanings,
languages or cultures has a row — see `047_get_given_name_etymology.v1.sql:34`.
It is null only when a name has none of the three.

Both frontend call sites gate purely on that object being truthy:

- `ListNameChip.tsx` — the chip's indicator (55), the drawer's info action (61),
  and the modal mount (83).
- `EvaluatedNameDisplay.tsx` — the info button (85) and the modal mount (110).

So "has an etymology row" is standing in for "has something worth reading", and
those are not the same question. Cultures are not rendered at all, which makes
the gap wider than it looks: a name can satisfy the gate entirely on data the
modal never shows.

## Requirements

One shared predicate, used by every gate above at both call sites, so the
indicator, the action and the modal can never disagree about whether a name has
something to show.

No SQL change. `cultures` is still wanted in the payload for filtering even
though the modal does not display it, and the threshold is a presentation
decision rather than a data one.

## Open

**The threshold is deliberately undecided.** Probably three languages; possibly
"at least one meaning". Decide when the work is picked up rather than now.

## Out Of Scope

- Changing `get_given_name_etymology`.
- Displaying cultures in the modal.
- [113], which is a separate fault on the same surface.

## Acceptance Criteria

- A name carrying only a language or two shows no info indicator and no info
  action, on both the generator and the approved names list.
- The indicator, the action and the modal mount agree in every case, because
  they read the same predicate.
- A name with real etymology is unaffected.
