import { useState } from 'react';
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
  // Held here rather than passed in, because voting advances the pair at once:
  // the chip that is leaving keeps the props it had before the tap, but it is
  // still this instance while it animates out, so its own state still renders.
  // Each new pair is a fresh instance, so it arrives unchosen.
  const [isChosen, setIsChosen] = useState(false);

  const choose = () => {
    setIsChosen(true);
    onVote(name);
  };

  return (
    <TutorialTooltip title="Pick the one you like better" placement="top">
      <ButtonBase className="compare-name-chip" onClick={choose} aria-label={`Vote for ${name.givenName}`}>
        <BaseNameChip size="compare" interactive state={isChosen ? 'chosen' : 'default'}>
          <NameTypography name={name.givenName} />
        </BaseNameChip>
      </ButtonBase>
    </TutorialTooltip>
  );
};

export default CompareNameChip;
