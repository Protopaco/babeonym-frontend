# Test id location reference

Closed list of locations for `data-testid` values in this app. The first segment
of every test id must be a location from this table. Format rules are in the
`ui-testing` skill (`test-ids.md`).

To add a location, propose a row and get approval first.

| Location | Covers | Source folder |
|---|---|---|
| `header` | top bar, account link, settings link, logout dialog | `src/components/Header` |
| `auth` | sign-in modal and Google sign-in button | `src/components/Header/AuthModal` |
| `generator` | candidate display and approve/reject actions | `src/components/NameGenerator` |
| `filters` | filter columns, applied chips, filter drawer | `src/components/NameWorkspace/WorkspaceFilterSurface`, `src/components/NameGenerator/MobileNameFilters` |
| `workspace` | approved names list and custom names | `src/components/NameWorkspace` |
| `compare` | compare names mode | `src/components/CompareNamesMode` |
| `settings` | settings page, theme picker, delete account | `src/components/Settings`, `src/pages/Settings` |
| `error` | error page | `src/pages/ErrorPage` |

Shared components (`src/components/Shared`) have no location of their own. They
take the location of the screen they are rendered on.
