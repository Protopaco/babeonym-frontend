import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import ApprovedGivenNameChip from '@/components/Shared/ApprovedGivenNameChip/ApprovedGivenNameChip';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import PrimaryButton from '@/components/Shared/PrimaryButton/PrimaryButton';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import './NameList.css';

const NameList = () => {
  const { state } = useGivenNames();
  const navigate = useNavigate();
  const { approvedGivenNames, givenNameProviderLoaded } = state;
  const canCompareNames = approvedGivenNames.length >= 2;
  const skeletonItems = Array.from({ length: 12 }, (_, index) => `saved-name-skeleton-${index}`);
  const compareNamesClick = () => {
    navigate('/compare');
  };

  return (
    <Container maxWidth="lg" id="name-list-container">
      <Box id="name-list-header">
        <SectionHeader title="Your Names" />
        <MobileSectionHeader title="Your Names" />
      </Box>
      {givenNameProviderLoaded ? (
        approvedGivenNames.length ? (
          <>
            <List id="name-list-approved-names" aria-label="Saved names">
              <AnimatePresence initial={false}>
                {approvedGivenNames.map((approvedGivenName) => (
                  <ApprovedGivenNameChip key={approvedGivenName.givenCustomNameBridgeId} approvedGivenName={approvedGivenName} size="large" />
                ))}
              </AnimatePresence>
            </List>
            {canCompareNames ? (
              <Box id="name-list-actions">
                <PrimaryButton text="Compare Names" onClick={compareNamesClick} />
              </Box>
            ) : null}
          </>
        ) : (
          <Box id="name-list-empty-state">
            <Typography variant="h5" id="name-list-empty-state-title">
              No saved names yet
            </Typography>
            <Typography id="name-list-empty-state-copy">
              Head to the{' '}
              <Link id="name-list-empty-state-link" to="/">
                Name Generator
              </Link>{' '}
              to start saving favorites.
            </Typography>
          </Box>
        )
      ) : (
        <Box id="name-list-skeleton" aria-label="Loading saved names">
          {skeletonItems.map((skeletonItem) => (
            <Box className="name-list-skeleton-chip" key={skeletonItem}>
              <Box className="name-list-skeleton-label" />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default NameList;
