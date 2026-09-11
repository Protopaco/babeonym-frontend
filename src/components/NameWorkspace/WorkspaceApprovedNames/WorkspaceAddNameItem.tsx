import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './WorkspaceAddNameItem.css';

type Props = {
  onClick: () => void;
};

const WorkspaceAddNameItem = ({ onClick }: Props) => {
  return (
    <li className="workspace-add-name-item">
      <span className="workspace-add-name-position" aria-hidden="true" />
      <span className="workspace-add-name-grip-slot" aria-hidden="true" />
      {/* Was a bare MUI Tooltip, always on and unthemed, so it looked nothing
          like the rest of the tutorial's bubbles. "Your own" is the part that
          matters — nothing else on the screen says you can type a name rather
          than wait for one. The aria-label carries the button's name for anyone
          the tooltip does not reach. */}
      <TutorialTooltip title="Add your own name" placement="top">
        <IconButton className="workspace-add-name-button" onClick={onClick} aria-label="Add custom name">
          <AddIcon />
        </IconButton>
      </TutorialTooltip>
    </li>
  );
};

export default WorkspaceAddNameItem;
