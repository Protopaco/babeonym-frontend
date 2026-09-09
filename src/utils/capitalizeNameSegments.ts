// Capitalizes the first letter of every segment, where a segment starts at the
// beginning of the string or after a space or hyphen: smith-jones becomes
// Smith-Jones, van der berg becomes Van Der Berg.
//
// Only ever adds capitals. Nothing is lowercased, so McKenna survives.
//
// An apostrophe deliberately does not start a segment, so da'ar comes out as
// Da'ar rather than Da'Ar. The cost is that o'brien stays O'brien.
//
// Letters are matched as \p{L} rather than a-z so accented and non-Latin
// letters are capitalized rather than skipped.
//
// This is the client's copy of normalizeCustomGivenName in the backend, which
// applies the same rule to a custom given name on save. Sharing it would need
// an endpoint; it is one replace, so two copies is the cheaper answer. Nothing
// here calls it on the user's behalf — it only produces the value a suggestion
// offers.
const capitalizeNameSegments = (name: string): string =>
  name.replace(/(^|[\s-])(\p{L})/gu, (_match, boundary: string, letter: string) => boundary + letter.toUpperCase());

export default capitalizeNameSegments;
