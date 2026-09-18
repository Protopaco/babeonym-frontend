import { useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionHeader from '@/components/Shared/SectionHeader/SectionHeader';
import PrimaryTextButton from '@/components/Shared/PrimaryTextButton/PrimaryTextButton';
import startGoogleSignIn from '@/api/startGoogleSignIn';
import resolveErrorPageContent from '@/pages/ErrorPage/resolveErrorPageContent';
import './ErrorPage.css';

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
      <Box className="error-page-column">
        <SectionHeader title={title} />
        <Typography variant="body1" className="error-page-message">
          {message}
        </Typography>
        <Box className="error-page-actions">
          {showRetrySignIn ? <PrimaryTextButton text="Try again" onClick={startGoogleSignIn} size="compact-wide" emphasis="fill" /> : null}
          {showReload ? <PrimaryTextButton text="Try again" onClick={reloadPage} size="compact-wide" emphasis="fill" /> : null}
          {showReturnHome ? <PrimaryTextButton text="Return home" onClick={returnHome} size="compact-wide" /> : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorPage;
