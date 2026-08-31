import Box from '@mui/material/Box';
import { useCompareNamePair } from '@/components/CompareNames/useCompareNamePair';
import CompareNameButton from './CompareNameButton';
import { Typography } from '@mui/material';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import './CompareNamesMode.css';
import PrimaryButtonSkeleton from '../Shared/PrimaryButton/PrimaryButtonSkeleton';
import { useCompareNameVoting } from '@/components/CompareNames/useCompareNameVoting';

const CompareNamesMode = () => {
  const { state } = useGivenNames();
  const { approvedGivenNames, givenNameProviderLoaded } = state;
  const { currentPair, advancePair } = useCompareNamePair(approvedGivenNames, givenNameProviderLoaded);
  const { voteForName } = useCompareNameVoting(currentPair, advancePair);

  return (
    <Box className="compare-names-mode-content">
      {currentPair && currentPair.left && currentPair.right ? (
        <>
          <CompareNameButton name={currentPair.left} onVote={voteForName} />
          <Typography className="compare-names-content-or">OR</Typography>
          <CompareNameButton name={currentPair.right} onVote={voteForName} />
        </>
      ) : (
        <>
          <PrimaryButtonSkeleton />
          <Typography className="compare-names-content-or">OR</Typography>
          <PrimaryButtonSkeleton />
        </>
      )}
    </Box>
  );
};

export default CompareNamesMode;
