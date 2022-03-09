import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  EthAddress: any;
  Time: any;
  UUID: any;
  UUID1: any;
  Upload: any;
};

export type AchBankAddressOutput = {
  __typename?: 'ACHBankAddressOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
};

export type AchBillingDetails = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode?: InputMaybe<Scalars['String']>;
};

export type AchBillingDetailsOutput = {
  __typename?: 'ACHBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type AchData = {
  accountId: Scalars['String'];
  billingDetails: AchBillingDetails;
  metadata: AchMetadata;
  publicToken: Scalars['String'];
};

export type AchMetadata = {
  email: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type AchMetadataOutput = {
  __typename?: 'ACHMetadataOutput';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type AchPaymentMethodOutput = {
  __typename?: 'ACHPaymentMethodOutput';
  accountNumber: Scalars['String'];
  bankAddress?: Maybe<AchBankAddressOutput>;
  billingDetails?: Maybe<AchBillingDetailsOutput>;
  id: Scalars['UUID1'];
  metadata?: Maybe<AchMetadataOutput>;
  status: Scalars['String'];
  type: PaymentType;
};

export type AchPaymentMethodPrepareStatementOutput = {
  __typename?: 'ACHPaymentMethodPrepareStatementOutput';
  linkToken: Scalars['String'];
};

export type Asset = {
  __typename?: 'Asset';
  currentVersion?: Maybe<AssetVersion>;
  id: Scalars['UUID1'];
  versions?: Maybe<Array<AssetVersion>>;
};

export type AssetFilter = {
  organizationID?: InputMaybe<Scalars['UUID1']>;
};

export type AssetVersion = {
  __typename?: 'AssetVersion';
  arweaveTx?: Maybe<Scalars['String']>;
  asset: Asset;
  assetID: Scalars['UUID1'];
  cdnUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  isCurrent: Scalars['Boolean'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type AttributeValue = AttributeValueFloat | AttributeValueInt | AttributeValueString;

export type AttributeValueFloat = {
  __typename?: 'AttributeValueFloat';
  floatValue: Scalars['Float'];
};

export type AttributeValueInt = {
  __typename?: 'AttributeValueInt';
  intValue: Scalars['Int'];
};

export type AttributeValueString = {
  __typename?: 'AttributeValueString';
  stringValue: Scalars['String'];
};

export enum AuctionBidOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum AuctionLotStatus {
  Active = 'Active',
  Completed = 'Completed',
  Hidden = 'Hidden',
  Preview = 'Preview'
}

export type BidFilterInput = {
  marketplaceAuctionLotId?: InputMaybe<Scalars['UUID']>;
  order?: InputMaybe<AuctionBidOrder>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export enum CollectionType {
  Auction = 'Auction',
  Tk2 = 'TK2'
}

export enum ContractType {
  Erc721Creator = 'ERC721Creator',
  Erc1155Creator = 'ERC1155Creator'
}

export type CreateMarketplaceBuyNowLotInput = {
  collectionId: Scalars['UUID1'];
  collectionItemName: Scalars['String'];
  endDate: Scalars['Time'];
  marketplaceTokenId: Scalars['UUID1'];
  sortNumber: Scalars['Int'];
  startDate: Scalars['Time'];
  totalUnits: Scalars['Int'];
  unitPrice: Scalars['Float'];
};

export type CreatePaymentCreditCardMetadataInput = {
  encryptedData: Scalars['String'];
  keyID: Scalars['String'];
};

export type CreatePaymentMetadataInput = {
  creditCardData: CreatePaymentCreditCardMetadataInput;
  destinationAddress?: InputMaybe<Scalars['EthAddress']>;
};

export type CreditCardBillingDetails = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type CreditCardBillingDetailsOutput = {
  __typename?: 'CreditCardBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type CreditCardData = {
  billingDetails?: InputMaybe<CreditCardBillingDetails>;
  encryptedData: Scalars['String'];
  expirationMonth: Scalars['Int'];
  expirationYear: Scalars['Int'];
  keyID: Scalars['String'];
  metadata?: InputMaybe<CreditCardMetadata>;
};

export type CreditCardMetadata = {
  email: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type CreditCardMetadataOutput = {
  __typename?: 'CreditCardMetadataOutput';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreditCardPaymentMethodOutput = {
  __typename?: 'CreditCardPaymentMethodOutput';
  billingDetails?: Maybe<CreditCardBillingDetailsOutput>;
  id: Scalars['UUID1'];
  last4Digit: Scalars['String'];
  metadata?: Maybe<CreditCardMetadataOutput>;
  network: Scalars['String'];
  status: Scalars['String'];
  type: PaymentType;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  activeBids: Array<MarketplaceAuctionBid>;
  apiKeys?: Maybe<Array<Maybe<UserApiKeyResponse>>>;
  favoriteItems?: Maybe<Array<MarketplaceCollectionItem>>;
  id: Scalars['UUID'];
  user: User;
  userOrgs: Array<UserOrganization>;
  wallets?: Maybe<Array<Wallet>>;
  wonBids: Array<MarketplaceAuctionBid>;
};


export type CurrentUserActiveBidsArgs = {
  orgId: Scalars['UUID'];
};


export type CurrentUserUserOrgsArgs = {
  filter?: InputMaybe<UserOrgFilter>;
};


export type CurrentUserWonBidsArgs = {
  orgId: Scalars['UUID'];
};

export type DeployContractInput = {
  contractType: ContractType;
  nftName: Scalars['String'];
  nftSymbol: Scalars['String'];
  organizationId: Scalars['UUID1'];
  walletId: Scalars['UUID1'];
};

export type Erc721Metadata = {
  __typename?: 'ERC721Metadata';
  animationURL?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<MetadataAttributes>>;
  backgroundColor?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  externalURL?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  timestamp?: Maybe<Scalars['Int']>;
};

export enum ExtensionType {
  ProvenanceExtension = 'ProvenanceExtension'
}

export type InvoiceDetails = {
  __typename?: 'InvoiceDetails';
  externalPaymentID: Scalars['String'];
  externalUserID: Scalars['String'];
  internalUserID: Scalars['String'];
  invoiceCreatedAt: Scalars['Time'];
  invoiceID: Scalars['UUID1'];
  invoiceNumber: Scalars['Int'];
  items: Array<Maybe<ItemInvoiceDetail>>;
  paymentID: Scalars['UUID1'];
  status: InvoiceStatus;
};

export enum InvoiceStatus {
  Canceled = 'Canceled',
  Delivered = 'Delivered',
  Draft = 'Draft',
  Paid = 'Paid',
  Pending = 'Pending'
}

export type ItemInvoiceDetail = {
  __typename?: 'ItemInvoiceDetail';
  buyersPremium: Scalars['Float'];
  collectionItemID: Scalars['UUID1'];
  collectionItemTitle: Scalars['String'];
  collectionTitle: Scalars['String'];
  destinationAddress: Scalars['String'];
  overheadPremium: Scalars['Float'];
  saleDate: Scalars['Time'];
  salesTaxRate: Scalars['Float'];
  taxes: Scalars['Float'];
  totalPrice: Scalars['Float'];
  unitPrice: Scalars['Float'];
  units: Scalars['Int'];
};

export enum KycStatus {
  Level1 = 'Level1',
  Level2 = 'Level2',
  None = 'None',
  Pending = 'Pending'
}

export enum MarketCollectionStatus {
  Active = 'Active',
  Archived = 'Archived',
  Inactive = 'Inactive'
}

export type Marketplace = {
  __typename?: 'Marketplace';
  collections?: Maybe<Array<MarketplaceCollection>>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  organizationID: Scalars['String'];
  theme?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<MarketplaceToken>>;
};

export type MarketplaceAuctionBid = {
  __typename?: 'MarketplaceAuctionBid';
  amount: Scalars['Float'];
  buyersPremium: Scalars['Float'];
  createdAt: Scalars['Time'];
  currentBid: Scalars['Float'];
  finalPrice: Scalars['Float'];
  id: Scalars['UUID'];
  isCurrent: Scalars['Boolean'];
  isMine: Scalars['Boolean'];
  marketplaceAuctionLot: MarketplaceAuctionLot;
  marketplaceAuctionLotId: Scalars['UUID1'];
  marketplaceUser?: Maybe<MarketplaceUser>;
  maximumBid?: Maybe<Scalars['Float']>;
  nextBidIncrement: Scalars['Float'];
  overheadPremium: Scalars['Float'];
  userId: Scalars['UUID'];
  userOrganization: UserOrganization;
};

export type MarketplaceAuctionBidInput = {
  amount: Scalars['Float'];
  marketplaceAuctionLotId: Scalars['UUID'];
};

export type MarketplaceAuctionDefaultConfig = {
  __typename?: 'MarketplaceAuctionDefaultConfig';
  collectionId: Scalars['UUID'];
  endDate: Scalars['Time'];
  id: Scalars['UUID'];
  minIncrement: Scalars['Float'];
  reservePrice?: Maybe<Scalars['Float']>;
  startDate: Scalars['Time'];
};

export type MarketplaceAuctionFeeStructure = {
  __typename?: 'MarketplaceAuctionFeeStructure';
  buyersPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
  overheadPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
};

export type MarketplaceAuctionFeeStructureItem = {
  __typename?: 'MarketplaceAuctionFeeStructureItem';
  from: Scalars['Float'];
  rate: Scalars['Float'];
  to?: Maybe<Scalars['Float']>;
};

export type MarketplaceAuctionLot = {
  __typename?: 'MarketplaceAuctionLot';
  bids: Array<MarketplaceAuctionBid>;
  currentBid?: Maybe<MarketplaceAuctionBid>;
  defaultConfig: MarketplaceAuctionDefaultConfig;
  endDate: Scalars['Time'];
  feeStructure: MarketplaceAuctionFeeStructure;
  id: Scalars['UUID'];
  lotNumber?: Maybe<Scalars['Int']>;
  marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
  marketplaceCollectionItemId: Scalars['UUID1'];
  myBid?: Maybe<MarketplaceAuctionBid>;
  previewDate?: Maybe<Scalars['Time']>;
  reserveMet: Scalars['Boolean'];
  reservePrice?: Maybe<Scalars['Float']>;
  startDate: Scalars['Time'];
  startingBid?: Maybe<Scalars['Float']>;
  status: AuctionLotStatus;
};


export type MarketplaceAuctionLotBidsArgs = {
  filter?: InputMaybe<BidFilterInput>;
};


export type MarketplaceAuctionLotDefaultConfigArgs = {
  collectionId: Scalars['UUID'];
};

export type MarketplaceAuctionLotInput = {
  collectionId: Scalars['UUID'];
  collectionItemName: Scalars['String'];
  endDate: Scalars['Time'];
  lotNumber?: InputMaybe<Scalars['Int']>;
  marketplaceTokenId: Scalars['UUID'];
  reservePrice?: InputMaybe<Scalars['Float']>;
  saleType: MarketplaceSaleType;
  startDate: Scalars['Time'];
  startingBid?: InputMaybe<Scalars['Float']>;
};

export type MarketplaceAuctionLotUpdateInput = {
  endDate?: InputMaybe<Scalars['Time']>;
  lotNumber?: InputMaybe<Scalars['Int']>;
  reservePrice?: InputMaybe<Scalars['Float']>;
  startDate?: InputMaybe<Scalars['Time']>;
  startingBid?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<AuctionLotStatus>;
};

export type MarketplaceBuyNowOutput = {
  __typename?: 'MarketplaceBuyNowOutput';
  endDate: Scalars['Time'];
  id: Scalars['UUID'];
  invoice?: Maybe<InvoiceDetails>;
  marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
  sortNumber: Scalars['Int'];
  startDate: Scalars['Time'];
  totalAvailableUnits: Scalars['Int'];
  totalUnits: Scalars['Int'];
  unitPrice: Scalars['Float'];
};

export type MarketplaceCollection = {
  __typename?: 'MarketplaceCollection';
  collectionType: CollectionType;
  description: Scalars['String'];
  endDate?: Maybe<Scalars['Time']>;
  id: Scalars['UUID1'];
  items?: Maybe<Array<MarketplaceCollectionItem>>;
  marketplaceID: Scalars['UUID1'];
  name: Scalars['String'];
  slug: Scalars['String'];
  startDate?: Maybe<Scalars['Time']>;
  status: MarketCollectionStatus;
};


export type MarketplaceCollectionItemsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  statuses?: InputMaybe<Array<InputMaybe<MarketplaceCollectionItemStatus>>>;
};

export type MarketplaceCollectionCreateInput = {
  description: Scalars['String'];
  endDate?: InputMaybe<Scalars['Time']>;
  name: Scalars['String'];
  startDate?: InputMaybe<Scalars['Time']>;
  status?: InputMaybe<MarketCollectionStatus>;
};

export type MarketplaceCollectionItem = {
  __typename?: 'MarketplaceCollectionItem';
  collectionId: Scalars['UUID'];
  details: MarketplaceCollectionItemDetails;
  id: Scalars['UUID'];
  /** @deprecated Use `details` property instead */
  lot: MarketplaceAuctionLot;
  marketplaceTokenId: Scalars['UUID'];
  name: Scalars['String'];
  saleType: MarketplaceSaleType;
  slug: Scalars['String'];
  status: MarketplaceCollectionItemStatus;
};

export type MarketplaceCollectionItemDetails = MarketplaceAuctionLot | MarketplaceBuyNowOutput;

export enum MarketplaceCollectionItemStatus {
  Active = 'Active',
  Completed = 'Completed',
  Hidden = 'Hidden',
  Preview = 'Preview'
}

export type MarketplaceCollectionUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Time']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Time']>;
  status?: InputMaybe<MarketCollectionStatus>;
};

export enum MarketplaceSaleType {
  Auction = 'Auction',
  BuyNow = 'BuyNow'
}

export type MarketplaceToken = {
  __typename?: 'MarketplaceToken';
  id: Scalars['UUID'];
  marketplaceID: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  nftContractAddress: Scalars['String'];
  nftTokenID?: Maybe<Scalars['UUID']>;
  onChainTokenID: Scalars['Int'];
};

export type MarketplaceUser = {
  __typename?: 'MarketplaceUser';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  username?: Maybe<Scalars['String']>;
};

export type MetadataAttributes = {
  __typename?: 'MetadataAttributes';
  displayType?: Maybe<Scalars['String']>;
  maxValue?: Maybe<Scalars['Int']>;
  traitType: Scalars['String'];
  value: AttributeValue;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Add an existing lot to User favorite lots list.
   *     If lot is already exists, then do nothing.
   *     If provided lot is invalid or not exists, then error message will be returned.
   */
  addCollectionItemToUserFavorites: Scalars['Boolean'];
  addExistingTokenToCollection: Scalars['String'];
  addOrganization: Organization;
  addTokensToCollection: Scalars['String'];
  cancelMarketplaceAuctionBid: Scalars['Boolean'];
  /** Cancels payment by ID, can be called by org admin */
  cancelPayment: Scalars['Boolean'];
  /** Creates invoice for given Lot, can be called by org admin */
  createAuctionLotInvoice: InvoiceDetails;
  createMarketplaceAuctionBid: MarketplaceAuctionBid;
  createMarketplaceAuctionLot: MarketplaceAuctionLot;
  createMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  createMarketplaceCollection: MarketplaceCollection;
  createOrgByUser: UserOrganization;
  /** Creates a multisig with organization as parent type */
  createOrgMultisig: Scalars['String'];
  /** Creates payment for given Invoice */
  createPayment: Payment;
  /** Creates new Payment method based on input data. */
  createPaymentMethod: PaymentMethodOutput;
  createTokenDraft: Scalars['String'];
  /** Create a new API key for given User and Organization. */
  createUserAPIKey?: Maybe<UserApiKeyResponse>;
  /** Creates a multisig with user as parent type */
  createUserMultisig: Scalars['String'];
  deleteAsset: Scalars['String'];
  /**
   * Delete an existing lot from User favorite lots list.
   *     If lot has been already deleted, then do nothing.
   *     If provided lot is invalid or not exists, then error message will be returned.
   */
  deleteCollectionItemFromUserFavorites: Scalars['Boolean'];
  /** Deletes existing Payment method by Payment ID. */
  deletePaymentMethod: Scalars['Boolean'];
  deleteToken: Scalars['String'];
  /** Delete an existing API key. */
  deleteUserAPIKey: Scalars['Boolean'];
  importExternalTokenToCollection: Scalars['String'];
  loginWithSignature: Organization;
  marketplaceUpdateTheme: Marketplace;
  mintTokens: Scalars['String'];
  nftContractAddAdmin: Scalars['String'];
  nftContractExtensionPause: Scalars['String'];
  nftContractExtensionUnpause: Scalars['String'];
  nftContractRegisterExtensionProvenance: NftContract;
  nftDeployContract: NftContract;
  orgCreateMarketplace: Marketplace;
  ping: Scalars['String'];
  /** Release reservations held by invoice ID */
  releaseReservation: Scalars['Boolean'];
  reserveMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  setJwtIssuerDomain: Organization;
  transferToken: Scalars['String'];
  updateMarketplaceAuctionLot: MarketplaceAuctionLot;
  updateMarketplaceCollection: MarketplaceCollection;
  /** Update name of multisig wallet */
  updateMultisigName: Scalars['Boolean'];
  /** Update existing Payment method based on input data. */
  updatePaymentMethod: Scalars['Boolean'];
  updateTokenDraft: Scalars['String'];
  updateUserOrgRole: UserOrganization;
  updateUserOrgSettings: UserOrganization;
  uploadArweaveAsset: Scalars['String'];
  uploadArweaveMetadata: Scalars['String'];
  uploadAsset: Scalars['String'];
};


export type MutationAddCollectionItemToUserFavoritesArgs = {
  collectionItemId: Scalars['UUID1'];
};


export type MutationAddExistingTokenToCollectionArgs = {
  marketplaceId: Scalars['UUID1'];
  tokenId: Scalars['UUID1'];
};


export type MutationAddOrganizationArgs = {
  handle: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddTokensToCollectionArgs = {
  marketplaceId: Scalars['UUID1'];
  tokenIds: Array<Scalars['UUID1']>;
};


export type MutationCancelMarketplaceAuctionBidArgs = {
  bidID: Scalars['UUID1'];
  marketplaceID: Scalars['UUID1'];
};


export type MutationCancelPaymentArgs = {
  orgID: Scalars['UUID1'];
  paymentID: Scalars['UUID1'];
};


export type MutationCreateAuctionLotInvoiceArgs = {
  lotID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
};


export type MutationCreateMarketplaceAuctionBidArgs = {
  marketplaceAuctionBid: MarketplaceAuctionBidInput;
};


export type MutationCreateMarketplaceAuctionLotArgs = {
  marketplaceAuctionLot: MarketplaceAuctionLotInput;
};


export type MutationCreateMarketplaceBuyNowLotArgs = {
  input: CreateMarketplaceBuyNowLotInput;
};


export type MutationCreateMarketplaceCollectionArgs = {
  data: MarketplaceCollectionCreateInput;
  marketplaceID: Scalars['String'];
};


export type MutationCreateOrgByUserArgs = {
  handle: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateOrgMultisigArgs = {
  chainId: Scalars['Int'];
  name: Scalars['String'];
  orgId: Scalars['UUID1'];
};


export type MutationCreatePaymentArgs = {
  invoiceID: Scalars['UUID1'];
  metadata?: InputMaybe<CreatePaymentMetadataInput>;
  paymentMethodID: Scalars['UUID1'];
};


export type MutationCreatePaymentMethodArgs = {
  input: PaymentMethodCreateInput;
  orgID: Scalars['UUID1'];
};


export type MutationCreateTokenDraftArgs = {
  contractId: Scalars['UUID1'];
  tokens: Array<TokenDraft>;
};


export type MutationCreateUserApiKeyArgs = {
  orgId: Scalars['UUID1'];
};


export type MutationCreateUserMultisigArgs = {
  chainId: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationDeleteAssetArgs = {
  assetId: Scalars['UUID1'];
};


export type MutationDeleteCollectionItemFromUserFavoritesArgs = {
  collectionItemId: Scalars['UUID1'];
};


export type MutationDeletePaymentMethodArgs = {
  orgID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
};


export type MutationDeleteTokenArgs = {
  tokenId: Scalars['UUID1'];
};


export type MutationDeleteUserApiKeyArgs = {
  keyId: Scalars['UUID1'];
};


export type MutationImportExternalTokenToCollectionArgs = {
  contractAddress: Scalars['String'];
  marketplaceId: Scalars['UUID1'];
  onChainId: Scalars['Int'];
};


export type MutationLoginWithSignatureArgs = {
  request: SigninRequest;
};


export type MutationMarketplaceUpdateThemeArgs = {
  id: Scalars['String'];
  theme: Scalars['String'];
};


export type MutationMintTokensArgs = {
  tokenIds: Array<Scalars['UUID1']>;
};


export type MutationNftContractAddAdminArgs = {
  address: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};


export type MutationNftContractExtensionPauseArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};


export type MutationNftContractExtensionUnpauseArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};


export type MutationNftContractRegisterExtensionProvenanceArgs = {
  contractId: Scalars['UUID1'];
  maxTokenSupply: Scalars['Int'];
};


export type MutationNftDeployContractArgs = {
  input: DeployContractInput;
};


export type MutationOrgCreateMarketplaceArgs = {
  name: Scalars['String'];
  orgId?: InputMaybe<Scalars['UUID1']>;
};


export type MutationReleaseReservationArgs = {
  invoiceID: Scalars['UUID1'];
  orgID?: InputMaybe<Scalars['UUID1']>;
};


export type MutationReserveMarketplaceBuyNowLotArgs = {
  input: ReserveMarketplaceBuyNowLotInput;
};


export type MutationSetJwtIssuerDomainArgs = {
  domain: Scalars['String'];
  orgId: Scalars['UUID'];
};


export type MutationTransferTokenArgs = {
  contractAddress: Scalars['String'];
  tokenOnChainId: Scalars['Int'];
  transferTo: Scalars['String'];
  walletId: Scalars['UUID1'];
};


export type MutationUpdateMarketplaceAuctionLotArgs = {
  data: MarketplaceAuctionLotUpdateInput;
  marketplaceAuctionLotId: Scalars['UUID'];
};


export type MutationUpdateMarketplaceCollectionArgs = {
  data: MarketplaceCollectionUpdateInput;
  id: Scalars['UUID1'];
};


export type MutationUpdateMultisigNameArgs = {
  newName: Scalars['String'];
  walletID: Scalars['UUID1'];
};


export type MutationUpdatePaymentMethodArgs = {
  input: PaymentMethodUpdateInput;
  orgID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
};


export type MutationUpdateTokenDraftArgs = {
  token: TokenDraft;
};


export type MutationUpdateUserOrgRoleArgs = {
  orgID: Scalars['UUID'];
  role: Scalars['String'];
  userID: Scalars['UUID'];
};


export type MutationUpdateUserOrgSettingsArgs = {
  params: SettingsInput;
};


export type MutationUploadArweaveAssetArgs = {
  assetVersionId: Scalars['UUID1'];
};


export type MutationUploadArweaveMetadataArgs = {
  tokenId: Scalars['UUID1'];
};


export type MutationUploadAssetArgs = {
  file: Scalars['Upload'];
  name: Scalars['String'];
  orgId: Scalars['UUID1'];
};

export type NftContract = {
  __typename?: 'NFTContract';
  activationTxHash: Scalars['String'];
  admins: Array<Scalars['String']>;
  arweavePathManifest?: Maybe<Scalars['String']>;
  contractAddress: Scalars['EthAddress'];
  deploymentTxHash?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  marketplaceAddress: Scalars['EthAddress'];
  mediaTxHash?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nftContractType: NftContractType;
  nftTokens?: Maybe<Array<NftToken>>;
  symbol?: Maybe<Scalars['String']>;
  transferOwnershipHash?: Maybe<Scalars['String']>;
  wallet: Wallet;
};

export type NftContractType = {
  __typename?: 'NFTContractType';
  id: Scalars['UUID1'];
  name: Scalars['String'];
};

export type NftMetadata = {
  __typename?: 'NFTMetadata';
  copyright?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type NftToken = {
  __typename?: 'NFTToken';
  asset?: Maybe<Asset>;
  assetId?: Maybe<Scalars['UUID1']>;
  deployed: Scalars['Boolean'];
  ethereumTxId?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  metadataArweaveTxId?: Maybe<Scalars['String']>;
  metadataArweaveTxLink?: Maybe<Scalars['String']>;
  metadataJSON?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nftContract: NftContract;
  nftContractID: Scalars['UUID1'];
  onChainId?: Maybe<Scalars['Int']>;
  royaltyBasisPoints?: Maybe<Scalars['Int']>;
};

export type Network = {
  __typename?: 'Network';
  chainID: Scalars['Int'];
  id: Scalars['UUID1'];
  name: Scalars['String'];
  openSeaProxyAddress: Scalars['String'];
  rpcURL: Scalars['String'];
  safeFactoryAddress: Scalars['String'];
  safeFallbackHandler: Scalars['String'];
  safeMasterContractAddress: Scalars['String'];
  wethAddress: Scalars['String'];
};

export type Organization = {
  __typename?: 'Organization';
  assets?: Maybe<Array<Asset>>;
  handle: Scalars['String'];
  id: Scalars['UUID1'];
  jwtIssuerDomain?: Maybe<Scalars['String']>;
  marketplaces: Array<Marketplace>;
  members: Array<OrganizationMember>;
  name: Scalars['String'];
  nftContracts?: Maybe<Array<NftContract>>;
  wallets?: Maybe<Array<Wallet>>;
};


export type OrganizationAssetsArgs = {
  filter?: InputMaybe<AssetFilter>;
};

export type OrganizationMember = {
  __typename?: 'OrganizationMember';
  email?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Payment = {
  __typename?: 'Payment';
  circlePaymentID: Scalars['String'];
  id: Scalars['UUID1'];
  invoiceID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
  status: PaymentStatus;
  userID: Scalars['UUID1'];
};

export type PaymentMethodCreateInput = {
  achData?: InputMaybe<AchData>;
  creditCardData?: InputMaybe<CreditCardData>;
  paymentType: PaymentType;
  wireData?: InputMaybe<WireData>;
};

export type PaymentMethodOutput = AchPaymentMethodOutput | CreditCardPaymentMethodOutput | WirePaymentMethodOutput;

export type PaymentMethodPrepareStatementOutput = AchPaymentMethodPrepareStatementOutput;

export type PaymentMethodUpdateInput = {
  achData?: InputMaybe<AchData>;
  creditCardData?: InputMaybe<CreditCardData>;
  paymentType: PaymentType;
};

export type PaymentNotification3DsMessage = {
  __typename?: 'PaymentNotification3DSMessage';
  redirectURL: Scalars['String'];
};

export type PaymentNotificationMessage = PaymentNotification3DsMessage;

export type PaymentNotificationOutput = {
  __typename?: 'PaymentNotificationOutput';
  message: PaymentNotificationMessage;
};

export type PaymentPublicKey = {
  __typename?: 'PaymentPublicKey';
  keyID: Scalars['String'];
  publicKey: Scalars['String'];
};

export enum PaymentStatus {
  ActionRequired = 'action_required',
  Confirmed = 'confirmed',
  Failed = 'failed',
  Paid = 'paid',
  Pending = 'pending'
}

export enum PaymentType {
  Ach = 'ACH',
  CreditCard = 'CreditCard',
  Wire = 'Wire'
}

export type Query = {
  __typename?: 'Query';
  collection?: Maybe<MarketplaceCollection>;
  collectionBySlug?: Maybe<MarketplaceCollection>;
  collectionItemById?: Maybe<MarketplaceCollectionItem>;
  /** Retrieves invoice details by ID */
  getInvoiceDetails: InvoiceDetails;
  /** Retrieves invoice list for given user, can be called by org admin */
  getInvoicesByUserID: Array<Maybe<InvoiceDetails>>;
  getMarketplaceAuctionLot: MarketplaceAuctionLot;
  /** Retrieves invoices user owns */
  getMyInvoices: Array<Maybe<InvoiceDetails>>;
  /** Retrieves payments user owns */
  getMyPayments: Array<Maybe<Payment>>;
  /** Returns requested Payment method */
  getPaymentMethod: PaymentMethodOutput;
  /** Returns Payment method list in scope of current Organization. */
  getPaymentMethodList: Array<PaymentMethodOutput>;
  /** Retrieves Payment notification */
  getPaymentNotification: PaymentNotificationOutput;
  /** Returns Public Key for further Payment data encryption. */
  getPaymentPublicKey: PaymentPublicKey;
  /** Retrieves payment list for given user, can be called by org admin */
  getPaymentsByUserID: Array<Maybe<Payment>>;
  /** Get Tax Quote */
  getTaxQuote: TaxQuoteOutput;
  marketplace: Marketplace;
  me?: Maybe<CurrentUser>;
  network: Network;
  nftContract: NftContract;
  nftToken: NftToken;
  orgUsernameAvailable: Scalars['Boolean'];
  organization: Organization;
  organizationByID: Organization;
  ping: Scalars['String'];
  /** Prepare requested Payment method for further use */
  preparePaymentMethod?: Maybe<PaymentMethodPrepareStatementOutput>;
  serverTime: Scalars['Time'];
  validateIp: ValidateIpResponse;
  /** Validate Payment limit */
  validatePaymentLimit: ValidatePaymentLimitOutput;
  wallet: Wallet;
};


export type QueryCollectionArgs = {
  id: Scalars['String'];
};


export type QueryCollectionBySlugArgs = {
  marketplaceID: Scalars['UUID1'];
  slug: Scalars['String'];
};


export type QueryCollectionItemByIdArgs = {
  id: Scalars['UUID1'];
};


export type QueryGetInvoiceDetailsArgs = {
  invoiceID: Scalars['UUID1'];
  orgID?: InputMaybe<Scalars['UUID1']>;
};


export type QueryGetInvoicesByUserIdArgs = {
  orgID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};


export type QueryGetMarketplaceAuctionLotArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};


export type QueryGetPaymentMethodArgs = {
  paymentMethodID: Scalars['UUID1'];
};


export type QueryGetPaymentMethodListArgs = {
  orgID: Scalars['UUID1'];
};


export type QueryGetPaymentsByUserIdArgs = {
  orgID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};


export type QueryGetTaxQuoteArgs = {
  input: TaxQuoteInput;
};


export type QueryMarketplaceArgs = {
  id: Scalars['UUID'];
};


export type QueryNetworkArgs = {
  id: Scalars['UUID1'];
};


export type QueryNftContractArgs = {
  id: Scalars['UUID1'];
};


export type QueryNftTokenArgs = {
  id: Scalars['UUID1'];
};


export type QueryOrgUsernameAvailableArgs = {
  organizationID: Scalars['UUID1'];
  username: Scalars['String'];
};


export type QueryOrganizationArgs = {
  handle: Scalars['String'];
};


export type QueryOrganizationByIdArgs = {
  id: Scalars['UUID1'];
};


export type QueryPreparePaymentMethodArgs = {
  paymentMethodType: PaymentType;
};


export type QueryValidateIpArgs = {
  ip: Scalars['String'];
  organizationID: Scalars['UUID1'];
};


export type QueryValidatePaymentLimitArgs = {
  collectionID: Scalars['UUID1'];
  itemsCount: Scalars['Int'];
};


export type QueryWalletArgs = {
  id: Scalars['UUID1'];
};

export type ReserveMarketplaceBuyNowLotInput = {
  itemCount: Scalars['Int'];
  marketplaceBuyNowLotID: Scalars['UUID1'];
};

export enum Role {
  Admin = 'admin',
  User = 'user'
}

export type SettingsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  settingsJson?: InputMaybe<Scalars['String']>;
  userOrgId: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

export type SigninRequest = {
  challenge: Scalars['String'];
  signature: Scalars['String'];
  signer: Scalars['String'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  me: CurrentUser;
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  auctionLotUpdated: MarketplaceAuctionLot;
  bidFeed: MarketplaceAuctionBid;
  /** Returns a MarketplaceAuctionLot on subscribe and whenever a new bid is placed */
  getMarketplaceAuctionLot: MarketplaceAuctionLot;
  /** Subscribes to lots and bids updates within given marketplace collection */
  marketplaceCollectionLotsUpdates: MarketplaceAuctionLot;
};


export type SubscriptionAuctionLotUpdatedArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};


export type SubscriptionBidFeedArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};


export type SubscriptionGetMarketplaceAuctionLotArgs = {
  marketplaceAuctionLotId: Scalars['UUID1'];
};


export type SubscriptionMarketplaceCollectionLotsUpdatesArgs = {
  collectionId: Scalars['UUID1'];
};

export type TaxQuoteBillingAddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
};

export type TaxQuoteBillingAddressOutput = {
  __typename?: 'TaxQuoteBillingAddressOutput';
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
};

export type TaxQuoteInput = {
  address: TaxQuoteBillingAddressInput;
  taxablePrice: Scalars['Float'];
};

export type TaxQuoteOutput = {
  __typename?: 'TaxQuoteOutput';
  taxablePrice: Scalars['Float'];
  totalTaxAmount: Scalars['Float'];
  totalTaxedPrice: Scalars['Float'];
  verifiedAddress: TaxQuoteBillingAddressOutput;
};

export type TokenDraft = {
  assetId?: InputMaybe<Scalars['UUID1']>;
  copyright?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  metadataJSON?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  royaltyBasisPoints?: InputMaybe<Scalars['Int']>;
  tokenId?: InputMaybe<Scalars['UUID1']>;
};

export enum TransactionStatus {
  Completed = 'Completed',
  Failed = 'Failed',
  Pending = 'Pending'
}

export enum TransactionType {
  DeployMultisig = 'DeployMultisig',
  TransferToken = 'TransferToken'
}

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserApiKeyResponse = {
  __typename?: 'UserAPIKeyResponse';
  createdAt?: Maybe<Scalars['Time']>;
  id?: Maybe<Scalars['UUID1']>;
  key?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Time']>;
};

export type UserOrgFilter = {
  orgId: Scalars['UUID'];
};

export type UserOrganization = {
  __typename?: 'UserOrganization';
  avatar?: Maybe<Scalars['String']>;
  bidAllowed: Scalars['Boolean'];
  externalUserId: Scalars['String'];
  id: Scalars['UUID'];
  kycStatus: KycStatus;
  organization: Organization;
  organizationId: Scalars['UUID'];
  role: Scalars['String'];
  settings?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['UUID'];
  username?: Maybe<Scalars['String']>;
};

export type ValidateIpResponse = {
  __typename?: 'ValidateIPResponse';
  Success: Scalars['Boolean'];
  ipScreeningId: Scalars['UUID1'];
};

export type ValidatePaymentLimitData = {
  __typename?: 'ValidatePaymentLimitData';
  isLimitExceeded: Scalars['Boolean'];
  remainingTotal: Scalars['Int'];
  remainingTransaction: Scalars['Int'];
};

export type ValidatePaymentLimitOutput = {
  __typename?: 'ValidatePaymentLimitOutput';
  ach: ValidatePaymentLimitData;
  creditCard: ValidatePaymentLimitData;
  wire: ValidatePaymentLimitData;
};

export type Wallet = {
  __typename?: 'Wallet';
  address?: Maybe<Scalars['EthAddress']>;
  deploymentTxHash?: Maybe<Scalars['String']>;
  gnosisSafeURL?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  name: Scalars['String'];
  network: Network;
  networkId: Scalars['UUID1'];
  parentID: Scalars['UUID1'];
  parentType: Scalars['String'];
  tokens?: Maybe<Array<WalletToken>>;
};

export enum WalletParentType {
  Organization = 'organization',
  User = 'user'
}

export type WalletToken = {
  __typename?: 'WalletToken';
  contractAddress: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /** Token ID in smart contract */
  id: Scalars['Int'];
  metadata?: Maybe<Erc721Metadata>;
  timeLastUpdated?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  tokenType?: Maybe<Scalars['String']>;
  tokenURI?: Maybe<Scalars['String']>;
};

export enum WalletTxType {
  MojitoHotWallet = 'MojitoHotWallet',
  Multisig = 'Multisig'
}

export type WireBankAddress = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
};

export type WireBankAddressOutput = {
  __typename?: 'WireBankAddressOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
};

export type WireBeneficiary = {
  __typename?: 'WireBeneficiary';
  address1: Scalars['String'];
  address2: Scalars['String'];
  name: Scalars['String'];
};

export type WireBeneficiaryBank = {
  __typename?: 'WireBeneficiaryBank';
  accountNumber: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
  routingNumber: Scalars['String'];
  swiftCode: Scalars['String'];
};

export type WireBillingDetails = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type WireBillingDetailsOutput = {
  __typename?: 'WireBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type WireData = {
  accountNumber: Scalars['String'];
  bankAddress: WireBankAddress;
  billingDetails: WireBillingDetails;
  routingNumber: Scalars['String'];
};

export type WireInstructions = {
  __typename?: 'WireInstructions';
  beneficiary: WireBeneficiary;
  beneficiaryBank: WireBeneficiaryBank;
  trackingRef: Scalars['String'];
};

export type WirePaymentMethodOutput = {
  __typename?: 'WirePaymentMethodOutput';
  bankAddress?: Maybe<WireBankAddressOutput>;
  billingDetails?: Maybe<WireBillingDetailsOutput>;
  description: Scalars['String'];
  id: Scalars['UUID1'];
  instructions?: Maybe<WireInstructions>;
  status: Scalars['String'];
  type: PaymentType;
};

export type GetPaymentNotificationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPaymentNotificationQuery = { __typename?: 'Query', getPaymentNotification: { __typename?: 'PaymentNotificationOutput', message: { __typename?: 'PaymentNotification3DSMessage', redirectURL: string } } };

/*
export type CreatePaymentMutationVariables = Exact<{
  paymentMethodID: Scalars['UUID1'];
  invoiceID: Scalars['UUID1'];
}>;
*/

export type CreatePaymentMutationVariables = MutationCreatePaymentArgs;

export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'Payment', id: any, invoiceID: any, circlePaymentID: string, status: PaymentStatus, userID: any } };

export type CreateAuctionInvoiceMutationVariables = Exact<{
  orgID: Scalars['UUID1'];
  lotID: Scalars['UUID1'];
}>;


export type CreateAuctionInvoiceMutation = { __typename?: 'Mutation', createAuctionLotInvoice: { __typename?: 'InvoiceDetails', invoiceID: any, status: InvoiceStatus, items: Array<{ __typename?: 'ItemInvoiceDetail', units: number, unitPrice: number, taxes: number, totalPrice: number } | null> } };

export type ReserveBuyNowLotMutationVariables = Exact<{
  input: ReserveMarketplaceBuyNowLotInput;
}>;


export type ReserveBuyNowLotMutation = { __typename?: 'Mutation', reserveMarketplaceBuyNowLot: { __typename?: 'MarketplaceBuyNowOutput', invoice?: { __typename?: 'InvoiceDetails', invoiceID: any, status: InvoiceStatus, items: Array<{ __typename?: 'ItemInvoiceDetail', units: number, unitPrice: number, taxes: number, totalPrice: number } | null> } | null } };

export type ReleaseReservationBuyNowLotMutationVariables = Exact<{
  orgID: Scalars['UUID1'];
  invoiceID: Scalars['UUID1'];
}>;


export type ReleaseReservationBuyNowLotMutation = { __typename?: 'Mutation', releaseReservation: boolean };

export type GetInvoiceDetailsQueryVariables = Exact<{
  invoiceID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
}>;


export type GetInvoiceDetailsQuery = { __typename?: 'Query', getInvoiceDetails: { __typename?: 'InvoiceDetails', items: Array<{ __typename?: 'ItemInvoiceDetail', destinationAddress: string, units: number, unitPrice: number, taxes: number, totalPrice: number } | null> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'CurrentUser', id: any, user: { __typename?: 'User', id: any, username: string, name?: string | null, email?: string | null }, userOrgs: Array<{ __typename?: 'UserOrganization', organization: { __typename?: 'Organization', id: any, name: string } }>, wallets?: Array<{ __typename?: 'Wallet', id: any, name: string, address?: any | null }> | null } | null };

export type PaymentKeyQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentKeyQuery = { __typename?: 'Query', getPaymentPublicKey: { __typename?: 'PaymentPublicKey', keyID: string, publicKey: string } };

export type GetPaymentMethodListQueryVariables = Exact<{
  orgID: Scalars['UUID1'];
}>;


export type GetPaymentMethodListQuery = { __typename?: 'Query', getPaymentMethodList: Array<{ __typename?: 'ACHPaymentMethodOutput', id: any, type: PaymentType, status: string, accountNumber: string, metadata?: { __typename?: 'ACHMetadataOutput', email: string, phoneNumber: string } | null, billingDetails?: { __typename?: 'ACHBillingDetailsOutput', name: string, city: string, country: string, address1: string, address2: string, district: string, postalCode: string } | null, bankAddress?: { __typename?: 'ACHBankAddressOutput', bankName: string } | null } | { __typename?: 'CreditCardPaymentMethodOutput', id: any, type: PaymentType, status: string, network: string, last4Digit: string, metadata?: { __typename?: 'CreditCardMetadataOutput', email: string, phoneNumber: string } | null, billingDetails?: { __typename?: 'CreditCardBillingDetailsOutput', name: string, city: string, country: string, address1: string, address2: string, district: string, postalCode: string } | null } | { __typename?: 'WirePaymentMethodOutput' }> };

export type CreatePaymentMethodMutationVariables = Exact<{
  orgID: Scalars['UUID1'];
  input: PaymentMethodCreateInput;
}>;


export type CreatePaymentMethodMutation = { __typename?: 'Mutation', createPaymentMethod: { __typename?: 'ACHPaymentMethodOutput', id: any, status: string } | { __typename?: 'CreditCardPaymentMethodOutput', id: any, status: string } | { __typename?: 'WirePaymentMethodOutput', id: any, status: string } };

export type DeletePaymentMethodMutationVariables = Exact<{
  paymentMethodID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
}>;


export type DeletePaymentMethodMutation = { __typename?: 'Mutation', deletePaymentMethod: boolean };

export type PreparePaymentMethodQueryVariables = Exact<{ [key: string]: never; }>;


export type PreparePaymentMethodQuery = { __typename?: 'Query', preparePaymentMethod?: { __typename?: 'ACHPaymentMethodPrepareStatementOutput', linkToken: string } | null };

export type GetPaymentMethodStatusQueryVariables = Exact<{
  paymentMethodID: Scalars['UUID1'];
}>;


export type GetPaymentMethodStatusQuery = { __typename?: 'Query', getPaymentMethod: { __typename?: 'ACHPaymentMethodOutput', id: any, status: string } | { __typename?: 'CreditCardPaymentMethodOutput', id: any, status: string } | { __typename?: 'WirePaymentMethodOutput', id: any, status: string } };

export type GetTaxQuoteQueryVariables = Exact<{
  input: TaxQuoteInput;
}>;


export type GetTaxQuoteQuery = { __typename?: 'Query', getTaxQuote: { __typename?: 'TaxQuoteOutput', taxablePrice: number, totalTaxAmount: number, totalTaxedPrice: number, verifiedAddress: { __typename?: 'TaxQuoteBillingAddressOutput', street1: string, city: string, state: string, postalCode: string, country: string } } };


export const GetPaymentNotificationDocument = gql`
    query GetPaymentNotification {
  getPaymentNotification {
    message {
      ... on PaymentNotification3DSMessage {
        redirectURL
      }
    }
  }
}
    `;

/**
 * __useGetPaymentNotificationQuery__
 *
 * To run a query within a React component, call `useGetPaymentNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentNotificationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPaymentNotificationQuery(baseOptions?: Apollo.QueryHookOptions<GetPaymentNotificationQuery, GetPaymentNotificationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentNotificationQuery, GetPaymentNotificationQueryVariables>(GetPaymentNotificationDocument, options);
      }
export function useGetPaymentNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentNotificationQuery, GetPaymentNotificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentNotificationQuery, GetPaymentNotificationQueryVariables>(GetPaymentNotificationDocument, options);
        }
export type GetPaymentNotificationQueryHookResult = ReturnType<typeof useGetPaymentNotificationQuery>;
export type GetPaymentNotificationLazyQueryHookResult = ReturnType<typeof useGetPaymentNotificationLazyQuery>;
export type GetPaymentNotificationQueryResult = Apollo.QueryResult<GetPaymentNotificationQuery, GetPaymentNotificationQueryVariables>;
export const CreatePaymentDocument = gql`
    mutation CreatePayment($paymentMethodID: UUID1!, $invoiceID: UUID1!, $metadata: CreatePaymentMetadataInput) {
  createPayment(paymentMethodID: $paymentMethodID, invoiceID: $invoiceID, metadata: $metadata) {
    id
    invoiceID
    circlePaymentID
    status
    userID
  }
}
    `;
export type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      paymentMethodID: // value for 'paymentMethodID'
 *      invoiceID: // value for 'invoiceID'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const CreateAuctionInvoiceDocument = gql`
    mutation CreateAuctionInvoice($orgID: UUID1!, $lotID: UUID1!) {
  createAuctionLotInvoice(orgID: $orgID, lotID: $lotID) {
    invoiceID
    status
    items {
      units
      unitPrice
      taxes
      totalPrice
    }
  }
}
    `;
export type CreateAuctionInvoiceMutationFn = Apollo.MutationFunction<CreateAuctionInvoiceMutation, CreateAuctionInvoiceMutationVariables>;

/**
 * __useCreateAuctionInvoiceMutation__
 *
 * To run a mutation, you first call `useCreateAuctionInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAuctionInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAuctionInvoiceMutation, { data, loading, error }] = useCreateAuctionInvoiceMutation({
 *   variables: {
 *      orgID: // value for 'orgID'
 *      lotID: // value for 'lotID'
 *   },
 * });
 */
export function useCreateAuctionInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateAuctionInvoiceMutation, CreateAuctionInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAuctionInvoiceMutation, CreateAuctionInvoiceMutationVariables>(CreateAuctionInvoiceDocument, options);
      }
