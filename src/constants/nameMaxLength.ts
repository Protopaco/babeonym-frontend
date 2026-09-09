// The longest name in given_names is 15 characters, so a name typed by hand can
// never outrun the canonical names it sits alongside. It is also roughly where a
// name stops fitting the compare chip, which clips rather than wrapping or
// shrinking.
//
// Applies to both halves of a full name — a custom given name and the surname
// shown under it — because both land in the same places.
//
// Enforced only in the browser: the backend accepts any length, so this is a
// guard rail rather than a constraint.
export const NAME_MAX_LENGTH = 15;
