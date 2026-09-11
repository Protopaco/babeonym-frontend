import type { GivenName } from '@/api/generated';
import ButtonBase from '@mui/material/ButtonBase';
import BaseNameChip from '@/components/Shared/BaseNameChip/BaseNameChip';
import NameTypography from '@/components/Shared/NameTypography/NameTypography';
import TutorialTooltip from '@/components/Shared/TutorialTooltip/TutorialTooltip';
import '@/components/CompareNames/CompareNameChip/CompareNameChip.css';

type Props = {
  name: GivenName;
  onVote: (name: GivenName) => void;
};

// Both chips carry the hint rather than one, because the pair is the choice —
// a bubble on only one would read as saying something about that name.
const CompareNameChip = ({ name, onVote }: Props) => {
  return (
    <TutorialTooltip title="Pick the one you like better" placement="top">
      <ButtonBase className="compare-name-chip" onClick={() => onVote(name)} aria-label={`Vote for ${name.givenName}`}>
        <BaseNameChip size="compare" interactive>
          <NameTypography name={name.givenName} />
        </BaseNameChip>
      </ButtonBase>
    </TutorialTooltip>
  );
};

export default CompareNameChip;
