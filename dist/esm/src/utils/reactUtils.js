function containsOnlyIcon(children) {
    var _a, _b, _c;
    return typeof children === "object" && ((_c = (_b = (_a = children === null || children === void 0 ? void 0 : children.type) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.render) === null || _c === void 0 ? void 0 : _c.muiName) === "SvgIcon";
}

export { containsOnlyIcon };
//# sourceMappingURL=reactUtils.js.map
