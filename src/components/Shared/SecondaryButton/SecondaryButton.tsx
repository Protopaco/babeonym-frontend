import Button from '@mui/material/Button';
import './SecondaryButton.css';

type Props = {
  text: string;
  onClick: Function;
  disabled?: boolean;
  // What the button sits on. The default contained fill is the primary colour,
  // which vanishes on a primary background.
  surface?: 'default' | 'primary';
};

export default ({ text, onClick, disabled = false, surface = 'default' }: Props) => {
  return (
    <Button
      className={`secondary-button secondary-button--${surface}-surface`}
      variant="contained"
      size="small"
      disabled={disabled}
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </Button>
  );
};
