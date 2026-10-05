import { describe, expect, it } from 'vitest';
import stripDisallowedNameCharacters from '@/utils/stripDisallowedNameCharacters';

describe('stripDisallowedNameCharacters', () => {
  it('keeps letters, apostrophes, hyphens and spaces', () => {
    expect(stripDisallowedNameCharacters("Mary-Jane O'Brien")).toBe("Mary-Jane O'Brien");
  });

  it('removes digits and other symbols', () => {
    expect(stripDisallowedNameCharacters('Ma1ry! @J#ane$')).toBe('Mary Jane');
  });

  it('keeps accented and non-Latin letters', () => {
    expect(stripDisallowedNameCharacters('Zoë José Анна 山田')).toBe('Zoë José Анна 山田');
  });

  it('converts curly apostrophes to straight ones', () => {
    expect(stripDisallowedNameCharacters('O’Brien ‘Da’ar')).toBe("O'Brien 'Da'ar");
  });

  it('collapses runs of whitespace to one space', () => {
    expect(stripDisallowedNameCharacters('Mary   \t  Jane')).toBe('Mary Jane');
  });

  it('does not trim a trailing space', () => {
    expect(stripDisallowedNameCharacters('Mary ')).toBe('Mary ');
  });
});
