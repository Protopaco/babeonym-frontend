import { parseFilterIds } from '@/utils/parseFilterIds';
import { writeFilterIds } from '@/utils/writeFilterIds';

describe('writeFilterIds', () => {
  it('sets the parameter to the comma-joined ids', () => {
    const searchParams = new URLSearchParams();

    writeFilterIds(searchParams, 'categories', [1, 2, 3]);

    expect(searchParams.get('categories')).toBe('1,2,3');
  });

  it('removes the parameter when the selection is empty', () => {
    const searchParams = new URLSearchParams('categories=1,2');

    writeFilterIds(searchParams, 'categories', []);

    expect(searchParams.has('categories')).toBe(false);
  });

  it('leaves other parameters untouched', () => {
    const searchParams = new URLSearchParams('query=anna&categories=9');

    writeFilterIds(searchParams, 'categories', [1, 2]);

    expect(searchParams.get('query')).toBe('anna');
    expect(searchParams.get('categories')).toBe('1,2');
  });

  it('round trips ids through writeFilterIds and parseFilterIds', () => {
    const searchParams = new URLSearchParams();
    const originalIds = [8, 3, 5];

    writeFilterIds(searchParams, 'categories', originalIds);

    expect(parseFilterIds(searchParams, 'categories')).toEqual(originalIds);
  });
});
