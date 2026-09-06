import { FetchError, ResponseError } from '@/api/generated';

// One sentence, and it carries its own next step. Anything that needs a second
// line is saying too much for a failure the user did not ask about.
//
// Called where the error is caught, so what reaches state is finished copy
// rather than an error object. Nothing downstream has to know what a
// ResponseError is.
//
// Deliberately not a replacement for a route's own error copy. A 400 means
// something different on every endpoint, so a caller that can say something
// specific should say it and fall through to here for everything else —
// getCustomNameErrorMessage is the existing example.
const getErrorMessage = (error: unknown): string => {
  if (error instanceof FetchError) {
    return "Couldn't reach the server. Check your connection.";
  }

  if (error instanceof ResponseError) {
    if (error.response.status === 429) {
      return 'Too many requests. Give it a moment.';
    }

    if (error.response.status >= 500) {
      return 'Something went wrong on our end.';
    }
  }

  return 'Something went wrong.';
};

export default getErrorMessage;
