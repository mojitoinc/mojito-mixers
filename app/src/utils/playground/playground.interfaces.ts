import { LotType } from "../../lib/domain/product/product.interfaces";

export type PlaygroundNoAuthPresetFieldValues = "noAuthGuestDisabled" | "noAuthGuestEnabled";

export type PlaygroundAuthPresetFieldValues = "authConfirmationDisabled" | "authConfirmationEnabledNoGuest" | "authConfirmationEnabledGuest";

export type PlaygroundThemeFieldValues = "light" | "dark";

export interface PlaygroundFormData {
  // Organization:
  orgID: string;
  customOrgID: string;

  // Invoice (for won auction lots):
  invoiceID: string;

  // Lot:
  lotID: string;
  lotType: LotType;
  lotPrice: number;
  lotFee: number;

  // Personalization:
  theme: PlaygroundThemeFieldValues;
  customImages: boolean;
  notAuthPreset: PlaygroundNoAuthPresetFieldValues;
  authPresets: PlaygroundAuthPresetFieldValues;

  // Payment:
  paymentCC: boolean;
  paymentACH: boolean;
  paymentWire: boolean;
  paymentCrypto: boolean;
}
