# EPIC-008 - Unified Name Workspace

## Requirements Reference

- `docs/application-requirements.md`

## Goal

Create one low-friction main workspace where users generate, approve, compare, rank, and manually add names without bouncing between separate pages.

## Product Direction

The app should feel like a simple loop:

- Add or evaluate names.
- Approved names collect in a persistent ranked list.
- Compare names to refine that ranking.
- Manually add a custom name directly into the ranked list.

The root experience should be the primary workspace. Account-related screens can remain separate routes later, but name workflows should live together unless there is a strong product reason to split them.

The former subsection header/divider should become a contextual utility area:

- In Name Generator mode, it becomes the filter summary and filter drawer entry point.
- In Compare Names mode and other non-generator contexts, it collapses to a thin color divider.
- It should help delineate sections without introducing redundant page headers.

## Notes

- `Add Name` should be the default mode.
- `Compare Names` should be a sibling mode in the same workspace.
- Workspace mode should be represented as URL state rather than separate name-workflow paths.
- The approved-name rankings/list should remain visible below the active mode.
- Custom names should be added from the list area with a `+` affordance and inline draft chip.
- The filter drawer needs to be documented before redesign because removing the approved-name list from it will significantly change its purpose.

## Candidate Child Tickets

- Document current name generator and filter drawer behavior.
- Design unified name workspace layout.
- Move compare names into workspace mode.
- Move approved name rankings into persistent workspace list.
- Add custom name draft chip interaction.
- Restyle and simplify filter drawer.
- Simplify routes around the main workspace.
