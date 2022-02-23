import { GetInvoiceDetailsQuery } from "../../queries/graphqlGenerated";
import { CheckoutItem } from "./product.interfaces";
export declare function transformCheckoutItemsFromInvoice(checkoutItems: CheckoutItem[], invoiceItems?: GetInvoiceDetailsQuery["getInvoiceDetails"]["items"]): CheckoutItem[];
