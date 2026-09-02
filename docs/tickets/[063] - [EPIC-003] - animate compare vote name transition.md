# [063] - [EPIC-003] - Animate Compare Vote Name Transition

## Goal

Make the swap to the next comparison pair read as a transition rather than an
instant text replacement.

## User Story

As a user voting through pairs, I want to see the names change so I can tell my
vote registered and a new pair arrived.

## Requirements

- Animate the outgoing pair away and the incoming pair in when a vote is cast.
- Treat the voted name and the rejected name distinctly if it helps convey the
  choice.
- Keep the vote optimistic; the animation must not wait on the request.
- Do not block voting during the animation, or drop rapid successive votes.
- Respect reduced motion settings.
- Use the existing motion library rather than introducing another approach.
- Keep the approved-name rerank animation unchanged.

## Implementation Notes

- The pair swap happens in `useCompareNamePair` via `advancePair`, called from
  `useCompareNameVoting` before the request is queued.
- `CompareNamesMode` renders both `CompareNameButton`s directly; the buttons are
  `PrimaryButton`s, so any animation belongs around them rather than inside the
  shared button.
- Names are keyed by `givenCustomNameBridgeId`, which motion can use for
  enter/exit.

## Acceptance Criteria

- Voting produces a visible transition between pairs.
- Rapid voting stays responsive and does not queue up a backlog of animations.
- Vote submission behavior and ranking updates are unchanged.
- The skeleton state while no pair is available still renders correctly.