export type CreateAuctionInvoiceMutationHookResult = ReturnType<typeof useCreateAuctionInvoiceMutation>;
export type CreateAuctionInvoiceMutationResult = Apollo.MutationResult<CreateAuctionInvoiceMutation>;
export type CreateAuctionInvoiceMutationOptions = Apollo.BaseMutationOptions<CreateAuctionInvoiceMutation, CreateAuctionInvoiceMutationVariables>;
export const ReserveBuyNowLotDocument = gql`
    mutation ReserveBuyNowLot($input: ReserveMarketplaceBuyNowLotInput!) {
  reserveMarketplaceBuyNowLot(input: $input) {
    invoice {
      invoiceID
      status
      items {
        units
        unitPrice
        taxes
        totalPrice
      }
    }
  }
}
    `;
export type ReserveBuyNowLotMutationFn = Apollo.MutationFunction<ReserveBuyNowLotMutation, ReserveBuyNowLotMutationVariables>;

/**
 * __useReserveBuyNowLotMutation__
 *
 * To run a mutation, you first call `useReserveBuyNowLotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReserveBuyNowLotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reserveBuyNowLotMutation, { data, loading, error }] = useReserveBuyNowLotMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReserveBuyNowLotMutation(baseOptions?: Apollo.MutationHookOptions<ReserveBuyNowLotMutation, ReserveBuyNowLotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReserveBuyNowLotMutation, ReserveBuyNowLotMutationVariables>(ReserveBuyNowLotDocument, options);
      }
export type ReserveBuyNowLotMutationHookResult = ReturnType<typeof useReserveBuyNowLotMutation>;
export type ReserveBuyNowLotMutationResult = Apollo.MutationResult<ReserveBuyNowLotMutation>;
export type ReserveBuyNowLotMutationOptions = Apollo.BaseMutationOptions<ReserveBuyNowLotMutation, ReserveBuyNowLotMutationVariables>;
export const ReleaseReservationBuyNowLotDocument = gql`
    mutation ReleaseReservationBuyNowLot($orgID: UUID1!, $invoiceID: UUID1!) {
  releaseReservation(orgID: $orgID, invoiceID: $invoiceID)
}
    `;
export type ReleaseReservationBuyNowLotMutationFn = Apollo.MutationFunction<ReleaseReservationBuyNowLotMutation, ReleaseReservationBuyNowLotMutationVariables>;

/**
 * __useReleaseReservationBuyNowLotMutation__
 *
 * To run a mutation, you first call `useReleaseReservationBuyNowLotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReleaseReservationBuyNowLotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [releaseReservationBuyNowLotMutation, { data, loading, error }] = useReleaseReservationBuyNowLotMutation({
 *   variables: {
 *      orgID: // value for 'orgID'
 *      invoiceID: // value for 'invoiceID'
 *   },
 * });
 */
