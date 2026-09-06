import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '@/components/Header/Header';
import FloatingTutorialIcon from '@/components/Shared/FloatingTutorialIcon/FloatingTutorialIcon';
import { useUser } from '@/state/user/user.context';
import '@/AppLayout.css';

const ERROR_PATH = '/error';

const AppLayout = () => {
  const { state } = useUser();
  const location = useLocation();

  // The redirect lives here because the state providers are mounted above
  // RouterProvider in main.tsx, so none of them can call useNavigate. This is
  // the first component inside the router that sees the failure.
  //
  // Guarded on the current path because /error is itself a child of this
  // layout. Without the guard the redirect would replace the Outlet the error
  // page renders into, and the user would land on the right URL looking at
  // nothing.
  if (state.sessionLoadFailed && location.pathname !== ERROR_PATH) {
    return <Navigate to={`${ERROR_PATH}?error=session`} replace />;
  }

  return (
    <>
      <Header />
      <Box component="main" id="main">
        <Outlet />
      </Box>
      <FloatingTutorialIcon />
    </>
  );
};

export default AppLayout;
