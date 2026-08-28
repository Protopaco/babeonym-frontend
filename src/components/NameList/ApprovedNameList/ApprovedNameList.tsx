import List from '@mui/material/List';
import { AnimatePresence } from 'motion/react';
import type { GivenName } from '@/api/generated';
import ApprovedGivenNameChip from '@/components/Shared/ApprovedGivenNameChip/ApprovedGivenNameChip';
import './ApprovedNameList.css';

type Props = {
  approvedGivenNames: GivenName[];
};

export default ({ approvedGivenNames }: Props) => {
  return (
    <List className="approved-name-list" aria-label="Saved names">
      <AnimatePresence initial={false}>
        {approvedGivenNames.map((approvedGivenName) => (
          <ApprovedGivenNameChip key={approvedGivenName.givenCustomNameBridgeId} approvedGivenName={approvedGivenName} size="large" />
        ))}
      </AnimatePresence>
    </List>
  );
};
