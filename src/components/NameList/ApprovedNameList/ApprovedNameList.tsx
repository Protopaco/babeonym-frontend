import List from '@mui/material/List';
import { useGivenNames } from '@/state/givenName/givenName.provider';
import ApprovedGivenNameChip from '@/components/Shared/ApprovedGivenNameChip/ApprovedGivenNameChip';
import type { GivenName } from '@/api/generated';
import { useEffect, useState } from 'react';

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

  return <List>{createApprovedChips()}</List>;
};
