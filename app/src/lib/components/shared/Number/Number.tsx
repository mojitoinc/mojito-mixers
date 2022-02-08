import React from "react";

interface NumberProps {
  as?: React.ElementType;
  children: number;
  prefix?: string;
  suffix?: string;
};

export const Number: React.FC<NumberProps> = ({
  as: Wrapper = "span",
  children,
  prefix = "",
  suffix = ""
}) => {
  const numberFormat = new Intl.NumberFormat();

  return (
    <Wrapper>{`${prefix}${numberFormat.format(children)}${suffix}`}</Wrapper>
  );
};
