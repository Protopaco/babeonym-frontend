import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import type { GivenName } from '@/api/generated';
import ListNameChip from '@/components/Shared/ListNameChip/ListNameChip';
import './WorkspaceApprovedNameItem.css';

type Props = {
  approvedGivenName: GivenName;
  position: number;
};

const WorkspaceApprovedNameItem = ({ approvedGivenName, position }: Props) => {
  return (
    // A spring rather than one of the duration tokens, because a spring has no
    // duration to take from them. It is the right shape here: the list reorders
    // while items may still be moving, and a spring absorbs that interruption
    // where a fixed duration would restart and jerk.
    <motion.li
      className="workspace-approved-name"
      layout="position"
      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
    >
      <Typography className="workspace-approved-name-position">{position}</Typography>
      <ListNameChip approvedGivenName={approvedGivenName} size="large" />
    </motion.li>
  );
};

export default WorkspaceApprovedNameItem;
