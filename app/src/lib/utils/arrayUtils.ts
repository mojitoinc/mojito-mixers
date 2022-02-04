export function distinctBy<V = any>(array: V[], key: keyof V): V[] {
  const map = new Map(array.map(item => [item[key], item]));

  return Array.from(map.values());
}
