# Current Name Generator And Filter Drawer Behavior

## Purpose

This document captures the current Name Generator and filter drawer behavior before the EPIC-008 unified workspace redesign.

It describes what exists today, what should be preserved intentionally, and what creates redesign pressure.

## Current Routes

- `/` renders the current `NameGenerator`.
- `/list` renders the current saved/approved names list.
- `/compare` renders the current standalone compare names page.
- `/settings` renders account settings.
- `/theme` renders the theme test page.

## Current Name Generator Structure

The current `NameGenerator` composes three main pieces:

- `FilterDrawer`
- `NameEvaluator`
- `MobileNameFilters`

It also owns desktop drawer open state with local component state:

- `drawerOpen`
- `setDrawerOpen`

The generator reads selected filter state and candidate state from the given-name provider, then delegates URL synchronization to `useNameGeneratorUrlFilters`.

## Current Candidate Presentation

`NameEvaluator` displays the first item in `givenNameCandidates` as the current generated-name candidate.

- If candidates are loaded and at least one candidate exists, the first candidate's `givenName` is shown.
- If candidates are loaded but no candidate exists, `no names` is shown.
- If candidates are not loaded, a generated-name skeleton is shown.
- The displayed name is animated when the candidate bridge id changes.
- The user's surname is shown below the generated name when `user.surName` exists.

Generated-name actions:

- `Approve` removes the current candidate, sends an approved action, then reloads approved names.
- `Snooze` removes the current candidate and sends a snoozed action.
- `Reject` removes the current candidate and sends a rejected action.
- If a rejected name is already approved, it is also removed from approved names and approved names are reloaded.

## Current Desktop Drawer Structure

Desktop uses a permanent left MUI drawer.

- The drawer is open by default.
- The drawer can be toggled open or closed with a chevron button.
- Open and closed drawer widths come from CSS variables.
- The drawer background uses the secondary color token.
- The main name evaluator shifts its left padding based on drawer open state.
- The desktop drawer is hidden on mobile.

When open, the drawer renders:

- `Name Filters` section.
- `Approved` section.

When closed, only the drawer shell/header remains visible.

## Current Desktop Filter Section

The desktop filter section is rendered inside `FilterDrawerOpenContent`.

It includes:

- `Name Filters` title.
- Tutorial tooltip around the `Name Filters` title.
- `Collapse All` action.
- Loading skeleton while given-name provider is loading.
- Filter accordions once loading is complete.
- `Set Filters` action button in the section footer.

Current filter accordions:

- Gender
- Decades
- Languages
- Cultures

`Collapse All` closes the top-level filter accordions only.

`Set Filters`:

- collapses all top-level filter accordions
- calls `getNewCandidates()`

## Current Mobile Filter Structure

Mobile renders `MobileNameFilters`.

- Mobile shows a `Name Filters` secondary button.
- Clicking the button opens a bottom MUI drawer.
- Drawer open state lives in `AppLayoutStateProvider` as `mobileFilterDrawerOpen`.
- The mobile filter drawer closes on unmount.
- The mobile drawer contains `MobileNameFiltersSheet`.

The mobile filter sheet includes:

- `Name Filters` mobile section header.
- Close icon button.
- Loading skeleton while given-name provider is loading.
- The same four filter accordions once loading is complete.
- `Set Filters` secondary button.

Mobile `Set Filters`:

- collapses all top-level filter accordions
- closes the mobile drawer
- calls `getNewCandidates()`

Mobile currently does not show the approved-name drawer list.

## Current Filter Option Loading

Reference filter options are loaded by `FilterProvider`.

On provider load, it fetches:

- decades
- cultures
- languages

Cultures and languages are filtered before entering state:

- continents with no populated regions are removed
- regions with no cultures/languages are removed

The filter provider stores available filter options only. Selected filter state lives in the given-name provider.

## Current Selected Filter State

Selected filters are stored in `GivenNameProvider` state:

- `selectedGenders`
- `selectedDecadeIds`
- `selectedLanguageIds`
- `selectedCultureIds`

Filter selection actions mutate this state immediately:

- add selected genders
- remove selected genders
- add selected decade ids
- remove selected decade ids
- add selected language ids
- remove selected language ids
- add selected culture ids
- remove selected culture ids

Selection actions dedupe added values with `Set`.

Selecting or removing a filter does not directly fetch new candidates. The new candidates request happens through `Set Filters`, URL initialization, or initial provider load.

## Current URL Filter Sync

Filters are URL-backed through `useNameGeneratorUrlFilters`.

Supported query params:

- `genders`
- `decades`
- `languages`
- `cultures`

On initial mount:

- URL params are parsed.
- Valid gender strings are converted to gender values.
- decade/language/culture params are parsed as numbers.
- parsed values are added to selected filter state.
- if any parsed filters exist, `getNewCandidates()` is called with those parsed values.

During normal usage:

- when `givenNameCandidates` changes, selected filters are written back into the URL.
- URL updates use `replace: true`.
- empty selected filter categories are omitted from the URL.

