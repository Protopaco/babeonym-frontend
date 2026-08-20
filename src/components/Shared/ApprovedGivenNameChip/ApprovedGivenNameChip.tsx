import type { GivenName } from '@/api/generated';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './ApprovedGivenNameChip.css';
import { useState } from 'react';

type Props = {
  approvedGivenName: GivenName;
};

export default ({ approvedGivenName }: Props) => {
  const { givenName, givenCustomNameBridgeId } = approvedGivenName;
  const { rejectCandidate } = useGivenNamesActions();
  const [isDeleting, setIsDeleting] = useState(false);

  const rejectClick = async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);
    window.setTimeout(async () => {
      await rejectCandidate(givenCustomNameBridgeId);
    }, 180);
  };

  return (
    <Box className={`approved-given-name-chip ${isDeleting ? 'approved-given-name-chip--deleting' : ''}`}>
      <Box className="approved-given-name-chip-label">
        <Typography className="approved-given-name-chip-text">{givenName}</Typography>
      </Box>
      <Box className="approved-given-name-chip-delete-drawer">
        <IconButton className="approved-given-name-chip-delete" onClick={rejectClick} aria-label={`Remove ${givenName}`}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
