import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { GivenName } from '@/api/generated';
import CompareNameButton from '@/components/CompareNames/CompareNameButton';
import type { ComparePair } from '@/components/CompareNames/compareNames.types';
import './CompareNamesContent.css';

type Props = {
  approvedGivenNames: GivenName[];
  currentPair: ComparePair | null;
  givenNameProviderLoaded: boolean;
  onVote: (winner: GivenName) => void;
};

export default ({ approvedGivenNames, currentPair, givenNameProviderLoaded, onVote }: Props) => {
  if (!givenNameProviderLoaded) return null;

  if (!currentPair) return null;

  return (
    <Box className="compare-names-content-workspace">
      <Box className="compare-names-content-pair">
        <CompareNameButton name={currentPair.left} onVote={onVote} />
        <Typography className="compare-names-content-or">OR</Typography>
        <CompareNameButton name={currentPair.right} onVote={onVote} />
      </Box>
    </Box>
  );
};