export function useReleaseReservationBuyNowLotMutation(baseOptions?: Apollo.MutationHookOptions<ReleaseReservationBuyNowLotMutation, ReleaseReservationBuyNowLotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReleaseReservationBuyNowLotMutation, ReleaseReservationBuyNowLotMutationVariables>(ReleaseReservationBuyNowLotDocument, options);
      }
export type ReleaseReservationBuyNowLotMutationHookResult = ReturnType<typeof useReleaseReservationBuyNowLotMutation>;
export type ReleaseReservationBuyNowLotMutationResult = Apollo.MutationResult<ReleaseReservationBuyNowLotMutation>;
export type ReleaseReservationBuyNowLotMutationOptions = Apollo.BaseMutationOptions<ReleaseReservationBuyNowLotMutation, ReleaseReservationBuyNowLotMutationVariables>;
export const GetInvoiceDetailsDocument = gql`
    query GetInvoiceDetails($invoiceID: UUID1!, $orgID: UUID1!) {
  getInvoiceDetails(invoiceID: $invoiceID, orgID: $orgID) {
    items {
      destinationAddress
      units
      unitPrice
      taxes
      totalPrice
    }
  }
}
    `;

/**
 * __useGetInvoiceDetailsQuery__
 *
 * To run a query within a React component, call `useGetInvoiceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceDetailsQuery({
 *   variables: {
 *      invoiceID: // value for 'invoiceID'
 *      orgID: // value for 'orgID'
 *   },
 * });
 */
