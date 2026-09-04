# [073] - Tokenize motion durations and easing

## Summary

Define the app's animation durations and easing once, and consume them from
every animated component, instead of each call site inventing its own values.

## Context

`CLAUDE.md` lists motion among the values that should come from tokens. It
currently does not. Four components animate, and every one picked its own
numbers:

| Component | Duration | Offset |
| --- | --- | --- |
| `EvaluatedNameDisplay` | 0.26s | 42px |
| `ApprovedGivenNameChip` | 0.18s | 4px in, 8px out |
| `WorkspaceCustomNameDraftChip` | 0.18s | 4px |
| `CompareNamesMode` | 0.3s | 88px |

All four use `easeOut`, which is the one thing they agree on, by coincidence
rather than by contract.

Durations and easing are design-system decisions and should be consistent.
Travel distance is not — it scales with the size of the thing moving, and 4px is
correct for a chip settling into a list for the same reason 88px is correct for
a button-sized swap. Forcing those together would be worse than leaving them
apart.

## Scope

- Define named motion tokens (duration and easing) in one place alongside the
  other theme files.
- Consume them from all four animated components.
- Leave per-component travel distances as they are.
- Do not change how any animation looks beyond the duration rounding that
  consolidating onto shared values implies.

## Acceptance Criteria

- Motion durations and easing are defined in exactly one place.
- No component passes a literal duration or easing to `motion/react`.
- Travel distances remain component-owned.
- Each animation still reads the same as before, allowing for the duration
  change where a component is pulled onto a shared value.

## Notes

- The token names and how many distinct transitions there should be need to be
  agreed before implementation. Two — a short one for elements settling into
  place and a longer one for content being swapped — covers the current four
  call sites, but that has not been confirmed.
- Where the tokens live needs deciding. `src/themes/` holds the palette,
  typography and breakpoints, but motion values are consumed by `motion/react`
  in TypeScript rather than as CSS variables, so they may not belong in the MUI
  theme.
- `CompareNamesMode` is the only component that currently respects
  `useReducedMotion`. Whether that handling should be centralized alongside the
  tokens is worth deciding here, but the other three components adopting it is
  a behavior change and may warrant its own ticket.
