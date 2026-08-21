import Button from '@mui/material/Button';
import './PrimaryButton.css';

type Props = {
  text: string;
  onClick: Function;
  disabled?: boolean;
};

export default ({ text, onClick, disabled = false }: Props) => {
  return (
    <Button
      variant="contained"
      size="large"
      disabled={disabled}
      onClick={() => {
        onClick();
      }}
      className="primary-button"
    >
      {text}
    </Button>
  );
};
