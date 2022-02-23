export type LotType = "auction" | "buyNow";

export interface CheckoutItemInfoCommon {
  lotID: string; // Mojito API ID
  lotType: LotType;
  name: string;
  description: string;
  imageSrc: string;
  imageBackground: string;
}

export interface CheckoutItemInfoBuyNow extends CheckoutItemInfoCommon {
  lotType: "buyNow";
  totalSupply: number;
  remainingSupply: number;
  units: number;
  // TODO: DO not include unitPrice in the data we pass:
  unitPrice: number;
}

export interface CheckoutItemInfoAuction extends CheckoutItemInfoCommon {
  lotType: "auction";
  fee: number;
}

export type CheckoutItem = CheckoutItemInfoBuyNow | CheckoutItemInfoAuction;
