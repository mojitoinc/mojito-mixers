import { Theme, SxProps } from "@mui/material/styles";
import { UserFormat } from "../../../domain/auth/authentication.interfaces";
import { User } from "../../../queries/graphqlGenerated";
import React, { Dispatch, SetStateAction } from "react";
export declare type CheckoutModalHeaderVariant = "anonymous" | "guest" | "loggedIn" | "logoOnly" | "purchasing" | "error";
export interface CheckoutModalHeaderProps {
    variant: CheckoutModalHeaderVariant;
    countdownElementRef?: React.RefObject<HTMLSpanElement>;
    title?: string;
    logoSrc: string;
    logoSx?: SxProps<Theme>;
    user?: User;
    userFormat?: UserFormat;
    onLogin?: () => void;
    onClose?: () => void;
    onPrev?: () => void;
    setDebug?: Dispatch<SetStateAction<boolean>>;
}
export declare const CheckoutModalHeader: React.FC<CheckoutModalHeaderProps>;
