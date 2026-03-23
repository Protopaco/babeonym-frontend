import type { GivenName } from '@/api/generated';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
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
    <ListItem
      id="approved-given-name-chip"
      secondaryAction={
        <IconButton edge="end" onClick={rejectClick}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={givenName} />
    </ListItem>
  );
};
