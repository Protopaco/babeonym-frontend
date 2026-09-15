# [105] - Restyle The Unselect All Button In The Filter Drawer

## Status

Backlog

## Summary

In the mobile category drawer, Unselect All is styled as a filter option: a list
row with a checked checkbox. It acts as a button, so it should be styled as one.

## Context

- **Where it is rendered:** `MobileFilterList.tsx` renders it as the first item in
  the options list, only while at least one option is selected. It uses
  `FilterListItem` with `selected={true}` and `variant="utility"`.
- **What `utility` changes:** in `FilterListItem.css` it only changes the
  background: `--color-primary-highlight` at rest and `--color-primary-edge` on
  hover, focus and press. The checkbox and layout are the same as a normal option.
- **It moves:** because it is inside the scrolling `List`, it scrolls away with
  the options, and it appears and disappears at the top of the list, pushing the
  options down.
- **Desktop:** the desktop filter panel has no Unselect All row. Its draft is
  cleared by Clear All in `WorkspaceFilterActions`, a `PrimaryTextButton` at
  `size="compact"` next to Set Filters.
- **Only use of `utility`:** it is the only use of the variant, so a restyle can
  change or remove the variant without affecting anything else.

## Requirements

- Unselect All is styled as a button, with no checkbox and no option-row styling.
- It still clears the drawer's draft only, not what is already applied.

## Open Questions

- **Which button.** Reuse an existing shared button, such as `PrimaryTextButton`
  at `size="compact"` like desktop's Clear All, or `SecondaryButton` like Set
  Filters?
- **Placement.** Keep it at the top of the list, move it outside the scroll area
  (beside the search field or the drawer header), or put it next to Set Filters
  like desktop? Leaning toward the button row next to Set Filters, which also
  stops it pushing the options down when it appears.
- **Visibility.** Keep hiding it when nothing is selected, or show it disabled so
  the options do not shift when it appears?
- **Label.** "Unselect all" here, "Clear All" on desktop. Should they match?

## Implementation Notes

- **If it leaves the list,** the `utility` variant on `FilterListItem` has no
  other use and could be removed. That is a separate decision.
- **Related to [093]**, which is animating the drawer, and [104], the mobile Clear
  All button for applied filters. Keeping the two labels distinct may help, since
  one clears the draft and the other clears applied filters.

## Out Of Scope

- The desktop filter panel's actions.
- [104]'s Clear All button for applied filters.
