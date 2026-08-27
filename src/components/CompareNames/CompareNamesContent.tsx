import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import type { GivenName } from '@/api/generated';
import CompareNameButton from '@/components/CompareNames/CompareNameButton';
import CompareNameRankings from '@/components/CompareNames/CompareNameRankings';
import type { ComparePair } from '@/components/CompareNames/compareNames.types';

type Props = {
  approvedGivenNames: GivenName[];
  currentPair: ComparePair | null;
  givenNameProviderLoaded: boolean;
  onVote: (winner: GivenName) => void;
};

export default ({ approvedGivenNames, currentPair, givenNameProviderLoaded, onVote }: Props) => {
  const approvedGivenNameCount = approvedGivenNames.length;

  if (!givenNameProviderLoaded) {
    return <Typography id="compare-names-empty-state">Loading saved names...</Typography>;
  }

  if (!approvedGivenNameCount) {
    return (
      <Typography id="compare-names-empty-state">
        Head to the{' '}
        <Link className="compare-names-inline-link" to="/">
          Name Generator
        </Link>{' '}
        to start saving names.
      </Typography>
    );
  }

  if (approvedGivenNameCount < 2) {
    return (
      <Typography id="compare-names-empty-state">
        Save at least two names on{' '}
        <Link className="compare-names-inline-link" to="/list">
          Your Names
        </Link>{' '}
        to start comparing.
      </Typography>
    );
  }

  if (!currentPair) {
    return <Typography id="compare-names-empty-state">Preparing names to compare...</Typography>;
  }

  return (
    <Box id="compare-names-workspace">
      <Box id="compare-names-pair">
        <CompareNameButton name={currentPair.left} onVote={onVote} />
        <Typography id="compare-names-or">OR</Typography>
        <CompareNameButton name={currentPair.right} onVote={onVote} />
      </Box>
      <CompareNameRankings approvedGivenNames={approvedGivenNames} />
    </Box>
  );
};
