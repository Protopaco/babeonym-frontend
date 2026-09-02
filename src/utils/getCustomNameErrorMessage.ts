import { ResponseError } from '@/api/generated';

// The server's error strings are developer-facing, so the status is mapped to
// copy here instead. A custom name is only rejected with 400 when it contains
// inappropriate language; the chip never submits an empty name.
const getCustomNameErrorMessage = (error: unknown): string => {
  if (error instanceof ResponseError && error.response.status === 400) {
    return "That name can't be used.";
  }

  return 'Something went wrong. Try again.';
};

export default getCustomNameErrorMessage;