Current implication:

- The URL reflects selected filters after candidate updates.
- Filter selection itself does not immediately write to the URL until candidates change.

## Current Candidate Requests

`getNewCandidates()` builds a request from either explicit arguments or current selected filter state.

Request fields:

- `genders`
- `decadeIds`
- `languageIds`
- `cultureIds`

Selected arrays are joined into comma-separated strings before calling the generated API client.

Initial provider load:

- fetches new candidates without filters unless URL filter initialization also runs
- fetches approved names
- marks the given-name provider loaded

## Current Gender Filter Behavior

Gender is a top-level accordion.

- It displays the fixed `GenderValues` list.
- Each gender is rendered as a checkbox-style `FilterListItem`.
- Clicking an unselected gender adds it.
- Clicking a selected gender removes it.
- Gender has no search field.
- Gender has no category-level select-all or clear action.

## Current Decade Filter Behavior

Decades are a top-level accordion.

- Decade options come from reference API state.
- A numeric search field filters displayed decades by whether `decade.label.includes(searchValue)`.
- Each decade is rendered as a checkbox-style `FilterListItem`.
- Clicking an unselected decade adds it.
- Clicking a selected decade removes it.
- If any decades are selected, an `Unselect all` utility item appears at the top.
- Decades do not currently have an empty search result message.

## Current Language Filter Behavior

Languages are a top-level accordion.

- Language options are grouped by continent and region.
- A search field filters nested language options.
- Search strips non-letter characters and lowercases before matching.
- Search matches `language.label`.
- Continents with no matching regions are hidden.
- Regions with no matching languages are hidden.
- Each continent has its own local expanded/collapsed state.
- Each region has its own local expanded/collapsed state.
- Each region shows `Select all` or `Unselect all` when the region has more than three language options.
- Each language is rendered as a checkbox-style `FilterListItem`.
- Language labels include the language flag.
- Languages do not currently have an empty search result message.

## Current Culture Filter Behavior

Cultures are a top-level accordion.

- Culture options are grouped by continent and region.
- A search field filters nested culture options.
- Search strips non-letter characters and lowercases before matching.
- Search matches `culture.label`.
- Continents with no matching regions are hidden.
- Regions with no matching cultures are hidden.
- Each continent has its own local expanded/collapsed state.
- Each region has its own local expanded/collapsed state.
- Each region shows `Select all` or `Unselect all` when the region has more than three culture options.
- Each culture is rendered as a checkbox-style `FilterListItem`.
- Cultures do not currently have an empty search result message.

## Current Filter Item Affordance

Filter options use `FilterListItem`.

- Selected state is shown with a checked checkbox icon.
- Unselected state is shown with an empty checkbox icon.
- Utility rows can use `variant="utility"`.
- Filter item labels are plain strings.

## Current Approved Names In Drawer

The desktop drawer currently includes an `Approved` section below `Name Filters`.

The approved section:

- wraps the title in a tutorial tooltip labeled `Names you saved`
- displays the first three approved names
- renders approved names using `ApprovedGivenNameChip`
- animates chip presence with `AnimatePresence`
- includes a `View Full Name List` drawer action button
- navigates to `/list` when clicked

This is a major redesign pressure for EPIC-008 because approved names are moving into the persistent main workspace list.

## Current Tutorial Touchpoints

Current Name Generator tutorial hooks include:

- `Name Filters` tooltip in the desktop drawer.
- `Approved` tooltip in the desktop drawer.
- generated-name tooltip around the displayed candidate.
- mobile tutorial hint for the displayed candidate.
- action-button tooltip around the snooze action.

Tutorial behavior will need review when the drawer becomes a contextual filter surface and approved names leave the drawer.

## Current Missing Or Weak Behavior

- Applied filters are only visible inside their expanded category controls.
- There is no global applied-filter summary.
- Applied filters are not grouped visibly by category outside the controls.
- Applied filters cannot be removed from a collapsed summary because no summary exists.
- There is no global clear-all filters action.
- Setting filters happens separately from selecting/removing filter options.
- Selecting/removing a filter does not immediately refresh the generated candidate.
- URL params are updated after candidate changes, not immediately on selection changes.
- Search empty states are not displayed.
- Filter option loading/error/empty states are minimal.
- Desktop and mobile share filter accordions but use different surfaces and action buttons.
- The desktop drawer mixes generated-candidate controls with approved-name list context.
- The drawer placement forces the generator layout to account for drawer width.

## Redesign Constraints To Preserve

- Filters should remain URL-backed.
- Existing filter categories should remain available unless intentionally changed.
- Users should be able to search decade, language, and culture options.
- Users should be able to manually browse all filter categories.
- Applying/removing/clearing filters should fetch a new generated candidate in the redesigned flow.
- Approved names should move out of the filter drawer and into the unified workspace list.
- Filters should control generated-name candidates only.
- Compare mode and approved-name rankings should not be filtered by generator filters.
