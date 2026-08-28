# Component Skill Review

Last updated: 2026-08-27

Review basis:

- `paul-development-workflow`
- `react-frontend-engineering`

This is a review note only. It documents components that should be revisited under the React frontend engineering skill.

## Styling Ownership

These components have styling owned by a parent or page stylesheet instead of their own component stylesheet:

- Resolved: `src/components/CompareNames/CompareNameButton.tsx`
  - Previously styled by `src/pages/CompareNames.css` through `.compare-names-option`.
  - This has since been moved to `src/components/CompareNames/CompareNameButton.css`.
- Resolved: `src/components/CompareNames/CompareNamesContent.tsx`
  - Previously emitted empty/link/workspace classes styled by `src/pages/CompareNames.css`.
  - This has since been moved to `src/components/CompareNames/CompareNamesContent.css`.
- Resolved: `src/components/CompareNames/CompareNameRankings.tsx`
  - Previously styled entirely by `src/pages/CompareNames.css`.
  - This has since been moved to `src/components/CompareNames/CompareNameRankings.css`.
- Resolved: `src/pages/CompareNames.css`
  - Previously used `.compare-name-ranking .approved-given-name-chip { width: 100%; }` to reach into `ApprovedGivenNameChip`.
  - This was removed in favor of the chip's component-owned size API.
- `src/components/NameGenerator/FilterDrawer/FilterDrawer.css`
  - Drawer owns a lot of accordion internals.
  - This suggests the accordion styling contract is missing or should be component-owned.
- `src/components/NameGenerator/MobileNameFilters/MobileNameFilters.css`
  - Styles `SecondaryButton`, `MobileSectionHeader`, accordion internals, `FilterSearchField`, and `.decades-filter-list` from the parent.

## Components Doing Too Much

These components should be reviewed for responsibility splits:

- `src/components/NameList/NameList.tsx`
  - Page layout, loaded/empty/skeleton states, list rendering, and compare action all live together.
- `src/components/NameGenerator/NameGenerator.tsx`
  - Component composition plus URL param serialization/hydration plus filter dispatching.
- `src/components/NameGenerator/NameEvaluator/NameEvaluator.tsx`
  - Data selection, approve/reject/snooze actions, animation, tutorial display, desktop controls, and mobile controls.
- `src/components/NameGenerator/FilterDrawer/FilterDrawer.tsx`
  - Drawer shell, animation, filter accordion state, collapse all, set filters, loading state, and approved drawer section.
- `src/components/NameGenerator/MobileNameFilters/MobileNameFilters.tsx`
  - Mobile drawer shell, global layout state, filter accordion state, loading state, and set filters.
- Resolved: `src/pages/CompareNames.tsx`
  - Previously mixed page layout with compare vote submission behavior.
  - Vote behavior has since been moved to `src/components/CompareNames/useCompareNameVoting.ts`.
- Language and culture accordion pairs
  - `src/components/NameGenerator/LanguageAccordion/LanguageAccordion.tsx`
  - `src/components/NameGenerator/LanguageAccordion/RegionAccordion/RegionAccordion.tsx`
  - `src/components/NameGenerator/CultureAccordion/CultureAccordion.tsx`
  - `src/components/NameGenerator/CultureAccordion/RegionAccordion/RegionAccordion.tsx`
  - These repeat the same search, nested display, selection, and toggle-all shape.

## Over 50 Lines

Any function/component over 50 lines should trigger refactor review under the skill. These files were over the threshold in the inspection pass:

- `src/components/CompareNames/CompareNamesContent.tsx`: 61
- `src/components/NameGenerator/CultureAccordion/CultureAccordion.tsx`: 60
- `src/components/NameGenerator/CultureAccordion/RegionAccordion/RegionAccordion.tsx`: 81
- `src/components/NameGenerator/DecadesAccordion/DecadesAccordion.tsx`: 83
- `src/components/NameGenerator/FilterDrawer/FilterDrawer.tsx`: 116
- `src/components/NameGenerator/GenderAccordion/GenderAccordion.tsx`: 52
- `src/components/NameGenerator/LanguageAccordion/LanguageAccordion.tsx`: 61
- `src/components/NameGenerator/LanguageAccordion/RegionAccordion/RegionAccordion.tsx`: 81
- `src/components/NameGenerator/MobileNameFilters/MobileNameFilters.tsx`: 101
- `src/components/NameGenerator/NameEvaluator/NameEvaluator.tsx`: 123
- `src/components/NameGenerator/NameGenerator.tsx`: 88
- `src/components/NameList/NameList.tsx`: 73
- Resolved: `src/pages/CompareNames.tsx`: previously 64
- `src/pages/ThemeTest.tsx`: 175

## Suggested Cleanup Order

1. Split `NameList` into page, list, empty state, and skeleton/action components.
2. Extract shared filter accordion structure and move accordion visual styling into component-owned styles.
