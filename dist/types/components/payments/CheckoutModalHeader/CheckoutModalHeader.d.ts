import { Theme, SxProps } from "@mui/material/styles";
import { UserFormat } from "../../../domain/auth/authentication.interfaces";
import { User } from "../../../queries/graphqlGenerated";
import React from "react";
export declare type CheckoutModalHeaderVariant = "anonymous" | "guest" | "loggedIn" | "logoOnly" | "purchasing" | "error";
export interface CheckoutModalHeaderProps {
    variant: CheckoutModalHeaderVariant;
    title?: string;
    logoSrc: string;
    logoSx?: SxProps<Theme>;
    user?: User;
    userFormat?: UserFormat;
    onLoginClicked?: () => void;
    onPrevClicked?: () => void;
}
export declare const CheckoutModalHeader: React.FC<CheckoutModalHeaderProps>;
