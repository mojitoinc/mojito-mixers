function distinctBy(array, key) {
    const map = new Map(array.map(item => [item[key], item]));
    return Array.from(map.values());
}

export { distinctBy };
//# sourceMappingURL=arrayUtils.js.map
