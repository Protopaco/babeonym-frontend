# [111] Apply folder-per-component across the frontend

## Status

Backlog

## Summary

Move every component in `src/components/` and `src/pages/` into a folder named
after itself, nesting child components inside their parent's folder. Pure
relocation — no behaviour changes, no renamed components, no CSS rule changes.
The only edits to file contents are import paths.

## Context

The app is meant to follow one pattern: a component lives in a folder named after
it, and components that belong to it live in subfolders of that folder. Keeping
things in folders reduces the number of items to scan at any one level.

It was never applied consistently. 35 components currently sit loose inside a
folder named after some *other* component, and 13 hooks and helpers sit loose
next to the components that use them.

The refactor is unusually low risk. Every cross-file import in `components/` and
`pages/` goes through the `@/` alias — there are zero relative TS imports. There
are no barrel files, no `React.lazy` or dynamic `import()`, and no test files.
Nothing resolves a path by walking directories, so a move can only break import
*strings*, and `tsc` catches every one of those.

The exception is CSS. `tsc` does not resolve `.css` imports, so a stylesheet left
behind by a move surfaces only at build time. The production build is the real
check here.

## Decisions

1. **Component folders are named after their component.** Pure grouping folders
   (`Shared/`, `Settings/`, `NameWorkspace/`, `Header/`, `NameGenerator/`) contain
   no same-named component and stay as they are.
2. **Child components nest inside their parent's folder**, e.g.
   `Shared/PrimaryButton/PrimaryButtonSkeleton/`.
3. **A hook or helper with exactly one consumer moves into that consumer's
   folder.** With consumers in different folders it stays at the nearest common
   parent. If its only consumers are themselves moving into one folder, it
   follows them.
4. **Component name wins over folder name.** `CompareNames/` becomes
   `CompareNamesMode/`, after the component inside it, with `CompareNameChip/`
   nested inside.
5. **`pages/` follows the pattern; the `src/` root does not.** `App.tsx`,
   `router.tsx`, `main.tsx` and `AppLayout.tsx` stay flat.
6. **A component's own stylesheet is imported as `'./Foo.css'`** — the single
   permitted exception to the `@/` alias rule, since the two files are now always
   siblings. Genuinely cross-folder CSS imports stay absolute.

## Requirements

### Component folders (35)

| Parent | Components gaining a folder | Count |
|---|---|---|
| `NameWorkspace/WorkspaceFilterSurface/` | `FilterColumn`, `FilterPicker`, `CultureFilterColumn`, `DecadeFilterColumn`, `GenderFilterColumn`, `LanguageFilterColumn`, `WorkspaceAppliedFilterChip`, `WorkspaceClearFiltersButton`, `WorkspaceFilterActions`, `WorkspaceFilterLayout`, `WorkspaceFilterToggle` | 11 |
| `NameWorkspace/WorkspaceApprovedNames/` | `CustomNameChip`, `WorkspaceAddNameItem`, `WorkspaceApprovedNameItem`, `WorkspaceApprovedNamesList`, `WorkspaceApprovedNamesSkeleton`, `WorkspaceCustomNameDraftActions`, `WorkspaceCustomNameDraftItem` | 7 |
| `NameGenerator/NameEvaluator/` | `CandidateErrorMessage`, `EvaluatedNameDisplay`, `ExhaustedNameMessage`, `NameEvaluationActions`, `NameLimitMessage` | 5 |
| `Header/TopBar/` | `DesktopTopBar`, `MobileTopBar`, `MobileAccountButton`, `MobileTutorialToggle` | 4 |
| `Settings/AboutButton/` | `AboutModal`, `CopyEmailButton` | 2 |
| `Header/` | `LogoutConfirmDialog` (promoted out of `LogoutButton/`) | 1 |
| `Header/AuthModal/` | `AuthProviderButton` | 1 |
| `NameGenerator/MobileNameFilters/` | `MobileFilterDrawer` | 1 |
| `Settings/DeleteAccountButton/` | `DeleteAccountDialog` | 1 |
| `Shared/PrimaryButton/` | `PrimaryButtonSkeleton` | 1 |
| `components/` | `CompareNames/` → `CompareNamesMode/` (folder rename) | 1 |

