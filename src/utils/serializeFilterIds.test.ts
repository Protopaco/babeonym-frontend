import { serializeFilterIds } from '@/utils/serializeFilterIds';

describe('serializeFilterIds', () => {
  it('joins ids with commas', () => {
    expect(serializeFilterIds([4, 5, 6])).toBe('4,5,6');
  });

  it('returns undefined rather than an empty string for an empty list', () => {
    expect(serializeFilterIds([])).toBeUndefined();
  });
});
