import { PUICheckoutProps, UserFormat, MOJITO_LIGHT_THEME, MOJITO_DARK_THEME } from "../../lib";
import { PlaygroundAuthPresetFieldValues, PlaygroundNoAuthPresetFieldValues, PlaygroundThemeFieldValues } from "./playground.interfaces";
import { SxProps, Theme } from "@mui/material";
import { CheckoutItemInfo } from "../../lib/domain/product/product.interfaces";
import { CreateMixerTheme } from "../../lib/config/theme/theme";

export const PLAYGROUND_LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const PLAYGROUND_PARAGRAPHS_ARRAY = new Array(32).fill(PLAYGROUND_LOREM_IPSUM);


// Flow:

export const PLAYGROUND_NO_AUTH_PRESET: Record<PlaygroundNoAuthPresetFieldValues, Partial<PUICheckoutProps>> = {
  noAuthGuestDisabled: {
    guestCheckoutEnabled: false,
    productConfirmationEnabled: true,
  },
  noAuthGuestEnabled: {
    guestCheckoutEnabled: true,
    productConfirmationEnabled: true,
  },
};

export const PLAYGROUND_AUTH_PRESET: Record<PlaygroundAuthPresetFieldValues, Partial<PUICheckoutProps>> = {
  authConfirmationDisabled: {
    guestCheckoutEnabled: false,
    productConfirmationEnabled: false,
  },
  authConfirmationEnabledNoGuest: {
    guestCheckoutEnabled: false,
    productConfirmationEnabled: true,
  },
  authConfirmationEnabledGuest: {
    guestCheckoutEnabled: true,
    productConfirmationEnabled: true,
  },
};


// Personalization:

export const PLAYGROUND_THEMES: Record<PlaygroundThemeFieldValues, Theme> = {
  light: CreateMixerTheme(),
  dark: CreateMixerTheme({ palette: { mode: 'dark' } }),
};

export const PLAYGROUND_LOGOS_SRC: Record<PlaygroundThemeFieldValues, string> = {
  light: "/img/logos/mojito-light-logo.svg",
  dark: "/img/logos/mojito-dark-logo.svg",
};

export const PLAYGROUND_LOGOS_SX: Record<PlaygroundThemeFieldValues, SxProps<Theme>> = {
  light: {},
  dark: {},
};

export const PLAYGROUND_LOADER_IMAGE_SRC = "https://media3.giphy.com/media/YpqWbjNDq8y4DVu4BO/giphy.gif?cid=ecf05e47hoq39f52knk6b767w9234wjjf9kg1yw319oqcpyx&rid=giphy.gif&ct=g";
export const PLAYGROUND_PURCHASING_IMAGE_SRC = "https://media0.giphy.com/media/mGNO9zHJpV9JOVRz1L/giphy.gif?cid=ecf05e472c8qhocoaupl2nor86fm54x1fjk0o7flma4umpzx&rid=giphy.gif&ct=g";
export const PLAYGROUND_ERROR_IMAGE_SRC = "https://media0.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif?cid=ecf05e47mu7l08ab2eap2z3iznda6icrd0m0lmu2fdi78ra5&rid=giphy.gif&ct=g";

export const PLAYGROUND_USER_FORMAT: UserFormat = "email";

export const PLAYGROUND_PRIVACY_HREF = "https://mojito.xyz";

export const PLAYGROUND_TERMS_OF_USE_HREF = "https://mojito.xyz";


// Data

export const PLAYGROUND_MOCKED_BUY_NOW_LOT: CheckoutItemInfo = {
  lotID: "",
  lotType: "buyNow",
  name: "Your Buy Now Lot",
  description: `${PLAYGROUND_LOREM_IPSUM.slice(0, 128)}...`,
  units: 1,
  totalSupply: 100,
  remainingSupply: 10,
  fee: 0,
  imageSrc: "https://media1.giphy.com/media/WtZruh8gE2sMbr8MK1/giphy.gif?cid=ecf05e470gehwojzpnbilvc2pyoncuugk1trztdfxb0h7xi2&rid=giphy.gif&ct=g",
  imageBackground: "orange",
};

export const PLAYGROUND_MOCKED_AUCTION_LOT: CheckoutItemInfo = {
  lotID: "",
  lotType: "auction",
  name: "Your Auction Lot",
  description: `${PLAYGROUND_LOREM_IPSUM.slice(0, 128)}...`,
  units: 1,
  totalSupply: 1,
  remainingSupply: 1,
  fee: 10,
  imageSrc: "https://media1.giphy.com/media/WtZruh8gE2sMbr8MK1/giphy.gif?cid=ecf05e470gehwojzpnbilvc2pyoncuugk1trztdfxb0h7xi2&rid=giphy.gif&ct=g",
  imageBackground: "orange",
};
