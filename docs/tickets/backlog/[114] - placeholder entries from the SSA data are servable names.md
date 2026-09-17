# [114] Placeholder entries from the SSA data are servable names

## Status

Backlog

## Summary

"Unknown" came up as a name in testing. It is not a mistake in our code — it is a
real row in the SSA source data, ingested faithfully. It is also not alone.

## Context

`seedNameTables.ts:25` splits every line of each `yob*.txt` and inserts it
verbatim. There is no filtering of any kind, so whatever the SSA files contain
becomes a name the generator can serve.

Row counts across the year files:

| Unknown | Baby | Infant | Babygirl | Babyboy | Unnamed | Notnamed |
|---|---|---|---|---|---|---|
| 271 | 184 | 75 | 45 | 42 | 31 | 27 |

These are placeholders the SSA records when a birth certificate carries no given
name. They are not names, and serving them reads as broken.

## Requirements

A new migration. The existing seed scripts are history and are not edited.

## Open

- **Exclude at seed time, or filter at query time?** Seeding keeps the pool clean
  and the query simple; filtering leaves the data intact and is reversible
  without a reseed.
- **The list above is not trustworthy as a specification.** It came from guessing
  seven candidates and checking them. A proper pass should scan the source files
  for placeholder-shaped entries rather than treating these seven as the set.

## Out Of Scope

- Any change to the existing seed scripts.
- Name quality beyond placeholders — rare or unusual real names are not this.

## Acceptance Criteria

- Placeholder entries are not served as candidates.
- Whatever set is excluded is derived from a scan of the source data, not from
  the seven names listed here.
- The existing migrations are unmodified.
