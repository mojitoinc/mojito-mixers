// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function containsOnlyIcon(children: any) {
  return typeof children === "object" && children?.type?.type?.render?.muiName === "SvgIcon";
}
