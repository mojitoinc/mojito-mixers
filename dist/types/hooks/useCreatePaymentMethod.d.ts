import { CreatePaymentMethodMutation } from "../queries/graphqlGenerated";
import { BillingInfo } from "../forms/BillingInfoForm";
import { FetchResult, MutationResult } from "@apollo/client";
import { PaymentMethod } from "../domain/payment/payment.interfaces";
export interface CreatePaymentMethodOptions {
    debug?: boolean;
}
export interface ExtendedCreatePaymentMethodOptions {
    orgID: string;
    billingInfo: BillingInfo;
    paymentInfo: PaymentMethod;
}
export declare function useCreatePaymentMethod({ debug, }: CreatePaymentMethodOptions): [
    (orgID: string, billingInfo: BillingInfo, paymentInfo: PaymentMethod) => Promise<FetchResult<CreatePaymentMethodMutation>>,
    MutationResult<CreatePaymentMethodMutation>
];
