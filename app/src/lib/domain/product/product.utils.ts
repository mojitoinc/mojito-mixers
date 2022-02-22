import { GetInvoiceDetailsQuery } from "../../queries/graphqlGenerated";
import { CheckoutItem } from "./product.interfaces";

export function transformCheckoutItemsFromInvoice(
  checkoutItems: CheckoutItem[],
  invoiceItems: GetInvoiceDetailsQuery["getInvoiceDetails"]["items"] = [],
): CheckoutItem[] {
  // TODO: This function should later be updated to give precedence to whatever's in the invoice, but right now it's
  // not possible to get the required data (lotID, title, description...) from that query:

  return checkoutItems.map((checkoutItem, i) => {
    // TODO: We should find the match based on ID, not index, but it's ok for now as we never buy more than 1 item at a time:
    const invoiceItem = invoiceItems[i];

    return invoiceItem ? {
      ...checkoutItem,
      units: invoiceItem.units,
      unitPrice: invoiceItem.unitPrice,
      // TODO: Include fees and fees calculation logic here for auctions.
      // TODO: Include taxes too.
    } : checkoutItem;
  });
}
