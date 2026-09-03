# Simplify Routes Around The Main Workspace

## Requirements Reference

- `docs/application-requirements.md`

## Goal

Simplify name workflow routes so the main app experience lives under the root workspace instead of separate generator, list, and compare destinations.

## Context

The product direction is one primary name workspace. Routes should represent genuinely different destinations, such as account/settings, rather than each mode of the name workflow.

## Scope

- Decide the final route shape for the unified workspace.
- Make `/` the primary name workspace if approved.
- Represent workspace mode as a query param instead of a path:
  - `/?mode=add`
  - `/?mode=compare`
- Default to Name Generator/Add Name mode when no mode param is present.
- Remove normal navigation to separate name workflow routes.
- Convert old routes to redirects where needed:
  - `/list`
  - `/compare`
- Keep account/settings routes separate.
- Preserve dev-only routes if still useful.

## Acceptance Criteria

- The name workflow has one primary route.
- Internal workspace state controls name modes.
- Workspace mode can be restored from URL state.
- Users are not required to navigate between generator/list/compare pages.
- Legacy routes redirect cleanly if they remain.
- Account/settings routes remain separate from the name workflow.

## Notes

- This ticket should happen after the unified workspace behavior is clear.
- Avoid deleting legacy routes until redirect behavior and navigation expectations are agreed.
