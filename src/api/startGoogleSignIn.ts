// Deliberately not part of the generated API client.
//
// Starting an OAuth flow requires a real browser navigation so the backend can
// issue its redirect to Google's consent screen. A fetch-based client call
// cannot do that, which is why this hits the endpoint by assigning location
// rather than going through src/api/client.ts.

const startGoogleSignIn = () => {
  window.location.assign(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/google`);
};

export default startGoogleSignIn;
