# [058] - [EPIC-008] - Remove Desktop Checkboxes From Filters

## Goal

Remove checkbox visuals from the desktop filter option rows while preserving
existing filter selection behavior.

## User Story

As a user, I want desktop filter options to feel like selectable filter rows
rather than form checkboxes, so the filter surface stays simpler and easier to
scan.

## Scope Decision

Desktop only. Mobile keeps its checkboxes.

The two surfaces show selection differently, so the same change does not suit
both. `FilterPicker` removes a selected option from the list and shows it as a
chip in the `Selected` area below, which means its checkbox could never render
as checked and carried no information. `MobileFilterList` keeps selected options
inline, so there the checkbox is the only indicator of selection and is doing
real work.

## Requirements

- Remove the checkbox control from the desktop filter option rows.
- Preserve existing filter selection behavior.
- Leave the mobile filter list and its checkboxes unchanged.
- Preserve applied filter chips and existing URL-backed filter state.
- Do not change filter data loading or account/auth behavior.
- Do not redesign the broader filter bar or drawer in this ticket.

## Implementation Notes

- Component-owned styling should stay with the filter option/filter list
  components.
- Parent workspace/filter surfaces should continue to own placement only.
- No replacement selected-state treatment is needed on desktop, because the
  `Selected` chip area already carries that state.

## Acceptance Criteria

- Desktop filter options no longer show checkbox visuals.
- Users can still select and deselect every filter option type on desktop.
- Selected desktop filters still appear as chips in the `Selected` area.
- Mobile filter options still show checkboxes and behave as before.
- Existing filter URL params continue to work.
