// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function distinctBy<V extends Record<string, any> = Record<string, any>>(array: V[], key: keyof V): V[] {
  const map = new Map(array.map(item => [item[key], item]));

  return Array.from(map.values());
}

export function join(array: string[], separator = ", ", lastSeparator = ",") {
  const [lastElement, ...otherElements] = array.slice(0).reverse();

  return `${ otherElements.join(separator) }${ otherElements.length ? lastSeparator : "" }${ lastElement }`;
}
