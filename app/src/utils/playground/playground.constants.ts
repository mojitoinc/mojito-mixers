import { UserFormat } from "../../lib";
import { CheckoutItemInfo } from "../../lib/domain/product/product.interfaces";

export const PLAYGROUND_LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
export const PLAYGROUND_PARAGRAPHS_ARRAY = new Array(32).fill(PLAYGROUND_LOREM_IPSUM);


// Personalization:

export const PLAYGROUND_MOJITO_LOGO = "/img/logos/mojito-light-logo.svg";

export const PLAYGROUND_USER_FORMAT: UserFormat = "email";


// Data

export const PLAYGROUND_MOCKED_BUY_NOW_LOT: CheckoutItemInfo = {
  lotID: "",
  collectionItemId: "",
  lotType: "buyNow",
  name: "Your Buy Now Lot",
  description: `${ PLAYGROUND_LOREM_IPSUM.slice(0, 128) }...`,
  units: 1,
  totalSupply: 100,
  remainingSupply: 10,
  fee: 0,
  imageSrc: "https://media1.giphy.com/media/WtZruh8gE2sMbr8MK1/giphy.gif?cid=ecf05e470gehwojzpnbilvc2pyoncuugk1trztdfxb0h7xi2&rid=giphy.gif&ct=g",
  imageBackground: "orange",
};

export const PLAYGROUND_MOCKED_AUCTION_LOT: CheckoutItemInfo = {
  lotID: "",
  collectionItemId: "",
  lotType: "auction",
  name: "Your Auction Lot",
  description: `${ PLAYGROUND_LOREM_IPSUM.slice(0, 128) }...`,
  units: 1,
  totalSupply: 1,
  remainingSupply: 1,
  fee: 10,
  imageSrc: "https://media1.giphy.com/media/WtZruh8gE2sMbr8MK1/giphy.gif?cid=ecf05e470gehwojzpnbilvc2pyoncuugk1trztdfxb0h7xi2&rid=giphy.gif&ct=g",
  imageBackground: "orange",
};
