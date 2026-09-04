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
