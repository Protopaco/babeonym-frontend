import type { GivenName } from '@/api/generated/models/GivenName';

// The server answers every list write with the whole list, as new objects. Kept
// as-is, every row looks changed and re-renders, even when one name was added.
// So a name that comes back identical keeps the object already held, and only
// the rows that really changed render again.
//
// Etymology is compared as JSON: it is a small nested object with no functions
// or dates, and it arrives in the same key order every time.
const reuseUnchangedGivenNames = (previousGivenNames: GivenName[], nextGivenNames: GivenName[]): GivenName[] => {
  const previousGivenNamesById = new Map(
    previousGivenNames.map((previousGivenName) => [previousGivenName.givenCustomNameBridgeId, previousGivenName])
  );

  return nextGivenNames.map((nextGivenName) => {
    const previousGivenName = previousGivenNamesById.get(nextGivenName.givenCustomNameBridgeId);
    if (!previousGivenName) return nextGivenName;

    const unchanged =
      previousGivenName.givenName === nextGivenName.givenName &&
      previousGivenName.rating === nextGivenName.rating &&
      previousGivenName.gender === nextGivenName.gender &&
      JSON.stringify(previousGivenName.etymology) === JSON.stringify(nextGivenName.etymology);

    return unchanged ? previousGivenName : nextGivenName;
  });
};

export default reuseUnchangedGivenNames;
