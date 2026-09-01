# [058] - [EPIC-008] - Remove Checkboxes From Filters

## Goal

Remove checkbox visuals from filter option rows while preserving existing filter selection behavior.

## User Story

As a user, I want filter options to feel like selectable filter rows rather than form checkboxes, so the filter surface stays simpler and easier to scan.

## Requirements

- Remove checkbox icons or controls from filter option rows.
- Preserve existing filter selection behavior.
- Keep selected and unselected states visually clear without checkbox marks.
- Apply the change to gender, decade, language, and culture filter surfaces where checkbox visuals appear.
- Preserve applied filter chips and existing URL-backed filter state.
- Do not change filter data loading or account/auth behavior.
- Do not redesign the broader filter bar or drawer in this ticket.

## Implementation Notes

- Selected state should be communicated through the filter row or option styling.
- Component-owned styling should stay with the filter option/filter list components.
- Parent workspace/filter surfaces should continue to own placement only.

## Acceptance Criteria

- Filter options no longer show checkbox visuals.
- Users can still select and deselect every filter option type.
- Selected filter options remain visually distinct.
- Applied filters still appear in the filter summary/chip area.
- Existing filter URL params continue to work.
