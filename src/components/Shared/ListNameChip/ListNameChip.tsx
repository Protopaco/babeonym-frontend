import type { GivenName } from '@/api/generated';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import DeleteIcon from '@mui/icons-material/Delete';
import BaseNameChip from '@/components/Shared/BaseNameChip/BaseNameChip';
import NameChipAction from '@/components/Shared/NameChipAction/NameChipAction';
import NameTypography from '@/components/Shared/NameTypography/NameTypography';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import '@/components/Shared/ListNameChip/ListNameChip.css';
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
  const { givenName, givenCustomNameBridgeId } = approvedGivenName;
  const { rejectCandidate } = useGivenNamesActions();

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
      <BaseNameChip size={size}>
        <NameTypography name={givenName} />
      </BaseNameChip>
      <div className="list-name-chip-drawer">
        {showTutorialHint ? (
          <TutorialTooltip title={DELETE_HINT} placement="right">
            {deleteAction}
          </TutorialTooltip>
        ) : (
          deleteAction
        )}
      </div>
    </motion.div>
  );
};

export default ListNameChip;
