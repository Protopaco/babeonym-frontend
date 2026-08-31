# [048] - prompt when compare names becomes available

## Status

Backlog

## Summary

Show a lightweight discovery prompt when a user has approved enough names to use Compare Names.

## Requirements

- Detect when the approved names list crosses from fewer than 2 approved names to 2 or more approved names.
- Show a short message: "You can now compare names."
- The prompt should not become annoying.
- Limit how often the prompt can appear.
- Support either a small maximum display count, a cooldown/timer, or both.
- Keep Compare Names disabled until at least 2 names are approved.

## Acceptance Criteria

- When a user approves their second name, the app can notify them that Compare Names is now available.
- The notification does not appear repeatedly on every later approval.
- The display limit/cooldown behavior is configurable.
- The prompt does not block normal name approval flow.
- The prompt makes it clear that Compare Names is available without forcing the user into Compare Names mode.
