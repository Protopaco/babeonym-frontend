import { describe, expect, it } from 'vitest';
import { NAME_MAX_LENGTH } from '@/constants/nameMaxLength';
import normalizeNameInput from '@/utils/normalizeNameInput';

describe('normalizeNameInput', () => {
  it('strips disallowed characters and then truncates', () => {
    expect(normalizeNameInput('Ma1ry')).toBe('Mary');
  });

  it('does not let a removed character use up one of the allowed characters', () => {
    const value = `1${'a'.repeat(NAME_MAX_LENGTH)}`;

    expect(normalizeNameInput(value)).toBe('a'.repeat(NAME_MAX_LENGTH));
  });

  it('cuts a name over the limit to exactly the limit', () => {
    const result = normalizeNameInput('a'.repeat(NAME_MAX_LENGTH + 10));

    expect(result).toHaveLength(NAME_MAX_LENGTH);
  });

  it('leaves a name at the limit unchanged', () => {
    const value = 'a'.repeat(NAME_MAX_LENGTH);

    expect(normalizeNameInput(value)).toBe(value);
  });
});
