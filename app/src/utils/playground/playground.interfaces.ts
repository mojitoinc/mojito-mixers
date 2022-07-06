import { Market } from "../../lib/components/public/CheckoutOverlay/CheckoutOverlay";
import { Container } from "../../lib/components/shared/FullScreenOverlay/FullScreenOverlay";
import { FiatCurrency } from "../../lib/domain/payment/payment.interfaces";
import { LotType } from "../../lib/domain/product/product.interfaces";

export interface PlaygroundFormData {
  // Organization:
  orgID: string;
  customOrgID: string;

  // Invoice (for won auction lots):
  invoiceID: string;

  // Lot:
  lotID: string;
  lotType: LotType;
  lotUnits: number;

  // Payment:
  paymentCC: boolean;
  paymentACH: boolean;
  paymentWire: boolean;
  paymentCrypto: boolean;
  paymentCoinbase: boolean;

  // Currencies:
  displayCurrency: FiatCurrency;
  cryptoWETH: boolean;
  cryptoWMATIC: boolean;

  // Flow:
  marketType: Market;
  multiSigEnabled: boolean;

  // UI:
  container: Container;
}
