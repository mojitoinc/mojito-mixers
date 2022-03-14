import { Network } from "../network/network.interfaces";
export interface Wallet {
    id: string;
    name: string;
    address: string;
    network: Network;
}
