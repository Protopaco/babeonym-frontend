import IconButton from '@mui/material/IconButton';
import BabyIcon from '@/assets/icons/icon-baby.svg?react';
import './FloatingHelperIcon.css';

export default () => {
  return (
    <IconButton className="floating-helper-icon" aria-label="Open tutorial help">
      <BabyIcon aria-hidden="true" focusable="false" />
    </IconButton>
  );
};
