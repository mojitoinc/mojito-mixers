export declare type LotType = "auction" | "buyNow";
export interface CheckoutItemInfo {
    lotID: string;
    lotType: LotType;
    name: string;
    description: string;
    imageSrc: string;
    imageBackground: string;
    totalSupply: number;
    remainingSupply: number;
    units: number;
    fee: number;
}
export interface CheckoutItem extends CheckoutItemInfo {
    unitPrice: number;
    taxes: number;
    totalPrice: number;
}
