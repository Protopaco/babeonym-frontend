import type { EtymologyLanguage } from '@/api/generated/models/EtymologyLanguage';
import type { EtymologyMeaning } from '@/api/generated/models/EtymologyMeaning';

type MeaningGroup = {
  language: EtymologyLanguage | null;
  meanings: EtymologyMeaning[];
};

// Gathers meanings under the language each belongs to, so a meaning is never
// left to be read against whichever language sits nearest it.
//
// Meanings with no language come first, as their own group: they are shown
// unlabelled, and ahead of the labelled groups they cannot be mistaken for part
// of one. Language groups follow in the order each language first appears.
const groupMeaningsByLanguage = (meanings: EtymologyMeaning[]): MeaningGroup[] => {
  const meaningsWithoutLanguage: EtymologyMeaning[] = [];
  const groupsByLanguageId = new Map<number, MeaningGroup>();

  meanings.forEach((meaning) => {
    const { language } = meaning;

    if (!language) {
      meaningsWithoutLanguage.push(meaning);
      return;
    }

    const existingGroup = groupsByLanguageId.get(language.id);
    if (existingGroup) {
      existingGroup.meanings.push(meaning);
    } else {
      groupsByLanguageId.set(language.id, { language, meanings: [meaning] });
    }
  });

  const languageGroups = Array.from(groupsByLanguageId.values());

  return meaningsWithoutLanguage.length > 0 ? [{ language: null, meanings: meaningsWithoutLanguage }, ...languageGroups] : languageGroups;
};

export default groupMeaningsByLanguage;
