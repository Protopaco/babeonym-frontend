import Typography from '@mui/material/Typography';
import type { Etymology } from '@/api/generated/models/Etymology';
import BaseModal from '@/components/Shared/BaseModal/BaseModal';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import groupMeaningsByLanguage from '@/utils/groupMeaningsByLanguage';
import '@/components/Shared/NameEtymologyModal/NameEtymologyModal.css';

const ACKNOWLEDGE_LABEL = 'Got it';

type Props = {
  open: boolean;
  onClose: () => void;
  givenName: string;
  etymology: Etymology;
};

// Where a name comes from and what it means. Close-only, like
// InformationalModal, but that one takes plain text and this needs lists.
//
// Takes a non-null etymology: whatever opens this is only offered for a name
// that has one. Cultures are left out on purpose — the frontend does not use
// them in this pass.
const NameEtymologyModal = ({ open, onClose, givenName, etymology }: Props) => {
  const { meanings, languages } = etymology;

  return (
    <BaseModal open={open} onClose={onClose} title={givenName} closeLabel={ACKNOWLEDGE_LABEL} size="wide">
      {/* A section with nothing in it is left out rather than shown empty. */}
      {meanings.length > 0 ? (
        <section className="name-etymology-modal-section">
          <SectionHeader title="Meanings" size="compact" />
          <div className="name-etymology-modal-meaning-groups">
            {groupMeaningsByLanguage(meanings).map(({ language, meanings: groupMeanings }) => (
              <div key={language ? language.id : 'without-language'} className="name-etymology-modal-meaning-group">
                {/* Unlabelled when there is no language: naming the absence
                    added nothing but weight. */}
                {language ? (
                  <Typography variant="body2" className="name-etymology-modal-meaning-language">
                    {language.flag} {language.label}
                  </Typography>
                ) : null}
                <ul className="name-etymology-modal-list">
                  {groupMeanings.map((meaning) => (
                    <li key={meaning.id}>
                      <Typography variant="body1" className="name-etymology-modal-text">
                        {meaning.text}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {languages.length > 0 ? (
        <section className="name-etymology-modal-section">
          <SectionHeader title="Languages" size="compact" />
          <ul className="name-etymology-modal-list name-etymology-modal-language-list">
            {languages.map((language) => (
              <li key={language.id} className="name-etymology-modal-language">
                <Typography variant="body1" className="name-etymology-modal-text name-etymology-modal-language-flag">
                  {language.flag}
                </Typography>
                <Typography variant="body1" className="name-etymology-modal-text">
                  {language.label}
                </Typography>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </BaseModal>
  );
};

export default NameEtymologyModal;
