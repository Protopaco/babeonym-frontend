# Tickets

Each ticket is a markdown file named `[number] - title.md`. Open tickets live in
`backlog/`, finished ones in `archive/`.

`tickets.csv` is the one place a ticket's status, priority and other planning facts
are recorded. They are not repeated inside the ticket files.

## Columns

| Column | Allowed values |
|---|---|
| `number` | The ticket number, such as `124`, or an epic id, such as `EPIC-010`. Matches the number in the file name. |
| `status` | `Backlog`, `In progress`, `Ready for review`, `Done` |
| `priority` | `P1`, `P2`, `P3`, or blank |
| `eligible_for_agent` | `yes` or `no` |
| `type` | `unit tests`, `test ids` or `other` |
| `depends_on` | Ticket numbers separated by `;`, such as `140`, or `none` |

## Statuses

| Status | Meaning |
|---|---|
| `Backlog` | Not started. |
| `In progress` | Being worked on. |
| `Ready for review` | The work is on a branch and waiting for your review. |
| `Done` | Reviewed and merged. |

You set every status. The agent never edits `tickets.csv` or any ticket's status.

## Rules

- A ticket with no row in `tickets.csv` is not eligible for the agent.
- A ticket counts as a finished dependency only when its row says `Done`.
- When a ticket is done, set its status to `Done`, move its file to `archive/` as
  before, and keep its row so that tickets depending on it can see it.
- Any value outside the lists above is an error, not a silent skip.
