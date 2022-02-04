import React from "react";
declare type NumberProps = {
    as?: React.ElementType;
    children: number;
    prefix?: string;
    suffix?: string;
};
export declare const Number: ({ as: Wrapper, children, prefix, suffix }: NumberProps) => JSX.Element;
export {};