export function useGetInvoiceDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetInvoiceDetailsQuery, GetInvoiceDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceDetailsQuery, GetInvoiceDetailsQueryVariables>(GetInvoiceDetailsDocument, options);
      }
export function useGetInvoiceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceDetailsQuery, GetInvoiceDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceDetailsQuery, GetInvoiceDetailsQueryVariables>(GetInvoiceDetailsDocument, options);
        }
export type GetInvoiceDetailsQueryHookResult = ReturnType<typeof useGetInvoiceDetailsQuery>;
export type GetInvoiceDetailsLazyQueryHookResult = ReturnType<typeof useGetInvoiceDetailsLazyQuery>;
export type GetInvoiceDetailsQueryResult = Apollo.QueryResult<GetInvoiceDetailsQuery, GetInvoiceDetailsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    user {
      id
      username
      name
      email
    }
    userOrgs {
      organization {
        id
        name
      }
    }
    wallets {
      id
      name
      address
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PaymentKeyDocument = gql`
    query PaymentKey {
  getPaymentPublicKey {
    keyID
    publicKey
  }
}
    `;

/**
 * __usePaymentKeyQuery__
 *
 * To run a query within a React component, call `usePaymentKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentKeyQuery({
 *   variables: {
 *   },
 * });
 */
export function usePaymentKeyQuery(baseOptions?: Apollo.QueryHookOptions<PaymentKeyQuery, PaymentKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentKeyQuery, PaymentKeyQueryVariables>(PaymentKeyDocument, options);
      }
export function usePaymentKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentKeyQuery, PaymentKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentKeyQuery, PaymentKeyQueryVariables>(PaymentKeyDocument, options);
        }
