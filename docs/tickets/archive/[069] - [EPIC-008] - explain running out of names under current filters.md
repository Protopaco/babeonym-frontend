# [069] - [EPIC-008] - Explain Running Out Of Names Under Current Filters

## Goal

Tell a user who has worked through every name matching their filters what has
happened and what to do about it, instead of showing them nothing.

## User Story

As someone who has narrowed the filters and evaluated everything that matched, I
want to know I have reached the end rather than assume the app is broken, so I
can widen the filters and keep going.

## Background

Filters are hard constraints on candidate selection. Ticket `[068]` keeps the
queue topped up and lets the backend reach further from the target popularity as
close matches run out, but no amount of widening invents names that do not match
a decade, language, culture, or gender selection. A narrow enough combination
genuinely runs out.

Today that state is invisible. `EvaluatedNameDisplay` renders the literal string
`no names` in the same `h2` slot a name would occupy, styled as a name, with the
tutorial tooltip still asking "Do you like this name?" above it. The action
buttons disable, and nothing says why. It is indistinguishable from a failed
fetch.

## Requirements

- Replace the `no names` placeholder with copy that says the filters have run
  out of names, not that something went wrong.
- Point the user at changing or clearing filters as the way to continue.
- Make the exhausted state visually distinct from a name, rather than occupying
  the name slot as if it were one.
- Do not show the evaluation tooltip or hint copy when there is no name to
  evaluate.
- Distinguish exhausted from loading. A queue that is empty because data has not
  arrived yet should still show the skeleton.

## Implementation Notes

- `EvaluatedNameDisplay.tsx` holds the current placeholder and the tooltip. It is
  the component that owns this display.
- `NameEvaluator.tsx` already computes `currentCandidate` and derives
  `actionDisabled` from it. Exhausted and not-yet-loaded both currently collapse
  into "no current candidate" and need separating.
- After `[068]`, an empty queue means the supply is genuinely exhausted rather
  than merely drained, because a refill runs before the queue empties. That is
  what makes this message safe to show. Ordering the two tickets the other way
  would produce false exhausted states.
- A failed refill leaves the existing queue alone and stays silent, so it does
  not reach this state.

## Acceptance Criteria

- Evaluating every name under a narrow filter combination shows the exhausted
  message.
- The message names filters as the cause and offers clearing or changing them.
- The message is not styled as a candidate name.
- Loading still shows the skeleton, not the exhausted message.
- Clearing filters returns the user to evaluating names with no reload.
- The component follows the frontend architecture rules, with its own CSS file
  and theme tokens only.

## Out Of Scope

- Identifying which specific filter is responsible.
- Suggesting a particular relaxation, or offering to widen filters
  automatically.
- Any change to candidate selection, which is ticket `[068]`.
- Error states for a failed fetch.
