import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import ApprovedNameList from '@/components/NameList/ApprovedNameList/ApprovedNameList';
import NameListActions from '@/components/NameList/NameListActions/NameListActions';
import NameListEmptyState from '@/components/NameList/NameListEmptyState/NameListEmptyState';
import NameListSkeleton from '@/components/NameList/NameListSkeleton/NameListSkeleton';
import MobileSectionHeader from '@/components/Shared/MobileSectionHeader/MobileSectionHeader';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import './NameList.css';

const NameList = () => {
  const { state } = useGivenNames();
  const navigate = useNavigate();
  const { approvedGivenNames, givenNameProviderLoaded } = state;
  const canCompareNames = approvedGivenNames.length >= 2;
  const compareNamesClick = () => {
    if (!canCompareNames) return;

    navigate('/?mode=compare');
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
            <ApprovedNameList approvedGivenNames={approvedGivenNames} />
            <NameListActions canCompareNames={canCompareNames} onCompareNamesClick={compareNamesClick} />
          </>
        ) : (
          <NameListEmptyState />
        )
      ) : (
        <NameListSkeleton />
      )}
    </Container>
  );
};

export default NameList;
