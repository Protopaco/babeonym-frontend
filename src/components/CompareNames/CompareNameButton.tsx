import Typography from '@mui/material/Typography';
import type { GivenName } from '@/api/generated';

type Props = {
  name: GivenName;
  onVote: (winner: GivenName) => void;
};

export default ({ name, onVote }: Props) => {
  return (
    <button className="compare-names-option" type="button" onClick={() => onVote(name)}>
      <Typography className="compare-names-option-text">{name.givenName}</Typography>
    </button>
  );
};
