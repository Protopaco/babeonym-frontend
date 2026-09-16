import { Typography } from '@mui/material';
import approvedGivenNameLimit from '@/utils/approvedGivenNameLimit';
import './NameLimitMessage.css';

const NameLimitMessage = () => {
  return (
    <div className="name-limit-message">
      <Typography className="name-limit-message-headline">You&rsquo;ve saved the maximum of {approvedGivenNameLimit} names.</Typography>
      <Typography className="name-limit-message-guidance">Remove a name from your list to keep adding.</Typography>
    </div>
  );
};

export default NameLimitMessage;
