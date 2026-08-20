import List from '@mui/material/List';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import ApprovedGivenNameChip from '@/components/Shared/ApprovedGivenNameChip/ApprovedGivenNameChip';
import type { GivenName } from '@/api/generated';
import { useEffect, useState } from 'react';
import '@/components/NameGenerator/DrawerApproved/DrawerApprovedList/DrawerApprovedList.css';

export default () => {
  const givenNameContext = useGivenNames();
  const { approvedGivenNames } = givenNameContext.state;
  const [firstThree, setFirstThree] = useState([] as GivenName[]);

  useEffect(() => {
    setFirstThree(approvedGivenNames.slice(0, 3));
  }, [approvedGivenNames]);

  const createApprovedChips = () => {
    return firstThree.map((approvedGivenName, index) => <ApprovedGivenNameChip key={index} approvedGivenName={approvedGivenName} />);
  };

  return <List className="drawer-approved-list">{createApprovedChips()}</List>;
};
