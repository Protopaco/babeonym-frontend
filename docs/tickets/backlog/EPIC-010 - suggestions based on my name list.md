# EPIC-010 - Suggestions Based On My Name List

## Requirements Reference

- None. Speculative idea, recorded so the thinking isn't lost. Not planned for
  launch.

## Goal

Let a user steer new name candidates toward the kind of names they have already
kept, so fewer suggestions are ones they would never choose.

## Product Direction

1. **A switch, such as "Base suggestions on my list".** Off by default; candidates
   behave as they do today.
2. **When on, the kept names form a taste profile**: typical length, sound and
   origin.
3. **The profile weights candidates; it does not filter them.** A three-syllable
   name becomes rare for someone who keeps short names, not impossible.
4. **Some surprise is kept.** A small share of candidates (say 1 in 10) ignore the
   profile, because people sometimes fall for a name they'd never have looked for.

## Why

- Paul, choosing a name for his daughter, was drawn to short women's names with a
  punchy consonant sound. He never would have chosen a three-syllable name, so
  every one served was wasted time.
- Origin mattered, but as comfort rather than rules: Asian and American names
  felt right, Celtic and Spanish names didn't. That's a preference best learned
  from the list, not set through filters.

## Notes

- **Signals, in order of importance: length, then sound, then origin.** Origin is
  last but not irrelevant.
  - Length: syllable count, with letter count as a tiebreaker.
  - Sound: ending sound (vowel vs consonant, last sound) and opening sound.
    Postgres `fuzzystrmatch` provides phonetic codes.
  - Origin: overlap in language and culture, which already exist.
- **Facts are precomputed per name, never per pair.** One row per given name
  (~105k) with syllable count, ending sound and opening sound. It's reference data
  generated locally and copied to prod. A matrix of every pair (~11 billion) is not
  an option.
- **Syllable counting from spelling is a guess.**
  - A spelling heuristic works for most English names (vowel groups, silent final
    "e", "-le" endings).
  - Some languages have simple overrides. Vietnamese is monosyllabic: Nguyen,
    Tuyet and Thuy are one syllable each, so syllables = words. Pinyin splits into
    standard syllables.
  - Names the heuristic handles badly (e.g. Irish Aoife, Siobhan) could be counted
    by a model later, if spot-checks show a need.
- **Applied inside the existing candidate query**, as one profile per user, so it
  adds no per-name lookups.

## Considered And Set Aside

- **Related names (Michael → Miguel, Mikhail).** Etymological relatives are
  genealogy, not taste: someone who likes John rarely wants Juan. The source data
  (`name_relationship_claims`, ~20k pairs from Wikidata/Wiktionary) is also noisy:
  Opus flagged about 11% of one sample as wrong (Henry–Eric, Olivia–Livia,
  Maria–Mario), and cheaper models couldn't tell.
- **"Similar names" for a single clicked name.** Plausible, but it has to be
  fetched on click through its own endpoint, never inside the candidate call.
  Otherwise every candidate call pays for a lookup that maybe 10% of users would
  open. It could reuse the same per-name facts.

## Candidate Child Tickets

- Compute syllable count, ending sound and opening sound per given name.
- Build a taste profile from a user's kept names.
- Weight candidates by the profile, with a wildcard share.
- Add the "Base suggestions on my list" switch.
