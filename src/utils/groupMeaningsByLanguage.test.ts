import groupMeaningsByLanguage from '@/utils/groupMeaningsByLanguage';

const latin = { id: 1, label: 'Latin', flag: 'LA' };
const greek = { id: 2, label: 'Greek', flag: 'GR' };

describe('groupMeaningsByLanguage', () => {
  it('groups meanings under the language each belongs to', () => {
    const latinMeaningOne = { id: 1, text: 'bright', language: latin };
    const greekMeaning = { id: 2, text: 'noble', language: greek };
    const latinMeaningTwo = { id: 3, text: 'clear', language: latin };

    expect(groupMeaningsByLanguage([latinMeaningOne, greekMeaning, latinMeaningTwo])).toEqual([
      { language: latin, meanings: [latinMeaningOne, latinMeaningTwo] },
      { language: greek, meanings: [greekMeaning] },
    ]);
  });

  it('puts meanings with no language in their own first group', () => {
    const latinMeaning = { id: 1, text: 'bright', language: latin };
    const unlabelledMeaning = { id: 2, text: 'gift', language: null };

    expect(groupMeaningsByLanguage([latinMeaning, unlabelledMeaning])).toEqual([
      { language: null, meanings: [unlabelledMeaning] },
      { language: latin, meanings: [latinMeaning] },
    ]);
  });

  it('orders language groups by where each language first appears', () => {
    const greekMeaning = { id: 1, text: 'noble', language: greek };
    const latinMeaning = { id: 2, text: 'bright', language: latin };

    const groups = groupMeaningsByLanguage([greekMeaning, latinMeaning]);

    expect(groups.map((group) => group.language)).toEqual([greek, latin]);
  });

  it('returns an empty list when there are no meanings', () => {
    expect(groupMeaningsByLanguage([])).toEqual([]);
  });

  it('returns no null group when every meaning has a language', () => {
    const groups = groupMeaningsByLanguage([{ id: 1, text: 'bright', language: latin }]);

    expect(groups.some((group) => group.language === null)).toBe(false);
  });
});
