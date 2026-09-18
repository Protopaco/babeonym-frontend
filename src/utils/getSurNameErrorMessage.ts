import { ResponseError } from '@/api/generated';
import getErrorMessage from '@/utils/getErrorMessage';

// The server's error strings are developer-facing, so the status is mapped to
// copy here instead. The settings route also answers 400 when surName is not a
// string, but this app only ever sends a string or null, so a 400 here means
// inappropriate language. Anything else falls through to the shared copy.
const getSurNameErrorMessage = (error: unknown): string => {
  if (error instanceof ResponseError && error.response.status === 400) {
    return "That surname can't be used.";
  }

  return getErrorMessage(error);
};

export default getSurNameErrorMessage;
