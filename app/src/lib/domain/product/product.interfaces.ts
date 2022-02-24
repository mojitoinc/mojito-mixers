export type LotType = "auction" | "buyNow";

export interface CheckoutItemInfo {
  // Common:
  lotID: string; // Mojito API ID
  lotType: LotType;
  name: string;
  description: string;
  imageSrc: string;
  imageBackground: string;

  // Buy Now:
  totalSupply: number;
  remainingSupply: number;
  units: number;

  // Auction:
  fee: number; // TODO: This type will probably change when loading it from the invoice.
}

export interface CheckoutItem extends CheckoutItemInfo {
  unitPrice: number;
}
