# Add Mobile Saved Names List Layout

## Goal

Add the mobile-specific layout and loading treatment for the `Your Names` page.

## Requirements

- Configure mobile spacing and layout for the saved-name list.
- Ensure saved-name chips behave cleanly on small screens.
- Add or adapt the loading skeleton for mobile.
- Preserve the desktop saved-name page behavior.

## Likely Implementation Areas

- `src/components/NameList/NameList.tsx`
- `src/components/NameList/NameList.css`
- Existing approved-name/chip components.

## Out Of Scope

- Backend changes.
- Compare names flow.
- Add custom name flow.
- Invite/share flow.
- New saved-name actions beyond what the existing chip already supports.
