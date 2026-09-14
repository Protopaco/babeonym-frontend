/**
 * The most approved names one account may hold.
 *
 * The backend keeps its own copy of this number and refuses writes past it;
 * this one exists so a user is never allowed to walk into that rejection. The
 * two are separate constants rather than one shared value because nothing here
 * is precise enough to be worth coupling the repos over — the cap is there to
 * stop a script accumulating thousands of names, not to hold a real user to an
 * exact figure, and if the numbers drift the only visible effect is that the UI
 * stops slightly before or after the server does.
 *
 * 99 rather than 100 keeps a name's rank to two digits, so the Your Names rank
 * slot can be sized for two.
 */
export default 99;