export type PaymentKeyQueryHookResult = ReturnType<typeof usePaymentKeyQuery>;
export type PaymentKeyLazyQueryHookResult = ReturnType<typeof usePaymentKeyLazyQuery>;
export type PaymentKeyQueryResult = Apollo.QueryResult<PaymentKeyQuery, PaymentKeyQueryVariables>;
export const GetPaymentMethodListDocument = gql`
    query GetPaymentMethodList($orgID: UUID1!) {
  getPaymentMethodList(orgID: $orgID) {
    ... on ACHPaymentMethodOutput {
      id
      type
      status
      accountNumber
      metadata {
        email
        phoneNumber
      }
      billingDetails {
        name
        city
        country
        address1
        address2
        district
        postalCode
      }
      bankAddress {
        bankName
      }
    }
    ... on CreditCardPaymentMethodOutput {
      id
      type
      status
      network
      last4Digit
      metadata {
        email
        phoneNumber
      }
      billingDetails {
        name
        city
        country
        address1
        address2
        district
        postalCode
      }
    }
  }
}
    `;

/**
 * __useGetPaymentMethodListQuery__
 *
 * To run a query within a React component, call `useGetPaymentMethodListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentMethodListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentMethodListQuery({
 *   variables: {
 *      orgID: // value for 'orgID'
 *   },
 * });
 */
