import React from "react";
import { SelectOption } from "../components/shared/Select/Select";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
declare const FULL_NAME_FIELD = "fullName";
declare const EMAIL_FIELD = "email";
declare const PHONE_FIELD = "phone";
declare const STREET_FIELD = "street";
declare const APARTMENT_FIELD = "apartment";
declare const COUNTRY_FIELD = "country";
declare const CITY_FIELD = "city";
declare const STATE_FIELD = "state";
declare const ZIP_CODE_FIELD = "zipCode";
export declare type BillingInfo = {
    [APARTMENT_FIELD]: string;
    [CITY_FIELD]: string;
    [COUNTRY_FIELD]: SelectOption;
    [EMAIL_FIELD]: string;
    [FULL_NAME_FIELD]: string;
    [PHONE_FIELD]: string;
    [STATE_FIELD]: SelectOption;
    [STREET_FIELD]: string;
    [ZIP_CODE_FIELD]: string;
};
export interface BillingInfoFormProps {
    defaultValues?: BillingInfo;
    checkoutError?: CheckoutModalError;
    onSaved?: () => void;
    onClose: () => void;
    onSubmit: (data: BillingInfo) => void;
    debug?: boolean;
}
export declare const BillingInfoForm: React.FC<BillingInfoFormProps>;
export {};
