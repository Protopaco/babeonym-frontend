import { describe, expect, it } from 'vitest';
import capitalizeNameSegments from '@/utils/capitalizeNameSegments';

describe('capitalizeNameSegments', () => {
  it('capitalizes the start of the string', () => {
    expect(capitalizeNameSegments('mary')).toBe('Mary');
  });

  it('capitalizes after a space', () => {
    expect(capitalizeNameSegments('van der berg')).toBe('Van Der Berg');
  });

  it('capitalizes after a hyphen', () => {
    expect(capitalizeNameSegments('smith-jones')).toBe('Smith-Jones');
  });

  it('does not capitalize after an apostrophe', () => {
    expect(capitalizeNameSegments("da'ar")).toBe("Da'ar");
  });

  it('never lowercases', () => {
    expect(capitalizeNameSegments('McKenna')).toBe('McKenna');
  });

  it('capitalizes accented and non-Latin letters', () => {
    expect(capitalizeNameSegments('élodie анна')).toBe('Élodie Анна');
  });

  it('returns an empty string for an empty string', () => {
    expect(capitalizeNameSegments('')).toBe('');
  });
});