export function useGetPaymentMethodListQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentMethodListQuery, GetPaymentMethodListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentMethodListQuery, GetPaymentMethodListQueryVariables>(GetPaymentMethodListDocument, options);
      }
export function useGetPaymentMethodListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentMethodListQuery, GetPaymentMethodListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentMethodListQuery, GetPaymentMethodListQueryVariables>(GetPaymentMethodListDocument, options);
        }
export type GetPaymentMethodListQueryHookResult = ReturnType<typeof useGetPaymentMethodListQuery>;
export type GetPaymentMethodListLazyQueryHookResult = ReturnType<typeof useGetPaymentMethodListLazyQuery>;
export type GetPaymentMethodListQueryResult = Apollo.QueryResult<GetPaymentMethodListQuery, GetPaymentMethodListQueryVariables>;
export const CreatePaymentMethodDocument = gql`
    mutation CreatePaymentMethod($orgID: UUID1!, $input: PaymentMethodCreateInput!) {
  createPaymentMethod(orgID: $orgID, input: $input) {
    ... on ACHPaymentMethodOutput {
      id
      status
    }
    ... on CreditCardPaymentMethodOutput {
      id
      status
    }
    ... on WirePaymentMethodOutput {
      id
      status
    }
  }
}
    `;
export type CreatePaymentMethodMutationFn = Apollo.MutationFunction<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>;

