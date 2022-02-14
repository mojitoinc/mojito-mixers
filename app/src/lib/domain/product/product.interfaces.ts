export type LotType = "auction" | "buyNow";

export interface CheckoutItem {
  lotID: string; // Mojito API ID
  lotType: LotType;
  name: string;
  description: string;
  units: number;
  unitPrice: number;
  fee: number;
  imageSrc: string;
  imageBackground: string;
}
