export declare type LotType = "auction" | "buyNow";
export interface CheckoutItem {
    lotID: string;
    lotType: LotType;
    name: string;
    description: string;
    units: number;
    unitPrice: number;
    fee: number;
    imageSrc: string;
    imageBackground: string;
}
