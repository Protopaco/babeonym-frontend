// Serializes requests that mutate shared state. Without this, two quick
// actions can have their responses arrive out of order and an older payload
// overwrites a newer one.
let chain: Promise<unknown> = Promise.resolve();

const enqueueRequest = <T>(task: () => Promise<T>): Promise<T> => {
  // A failed task must not break the chain, so the queued position always
  // resolves. The error still reaches the caller through the returned promise.
  const result = chain.then(task);
  chain = result.catch(() => undefined);
  return result;
};

export default enqueueRequest;
