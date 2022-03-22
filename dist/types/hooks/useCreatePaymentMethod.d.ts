import { CreatePaymentMethodMutation } from "../queries/graphqlGenerated";
import { BillingInfo } from "../forms/BillingInfoForm";
import { FetchResult, MutationResult } from "@apollo/client";
import { PaymentMethod } from "../domain/payment/payment.interfaces";
export interface CreatePaymentMethodOptions {
    orgID: string;
    debug?: boolean;
}
export interface ExtendedCreatePaymentMethodOptions {
    billingInfo: BillingInfo;
    paymentInfo: PaymentMethod;
}
export declare function useCreatePaymentMethod({ orgID, debug, }: CreatePaymentMethodOptions): [
    (billingInfo: BillingInfo, paymentInfo: PaymentMethod) => Promise<FetchResult<CreatePaymentMethodMutation>>,
    MutationResult<CreatePaymentMethodMutation>
];
