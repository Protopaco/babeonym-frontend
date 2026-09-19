# EPIC-010 - Partner Matching

## Requirements Reference

- None yet. The product direction below is the source.

## Goal

Two people decide on a name together. Each person reviews names separately, and
the app shows only the names they've both approved. It turns Babeonym from a
personal shortlist into a tool for agreeing, which is what the app promises.

## Product Direction

1. **One partner.** An account can be linked to one other account at a time.
2. **Invite by link, not email.** The inviter creates a link and sends it
   however they like. The link points only to the inviter. Nothing about the
   other person is known until they open the link and sign in.
3. **Both people are signed in.** Anonymous accounts can't invite or accept. An
   anonymous account exists only as a cookie, and clearing it would break the
   link between the two accounts for good.
4. **The link is the key, so it is guarded:**
   - single use
   - expires after 7 days
   - the inviter can cancel it before it's accepted
5. **Partners see only matches.** Neither person can see the other's list,
   rejections or snoozes. A match is a name both have approved.
6. **Either person can unlink,** after a confirmation. Each keeps their own
   list, and matches stop showing.
7. **Partners are visible in Settings.** Each sees who they're linked to, for
   example by email, so a link accepted by the wrong person is easy to spot and
   undo.
8. **New matches are shown in the app.** There's an indicator when a new match
   appears. No email or push notifications.

## Notes

- **Stored as a group with members, limited to two in code.** If you later allow
  more people, such as advisors, it's a code change instead of a new table.
- **The hard part is the invite token surviving sign-in.** An invitee who isn't
  signed in goes through Google sign-in and comes back. The token has to be kept
  in the session across that round trip.
- **Deletion.** `delete_user` and the one-off wipe script must also remove a
  user's invitations and group membership. Deleting an account unlinks the
  partner.
- **Privacy page.** It needs a line on what a partner can see: only names you've
  both approved.
- **Custom names don't count toward matches in the first version.** A custom
  name belongs to one user, so their partner can't approve it.
- **Email invites are out of scope.** They'd need a mail provider, DNS records so
  the mail doesn't land in spam, templates and bounce handling. That can be its
  own ticket later if links aren't enough.

## Later

- **A partner band in `get_name_candidates`.** Mix 1–2 of the partner's approved
  names into each batch, so both people see more of the same names. They must
  match every active filter. Never more than 1–2 per batch, and the final shuffle
  stays, so a batch doesn't give away the partner's list.

## Candidate Child Tickets

- Partner groups and invitations: tables, with deletion covered.
- Create, cancel and accept invitations, including the token surviving sign-in.
- The matches query and endpoint.
- Invite UI: create, copy and cancel the link, plus an accept page.
- Matches UI, including the new-match indicator.
- Partner in Settings, with unlink.
- A privacy page update.
