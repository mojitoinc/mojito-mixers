import { GetInvoiceDetailsQuery } from "../../queries/graphqlGenerated";
import { CheckoutItem, CheckoutItemInfo } from "./product.interfaces";
export declare function transformCheckoutItemsFromInvoice(checkoutItems: CheckoutItemInfo[], invoiceItems?: GetInvoiceDetailsQuery["getInvoiceDetails"]["items"]): CheckoutItem[];
