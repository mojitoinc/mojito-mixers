import React from "react";
interface NumberProps {
    as?: React.ElementType;
    children: number;
    prefix?: string;
    suffix?: string;
}
export declare const Number: React.FC<NumberProps>;
export {};
