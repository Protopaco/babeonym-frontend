# Build Desktop Saved Names List Page

## Goal

Build the desktop `Your Names` page using already-available saved/approved name data.

## Requirements

- Replace the current placeholder `NameList` page for desktop.
- Add the `Your Names` section title.
- Render saved/approved names using the existing name chip component.
- Add a desktop loading skeleton.
- Use existing frontend state/API data; no backend changes should be required.

## Likely Implementation Areas

- `src/components/NameList/NameList.tsx`
- `src/components/NameList/NameList.css`
- Existing approved-name/chip components.
- Existing given-name state/provider data.

## Out Of Scope

- Mobile-specific layout/config.
- Compare names flow.
- Add custom name flow.
- Invite/share flow.
- New saved-name actions beyond what the existing chip already supports.
