# [122] Restyle the etymology modal

## Status

Backlog

## Summary

The meanings in `NameEtymologyModal` are hard to read. Restyle the Meanings
section so a name with several meanings in several languages can be scanned at a
glance.

## Context

- **Meanings.** They're grouped by language using `groupMeaningsByLanguage`.
  Each group has a small grey language line (body2, secondary colour) and then
  its meanings as an unmarked list (body1, primary colour).
- **Weight.** Every meaning is the same size and colour, with no bullet or
  divider. The only thing separating groups is a 16px gap, so a long group reads
  as one block of text.
- **Group labels.** The language label is quieter than the text it labels, so
  the groups don't clearly start anywhere.
- **Languages section.** This is the section below Meanings, in three columns.
  It reads fine and isn't in scope.

## Requirements

- Each language group should be clearly marked where it starts. The label needs
  to be visible enough to scan for.
- Each meaning should be clearly separate from the one after it.
- Only theme tokens. Styling stays in `NameEtymologyModal.css`.

## Open

- What exactly reads badly: density, contrast, grouping, or the length of the
  meaning text? That decides which of the requirements above matters most.

## Acceptance Criteria

- For a name with many meanings (Mary), you can find a language's meanings and
  tell them apart without reading the whole list.
- It reads correctly in light and dark mode, and on mobile.

## Files

- `src/components/Shared/NameEtymologyModal/NameEtymologyModal.tsx`
- `src/components/Shared/NameEtymologyModal/NameEtymologyModal.css`
