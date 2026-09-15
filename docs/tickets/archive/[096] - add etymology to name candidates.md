# [096] - Add etymology to name candidates

## Status

Backlog

## Summary

Return each candidate's etymology inline with the name candidates response, as a
nullable `etymology` object on `GivenName`. Meanings are read from the new `meanings`
and `given_name_meaning_bridge` tables. A name can now carry several meanings, each
with an optional language, so the old `short`/`long` meaning shape no longer fits.

## Depends On

- `get_name_candidates` v4 (046) landing.
- [095] landing first, so the two tickets do not make conflicting edits to the same
  files.

## Requirements

- A new `get_name_candidates` migration that returns, per candidate, the data for:

  ```
  {
    id,
    given_name,
    etymology: {
      meanings:  [{ id, text, language: { id, label, flag } | null }],
      languages: [{ id, label, flag }],
      cultures:  [{ id, label, flag }]
    } | null
  }
  ```

- `etymology` is null only when the name has no meanings, languages or cultures.
  When present, all three arrays are present and empty rather than null.
- A meaning's `language` is the full language object, not an id. It is null when
  the bridge row carries no language.
- Cultures are returned now but not used by the frontend in this pass.
- Rewrite `get_etymology` as v2 against the new tables, or retire it. No
  non-generated frontend code calls it.
- Update the db mapping, the `GivenName` and `Etymology` models, and the swagger
  schemas to the new shape.
- Regenerate `openapi.json` and the frontend API client.

## Files

- New migrations in `babeonym-setup/src/database/postGres/`
- `babeonym-backend/src/db/getNameCandidates.ts`
- `babeonym-backend/src/routes/v1/givenName/getNameCandidates.ts`
- `babeonym-backend/src/models/GivenName.ts`
- `babeonym-backend/src/utils/swagger/schema/givenName.ts`
- `babeonym-backend/src/db/getEtymology.ts`
- `babeonym-backend/src/routes/v1/givenName/getGivenNameEtymology.ts`
- `babeonym-backend/src/models/Etymology.ts`
- `babeonym-backend/src/docs/openapi.json`
- `babeonym-frontend/src/api/generated/` — regenerated

## Out Of Scope

- Frontend use of cultures.
- Dropping `given_name_meaning`.
- Components that display etymology.

## Acceptance Criteria

- Every candidate carries `etymology`, null only when the name has no etymology data.
- A non-null `etymology` always has `meanings`, `languages` and `cultures` arrays,
  empty when there is nothing to show.
- Each meaning's `language` is a full `{ id, label, flag }` object or null.
- Nothing reads `given_name_meaning`.
- Query timings hold: about 52ms decade-filtered and about 300ms unfiltered.
- The regenerated client exposes the new shape and the frontend builds clean.
