import Button from '@mui/material/Button';
import './SecondaryButton.css';

type Props = {
  text: string;
  onClick: Function;
  disabled?: boolean;
};

export default ({ text, onClick, disabled = false }: Props) => {
  return (
    <Button
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
