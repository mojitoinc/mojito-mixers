export function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function isPromise(maybePromise: any): maybePromise is Promise<any> {
  return maybePromise && typeof maybePromise === 'object' && typeof maybePromise.then === 'function';
}