`Header/LogoutButton/` disappears — it is named for a component that never
existed. Its two files are redistributed by the rules above.

### Hooks and helpers (13)

Into their sole consumer's folder: `useCompareNamePair` and
`useCompareNameVoting` → `CompareNamesMode/`; `useMobileAppliedFilterChips` →
`MobileNameFilters/`; `useNameEvaluationActions` → `NameEvaluator/`;
`useApprovedNamesReorder` → `WorkspaceApprovedNamesList/`; `useCustomNameDraftChip`
→ `CustomNameChip/`; `useWorkspaceFilterDraftState` → `WorkspaceFilterLayout/`;
`useDeleteAccount` → `DeleteAccountButton/`; `useThemePicker` → `ThemePicker/`;
`useSettings` → `pages/Settings/`.

Following a cascade (their only consumers are themselves moving):
`compareNames.types.ts` → `CompareNamesMode/`; `useWorkspaceFilterCategory` →
`WorkspaceFilterLayout/`.

Staying at parent level, having consumers in different folders: `useLogout` →
`Header/useLogout.ts`; `mobileFilterCategories` stays in `MobileNameFilters/`.

### Page folders (4)

`pages/ErrorPage/`, `pages/NameWorkspace/`, `pages/Settings/` (absorbing
`useSettings.ts`) and `pages/ThemeTest/`, each taking its `.tsx` and `.css`.

### Execution

One parent folder at a time, with `tsc` run after each, so a broken import is
attributable to the group just moved rather than to 35 interleaved moves. Per
component: create the folder, move the `.tsx`, `.css` and any hook that follows
it, rewrite that component's own CSS import to `'./Foo.css'`, then rewrite every
`@/`-aliased importer of the moved files.

Order, smallest blast radius first: `Shared/` → `Settings/` → `Header/` →
`CompareNames/` → `NameGenerator/` → `NameWorkspace/` → `pages/`.

## Open Questions

- **Resolved — `writeFilterIds.ts` moves to `src/utils/`.** Its consumers cross two
  top-level features (`WorkspaceFilterSurface/` and `NameGenerator/MobileNameFilters/`),
  so rule 3 on its own would have left it where it was. It is the write half of a
  round trip whose read half, `parseFilterIds.ts`, already sits in `src/utils/`
  beside `serializeFilterIds.ts`, and splitting that pair across two homes is what
  settled it. Moved, with its three importers rewritten.

## Out Of Scope

- **`WorkspaceApprovedNamesSkeleton`'s two cross-folder CSS imports.** These are
  intentional: the skeleton shares the stylesheets of the components it stands in
  for, so that it matches them. They stay absolute after the move.
- **The `src/` root**, per decision 5.
- **The pre-existing `react-refresh/only-export-components` lint errors** on the
  repo-wide anonymous default export pattern. Unrelated to this work.
- **Any behaviour, styling or naming change.** If a move reveals a bug, surface
  it rather than fixing it here.

## Acceptance Criteria

- Every component in `src/components/` and `src/pages/` sits in a folder named
  after it, with its sibling `.css`.
- No component folder contains a `.tsx` named after a different component.
- `npx tsc -b --force` passes.
- `npx eslint` on the changed files reports only the pre-existing anonymous
  default export errors.
- `npx prettier --check` passes on the changed files.
- A production build succeeds — the check that proves no stylesheet was
  stranded.
- A grep for `@/components/….css'` imports returns nothing outside
  `WorkspaceApprovedNamesSkeleton`.
- The app is verified visually against the current build: same screens, same
  styling, no missing CSS.

## Files

Roughly 48 files move, and every file importing one of them is touched. No file
is created or deleted other than folders.
