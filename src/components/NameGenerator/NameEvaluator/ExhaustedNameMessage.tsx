import { Typography } from '@mui/material';
import './ExhaustedNameMessage.css';

export default () => {
  return (
    <div className="exhausted-name-message">
      <Typography className="exhausted-name-message-headline">You&rsquo;ve seen every name matching these filters.</Typography>
      <Typography className="exhausted-name-message-guidance">Widen or clear your filters to keep going.</Typography>
    </div>
  );
};
