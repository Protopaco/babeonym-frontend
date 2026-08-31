# [050] - replace generated name url filter refresh flow

## Status

Backlog

## Summary

Replace the removed legacy `useNameGeneratorUrlFilters` behavior with a new URL-backed generated-name filter refresh flow that matches the unified workspace filter design.

## Context

The old `useNameGeneratorUrlFilters` hook connected selected filter state, URL query params, and generated-name candidate refresh. It was tied to the old filter drawer flow and became unused during the unified workspace refactor.

The new filter drawer currently owns draft and committed URL-backed filters, but the generated-name candidate refresh flow should be rebuilt intentionally after the backend filter API/data shape is clarified.

## Requirements

- Preserve bookmarkable and shareable filter URLs.
- Read committed filter query params from the URL.
- Write committed filters to the URL when filters are set.
- Use committed URL filters to request generated-name candidates.
- Applying filters should produce a new presented generated name, even if the current name may still match the filters.
- Keep draft filter selection local to the drawer until the user sets filters.
- Do not reintroduce the old desktop filter drawer state model.
- Coordinate this work with backend filter API/data shape cleanup.

## Acceptance Criteria

- Loading a URL with filter params initializes generated-name candidate filtering.
- Setting filters updates the URL and refreshes generated-name candidates.
- Removing an applied filter updates the URL and refreshes generated-name candidates.
- Clearing filters updates the URL and refreshes generated-name candidates.
- The filter refresh behavior is owned by the new unified workspace filter flow.
