import { NAME_MAX_LENGTH } from '@/constants/nameMaxLength';
import stripDisallowedNameCharacters from '@/utils/stripDisallowedNameCharacters';

// Every rule a name typed by hand has to obey, in one place: the characters it
// may contain and how long it may be. Both are silent, and both have to be
// applied together — a caller that stripped without truncating would let a
// 200-character name through, and one that truncated without stripping would
// keep the digits.
//
// Truncation happens after the strip, so a removed character does not use up
// one of the fifteen.
const normalizeNameInput = (value: string): string => stripDisallowedNameCharacters(value).slice(0, NAME_MAX_LENGTH);

export default normalizeNameInput;
