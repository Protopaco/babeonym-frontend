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
const SESSION_ERROR_CATEGORY = 'session';

type ErrorPageContent = {
  title: string;
  message: string;
  showRetrySignIn: boolean;
  // Separate from the sign-in retry because the session case has no sign-in to
  // retry — the app never got one. A full reload is what re-runs the boot.
  showReload: boolean;
  // The session case has to withhold it. AppLayout redirects here for as long
  // as the failure stands, so going home would bounce straight back and the
  // button would look broken.
  showReturnHome: boolean;
};

const resolveErrorPageContent = (errorCategory: string | null, errorDetails: string | null): ErrorPageContent => {
  if (errorCategory === AUTHENTICATION_ERROR_CATEGORY && errorDetails === SIGN_IN_CANCELLED_DETAIL) {
    return {
      title: 'Sign-in cancelled',
      message: 'You cancelled sign-in before it finished. You can try again whenever you are ready.',
      showRetrySignIn: true,
      showReload: false,
      showReturnHome: true,
    };
  }

  if (errorCategory === AUTHENTICATION_ERROR_CATEGORY) {
    return {
      title: 'Error with authentication',
      message: 'Something went wrong in the handoff between Babeonym and Google. Signing in again usually clears it up.',
      showRetrySignIn: true,
      showReload: false,
      showReturnHome: true,
    };
  }

  if (errorCategory === SESSION_ERROR_CATEGORY) {
    return {
      title: "Couldn't start your session",
      message: 'We could not reach Babeonym to get you set up. Check your connection and reload the page.',
      showRetrySignIn: false,
      showReload: true,
      showReturnHome: false,
    };
  }

  return {
    title: 'Something went wrong',
    message: 'We hit an unexpected problem. Head back home and give it another try.',
    showRetrySignIn: false,
    showReload: false,
    showReturnHome: true,
  };
};

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { title, message, showRetrySignIn, showReload, showReturnHome } = resolveErrorPageContent(
    searchParams.get('error'),
    searchParams.get('details')
  );

  const returnHome = () => {
    navigate('/');
  };

  // A full reload rather than a navigation. The boot runs once per page load,
  // so re-entering the app through the router would find the same failed state
  // and redirect straight back here.
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Box className="error-page">
      <SectionHeader title={title} />
      <Typography variant="body1" className="error-page-message">
        {message}
      </Typography>
      <Box className="error-page-actions">
        {showRetrySignIn ? <PrimaryTextButton text="Try again" onClick={startGoogleSignIn} /> : null}
        {showReload ? <PrimaryTextButton text="Try again" onClick={reloadPage} /> : null}
        {showReturnHome ? <SecondaryButton text="Return home" onClick={returnHome} /> : null}
      </Box>
    </Box>
  );
};

export default ErrorPage;
