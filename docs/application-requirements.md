# Babeonym Application Requirements

## Product Goal

Babeonym helps users discover, save, and refine baby names through a lightweight loop that should feel easy to continue:

- generate or add names
- approve names into a saved list
- compare approved names
- refine the ranked list over time

The application should reduce navigation friction and keep users oriented around the ranked list they are building.

## Core Loop

- Users evaluate one generated name at a time.
- Users can approve, snooze, or reject generated names.
- Approved names are collected into a persistent ranked list.
- Users can compare two approved names at a time.
- Compare votes should refine the approved-name ranking.
- Users can manually add a custom name directly into the approved-name list.
- The ranked approved-name list is the main artifact of the application.

## Primary Workspace

- The name workflow should live in one primary workspace.
- The root route should become the primary name workspace unless explicitly changed.
- Name workflow modes should be controlled inside the workspace rather than by separate pages.
- Workspace mode should be URL-backed so it can be restored, bookmarked, and shared.
- `Add Name` is the default workspace mode.
- `Compare Names` is a sibling workspace mode.
- The approved-name ranked list should stay visible below the active workspace mode.
- Account-related screens may remain separate routes.

## Workspace Utility Divider

- The previous subsection header/divider should become a contextual utility surface.
- In Name Generator mode, the utility surface should become the filter summary and filter drawer entry point.
- In Compare Names mode and other non-generator contexts, the utility surface should collapse to a thin color divider.
- The utility surface should delineate sections without creating redundant page headers.
- From a user-understanding perspective, the filter drawer should read as part of Name Generator mode.

## Name Generator Requirements

- Name Generator mode controls generated-name candidates.
- The generated-name candidate should be presented clearly as the current item to evaluate.
- Approve, snooze, and reject actions should remain the primary generated-name actions.
- Approving a generated name should add it to the approved-name list.
- Snoozing or rejecting should move to a new generated-name candidate.
- Applying, removing, or clearing filters should change the currently presented generated name, even if the current name is not affected by the changed filter.
- Name Generator mode should not own approved-name list presentation.

## Filter Requirements

- Filters control generated-name candidates only.
- Filters should not control:
  - which approved names are visible
  - which approved names can be compared
  - how approved names are ranked
  - which saved names count
- Applied filters should be visible during Name Generator mode.
- Applied filters should be removable during Name Generator mode.
- Available filters should be available to apply during Name Generator mode.
- Applying a filter should be visible to the user.
- Applying a filter should change the currently presented generated name.
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
- Filter controls should not obscure the generated-name result in a way that makes immediate changes hard to see.
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

## Approved Names Requirements

- Approved names should appear as a persistent ranked list in the main workspace.
- Approved names should use the approved-name chip component for visual consistency.
- Ranking numbers may be shown if they are visually subtle.
- Internal score/rating values should not be shown to users.
- Approved-name ranking should be based on backend-provided ranking data.
- The frontend should not replicate backend ranking math.
- The list should support loading and empty states.
- Users should be able to delete approved names.
- Future drag-to-rerank behavior should be considered, but backend behavior must be defined first.

## Custom Name Requirements

- Custom names should be added from the approved-name list area.
- The custom-name entry point should use a visible `+` affordance.
- Clicking `+` should create an inline draft chip.
- The draft chip should contain a focused text field.
- The draft chip should use the same interaction family as approved-name chips.
- Saving should use a distinct save affordance, likely a semantic secondary/accent treatment.
- The save affordance should stay in the same placement pattern as existing chip actions.
- Empty custom names should not be saved.
- Custom names should bypass generator filters because the user is intentionally adding a specific name.
- Hidden click-to-edit generated-name behavior may be considered later as a power-user enhancement, but is not the default custom-name entry path.

## Compare Names Requirements

- Compare Names should be an internal workspace mode.
- Users should compare two approved names at a time.
- The pair should be selected randomly from approved names.
- Voting should optimistically advance to the next pair.
- Votes should be sent to the backend without blocking the next comparison.
- Ranking updates should come from approved-name provider/backend updates.
- Compare mode should not require return-to-list navigation because the ranked list remains visible in the workspace.
- Compare mode should not expose internal score/rating values.

## Account Requirements

- The app supports anonymous usage.
- Users should never be required to create an account to use the core app.
- Account creation is session preservation, not access control.
- Account prompts should communicate saving or preserving progress, not unlocking continued use.
- Account prompts should appear when the user has created enough saved value that preservation feels helpful.
- Approved-name count is the first preferred signal for account prompt timing.
- Account prompt thresholds should be configurable rather than hardcoded.
- Initial candidate thresholds include:
  - after `10` approved names
  - after `20` approved names
  - after `30` approved names
  - then stop prompting unless a separate account CTA is intentionally shown
- Prompt copy should frame account creation as helping users save or protect the list they have built.
- Prompt copy should not imply that account creation is required to continue using the app.
- Account prompts should be optional and dismissible.
- Accounts are currently managed through Google OAuth.
- Microsoft OAuth may be added later.
- Anonymous usage is connected to cookie and session data.
- Anonymous saved names, custom names, and ranking data should convert into the created account.
- Backend behavior should be confirmed before implementation because this was built earlier and may need review.
- Creating an account should help users preserve or restore work across devices, browsers, and sessions.
- Filters are treated as UI/URL state rather than anonymous persisted account-conversion data.
- Surname and theme features should be account-backed rather than anonymous persisted data.
- Themes and last-name features should be tied to account creation or account-backed persistence.
- Account-related routes may remain separate from the main name workspace.
- If account-saved filter defaults are added later, URL filter params should override saved defaults when present.

## Terminology

- Preferred user-facing labels:
  - `Add Name`
  - `Compare Names`
  - `Your Names`
  - `Filters`
- Avoid a prominent `Rankings` label in the main UI.
- Ranking order should be implied by the approved-name list.
- Subtle rank numbers are acceptable if they help orientation without making the UI feel overly competitive.

## MVP Boundary

- MVP includes:
  - unified name workspace
  - Add Name mode
  - Compare Names mode
  - persistent approved-name list
  - custom name add flow
  - URL-backed filters
  - SSE/live approved-name updates
  - heavier interaction animations
- Post-MVP includes:
  - drag-to-rerank
  - Microsoft OAuth
  - generated-name inline editing, pending future product decision

## Loading And Feedback

- Loading states should use skeletons where appropriate.
- User actions should provide clear active feedback.
- Once loaded, the UI should prioritize feeling snappy and responsive.

## Error Behavior

- The app should have a general app-error page or state.
- Error feedback should be defined case by case as features are implemented.
- Error handling should preserve user trust and avoid implying data loss unless confirmed.

## Navigation And Routes

- The primary name workflow should not be spread across separate generator, list, and compare pages.
- The main workspace should use internal URL-backed mode state.
- Legacy name workflow routes may redirect into the main workspace during migration.
- Account/settings routes may remain separate.
- Dev-only routes may remain if useful.

## UI And Engineering Requirements

- Components should do one clear thing.
- Page/workspace components may compose sections, but should not hide large render branches.
- Components own their visual styling.
- Parents own placement and layout only.
- Child component internals should not be styled from parent stylesheets.
- Shared component variations should use explicit props or variants.
- Every `.tsx` component must have a sibling `.css` file, even if the CSS file is empty.
- Colors, shadows, borders, and design-system values should use theme tokens.
- Do not hardcode raw colors in component or page CSS.
- Functions over 50 lines should be reviewed for possible refactor.
