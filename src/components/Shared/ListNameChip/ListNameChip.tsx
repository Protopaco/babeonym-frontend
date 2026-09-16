import { useState } from 'react';
import type { GivenName } from '@/api/generated';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NameEtymologyModal from '@/components/Shared/NameEtymologyModal/NameEtymologyModal';
import BaseNameChip from '@/components/Shared/BaseNameChip/BaseNameChip';
import NameChipAction from '@/components/Shared/NameChipAction/NameChipAction';
import NameTypography from '@/components/Shared/NameTypography/NameTypography';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import './ListNameChip.css';
import { motion } from 'motion/react';
import motionTokens from '@/themes/motion.theme';

const DELETE_HINT = 'Takes it off your list for good';

type Props = {
  approvedGivenName: GivenName;
  size?: 'default' | 'large';
  // The delete drawer repeats once per name, and a tooltip stays open on a
  // coarse pointer — so the list nominates one chip to carry the hint rather
  // than every chip showing the same bubble at once.
  showTutorialHint?: boolean;
};

const ListNameChip = ({ approvedGivenName, size = 'default', showTutorialHint = false }: Props) => {
  const { givenName, givenCustomNameBridgeId, etymology } = approvedGivenName;
  const { rejectCandidate } = useGivenNamesActions();
  const [etymologyOpen, setEtymologyOpen] = useState(false);

  const rejectClick = async () => {
    await rejectCandidate(givenCustomNameBridgeId);
  };

  // Built here so an unhinted chip renders it bare — TutorialTooltip wraps its
  // child in a span, and the drawer's action is positioned by NameChipAction's
  // own negative margin.
  const deleteAction = <NameChipAction icon={<DeleteIcon />} label={`Remove ${givenName}`} onClick={rejectClick} size={size} fill="error" />;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: motionTokens.durationSeconds[180], ease: motionTokens.ease.out }}
      className="list-name-chip"
      data-size={size}
    >
      <BaseNameChip size={size} interactive>
        <NameTypography name={givenName} />
        {/* A quiet marker only, so a name with etymology can be spotted at a
            glance. Opening it stays with the drawer's info action, which also
            carries the accessible label. */}
        {etymology ? <InfoOutlinedIcon className="list-name-chip-etymology-indicator" aria-hidden /> : null}
      </BaseNameChip>
      <div className="list-name-chip-drawer">
        {/* Only offered for a name with something to show, so a name without
            etymology keeps the delete-only drawer. Placed before delete so the
            destructive action stays at the far end. */}
        {etymology ? (
          <div className="list-name-chip-info">
            <NameChipAction
              icon={<InfoOutlinedIcon />}
              label={`About ${givenName}`}
              onClick={() => setEtymologyOpen(true)}
              size={size}
              fill="secondary"
            />
          </div>
        ) : null}
        {showTutorialHint ? (
          <TutorialTooltip title={DELETE_HINT} placement="right">
            {deleteAction}
          </TutorialTooltip>
        ) : (
          deleteAction
        )}
      </div>
      {/* The modal renders in a portal, but React still bubbles its events
          through this tree — so a press inside it would reach the list row and
          start a drag. Stopped here, at the wrapper around the modal. */}
      {etymology ? (
        <div className="list-name-chip-etymology-modal" onPointerDown={(event) => event.stopPropagation()}>
          <NameEtymologyModal open={etymologyOpen} onClose={() => setEtymologyOpen(false)} givenName={givenName} etymology={etymology} />
        </div>
      ) : null}
    </motion.div>
  );
};

export default ListNameChip;
