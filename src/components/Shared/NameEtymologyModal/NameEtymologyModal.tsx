import Typography from '@mui/material/Typography';
import type { Etymology } from '@/api/generated/models/Etymology';
import BaseModal from '@/components/Shared/BaseModal/BaseModal';
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
    <BaseModal open={open} onClose={onClose} title={givenName} closeLabel={ACKNOWLEDGE_LABEL}>
      {/* A section with nothing in it is left out rather than shown empty. */}
      {meanings.length > 0 ? (
        <section className="name-etymology-modal-section">
          <Typography variant="h6" component="h3" className="name-etymology-modal-heading">
            Meanings
          </Typography>
          <ul className="name-etymology-modal-list">
            {meanings.map((meaning) => (
              <li key={meaning.id} className="name-etymology-modal-meaning">
                <Typography variant="body1" className="name-etymology-modal-text">
                  {meaning.text}
                </Typography>
                {meaning.language ? (
                  <Typography variant="body2" className="name-etymology-modal-meaning-language">
                    {meaning.language.flag} {meaning.language.label}
                  </Typography>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {languages.length > 0 ? (
        <section className="name-etymology-modal-section">
          <Typography variant="h6" component="h3" className="name-etymology-modal-heading">
            Languages
          </Typography>
          <ul className="name-etymology-modal-list">
            {languages.map((language) => (
              <li key={language.id}>
                <Typography variant="body1" className="name-etymology-modal-text">
                  {language.flag} {language.label}
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
