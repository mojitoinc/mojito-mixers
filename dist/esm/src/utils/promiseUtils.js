function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function isPromise(maybePromise) {
    return maybePromise && typeof maybePromise === 'object' && typeof maybePromise.then === 'function';
}

export { isPromise, wait };
//# sourceMappingURL=promiseUtils.js.map
