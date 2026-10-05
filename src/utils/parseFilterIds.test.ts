import { parseFilterIds } from '@/utils/parseFilterIds';

describe('parseFilterIds', () => {
  it('reads a comma-separated list into numbers', () => {
    const searchParams = new URLSearchParams('categories=3,1,2');

    expect(parseFilterIds(searchParams, 'categories')).toEqual([3, 1, 2]);
  });

  it('returns an empty list when the parameter is missing', () => {
    expect(parseFilterIds(new URLSearchParams(), 'categories')).toEqual([]);
  });

  it('removes duplicates and keeps first-seen order', () => {
    const searchParams = new URLSearchParams('categories=2,1,2,3,1');

    expect(parseFilterIds(searchParams, 'categories')).toEqual([2, 1, 3]);
  });

  it('drops non-numeric, zero, negative and non-integer values', () => {
    const searchParams = new URLSearchParams('categories=abc,0,-4,1.5,7,');

    expect(parseFilterIds(searchParams, 'categories')).toEqual([7]);
  });
});
