import Button from '@mui/material/Button';
import './DrawerActionButton.css';

type Props = {
  text: string;
  onClick: Function;
};

export default ({ text, onClick }: Props) => {
  return (
    <Button
      variant="contained"
      size="small"
      onClick={() => {
        onClick();
      }}
      className="drawer-action-button"
    >
      {text}
    </Button>
  );
};
