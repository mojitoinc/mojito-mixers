import { SelectOption } from "../../components/shared/Select/Select";
import { CreditCardBillingDetails, CreditCardMetadata, AchBillingDetails, AchMetadata } from "../../queries/graphqlGenerated";
import { PaymentType } from "../payment/payment.interfaces";

export type PaymentMethodStatus = "pending" | "complete" | "failed";

export interface RawSavedPaymentMethodCC {
  id: string;
  type: "CreditCard";
  status: PaymentMethodStatus;
  network: string;
  last4Digit: string;
  billingDetails: CreditCardBillingDetails;
  metadata: CreditCardMetadata;
}

export interface RawSavedPaymentMethodACH {
  id: string;
  type: "ACH";
  status: PaymentMethodStatus;
  accountNumber: string;
  billingDetails: AchBillingDetails;
  metadata: AchMetadata;
}

export type RawSavedPaymentMethod = (RawSavedPaymentMethodCC | RawSavedPaymentMethodACH) & { type: PaymentType };

export interface CommonSavedPaymentMethodBillingDetails {
  name: string;
  city: string;
  // country: string;
  address1: string;
  address2: string;
  // district: string;
  postalCode: string;

  country: SelectOption;
  district: SelectOption;
}

export interface CommonSavedPaymentMethodBillingMetadata {
  email: string;
  phoneNumber: string;
}

export type GenericSavedPaymentMethod<R extends RawSavedPaymentMethod> = Omit<R, "billingDetails" | "metadata"> & {
  // TODO: Document this field:
  addressId: string;
  billingDetails: CommonSavedPaymentMethodBillingDetails;
  metadata: CommonSavedPaymentMethodBillingMetadata;
}

export type SavedPaymentMethodCC = GenericSavedPaymentMethod<RawSavedPaymentMethodCC>;
export type SavedPaymentMethodACH = GenericSavedPaymentMethod<RawSavedPaymentMethodACH>;
export type SavedPaymentMethod = SavedPaymentMethodCC | SavedPaymentMethodACH;
export type SavedPaymentMethodBillingInfo = Pick<SavedPaymentMethod, "billingDetails" | "metadata">;

export interface CircleFieldError {
  message: string;
  error: string;
  location: string,
  invalidValue: string | number;
  constraints?: Record<string, string | number>;
}

export interface CircleError {
  code: number;
  message: string;
  errors: CircleFieldError[];
}
