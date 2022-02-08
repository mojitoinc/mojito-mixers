function distinctBy(array, key) {
  var map = new Map(array.map(function (item) {
    return [item[key], item];
  }));
  return Array.from(map.values());
}

export { distinctBy };
//# sourceMappingURL=arrayUtils.js.map
