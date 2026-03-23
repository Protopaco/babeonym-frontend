import Button from '@mui/material/Button';
import './PrimaryButton.css';

type Props = {
  text: string;
  onClick: Function;
};

export default ({ text, onClick }: Props) => {
  return (
    <Button
      variant="contained"
      size="large"
      onClick={() => {
        onClick();
      }}
      className="primary-button"
    >
      {text}
    </Button>
  );
};
