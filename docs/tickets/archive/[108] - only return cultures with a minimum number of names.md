# [108] - Only Return Cultures With A Minimum Number Of Names

## Status

Backlog

## Summary

The filters endpoint should only return cultures that have at least a minimum number of names, using the same minimum as languages.

## Context

A filter that matches few or no names is worse than having no filter. Cultures should be limited by the same minimum as languages.

The latest `get_name_filters()` (`babeonym-setup/src/database/postGres/034_get_name_filters.v1.sql`) doesn't check a name count for cultures or for languages. `reports/004_filter_coverage.v1.sql` flags languages that meet 5 and 10 names.

## Open Questions

- Where does the minimum live: in the SQL function, as a function parameter, or in a backend constant?

## Out Of Scope

- Changes to the frontend filter UI.
