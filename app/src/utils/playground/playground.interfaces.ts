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

  // Flow:
  multiSigEnabled: boolean;
}
