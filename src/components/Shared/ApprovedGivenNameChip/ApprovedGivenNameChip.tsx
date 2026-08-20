import type { GivenName } from '@/api/generated';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './ApprovedGivenNameChip.css';

type Props = {
  approvedGivenName: GivenName;
};

export default ({ approvedGivenName }: Props) => {
  const { givenName, givenCustomNameBridgeId } = approvedGivenName;
  const { rejectCandidate } = useGivenNamesActions();

  const rejectClick = async () => {
    await rejectCandidate(givenCustomNameBridgeId);
  };

  return (
    <Box className="approved-given-name-chip">
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
