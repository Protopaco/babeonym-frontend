# Improve Scroll Affordance for Long Filter Lists

## Context

The Decades accordion list is now scrollable, but it is not obvious enough that more options are available below the visible rows.

Native scrollbar styling was added, but on macOS the scrollbar may still hide until the user scrolls, so it is not a reliable affordance.

A persistent bottom fade cue was tried and rolled back because it did not visibly improve the experience.

## Future Goal

Find a better design treatment that communicates long filter lists are scrollable without making the filter drawer feel busy.

## Notes

- Do not assume the solution yet.
- Preserve the current clean accordion styling.
- Use theme variables only.
- Decades is the current confirmed long-list issue.
- Languages and Cultures may need a separate scroll/affordance strategy because they use nested accordions and Select All controls.
