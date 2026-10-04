# Babeonym user workflows

Drafted from the code, not from intent. Each workflow gives a start state, numbered
steps with the expected result, and anything the code does not settle. Items marked
**Unclear: needs your call** are for Paul to decide; nothing here is agreed until
they are resolved.

Test ids are not listed per step yet. They come after this document is agreed, from
the tickets in the `[132]` to `[140]` range.

## Routes

| Route | Screen |
|---|---|
| `/` | Name workspace (generator, compare, approved names) |
| `/settings` | Settings |
| `/privacy` | Privacy policy |
| `/error` | Error page, driven by `?error=` and `?details=` |
| anything else | Redirects to `/` |

## Conventions used below

- **Anonymous user**: created automatically on first visit. Every visitor has a user.
- **Signed-in user**: signed in with Google.
- **Approved name**: a name on the user's saved list ("Your Names").

---

## 1. First visit

**Start state:** a browser with no session cookie.

1. Open `/`.
   - The app asks the backend for a user, gets a 401, and requests an anonymous
     session, then loads the user again.
   - The workspace shows in Name Generator mode. Skeletons show until names load.
2. Names load.
   - A generated name appears with its actions. "Your Names" shows "No saved names
     yet."
   - The header shows "Sign In / Sign Up".
   - The "Want to save your progress?" banner is not shown.

**Account prompt banner**
- The banner appears only when the backend answers an approve, reject or snooze
  with the prompt flag set. The backend does this on the 25th, 50th and 75th action
  (`DEFAULT_MILESTONES = [25, 50, 75]`).
- The flag is held in memory only. A reload hides the banner until the next
  milestone.
- Dismissing the banner, signing out, and deleting an account all clear it.
- **Decided:** the test drives 25 reject or snooze actions (about 13 seconds, given
  the 500ms action lock) and checks the banner appears. It uses reject or snooze so
  the approved list does not fill toward its limit.

**Failure path:** if the user cannot be loaded or the anonymous session cannot be
created, the app goes to `/error?error=session`. See workflow 13.

## 2. Approve a name

**Start state:** anonymous or signed in, Name Generator mode, a name showing, fewer
than the approved-name limit saved.

1. Click approve on the generated name.
   - The name leaves the generator at once (optimistic) and the next name takes its
     place.
   - The name appears in "Your Names" at the end of the ranking.
2. Click approve again within 500ms of the first click.
   - Ignored. The generator locks actions for 500ms to stop double taps.
3. Keep approving.
   - When 25 or fewer names remain in the queue, the app fetches 50 more.

**Failure path:** if the write fails, the name rolls back (returns to its place).
There is no error toast, by design.

**Unclear: needs your call**
- The approved-name limit. The code reads it from `approvedGivenNameLimit`. Which
  value should the e2e test assume, and should the test reach it?
- What the generator shows at the limit. A comment says it shows "the limit
  message"; the exact copy has not been read.

## 3. Reject a name

**Start state:** as workflow 2.

1. Click reject on the generated name.
   - The name leaves the generator and is never shown again for this user.
   - "Your Names" is unchanged.

## 4. Snooze a name

**Start state:** as workflow 2.

1. Click snooze on the generated name.
   - The name leaves the generator.
   - "Your Names" is unchanged.

**Unclear: needs your call**
- What snooze means to the user. In code it removes the name for now but not for
  good. When does it come back, and is that something a test can observe?

## 5. Reorder approved names

**Start state:** at least two approved names.

1. Press on a name and drag it to a new position (mouse: anywhere on the row; touch:
   only by the drag grip).
   - Rows move to the new order straight away and the rank numbers update.
2. Stop moving.
   - One second after the last drag, the new order is saved to the server. A run
     of drags is one write.
3. Reload the page.
   - The names appear in the saved order.

**Failure path:** if the save fails, the list returns to the last order the server
confirmed.

**Edge:** leaving the page within the one-second delay still saves the order.

**Unclear: needs your call**
- Can Playwright drag reliably here? The list uses motion's `Reorder` with pointer
  events. The test may need manual `mouse.down/move/up` steps. Is it worth testing,
  or is a reload-after-drag check enough?
- There is no keyboard reordering. Confirmed absent, per a code comment.

## 6. Remove an approved name

**Start state:** at least one approved name.

1. Hover or focus a name in "Your Names" to reveal its drawer, and click the
   remove button ("Remove <name>").
   - The name leaves the list and later names move up a rank.
   - If it was the last name, "No saved names yet." returns.
   - A name removed here is rejected, so it does not come back in the generator.
     The tooltip says "Takes it off your list for good".

**Unclear: needs your call**
- Memory notes an undo-remove snackbar (ticket [116]). The ticket is in the backlog
  and the component is not in the code I read. Is undo in scope for these tests, or
  not built yet?

## 7. View a name's etymology

**Start state:** an approved name that has etymology.

1. Reveal the drawer on the name and click "About <name>".
   - A modal opens with the name and its etymology.
2. Close the modal.
   - The modal closes and no drag is started.

Names without etymology have no info button.

