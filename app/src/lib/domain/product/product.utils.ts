import { GetInvoiceDetailsQuery } from "../../queries/graphqlGenerated";
import { CheckoutItem, CheckoutItemInfo } from "./product.interfaces";

export function transformCheckoutItemsFromInvoice(
  checkoutItems: CheckoutItemInfo[],
  invoiceItems: GetInvoiceDetailsQuery["getInvoiceDetails"]["items"] = [],
): CheckoutItem[] {
  // TODO: This function should later be updated to give precedence to whatever's in the invoice, but right now it's
  // not possible to get the required data (lotID, title, description...) from that query:

  return checkoutItems.map((checkoutItem, i) => {
    // TODO: We should find the match based on ID, not index, but it's ok for now as we never buy more than 1 item at a time:
    const invoiceItem = invoiceItems[i];

    return {
      ...checkoutItem,
      units: invoiceItem?.units || checkoutItem.units || 1,
      unitPrice: invoiceItem?.unitPrice || 0,
      taxes: invoiceItem?.taxes || 0,
      totalPrice: invoiceItem?.totalPrice || 0,
      collectionItemId: invoiceItem?.collectionItemID || ""
      // TODO: Include fees and fees calculation logic here for auctions (from invoice)
      // TODO: Include taxes too (if present in invoice).
    };
  });
}
