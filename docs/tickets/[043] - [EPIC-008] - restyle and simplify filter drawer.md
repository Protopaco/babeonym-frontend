# Restyle And Simplify Filter Drawer

## Goal

Reimagine the filter drawer after approved names move into the unified workspace.

## Context

The current filter drawer is trying to carry too much product weight. Once approved names live in the main workspace, the drawer can focus on helping users generate better names.

The former subsection header/divider should become the filter drawer surface during Name Generator mode. Outside Name Generator mode, that surface should collapse back to a thin anonymous color divider.

## Scope

- Use the current-state documentation from ticket 038 as the redesign baseline.
- Remove approved-name list responsibilities from the drawer.
- Reconsider filter hierarchy and information density.
- Reconsider desktop drawer layout.
- Reconsider mobile filter presentation.
- Reconsider search visibility and nested filter behavior.
- Preserve filter functionality unless a change is explicitly approved.
- Preserve tutorial support where it still helps.
- Define collapsed, expanded, and inactive states for the filter drawer surface.
- Animate the drawer surface between states:
  - thin divider in non-generator modes
  - collapsed filter summary in Name Generator mode
  - expanded filter controls in Name Generator mode
- Provide a `Set Filters` action that returns the drawer to the collapsed filter summary state.

## Filter Requirements

- Applied filters should be visible during Name Generator mode.
- Applied filters should be removable during Name Generator mode.
- Available filters should be available to apply during Name Generator mode.
- Applying a filter should be visible to the user.
- Applying a filter should change the currently presented generated name, even if that name is not affected by the filter.
- Removing a filter should change the currently presented generated name.
- Clearing all filters should change the currently presented generated name.
- Users should be able to search through filter options for decade, culture, and language.
- Users should be able to manually review filter options for all filter categories.
- A clear-all-filters option should be available.
- Active filter state should be obvious before opening detailed controls.
- Applied filters should include enough category context to avoid ambiguity.
- Empty search states should be handled clearly.
- Loading, error, and empty states for available filters should be handled intentionally.
- Mobile users should be able to apply, remove, search, browse, and clear filters with the same effective functionality as desktop users.
- Filter controls should not obscure the generated-name result in a way that makes the immediate change hard to see.
- Filter state should remain URL-backed so filtered generator states are bookmarkable and shareable.
- If account-saved filter defaults are added later, URL filters should override saved defaults when URL filter params are present.

## Filter Surface States

- Inactive state:
  - Used outside Name Generator mode.
  - Renders as a thin color divider.
  - Does not show filter labels, filter chips, or filter controls.
- Collapsed Name Generator state:
  - Shows a `Filters` label.
  - Shows a chevron or equivalent affordance to expand.
  - Shows active filters grouped under their category labels.
  - Allows applied filters to be removed without opening the full drawer.
- Expanded Name Generator state:
  - Shows available filter categories.
  - Supports search for decade, culture, and language options.
  - Supports manual browsing for all filter categories.
  - Provides clear-all and set-filters actions.
  - Collapses back to the filter summary when filters are set.

## Filter Boundary

Filters control generated-name candidates only.

Filters should not control:

- which approved names are visible
- which approved names can be compared
- how approved names are ranked
- which saved names count

Custom names should bypass generator filters because the user is intentionally adding a specific name.

## Acceptance Criteria

- The filter drawer no longer depends on approved-name list UI.
- The drawer is visually simpler and easier to understand.
- Desktop and mobile behavior are intentionally designed.
- Existing filter behavior is preserved unless otherwise documented.
- Filter behavior follows the generated-candidates-only boundary.
- Filter state remains URL-backed.
- The filter surface collapses to a thin divider outside Name Generator mode.
- The collapsed Name Generator surface shows active filters grouped by category.
- The expanded Name Generator surface supports applying, removing, searching, browsing, clearing, and setting filters.
- Component styling remains owned by filter components.
- Theme tokens are used for all colors, shadows, and borders.

## Notes

- Do not start this before ticket 038 documents the current drawer.
- This is a design and implementation ticket and may need to be split if it grows.
