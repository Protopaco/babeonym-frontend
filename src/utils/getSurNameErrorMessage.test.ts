import { describe, expect, it } from 'vitest';
import { ResponseError } from '@/api/generated';
import getErrorMessage from '@/utils/getErrorMessage';
import getSurNameErrorMessage from '@/utils/getSurNameErrorMessage';

describe('getSurNameErrorMessage', () => {
  it('gives the surname copy for a 400 response error', () => {
    const error = new ResponseError(new Response(null, { status: 400 }));

    expect(getSurNameErrorMessage(error)).toBe("That surname can't be used.");
  });

  it('returns what getErrorMessage returns for a response error with another status', () => {
    const error = new ResponseError(new Response(null, { status: 429 }));

    expect(getSurNameErrorMessage(error)).toBe(getErrorMessage(error));
  });

  it('returns what getErrorMessage returns for an error that is not a response error', () => {
    const error = new Error('unexpected');

    expect(getSurNameErrorMessage(error)).toBe(getErrorMessage(error));
  });
});
