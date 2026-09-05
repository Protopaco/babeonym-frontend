// Prunes a custom name as it is typed, so the draft value can only ever hold
// characters a name is allowed to contain. Nothing downstream has to check, and
// nothing is explained to the user — a dropped character is silent, matching the
// input's maxLength, which truncates silently too.
//
// Letters are matched as \p{L} rather than a-z, so accented and non-Latin names
// survive rather than being emptied out one character at a time.
//
// Curly apostrophes are converted rather than dropped: iOS autocorrects ' to ',
// and the two are indistinguishable on screen, so dropping it would look like
// the app was eating the apostrophe out of O'Brien.
//
// Whitespace is collapsed but not trimmed. A trailing space has to survive long
// enough to type the second half of Mary Jane; useCustomNameDraftChip trims on
// save, and the backend trims again.
const stripDisallowedNameCharacters = (value: string): string =>
  value
    .replace(/[‘’]/gu, "'")
    .replace(/[^\p{L}'\- ]/gu, '')
    .replace(/\s+/gu, ' ');

export default stripDisallowedNameCharacters;
