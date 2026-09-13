# [095] - Remove popularity percentile from name candidates

## Status

Backlog

## Summary

`get_name_candidates` is being rewritten to serve names in popularity tiers rather
than around a percentile target. The `popularity` request parameter and the
`percentile` response field become dead once that lands, and should be removed from
the backend and the generated client.

## Depends On

The new `get_name_candidates` (v4) landing first — it drops the parameter from the
function signature, so the backend call site breaks until this is done.

## Requirements

- Remove the `popularity` query parameter from the name candidates route, including
  its swagger block.
- Remove the `popularity` argument from the db layer call.
- Stop reading `out_percentile` from the function result.
- Remove `percentile` from the `GivenName` model and its swagger schema.
- Regenerate `openapi.json` and the frontend API client.
- Decide whether `get_name_candidates_meta` is still wanted; it returns
  `out_percentile` and is documented as off the live path.

## Files

- `babeonym-backend/src/routes/v1/givenName/getNameCandidates.ts` — `req.query.popularity`
  and its swagger block
- `babeonym-backend/src/db/getNameCandidates.ts` — `popularity` parameter,
  `row.out_percentile`
- `babeonym-backend/src/models/GivenName.ts` — `percentile?: number`
- `babeonym-backend/src/utils/swagger/schema/givenName.ts`
- `babeonym-backend/src/docs/openapi.json`
- `babeonym-frontend/src/api/generated/` — cleared by regeneration

## Out Of Scope

`given_name_popularity_by_decade.percentile` stays. The column is how `rank` was
derived and nothing here touches it.

## Acceptance Criteria

- The name candidates endpoint accepts no `popularity` parameter and ignores one if
  sent.
- Responses carry no `percentile` field.
- The regenerated client contains no `percentile` on `GivenName`.
- The frontend builds clean; nothing outside `src/api/generated/` referenced it to
  begin with.
