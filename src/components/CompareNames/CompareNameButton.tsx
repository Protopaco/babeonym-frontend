import Typography from '@mui/material/Typography';
import type { GivenName } from '@/api/generated';
import './CompareNameButton.css';

type Props = {
  name: GivenName;
  onVote: (winner: GivenName) => void;
};

export default ({ name, onVote }: Props) => {
  return (
    <button className="compare-name-button" type="button" onClick={() => onVote(name)}>
      <Typography className="compare-name-button-text">{name.givenName}</Typography>
    </button>
  );
};
