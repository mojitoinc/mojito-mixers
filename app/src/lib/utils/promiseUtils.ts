export function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise(maybePromise: any): maybePromise is Promise<any> {
  return maybePromise && typeof maybePromise === "object" && typeof maybePromise.then === "function";
}
