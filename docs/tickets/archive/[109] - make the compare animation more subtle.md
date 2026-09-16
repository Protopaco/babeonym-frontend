# [109] - Make the compare animation more subtle

## Status

Backlog

## Summary

The compare pair moves further than the generator's name does, so the same
gesture reads as heavier in one mode than the other. Bring it closer to the
generator.

## Context

- Compare: `SLOT_TRAVEL_PX` is 88. A chip enters from `y: -88` and leaves
  sideways to `x: ±88`, over 300ms, `easeOut`.
- Generator: a name enters from `y: -42` and leaves to `y: +42`, over the same
  300ms and easing.
- Durations and easing already match. The distance is the whole difference.

## Requirements

- Reduce `SLOT_TRAVEL_PX` to match the generator's 42.
- Keep the sideways exit. It exists so a leaving chip does not drop across the
  surname beneath it, which the generator has no equivalent of.
- Duration and easing stay as they are.

## Open Questions

- With the distance matched, is the sideways exit still worth keeping, or should
  a chip leave downward like the generator's name?

## Out Of Scope

- The skeleton-to-pair fade.
- The generator's own animation.

## Acceptance Criteria

- A compare pair moves the same distance as a generated name.
- Nothing shifts layout: the chip is absolutely positioned in its slot, so travel
  does not affect the surname below.

## Files

- `src/components/CompareNames/CompareNamesMode.tsx`
