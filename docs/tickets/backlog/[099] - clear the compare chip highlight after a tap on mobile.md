# [099] - Clear The Compare Chip Highlight After A Tap On Mobile

## Status

Backlog

## Summary

On mobile, tapping a name in Compare Names leaves the chip highlighted, and the
highlight carries onto the next pair. Hover styling should not apply on touch.

## Context

`BaseNameChip.css:23` fills an interactive chip on hover:

```css
.base-name-chip[data-interactive='true']:hover {
  background: var(--color-secondary);
}
```

It is not limited to devices that can hover. Touch browsers apply `:hover` on
tap and keep it until something else is tapped, so the chip under the finger
stays filled. After a vote the next pair mounts in the same place and picks up
the same fill.

## Requirements

- Tapping a compare chip does not leave it, or the chip that replaces it,
  highlighted.
- Desktop hover is unchanged.

## Implementation Notes

- Wrap the rule in `@media (hover: hover)`. That is the established pattern —
  see the comment at `src/components/Shared/PrimaryButton/PrimaryButton.css:81`
  and `WorkspaceModeHeader.css:65`.
- `BaseNameChip` is shared, so the change covers every interactive chip, not
  only Compare Names. Check the other interactive uses on desktop.

## Acceptance Criteria

- On a phone, after voting, neither the tapped chip nor the next pair is
  highlighted.
- On desktop, hovering a compare chip still fills it.

## Out Of Scope

Other `:hover` rules with the same gap, recorded rather than fixed:

- `FilterListItem.css:7` and `:23`
- `FilterSearchField.css:17`
- `ListNameChip.css:34` — the delete drawer, already an open question in [081]
- `WorkspaceAddNameItem.css:39`
- `AuthProviderButton.css:17`
