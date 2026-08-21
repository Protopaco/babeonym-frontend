# Fix filter URL params for languages decades and cultures

URL params for languages, decades, and cultures are not populating correctly.

Investigate and fix query param serialization/parsing for filter state.

Notes:
- Verify the param names used when writing filters to the URL.
- Verify the param names used when reading filters from the URL.
- Pay attention to singular/plural mismatch risk, especially `culture` vs `cultures`.
- Preserve current selected filter behavior.
- Do not touch generated API files.
