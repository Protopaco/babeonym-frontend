# [071] - Replace Desktop Name Generator Action Buttons With Icon Buttons

## Goal

Bring the desktop name evaluation actions in line with mobile by giving them
icons, so the same three actions read the same way on both surfaces.

## User Story

As someone moving between desktop and mobile, I want approve, snooze, and reject
to look like the same three actions in both places, so I do not have to relearn
the controls.

## Background

`NameEvaluationActions` renders three text `PrimaryButton`s labelled Approve,
Snooze, and Reject. `MobileNameEvaluationActions` renders the same three actions
as MUI `IconButton`s using `ThumbUp`, `Bedtime`, and `ThumbDown`. The two
surfaces were built separately and never converged.

The shared component rule says a visual variation belongs on the shared
component as a named prop or variant, not as an override from the parent.
`PrimaryButton` already carries `size`, `tone`, and `emphasis` as data
attributes, so it has an established place for one more axis.

## Requirements

- Desktop approve, snooze, and reject carry icons.
- The icons match the ones mobile already uses, so the two surfaces agree.
- Any variation needed to support this lives on the shared `PrimaryButton`
  rather than in parent CSS.
- The disabled state continues to follow `actionDisabled` from `NameEvaluator`.
- The snooze tutorial tooltip keeps working.

## Open Questions

**Implementation is not decided. Paul has a question to raise before an approach
is chosen. Do not start building until that conversation has happened.**

Undecided, and deliberately left open here:

- Whether the buttons keep their text alongside the icon or become icon-only.
- What shape the `PrimaryButton` variation takes, and whether `PrimaryButton` is
  the right home for it at all.
- Whether desktop and mobile should converge on one component rather than
  keeping two.

## Implementation Notes

- `src/components/NameGenerator/NameEvaluator/NameEvaluationActions.tsx` holds
  the desktop buttons.
- `src/components/NameGenerator/NameEvaluator/MobileNameEvaluationActions.tsx`
  holds the mobile icon buttons and is the reference for which icon means what.
- `src/components/Shared/PrimaryButton/PrimaryButton.tsx` is the shared button.
  It is consumed well beyond the name generator, so any change to its API has to
  leave existing callers untouched.
- `PrimaryButtonSkeleton` sits beside it and may need to match whatever shape is
  chosen.

## Acceptance Criteria

- Desktop approve, snooze, and reject show icons consistent with mobile.
- Existing `PrimaryButton` callers elsewhere in the app are unchanged visually.
- Buttons still disable when there is no candidate to act on.
- The snooze tooltip still appears.
- The component follows the frontend architecture rules, with its own CSS file
  and theme tokens only.

## Out Of Scope

- Changing what the three actions do.
- Restyling mobile, which is already the target appearance.
- Any change to the name display beside the buttons.
