# [120] Publish meanings to production

## Status

Backlog

## Summary

The `meanings` and `given_name_meaning_bridge` tables (044) never reached
production, so prod shows no meanings. Get them there.

## Context

- 055's etymology function reads these tables and is already in prod.
- Filled by `npm run pipeline -- meanings:publish` in babeonym-setup.
- The bridge references `given_names.id`. Dev and prod ids may not match, so
  copying rows straight across could attach meanings to the wrong names. Publish
  against prod, or match on name text.

## Open

- Do the tables exist in prod but empty, or not at all?

## Acceptance Criteria

- Prod has meanings, and a known name (Mary, Thomas) shows the same meanings as
  dev.