/**
 * __useCreatePaymentMethodMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMethodMutation, { data, loading, error }] = useCreatePaymentMethodMutation({
 *   variables: {
 *      orgID: // value for 'orgID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentMethodMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>(CreatePaymentMethodDocument, options);
      }
export type CreatePaymentMethodMutationHookResult = ReturnType<typeof useCreatePaymentMethodMutation>;
export type CreatePaymentMethodMutationResult = Apollo.MutationResult<CreatePaymentMethodMutation>;
export type CreatePaymentMethodMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>;
export const DeletePaymentMethodDocument = gql`
    mutation DeletePaymentMethod($paymentMethodID: UUID1!, $orgID: UUID1!) {
  deletePaymentMethod(paymentMethodID: $paymentMethodID, orgID: $orgID)
}
    `;
export type DeletePaymentMethodMutationFn = Apollo.MutationFunction<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>;

/**
 * __useDeletePaymentMethodMutation__
 *
 * To run a mutation, you first call `useDeletePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePaymentMethodMutation, { data, loading, error }] = useDeletePaymentMethodMutation({
 *   variables: {
 *      paymentMethodID: // value for 'paymentMethodID'
 *      orgID: // value for 'orgID'
 *   },
 * });
 */
export function useDeletePaymentMethodMutation(baseOptions?: Apollo.MutationHookOptions<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>(DeletePaymentMethodDocument, options);
      }
