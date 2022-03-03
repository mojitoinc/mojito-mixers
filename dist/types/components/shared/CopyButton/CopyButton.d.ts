import { FunctionComponent } from 'react';
declare type CopyButtonSize = "small" | "medium";
interface CopyButtonProps {
    label: string;
    value: string;
    size?: CopyButtonSize;
}
export declare const CopyButton: FunctionComponent<CopyButtonProps>;
export {};
