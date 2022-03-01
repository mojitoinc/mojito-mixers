import React from "react";
import { SelectOption } from "../components/shared/Select/Select";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { TaxesState } from "../views/Billing/BillingView";
declare const FULL_NAME_FIELD = "fullName";
declare const EMAIL_FIELD = "email";
declare const PHONE_FIELD = "phone";
declare const STREET_FIELD = "street";
declare const APARTMENT_FIELD = "apartment";
declare const ZIP_CODE_FIELD = "zipCode";
declare const CITY_FIELD = "city";
declare const STATE_FIELD = "state";
declare const COUNTRY_FIELD = "country";
export declare type BillingInfo = {
    [FULL_NAME_FIELD]: string;
    [EMAIL_FIELD]: string;
    [PHONE_FIELD]: string;
    [STREET_FIELD]: string;
    [APARTMENT_FIELD]: string;
    [ZIP_CODE_FIELD]: string;
    [CITY_FIELD]: string;
    [STATE_FIELD]: SelectOption;
    [COUNTRY_FIELD]: SelectOption;
};
export declare type TaxInfo = Omit<BillingInfo, "fullName" | "email" | "phone" | "apartment">;
export interface BillingInfoFormProps {
    defaultValues?: BillingInfo;
    checkoutError?: CheckoutModalError;
    taxes: TaxesState;
    onTaxInfoChange: (taxInfo: Partial<TaxInfo>) => void;
    onSaved?: () => void;
    onClose: () => void;
    onSubmit: (data: BillingInfo) => void;
    debug?: boolean;
}
export declare const BillingInfoForm: React.FC<BillingInfoFormProps>;
export {};
