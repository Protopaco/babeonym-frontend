import { Typography } from '@mui/material';
import './CandidateErrorMessage.css';

type Props = {
  message: string;
};

// Renders what it is handed. The provider resolves the copy where the error is
// caught, so nothing here knows a request failed, let alone how.
const CandidateErrorMessage = ({ message }: Props) => {
  return (
    <div className="candidate-error-message">
      <Typography className="candidate-error-message-headline">{message}</Typography>
    </div>
  );
};

export default CandidateErrorMessage;
