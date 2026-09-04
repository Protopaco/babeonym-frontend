import type { GivenName } from '@/api/generated';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import BaseNameChip from '@/components/Shared/BaseNameChip/BaseNameChip';
import NameTypography from '@/components/Shared/NameTypography/NameTypography';
import '@/components/Shared/ListNameChip/ListNameChip.css';
import { motion } from 'motion/react';

type Props = {
  approvedGivenName: GivenName;
  size?: 'default' | 'large';
};

const ListNameChip = ({ approvedGivenName, size = 'default' }: Props) => {
  const { givenName, givenCustomNameBridgeId } = approvedGivenName;
  const { rejectCandidate } = useGivenNamesActions();

  const rejectClick = async () => {
    await rejectCandidate(givenCustomNameBridgeId);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="list-name-chip"
      data-size={size}
    >
      <BaseNameChip size={size}>
        <NameTypography name={givenName} />
      </BaseNameChip>
      <Box className="list-name-chip-delete-drawer">
        <IconButton className="list-name-chip-delete" onClick={rejectClick} aria-label={`Remove ${givenName}`}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </motion.div>
  );
};

export default ListNameChip;