**Unclear: needs your call**
- Which names have etymology depends on database content. Does the test account
  need a known name with etymology, or do we skip this flow until test data is
  settled?

## 8. Add a custom name

**Start state:** fewer than the approved-name limit saved.

1. Click the add button ("Add custom name") at the end of the list.
   - A draft chip opens with an empty input, focused.
2. Type a name.
   - Input is normalised (see `normalizeNameInput`) and limited to the name maximum
     length. Any error message clears.
3. Press Enter or click save.
   - The chip dims while saving.
   - The draft closes and the name appears at the end of "Your Names".

**Variations**
- Cancel with Escape, the cancel button, or blur with an empty input: the draft
  closes, nothing is saved.
- Save with only spaces: the draft closes, nothing is saved.
- Duplicate (case-insensitive match against the approved list): the draft stays
  open and shows "That name is already on your list."
- Server rejects the name: the draft stays open with its text and shows an error
  message from the server error.

**Unclear: needs your call**
- The exact rules for a name the server rejects (length, characters, profanity?).
  The e2e test needs one input that reliably fails. Which?
- At the approved-name limit the add button disappears with no explanation on this
  list. Is that intended to stay?

## 9. Switch between Name Generator and Compare Names

**Start state:** on `/`.

1. Click the "Compare Names" tab.
   - URL becomes `/?mode=compare`.
   - The generator and filter surface slide away and compare mode shows.
2. Click the "Name Generator" tab.
   - The `mode` param is removed and the generator returns.
3. Open `/?mode=compare` directly.
   - Compare mode shows on load.

The tabs are never disabled.

## 10. Compare names

**Start state:** Compare mode.

**With fewer than two approved names**
1. Open compare mode.
   - The prompt reads "Save at least two names to start comparing". No chips show.

**With two or more approved names**
1. Open compare mode.
   - The prompt reads "Which do you prefer?" and two random approved names show as
     chips, with the user's surname under each if they have set one.
2. Click one chip.
   - That chip shows as chosen, a new pair replaces the old, and the vote is sent.
   - The new pair is never the same pair as the last one when more than two names
     exist.
3. Click again within 500ms.
   - Ignored.
4. Remove an approved name that is in the current pair (from the list below).
   - A new pair is chosen.

**Unclear: needs your call**
- A vote changes ranking on the server, but the list order on screen is not
  refreshed in the code I read. Should a vote visibly change the order in "Your
  Names"? If it does, the test can assert it. If not, there is nothing to observe
  beyond the next pair.
- Pairs are random, so a test cannot predict which names show. Acceptable for the
  test to read the names off the chips and assert on those?

## 11. Filter names (desktop)

**Start state:** Name Generator mode on a desktop viewport.

1. Click the Filters toggle.
   - The filter drawer opens with four columns: gender, decade, language, culture.
2. Pick options in a column (search input narrows the list).
   - Picked options are drafts. Nothing applies yet.
3. Click "Set Filters".
   - The picks become applied filters and appear as chips in the filter row.
   - The URL gains the params `genders`, `decades`, `languages`, `cultures`
     (comma-separated ids).
   - The generator queue is refetched with the filters.
4. Click "Clear All" inside the drawer.
   - Drafts are thrown away. Applied filters are untouched.
5. Click "Close filters".
   - The drawer closes and the draft is discarded.
6. Delete one applied chip.
   - The filter leaves the URL and the queue is refetched.
7. Click "Clear All Filters" (outside the drawer). The first click only reveals
   its label; a second click within 3 seconds clears every applied filter.

**Variations**
- Open `/?genders=1` directly: the filter is applied on load without a second
  fetch.
- Browser back and forward move between filter states and refetch each time.

**Unclear: needs your call**
- Filter ids are database ids. Which options should the test pick? Fixed
  labels (for example a gender and a language) are fine if the data is stable.
- What the generator shows when filters match no names. Not read.

## 12. Sign in with Google

**Start state:** anonymous user.

1. Click "Sign In / Sign Up" in the header, or "Sign Up" in the banner.
   - A modal titled "Save your progress" opens with a Google button and a privacy
     policy link.
2. Click the Google button.
   - The browser navigates to the backend's `/api/v1/auth/google`, which redirects
     to Google.
3. Complete Google sign-in.
   - The user returns to the app signed in. The header shows their email.
   - The banner is gone.
4. If the email already had an account:
   - The URL carries `signedInToExistingAccount=true`.
   - A modal "You already had an account" opens once; the param is stripped from
     the URL; closing it does not bring it back.

**Variations**
- Cancelled at Google: `/error?error=oauth&details=access_denied`.
- Other auth failure: `/error?error=oauth`.

**Unclear: needs your call**
- Playwright cannot drive Google's own pages reliably. The agreed approach is a
  saved session (`storageState`), so steps 2 and 3 are not run by tests. Step 1 and
  the modal are testable; the redirect can be asserted as the navigation target
  only. Is that acceptable for the sign-in workflow?
- The existing-account notice is testable by opening `/?signedInToExistingAccount=true`
  directly. Is that a fair stand-in?

## 13. Error page

**Start state:** none.

