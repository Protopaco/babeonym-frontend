# [074] - Restyle the chip action drawers

## Summary

Give the delete, cancel and save affordances on name chips a single consistent
treatment, and stop each one re-deriving its own geometry.

## Context

Two components implement the same idea — a drawer that sits behind a name chip
and slides out past its right edge — with no shared code between them.

`ListNameChip` has a delete drawer: absolutely positioned at `top: 3px`,
`left: 140px`, `38x38`, right-rounded, filled with `--color-error`, revealed on
hover or focus. Its `large` variant repeats the whole block at `top: 5px`,
`left: 184px`, `50x50`.

`WorkspaceCustomNameDraftActions` has a cancel/save drawer at `top: 5px`,
`left: 184px`, `50x50`, widening to `100px` once the name can be saved. Cancel
is `--color-secondary`, save is `--color-primary`, and save slides in from
behind cancel.

Every one of those numbers is derived by hand from a chip size. Nothing connects
them to the chip, so a chip size change silently misaligns its drawer, and the
`compare` size introduced in `[034]` has no drawer geometry at all.

The two also disagree visually for no stated reason: one reveals on hover, the
other is always present; one is a single destructive button, the other a pair
with its own expansion animation.

## Scope

- Agree a single visual treatment for chip action drawers.
- Decide whether the drawer belongs to the chip family rather than to each
  consumer, so its geometry follows chip size instead of being restated.
- Apply the agreed treatment to the delete drawer and the cancel/save drawer.
- Preserve existing behavior: what each control does, when it appears, and the
  save button's enabled state.

## Acceptance Criteria

- Delete, cancel and save read as the same family of control.
- Drawer geometry is derived from chip size rather than hardcoded per consumer
  and per size.
- Deleting an approved name, and cancelling or saving a custom name, all behave
  exactly as before.
- Adding a new chip size does not require hand-writing new drawer offsets.

## Dependencies

- Comes after the `CustomNameChip` work, which moves the draft chip onto
  `BaseNameChip` and changes what the cancel/save drawer attaches to. Doing this
  first would mean restyling against a structure that is about to change.

## Notes

- Whether the drawer becomes a shared component, a `BaseNameChip` slot, or stays
  per-consumer with shared tokens is the main open decision and needs agreeing
  before implementation.
- The hover-reveal versus always-visible difference is a behavior question, not
  just a visual one, and should be settled deliberately rather than by whichever
  treatment is adopted.
