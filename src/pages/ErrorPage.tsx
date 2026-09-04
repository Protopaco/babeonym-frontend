import { useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import SecondaryButton from '@/components/Shared/SecondaryButton/SecondaryButton';
import startGoogleSignIn from '@/api/startGoogleSignIn';
import './ErrorPage.css';

const AUTHENTICATION_ERROR_CATEGORY = 'oauth';
const SIGN_IN_CANCELLED_DETAIL = 'access_denied';

type ErrorPageContent = {
  title: string;
  message: string;
  showRetrySignIn: boolean;
};

const resolveErrorPageContent = (errorCategory: string | null, errorDetails: string | null): ErrorPageContent => {
  if (errorCategory === AUTHENTICATION_ERROR_CATEGORY && errorDetails === SIGN_IN_CANCELLED_DETAIL) {
    return {
      title: 'Sign-in cancelled',
      message: 'You cancelled sign-in before it finished. You can try again whenever you are ready.',
      showRetrySignIn: true,
    };
  }

  if (errorCategory === AUTHENTICATION_ERROR_CATEGORY) {
    return {
      title: 'Error with authentication',
      message: 'Something went wrong in the handoff between Babeonym and Google. Signing in again usually clears it up.',
      showRetrySignIn: true,
    };
  }

  return {
    title: 'Something went wrong',
    message: 'We hit an unexpected problem. Head back home and give it another try.',
    showRetrySignIn: false,
  };
};

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { title, message, showRetrySignIn } = resolveErrorPageContent(searchParams.get('error'), searchParams.get('details'));

  const returnHome = () => {
    navigate('/');
  };

  return (
    <Box className="error-page">
      <SectionHeader title={title} />
      <Typography variant="body1" className="error-page-message">
        {message}
      </Typography>
      <Box className="error-page-actions">
        {showRetrySignIn ? <PrimaryTextButton text="Try again" onClick={startGoogleSignIn} /> : null}
        <SecondaryButton text="Return home" onClick={returnHome} />
      </Box>
    </Box>
  );
};

export default ErrorPage;