| URL | Title | Buttons |
|---|---|---|
| `/error?error=oauth&details=access_denied` | Sign-in cancelled | Try again (starts Google sign-in), Return home |
| `/error?error=oauth` | Error with authentication | Try again, Return home |
| `/error?error=session` | Couldn't start your session | Try again (reloads the page) |
| `/error` or any other | Something went wrong | Return home |

1. Open each URL and check the title and buttons.
2. Click "Return home".
   - Navigates to `/`.

For the session case, "Return home" is withheld because the app redirects straight
back here while the failure stands.

**Unclear: needs your call**
- Triggering the session error for real means the backend failing the user call.
  Playwright can fake this by routing the request to a failure. That is not a
  backend hack, since it only affects the browser, but it is a mock. Is that
  acceptable for this one flow?

## 14. Settings: surname

**Start state:** on `/settings`, anonymous or signed in.

1. Open `/settings` (header gear).
   - The page fades in once the user is loaded. It shows the theme picker, a
     Surname row, an About button, and for a signed-in user a Delete Account button.
2. Type a surname.
   - Input is normalised and limited to the name maximum length.
   - The row shows as changed (dirty) and a save control appears.
3. Save.
   - The user is saved and reloaded. The row is clean.
   - If the saved surname is entirely lower case and capitalising it would change
     it, a suggestion appears (for example "Smith" for "smith").
4. Accept the suggestion.
   - The capitalised surname is saved.
5. Edit again, or ignore the suggestion.
   - The suggestion goes away without being saved.
6. Go back to `/`.
   - The surname shows under names in compare mode.

**Variations**
- Clearing the field and saving stores no surname.
- A rejected save shows an error message and keeps the draft.

**Unclear: needs your call**
- Does the anonymous user see the Surname row? The page does not hide it, so yes in
  the code. Intended?
- What error should the test expect from a rejected surname. Not read.

## 15. Settings: theme

**Start state:** on `/settings`.

1. Pick a theme chip.
   - The app theme changes at once.
2. Reload.
   - The chosen theme is still applied.

**Unclear: needs your call**
- How the theme is stored (local storage, user record, other) and which themes
  exist. I did not read `useThemePicker.ts`. Needs reading before this flow can be
  written.

## 16. Sign out

**Start state:** signed in.

1. Click the email in the header.
   - A confirmation dialog opens.
2. Confirm.
   - The backend logs the user out, a new anonymous session is created, local name
     state is cleared, and the app goes to `/`.
   - The header shows "Sign In / Sign Up" and "No saved names yet." shows.
3. Cancel instead.
   - The dialog closes, nothing changes.

**Decided:** this flow gets a test, run locally only. Whether it runs in production
is deferred until production runs are being set up.

**Unclear: needs your call**
- Sign out ends the backend session, which invalidates the saved Google session
  (`storageState`). How a local run gets back to a signed-in session afterwards is
  settled at test design.

## 17. Delete account

**Start state:** signed in. The Delete Account button is hidden for anonymous users.

1. On `/settings`, click "Delete Account".
   - A confirmation dialog opens (tooltip: "Deletes your account and all your saved
     names").
2. Confirm.
   - The backend deletes the account, a new anonymous session starts, local state is
     cleared, and the app goes to `/`.
3. Cancel instead.
   - The dialog closes, nothing changes.

**Failure path:** if the delete fails, nothing is shown to the user. The error is
logged to the console only. (The dialog has already closed.)

**Decided:** this flow gets a test, run locally only. Whether it runs in production
is deferred until production runs are being set up.

**Unclear: needs your call**
- This ends the saved Google session as well, and the account is gone, so the next
  sign-in recreates it. The saved session cannot be reused after a delete. How a
  local run gets back to a signed-in session afterwards is settled at test design.
- Should a failed delete tell the user? Currently it does not.

## 18. Privacy policy

**Start state:** none.

1. Open `/privacy`, or click the privacy policy link in the sign-in modal.
   - The policy page shows. Following the link from the modal also closes the modal.

**Unclear: needs your call**
- Where the link lives elsewhere (footer, settings About). I did not read these.

## 19. Mobile filters

**Start state:** Name Generator mode on a phone viewport.

1. A mobile filter bar is pinned to the bottom of the screen.
   - It is only present in Name Generator mode and slides away when switching to
     Compare.

**Unclear: needs your call**
- I have not read the mobile filter components (`MobileNameFilters`,
  `MobileFilterList`), so the steps are not drafted. Do you want the mobile flow
  documented before test design, or left for a later ticket?

## 20. Tutorial hints

**Start state:** any screen.

Tooltip hints appear throughout ("Your favourites, best first", "Drag to reorder",
"Pick the one you like better", and others). A tutorial toggle exists in the mobile
top bar.

**Unclear: needs your call**
- Whether hints are on by default and whether they could block clicks in tests.
  Not read (`state/tutorial`). Tests may need to switch them off first.

---

## Not covered

- Header logo link, desktop top bar layout, and the About button's content.
- Etymology modal copy.
- Backend behaviour: ranking, refill logic, and anything server-side.
