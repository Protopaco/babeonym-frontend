import type { ReactNode } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import BaseNameChip from '@/components/Shared/BaseNameChip/BaseNameChip';
import '@/components/Shared/NameChipAction/NameChipAction.css';

type Props = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  size?: 'default' | 'large';
  fill?: 'primary' | 'secondary' | 'error';
  disabled?: boolean;
};

// A second chip that slides out beside a name chip. It is the same pill in
// shorter form, so it takes its border, radius and height from BaseNameChip and
// changes only the fill and what sits inside.
const NameChipAction = ({ icon, label, onClick, size = 'default', fill = 'primary', disabled = false }: Props) => {
  return (
    <ButtonBase
      className="name-chip-action"
      data-size={size}
      data-fill={fill}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
    >
      <BaseNameChip size={size} shape="action">
        {icon}
      </BaseNameChip>
    </ButtonBase>
  );
};

export default NameChipAction;
