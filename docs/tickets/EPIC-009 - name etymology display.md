# EPIC-009 - Name Etymology Display

## Requirements Reference

- None yet. The requirements below are the current source; this epic is a
  placeholder while the data is completed.

## Goal

Show where a name comes from — its meanings, languages and cultures — for the
names that have that information, as a fun addition that sits alongside the core
loop of finding, saving and ranking names rather than inside it.

## Product Direction

1. **Some names will have etymology information available** — meaning, language
   and culture.
2. **Its availability is indicated on the name chip** by a small icon, label or
   script.
3. **The information is displayed in a dialog** over the page.
4. **The amount of information varies, so the dialog is dynamic.** A name may
   have:
   - one meaning, or several;
   - one language or culture, or several;
   - relationships to other names (Mike → Michael).
5. **It reads as a fun addition**, separate from the core functionality of the
   app.
6. **Most names will not have this information**, so its presence should be
   obvious without being intrusive — and its absence should not be noticed:
   - Chips without data show no blank slot; nothing is reserved for an indicator
     that is not there.
   - The indicator is quiet enough that a chip without it looks complete, not
     like something is missing.

## Notes

- **The infrastructure exists in rough shape and was never wired to the
  frontend.** Gathering the data quickly outgrew the rest of the app's
  development, so the frontend has been waiting on the data rather than the other
  way round. The data is now getting close.
  - Backend: `GET /api/v1/givenName/etymology/{givenCustomNameBridgeId}`
    (`v1GivenNameEtymology`), with `src/models/Etymology.ts` and
    `src/db/getEtymology.ts`.
  - Setup: `src/database/postGres/028_get_etymology.v1.sql`, with the data
    pipeline in progress in `babeonym-setup`.
  - Frontend: the generated client already includes the `Etymology`,
    `EtymologyMeaning`, `EtymologyLanguage` and `EtymologyCulture` models; nothing
    outside `src/api/generated` uses them yet.
- **The data contract is in development.** Multiple meanings and relationships to
  other names are part of that work.
- **How a chip learns that a name has data** will be decided when the data is
  ready.
- **Related names are display only.** There is no way to go from one name to a
  related name's information today. That may be a future feature; it is not part
  of this epic.
- Opening the dialog is not a decision about a name. On any surface where a chip
  is also a control, the indicator should not trigger that control.

## Candidate Child Tickets

- Add the etymology indicator to name chips.
- Build the etymology dialog, sized to whatever information a name has.
- Show related names in the dialog.
