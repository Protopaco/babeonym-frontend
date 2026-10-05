import { describe, expect, it } from 'vitest';
import { ResponseError } from '@/api/generated';
import getCustomNameErrorMessage from '@/utils/getCustomNameErrorMessage';

describe('getCustomNameErrorMessage', () => {
  it("gives the can't be used copy for a 400 response error", () => {
    const error = new ResponseError(new Response(null, { status: 400 }));

    expect(getCustomNameErrorMessage(error)).toBe("That name can't be used.");
  });

  it('gives the generic retry copy for a response error with another status', () => {
    const error = new ResponseError(new Response(null, { status: 500 }));

    expect(getCustomNameErrorMessage(error)).toBe('Something went wrong. Try again.');
  });

  it('gives the generic retry copy for an error that is not a response error', () => {
    expect(getCustomNameErrorMessage(new Error('network down'))).toBe('Something went wrong. Try again.');
  });
});
