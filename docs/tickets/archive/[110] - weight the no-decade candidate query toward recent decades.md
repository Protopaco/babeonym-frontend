# [110] - Weight the no-decade candidate query toward recent decades

## Status

Backlog

## Summary

With no decade filter, candidates are ranked by all-time occurrences, so the top
tiers are names that were popular across a century rather than names in use now.
Most users starting out do not want 1880s names. Weight the unfiltered ranking
toward the last four decades.

## Context

- `get_name_candidates` reads `given_name_popularity_by_decade` when a decade
  filter is set and `given_name_popularity_overall` when one is not.
- `given_name_popularity_overall` (045) sums every year of
  `given_name_occurrences`, ranked per gender. That is the "evenly from all
  decades" behaviour.
- Decades are derived from the occurrence years, so the four most recent decades
  have to be computed, not hardcoded.
- The tiers are rank windows (500 / 2000 / 5000), so changing the ranking changes
  which names land in the first screens.
- [097] caches the first 100 of exactly this query, so this is what every new
  user sees.

## Requirements

- Rebuild `given_name_popularity_overall` so rank comes from a decade-weighted
  score rather than a sum of all-time occurrences.
- Score each name by summing its `percentile` from
  `given_name_popularity_by_decade` across every decade it appears in, multiplied
  by that decade's weight. The four most recent decades weigh 1. Every older
  decade weighs 0.1, flat — no decay curve.
- Percentile rather than occurrences, so decades compare fairly. Birth volumes
  and naming diversity changed enormously over the century — a name at 4% of all
  births in the 1950s and one at 1% today can both be the top name — and a
  partially recorded current decade has fewer years of births in it through no
  fault of the name. Percentile is already stored per decade row and is
  unaffected by either.
- Summing rather than averaging, so a name that stayed popular across all four
  recent decades outranks one that spiked in a single decade. An older name
  accumulates across many decades but at a tenth of the value, so it can still
  place — which is the point. A name that only ever existed in the 1880s keeps a
  rank and can surface below the first tiers, rather than being excluded.
- The weight is a single named constant in the file, so tuning it is a one-line
  change and a re-run.
- The four decades are computed from the data, not written in.
- Columns and gender partitioning stay as 052 has them, and `total_occurrences`
  is still the true all-time sum — only what `rank` is derived from changes.
- Carry 052's `COALESCE(t.female_total, 0)` forward. This rebuild replaces the
  table 052 built, so writing the sum from 045 instead would silently restore the
  null `female_share` on male-only names and drop 33,173 names out of every
  gender filter again.
- `get_name_candidates` is not changed.
- A new migration file. 045 stays as it is.

## Tuning

The weight can only be judged by looking at the names it produces, so expect to
re-run this more than once.

- The older-decade weight is one named constant at the top of the file. Change it
  and re-run the whole file: it truncates and rebuilds, so it is safe to run
  repeatedly.
- To judge a setting, read the top 100 of `given_name_popularity_overall` per
  gender and ask whether it looks like names in use now. Compare it against the
  same list from the previous weight rather than against an absolute standard.
- Lower the weight if all-time names still dominate the first tier. Raise it if
  nothing but current names appear and the tail feels unreachable.
- [097] caches the unfiltered first batch for the life of the process, so restart
  the API after a re-run or the old names keep being served.
- Nothing else reads this table, so a re-run cannot affect the decade-filtered
  path.

## Open Questions

- Is 0.1 the right weight for older decades? It can only really be judged by
  looking at the first batch it produces.

## Out Of Scope

- The by-decade table and the filtered path.
- Tier band sizes.
- `get_name_filters`.

## Acceptance Criteria

- An unfiltered first batch is recognisably current rather than all-time.
- The row count and shape of `given_name_popularity_overall` are unchanged.
- A decade-filtered request returns what it does today.
- The chosen weight has been judged against an actual first batch, not assumed.

## Files

- `src/database/postGres/054_given_name_popularity_overall.v3.sql` (new, in
  babeonym-setup)
