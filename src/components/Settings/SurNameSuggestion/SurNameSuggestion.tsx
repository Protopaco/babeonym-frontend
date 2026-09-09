import Link from '@mui/material/Link';
import '@/components/Settings/SurNameSuggestion/SurNameSuggestion.css';

type Props = {
  savedSurName: string;
  suggestedSurName: string;
  onAccept: () => void;
};

// An offer, not a correction. The surname is already saved as typed by the time
// this renders, so declining it is simply not tapping — there is nothing to
// dismiss and nothing is remembered.
const SurNameSuggestion = ({ savedSurName, suggestedSurName, onAccept }: Props) => {
  return (
    <span className="sur-name-suggestion">
      Saved as {savedSurName}.{' '}
      <Link className="sur-name-suggestion-accept" component="button" type="button" onClick={onAccept}>
        Use {suggestedSurName}
      </Link>
    </span>
  );
};

export default SurNameSuggestion;