export type DeletePaymentMethodMutationHookResult = ReturnType<typeof useDeletePaymentMethodMutation>;
export type DeletePaymentMethodMutationResult = Apollo.MutationResult<DeletePaymentMethodMutation>;
export type DeletePaymentMethodMutationOptions = Apollo.BaseMutationOptions<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>;
export const PreparePaymentMethodDocument = gql`
    query PreparePaymentMethod {
  preparePaymentMethod(paymentMethodType: ACH) {
    ... on ACHPaymentMethodPrepareStatementOutput {
      linkToken
    }
  }
}
    `;

/**
 * __usePreparePaymentMethodQuery__
 *
 * To run a query within a React component, call `usePreparePaymentMethodQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreparePaymentMethodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreparePaymentMethodQuery({
 *   variables: {
 *   },
 * });
 */
export function usePreparePaymentMethodQuery(baseOptions?: Apollo.QueryHookOptions<PreparePaymentMethodQuery, PreparePaymentMethodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreparePaymentMethodQuery, PreparePaymentMethodQueryVariables>(PreparePaymentMethodDocument, options);
      }
export function usePreparePaymentMethodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreparePaymentMethodQuery, PreparePaymentMethodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreparePaymentMethodQuery, PreparePaymentMethodQueryVariables>(PreparePaymentMethodDocument, options);
        }
export type PreparePaymentMethodQueryHookResult = ReturnType<typeof usePreparePaymentMethodQuery>;
export type PreparePaymentMethodLazyQueryHookResult = ReturnType<typeof usePreparePaymentMethodLazyQuery>;
export type PreparePaymentMethodQueryResult = Apollo.QueryResult<PreparePaymentMethodQuery, PreparePaymentMethodQueryVariables>;
export const GetPaymentMethodStatusDocument = gql`
    query GetPaymentMethodStatus($paymentMethodID: UUID1!) {
  getPaymentMethod(paymentMethodID: $paymentMethodID) {
    ... on ACHPaymentMethodOutput {
      id
      status
    }
    ... on CreditCardPaymentMethodOutput {
      id
      status
    }
    ... on WirePaymentMethodOutput {
      id
      status
    }
  }
}
    `;

/**
 * __useGetPaymentMethodStatusQuery__
 *
 * To run a query within a React component, call `useGetPaymentMethodStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentMethodStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentMethodStatusQuery({
 *   variables: {
 *      paymentMethodID: // value for 'paymentMethodID'
 *   },
 * });
 */
export function useGetPaymentMethodStatusQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentMethodStatusQuery, GetPaymentMethodStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentMethodStatusQuery, GetPaymentMethodStatusQueryVariables>(GetPaymentMethodStatusDocument, options);
      }
export function useGetPaymentMethodStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentMethodStatusQuery, GetPaymentMethodStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentMethodStatusQuery, GetPaymentMethodStatusQueryVariables>(GetPaymentMethodStatusDocument, options);
        }
export type GetPaymentMethodStatusQueryHookResult = ReturnType<typeof useGetPaymentMethodStatusQuery>;
export type GetPaymentMethodStatusLazyQueryHookResult = ReturnType<typeof useGetPaymentMethodStatusLazyQuery>;
export type GetPaymentMethodStatusQueryResult = Apollo.QueryResult<GetPaymentMethodStatusQuery, GetPaymentMethodStatusQueryVariables>;
export const GetTaxQuoteDocument = gql`
    query GetTaxQuote($input: TaxQuoteInput!) {
  getTaxQuote(input: $input) {
    verifiedAddress {
      street1
      city
      state
      postalCode
      country
    }
    taxablePrice
    totalTaxAmount
    totalTaxedPrice
  }
}
    `;

/**
 * __useGetTaxQuoteQuery__
 *
 * To run a query within a React component, call `useGetTaxQuoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaxQuoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaxQuoteQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTaxQuoteQuery(baseOptions: Apollo.QueryHookOptions<GetTaxQuoteQuery, GetTaxQuoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaxQuoteQuery, GetTaxQuoteQueryVariables>(GetTaxQuoteDocument, options);
      }
export function useGetTaxQuoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaxQuoteQuery, GetTaxQuoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaxQuoteQuery, GetTaxQuoteQueryVariables>(GetTaxQuoteDocument, options);
        }
export type GetTaxQuoteQueryHookResult = ReturnType<typeof useGetTaxQuoteQuery>;
export type GetTaxQuoteLazyQueryHookResult = ReturnType<typeof useGetTaxQuoteLazyQuery>;
export type GetTaxQuoteQueryResult = Apollo.QueryResult<GetTaxQuoteQuery, GetTaxQuoteQueryVariables>;
