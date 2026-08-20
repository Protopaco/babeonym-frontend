import List from '@mui/material/List';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import ApprovedGivenNameChip from '@/components/Shared/ApprovedGivenNameChip/ApprovedGivenNameChip';
import '@/components/NameGenerator/DrawerApproved/DrawerApprovedList/DrawerApprovedList.css';
import { AnimatePresence } from 'motion/react';

export default () => {
  const givenNameContext = useGivenNames();
  const { approvedGivenNames } = givenNameContext.state;
  const firstThree = approvedGivenNames.slice(0, 3);

  const createApprovedChips = () => {
    return firstThree.map((approvedGivenName) => (
      <ApprovedGivenNameChip key={approvedGivenName.givenCustomNameBridgeId} approvedGivenName={approvedGivenName} />
    ));
  };

  return (
    <List className="drawer-approved-list">
      <AnimatePresence initial={false}>{createApprovedChips()}</AnimatePresence>
    </List>
  );
};
