import React from "react";

type NumberProps = {
  as?: React.ElementType;
  children: number;
  prefix?: string;
  suffix?: string;
};

export const Number = ({
  as: Wrapper = "span",
  children,
  prefix = "",
  suffix = ""
}: NumberProps): JSX.Element => {
  const numberFormat = new Intl.NumberFormat();

  return (
    <Wrapper>{`${prefix}${numberFormat.format(children)}${suffix}`}</Wrapper>
  );
};
