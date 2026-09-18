import ButtonBase from '@mui/material/ButtonBase';
import type { ThemeId } from '@/models/ThemeId';
import './ThemeChip.css';

type Props = {
  themeId: ThemeId;
  label: string;
  active: boolean;
  onSelect: () => void;
};

// A pill painted in the theme it picks. The label names it, so it needs no
// aria-label. Which one is active shows in the row's widths, which the picker
// owns; the pill only reports it through aria-pressed.
const ThemeChip = ({ themeId, label, active, onSelect }: Props) => {
  return (
    <ButtonBase className="theme-chip" data-theme-id={themeId} aria-pressed={active} onClick={onSelect}>
      <span className="theme-chip-label">{label}</span>
    </ButtonBase>
  );
};

export default ThemeChip;
