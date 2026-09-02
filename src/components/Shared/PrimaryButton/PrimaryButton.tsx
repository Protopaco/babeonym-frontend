import Button from '@mui/material/Button';
import './PrimaryButton.css';

type Props = {
  text: string;
  onClick: Function;
  disabled?: boolean;
  size?: 'default' | 'wide' | 'compact' | 'compact-wide';
  tone?: 'default' | 'danger';
};

export default ({ text, onClick, disabled = false, size = 'default', tone = 'default' }: Props) => {
  return (
    <Button
      variant="outlined"
      size="large"
      disabled={disabled}
      data-size={size}
      data-tone={tone}
      onClick={() => {
        onClick();
      }}
      className="primary-button"
    >
      {text}
    </Button>
  );
};
