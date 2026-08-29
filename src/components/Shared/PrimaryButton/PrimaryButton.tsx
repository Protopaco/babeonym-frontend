import Button from '@mui/material/Button';
import './PrimaryButton.css';

type Props = {
  text: string;
  onClick: Function;
  disabled?: boolean;
  size?: 'default' | 'wide' | 'compact';
};

export default ({ text, onClick, disabled = false, size = 'default' }: Props) => {
  return (
    <Button
      variant="outlined"
      size="large"
      disabled={disabled}
      data-size={size}
      onClick={() => {
        onClick();
      }}
      className="primary-button"
    >
      {text}
    </Button>
  );
};
