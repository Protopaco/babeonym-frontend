import type { GivenName } from '@/api/generated';
import ButtonBase from '@mui/material/ButtonBase';
import BaseNameChip from '@/components/Shared/BaseNameChip/BaseNameChip';
import NameTypography from '@/components/Shared/NameTypography/NameTypography';
import '@/components/CompareNames/CompareNameChip/CompareNameChip.css';

type Props = {
  name: GivenName;
  onVote: (name: GivenName) => void;
};

const CompareNameChip = ({ name, onVote }: Props) => {
  return (
    <ButtonBase className="compare-name-chip" onClick={() => onVote(name)} aria-label={`Vote for ${name.givenName}`}>
      <BaseNameChip size="compare" interactive>
        <NameTypography name={name.givenName} />
      </BaseNameChip>
    </ButtonBase>
  );
};

export default CompareNameChip;
