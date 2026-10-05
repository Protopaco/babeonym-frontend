import type { GivenName } from '@/api/generated/models/GivenName';
import reuseUnchangedGivenNames from '@/utils/reuseUnchangedGivenNames';

const buildGivenName = (overrides: Partial<GivenName> = {}): GivenName => ({
  givenName: 'Ada',
  givenCustomNameBridgeId: 1,
  rating: 3,
  gender: 'FEMALE',
  etymology: { meanings: [{ id: 1, text: 'noble', language: null }], languages: [], cultures: [] },
  ...overrides,
});

describe('reuseUnchangedGivenNames', () => {
  it('keeps the previous object when name, rating, gender and etymology are identical', () => {
    const previousGivenName = buildGivenName();
    const nextGivenName = buildGivenName();

    const result = reuseUnchangedGivenNames([previousGivenName], [nextGivenName]);

    expect(result[0]).toBe(previousGivenName);
  });

  it.each([
    ['name', { givenName: 'Adah' }],
    ['rating', { rating: 5 }],
    ['gender', { gender: 'MALE' }],
    ['etymology', { etymology: { meanings: [], languages: [], cultures: [] } }],
  ])('uses the new object when the %s differs', (_field, overrides) => {
    const previousGivenName = buildGivenName();
    const nextGivenName = buildGivenName(overrides);

    const result = reuseUnchangedGivenNames([previousGivenName], [nextGivenName]);

    expect(result[0]).toBe(nextGivenName);
  });

  it('uses the new object when there is no previous match', () => {
    const previousGivenName = buildGivenName({ givenCustomNameBridgeId: 1 });
    const nextGivenName = buildGivenName({ givenCustomNameBridgeId: 2 });

    const result = reuseUnchangedGivenNames([previousGivenName], [nextGivenName]);

    expect(result[0]).toBe(nextGivenName);
  });

  it('follows the order of the next list', () => {
    const firstGivenName = buildGivenName({ givenCustomNameBridgeId: 1 });
    const secondGivenName = buildGivenName({ givenCustomNameBridgeId: 2 });

    const result = reuseUnchangedGivenNames(
      [firstGivenName, secondGivenName],
      [buildGivenName({ givenCustomNameBridgeId: 2 }), buildGivenName({ givenCustomNameBridgeId: 1 })]
    );

    expect(result).toEqual([secondGivenName, firstGivenName]);
    expect(result[0]).toBe(secondGivenName);
    expect(result[1]).toBe(firstGivenName);
  });

  it('leaves out names removed from the next list', () => {
    const keptGivenName = buildGivenName({ givenCustomNameBridgeId: 1 });
    const removedGivenName = buildGivenName({ givenCustomNameBridgeId: 2 });

    const result = reuseUnchangedGivenNames([keptGivenName, removedGivenName], [buildGivenName({ givenCustomNameBridgeId: 1 })]);

    expect(result).toEqual([keptGivenName]);
    expect(result).not.toContain(removedGivenName);
  });
});
