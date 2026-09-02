import { FetchError, ResponseError } from '@/api/generated';

const RETRY_DELAYS_MS = [400, 1200];

// A dropped connection or a failing server is worth another attempt. A 4xx is
// the server rejecting the request itself, so repeating it changes nothing.
const isRetryable = (error: unknown): boolean => {
  if (error instanceof FetchError) return true;
  return error instanceof ResponseError && error.response.status >= 500;
};

const wait = (delayMs: number) => new Promise((resolve) => setTimeout(resolve, delayMs));

// Only safe for requests that can be replayed without changing the result.
const retryRequest = async <T>(task: () => Promise<T>): Promise<T> => {
  for (const delayMs of RETRY_DELAYS_MS) {
    try {
      return await task();
    } catch (error) {
      if (!isRetryable(error)) throw error;
      await wait(delayMs);
    }
  }

  return task();
};

export default retryRequest;
