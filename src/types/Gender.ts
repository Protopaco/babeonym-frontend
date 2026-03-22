export const Gender = {
  MALE: 'male',
  FEMALE: 'female',
  NEUTRAL: 'neutral',
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const GenderValues = Object.values(Gender);

export const stringToGender = (value: string): Gender | null => {
  if (value === 'male' || value === 'female' || value === 'neutral') {
    return value;
  }
  return null;
};
