/**
 * Allows you to type an object literal. For example, `to<MyInterface>({ ... })`. Doing `{ ... } as MyInterface` won't
 * work as that casts the object, so that will never fail, even if the object does not satisfy the interface.
 */
const to = (obj) => obj;

export { to };
//# sourceMappingURL=typescriptUtils.js.map
