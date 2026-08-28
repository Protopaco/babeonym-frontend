import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import type { GivenName } from '@/api/generated';
import CompareNameButton from '@/components/CompareNames/CompareNameButton';
import CompareNameRankings from '@/components/CompareNames/CompareNameRankings';
import type { ComparePair } from '@/components/CompareNames/compareNames.types';
import './CompareNamesContent.css';

type Props = {
  approvedGivenNames: GivenName[];
  currentPair: ComparePair | null;
  givenNameProviderLoaded: boolean;
  onVote: (winner: GivenName) => void;
};

export default ({ approvedGivenNames, currentPair, givenNameProviderLoaded, onVote }: Props) => {
  const approvedGivenNameCount = approvedGivenNames.length;

  if (!givenNameProviderLoaded) {
    return <Typography className="compare-names-content-empty-state">Loading saved names...</Typography>;
  }

  if (!approvedGivenNameCount) {
    return (
      <Typography className="compare-names-content-empty-state">
        Head to the{' '}
        <Link className="compare-names-content-inline-link" to="/">
          Name Generator
        </Link>{' '}
        to start saving names.
      </Typography>
    );
  }

  if (approvedGivenNameCount < 2) {
    return (
      <Typography className="compare-names-content-empty-state">
        Save at least two names on{' '}
        <Link className="compare-names-content-inline-link" to="/list">
          Your Names
        </Link>{' '}
        to start comparing.
      </Typography>
    );
  }

  if (!currentPair) {
    return <Typography className="compare-names-content-empty-state">Preparing names to compare...</Typography>;
  }

  return (
    <Box className="compare-names-content-workspace">
      <Box className="compare-names-content-pair">
        <CompareNameButton name={currentPair.left} onVote={onVote} />
        <Typography className="compare-names-content-or">OR</Typography>
        <CompareNameButton name={currentPair.right} onVote={onVote} />
      </Box>
      <CompareNameRankings approvedGivenNames={approvedGivenNames} />
    </Box>
  );
};
