
export function containsOnlyIcon(children: any) {
  return typeof children === "object" && children?.type?.type?.render?.muiName === "SvgIcon";
}
