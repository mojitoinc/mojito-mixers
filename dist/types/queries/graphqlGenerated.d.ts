import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
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
export declare type AchBankAddressOutput = {
    __typename?: 'ACHBankAddressOutput';
    address1: Scalars['String'];
    address2: Scalars['String'];
    bankName: Scalars['String'];
    city: Scalars['String'];
    country: Scalars['String'];
    district: Scalars['String'];
};
export declare type AchBillingDetails = {
    address1?: InputMaybe<Scalars['String']>;
    address2?: InputMaybe<Scalars['String']>;
    city?: InputMaybe<Scalars['String']>;
    country?: InputMaybe<Scalars['String']>;
    district?: InputMaybe<Scalars['String']>;
    name: Scalars['String'];
    postalCode?: InputMaybe<Scalars['String']>;
};
export declare type AchBillingDetailsOutput = {
    __typename?: 'ACHBillingDetailsOutput';
    address1: Scalars['String'];
    address2: Scalars['String'];
    city: Scalars['String'];
    country: Scalars['String'];
    district: Scalars['String'];
    name: Scalars['String'];
    postalCode: Scalars['String'];
};
export declare type AchData = {
    accountId: Scalars['String'];
    billingDetails: AchBillingDetails;
    metadata: AchMetadata;
    publicToken: Scalars['String'];
};
export declare type AchMetadata = {
    email: Scalars['String'];
    phoneNumber?: InputMaybe<Scalars['String']>;
};
export declare type AchMetadataOutput = {
    __typename?: 'ACHMetadataOutput';
    email: Scalars['String'];
    phoneNumber: Scalars['String'];
};
export declare type AchPaymentMethodOutput = {
    __typename?: 'ACHPaymentMethodOutput';
    accountNumber: Scalars['String'];
    bankAddress?: Maybe<AchBankAddressOutput>;
    billingDetails?: Maybe<AchBillingDetailsOutput>;
    id: Scalars['UUID1'];
    metadata?: Maybe<AchMetadataOutput>;
    status: Scalars['String'];
    type: PaymentType;
};
export declare type AchPaymentMethodPrepareStatementOutput = {
    __typename?: 'ACHPaymentMethodPrepareStatementOutput';
    linkToken: Scalars['String'];
};
export declare type Address = {
    __typename?: 'Address';
    buildingName?: Maybe<Scalars['String']>;
    buildingNumber?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    flatNumber?: Maybe<Scalars['String']>;
    line1?: Maybe<Scalars['String']>;
    line2?: Maybe<Scalars['String']>;
    line3?: Maybe<Scalars['String']>;
    postcode: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    street?: Maybe<Scalars['String']>;
    subStreet?: Maybe<Scalars['String']>;
    town?: Maybe<Scalars['String']>;
};
export declare type AddressInput = {
    buildingName?: InputMaybe<Scalars['String']>;
    buildingNumber: Scalars['String'];
    country: Scalars['String'];
    flatNumber?: InputMaybe<Scalars['String']>;
    line1?: InputMaybe<Scalars['String']>;
    line2?: InputMaybe<Scalars['String']>;
    line3?: InputMaybe<Scalars['String']>;
    postcode: Scalars['String'];
    state?: InputMaybe<Scalars['String']>;
    street: Scalars['String'];
    subStreet?: InputMaybe<Scalars['String']>;
    town: Scalars['String'];
};
export declare type ApplicantRequest = {
    address?: InputMaybe<AddressInput>;
    dob?: InputMaybe<Scalars['String']>;
    email?: InputMaybe<Scalars['String']>;
    firstName: Scalars['String'];
    idNumbers?: InputMaybe<Array<InputMaybe<IdNumberInput>>>;
    lastName: Scalars['String'];
};
export declare type ApplicantResponse = {
    __typename?: 'ApplicantResponse';
    address?: Maybe<Address>;
    dob?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    firstName: Scalars['String'];
    href?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    idNumbers?: Maybe<Array<Maybe<IdNumber>>>;
    lastName: Scalars['String'];
};
export declare type Asset = {
    __typename?: 'Asset';
    currentVersion?: Maybe<AssetVersion>;
    id: Scalars['UUID1'];
    versions?: Maybe<Array<AssetVersion>>;
};
export declare type AssetFilter = {
    organizationID?: InputMaybe<Scalars['UUID1']>;
};
export declare type AssetVersion = {
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
export declare type AttributeValue = AttributeValueFloat | AttributeValueInt | AttributeValueString;
export declare type AttributeValueFloat = {
    __typename?: 'AttributeValueFloat';
    floatValue: Scalars['Float'];
};
export declare type AttributeValueInt = {
    __typename?: 'AttributeValueInt';
    intValue: Scalars['Int'];
};
export declare type AttributeValueString = {
    __typename?: 'AttributeValueString';
    stringValue: Scalars['String'];
};
export declare enum AuctionBidOrder {
    Asc = "ASC",
    Desc = "DESC"
}
export declare enum AuctionLotStatus {
    Active = "Active",
    Completed = "Completed",
    Hidden = "Hidden",
    Preview = "Preview"
}
export declare type BidFilterInput = {
    marketplaceAuctionLotId?: InputMaybe<Scalars['UUID']>;
    order?: InputMaybe<AuctionBidOrder>;
    returnDeleted?: InputMaybe<Scalars['Boolean']>;
    userId?: InputMaybe<Scalars['UUID']>;
};
export declare type CheckResponse = {
    __typename?: 'CheckResponse';
    id: Scalars['String'];
    success: Scalars['Boolean'];
};
export declare enum CollectionType {
    Auction = "Auction",
    Tk2 = "TK2"
}
export declare enum ContractType {
    Erc721Creator = "ERC721Creator",
    Erc1155Creator = "ERC1155Creator"
}
export declare type CreateMarketplaceBuyNowLotInput = {
    collectionId: Scalars['UUID1'];
    collectionItemName: Scalars['String'];
    delivery?: InputMaybe<MarketplaceItemDeliveryInput>;
    endDate: Scalars['Time'];
    marketplaceTokenId?: InputMaybe<Scalars['UUID1']>;
    sortNumber: Scalars['Int'];
    startDate: Scalars['Time'];
    totalUnits?: InputMaybe<Scalars['Int']>;
    unitPrice: Scalars['Float'];
};
export declare type CreatePaymentCreditCardMetadataInput = {
    encryptedData: Scalars['String'];
    keyID: Scalars['String'];
};
export declare type CreatePaymentCryptoMetadataInput = {
    billingDetails?: InputMaybe<CryptoBillingDetails>;
    description?: InputMaybe<Scalars['String']>;
    localPrice: LocalPrice;
    name?: InputMaybe<Scalars['String']>;
};
export declare type CreatePaymentMetadataInput = {
    creditCardData?: InputMaybe<CreatePaymentCreditCardMetadataInput>;
    cryptoData?: InputMaybe<CreatePaymentCryptoMetadataInput>;
    destinationAddress?: InputMaybe<Scalars['EthAddress']>;
};
export declare type CreditCardBillingDetails = {
    address1: Scalars['String'];
    address2?: InputMaybe<Scalars['String']>;
    city: Scalars['String'];
    country: Scalars['String'];
    district?: InputMaybe<Scalars['String']>;
    name: Scalars['String'];
    postalCode: Scalars['String'];
};
export declare type CreditCardBillingDetailsOutput = {
    __typename?: 'CreditCardBillingDetailsOutput';
    address1: Scalars['String'];
    address2: Scalars['String'];
    city: Scalars['String'];
    country: Scalars['String'];
    district: Scalars['String'];
    name: Scalars['String'];
    postalCode: Scalars['String'];
};
export declare type CreditCardData = {
    billingDetails?: InputMaybe<CreditCardBillingDetails>;
    encryptedData: Scalars['String'];
    expirationMonth: Scalars['Int'];
    expirationYear: Scalars['Int'];
    keyID: Scalars['String'];
    metadata?: InputMaybe<CreditCardMetadata>;
};
export declare type CreditCardMetadata = {
    email: Scalars['String'];
    phoneNumber?: InputMaybe<Scalars['String']>;
};
export declare type CreditCardMetadataOutput = {
    __typename?: 'CreditCardMetadataOutput';
    email: Scalars['String'];
    phoneNumber: Scalars['String'];
};
export declare type CreditCardPaymentMethodOutput = {
    __typename?: 'CreditCardPaymentMethodOutput';
    billingDetails?: Maybe<CreditCardBillingDetailsOutput>;
    id: Scalars['UUID1'];
    last4Digit: Scalars['String'];
    metadata?: Maybe<CreditCardMetadataOutput>;
    network: Scalars['String'];
    status: Scalars['String'];
    type: PaymentType;
};
export declare type CryptoBillingDetails = {
    address1?: InputMaybe<Scalars['String']>;
    address2?: InputMaybe<Scalars['String']>;
    city?: InputMaybe<Scalars['String']>;
    country?: InputMaybe<Scalars['String']>;
    district?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    postalCode?: InputMaybe<Scalars['String']>;
};
export declare type CryptoPaymentDetails = {
    __typename?: 'CryptoPaymentDetails';
    hostedURL: Scalars['String'];
};
export declare type CryptoPaymentMethodOutput = {
    __typename?: 'CryptoPaymentMethodOutput';
    id: Scalars['UUID1'];
    status: Scalars['String'];
    type: PaymentType;
};
export declare type CurrentUser = {
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
export declare type CurrentUserActiveBidsArgs = {
    orgId: Scalars['UUID'];
};
export declare type CurrentUserUserOrgsArgs = {
    filter?: InputMaybe<UserOrgFilter>;
};
export declare type CurrentUserWonBidsArgs = {
    orgId: Scalars['UUID'];
};
export declare enum DeliveryMethod {
    Erc721Provenance = "ERC721Provenance",
    Erc721Transfer = "ERC721Transfer",
    Erc1155OpenEdition = "ERC1155OpenEdition",
    Erc1155Transfer = "ERC1155Transfer",
    NoOp = "NoOp"
}
export declare type DeployContractInput = {
    contractType: ContractType;
    nftName: Scalars['String'];
    nftSymbol: Scalars['String'];
    organizationId: Scalars['UUID1'];
    walletId: Scalars['UUID1'];
};
export declare type Erc721Metadata = {
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
export declare enum ExtensionType {
    ProvenanceExtension = "ProvenanceExtension"
}
export declare type IdNumber = {
    __typename?: 'IDNumber';
    stateCode: Scalars['String'];
    type: Scalars['String'];
    value: Scalars['String'];
};
export declare type IdNumberInput = {
    stateCode: Scalars['String'];
    type: Scalars['String'];
    value: Scalars['String'];
};
export declare type InvoiceDetails = {
    __typename?: 'InvoiceDetails';
    OrganizationID: Scalars['UUID1'];
    billingAddress?: Maybe<InvoiceDetailsBillingAddress>;
    externalPaymentID: Scalars['String'];
    externalUserID: Scalars['String'];
    internalUserID: Scalars['String'];
    invoiceCreatedAt: Scalars['Time'];
    invoiceID: Scalars['UUID1'];
    invoiceNumber: Scalars['Int'];
    items: Array<Maybe<ItemInvoiceDetail>>;
    paymentID: Scalars['UUID1'];
    status: InvoiceStatus;
    userName: Scalars['String'];
};
export declare type InvoiceDetailsBillingAddress = {
    __typename?: 'InvoiceDetailsBillingAddress';
    city: Scalars['String'];
    country: Scalars['String'];
    postalCode: Scalars['String'];
    state: Scalars['String'];
    street1: Scalars['String'];
};
export declare enum InvoiceStatus {
    Canceled = "Canceled",
    Delivered = "Delivered",
    Draft = "Draft",
    Expired = "Expired",
    Failed = "Failed",
    Paid = "Paid",
    Pending = "Pending"
}
export declare type ItemInvoiceDetail = {
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
export declare enum KycStatus {
    Clear = "Clear",
    Failed1 = "Failed1",
    Failed2 = "Failed2",
    Level1 = "Level1",
    Level2 = "Level2",
    None = "None",
    Pending = "Pending"
}
export declare type LocalPrice = {
    amount: Scalars['Float'];
    currency: Scalars['String'];
};
export declare enum MarketCollectionStatus {
    Active = "Active",
    Archived = "Archived",
    Inactive = "Inactive"
}
export declare type Marketplace = {
    __typename?: 'Marketplace';
    collections?: Maybe<Array<MarketplaceCollection>>;
    id: Scalars['UUID'];
    name: Scalars['String'];
    organizationID: Scalars['String'];
    theme?: Maybe<Scalars['String']>;
    tokens?: Maybe<Array<MarketplaceToken>>;
};
export declare type MarketplaceAuctionBid = {
    __typename?: 'MarketplaceAuctionBid';
    amount: Scalars['Float'];
    buyersPremium: Scalars['Float'];
    createdAt: Scalars['Time'];
    currentBid: Scalars['Float'];
    deletedAt?: Maybe<Scalars['Time']>;
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
export declare type MarketplaceAuctionBidInput = {
    amount: Scalars['Float'];
    marketplaceAuctionLotId: Scalars['UUID'];
};
export declare type MarketplaceAuctionDefaultConfig = {
    __typename?: 'MarketplaceAuctionDefaultConfig';
    collectionId: Scalars['UUID'];
    endDate: Scalars['Time'];
    id: Scalars['UUID'];
    minIncrement: Scalars['Float'];
    reservePrice?: Maybe<Scalars['Float']>;
    startDate: Scalars['Time'];
};
export declare type MarketplaceAuctionFeeStructure = {
    __typename?: 'MarketplaceAuctionFeeStructure';
    buyersPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
    overheadPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
};
export declare type MarketplaceAuctionFeeStructureItem = {
    __typename?: 'MarketplaceAuctionFeeStructureItem';
    from: Scalars['Float'];
    rate: Scalars['Float'];
    to?: Maybe<Scalars['Float']>;
};
export declare type MarketplaceAuctionLot = {
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
export declare type MarketplaceAuctionLotBidsArgs = {
    filter?: InputMaybe<BidFilterInput>;
};
export declare type MarketplaceAuctionLotDefaultConfigArgs = {
    collectionId: Scalars['UUID'];
};
export declare type MarketplaceAuctionLotInput = {
    collectionId: Scalars['UUID'];
    collectionItemName: Scalars['String'];
    delivery?: InputMaybe<MarketplaceItemDeliveryInput>;
    endDate: Scalars['Time'];
    lotNumber?: InputMaybe<Scalars['Int']>;
    marketplaceTokenId?: InputMaybe<Scalars['UUID']>;
    reservePrice?: InputMaybe<Scalars['Float']>;
    saleType: MarketplaceSaleType;
    startDate: Scalars['Time'];
    startingBid?: InputMaybe<Scalars['Float']>;
};
export declare type MarketplaceAuctionLotUpdateInput = {
    delivery?: InputMaybe<MarketplaceItemDeliveryInput>;
    endDate?: InputMaybe<Scalars['Time']>;
    lotNumber?: InputMaybe<Scalars['Int']>;
    reservePrice?: InputMaybe<Scalars['Float']>;
    startDate?: InputMaybe<Scalars['Time']>;
    startingBid?: InputMaybe<Scalars['Float']>;
    status?: InputMaybe<AuctionLotStatus>;
};
export declare type MarketplaceBuyNowOutput = {
    __typename?: 'MarketplaceBuyNowOutput';
    endDate: Scalars['Time'];
    id: Scalars['UUID'];
    invoice?: Maybe<InvoiceDetails>;
    marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
    purchaseTimeoutInMinutes?: Maybe<Scalars['Int']>;
    remainingCount: Scalars['Int'];
    sortNumber: Scalars['Int'];
    startDate: Scalars['Time'];
    totalAvailableUnits: Scalars['Int'];
    totalUnits: Scalars['Int'];
    unitPrice: Scalars['Float'];
};
export declare type MarketplaceBuyNowUpdateInput = {
    endDate?: InputMaybe<Scalars['Time']>;
    sortNumber?: InputMaybe<Scalars['Int']>;
    startDate?: InputMaybe<Scalars['Time']>;
    totalUnits?: InputMaybe<Scalars['Int']>;
    unitPrice?: InputMaybe<Scalars['Float']>;
};
export declare type MarketplaceCollection = {
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
export declare type MarketplaceCollectionItemsArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
    statuses?: InputMaybe<Array<InputMaybe<MarketplaceCollectionItemStatus>>>;
};
export declare type MarketplaceCollectionCreateInput = {
    description: Scalars['String'];
    endDate?: InputMaybe<Scalars['Time']>;
    name: Scalars['String'];
    startDate?: InputMaybe<Scalars['Time']>;
    status?: InputMaybe<MarketCollectionStatus>;
};
export declare type MarketplaceCollectionItem = {
    __typename?: 'MarketplaceCollectionItem';
    collectionId: Scalars['UUID'];
    delivery?: Maybe<MarketplaceCollectionItemDelivery>;
    details: MarketplaceCollectionItemDetails;
    id: Scalars['UUID'];
    /** @deprecated Use `details` property instead */
    lot: MarketplaceAuctionLot;
    marketplaceTokenId?: Maybe<Scalars['UUID']>;
    name: Scalars['String'];
    saleType: MarketplaceSaleType;
    slug: Scalars['String'];
    status: MarketplaceCollectionItemStatus;
};
export declare type MarketplaceCollectionItemDelivery = MarketplaceItemDeliveryErc721Provenance | MarketplaceItemDeliveryErc721Transfer | MarketplaceItemDeliveryErc1155OpenEdition | MarketplaceItemDeliveryErc1155Transfer | MarketplaceItemDeliveryNoOp;
export declare type MarketplaceCollectionItemDetails = MarketplaceAuctionLot | MarketplaceBuyNowOutput;
export declare enum MarketplaceCollectionItemStatus {
    Active = "Active",
    Completed = "Completed",
    Hidden = "Hidden",
    Preview = "Preview"
}
export declare type MarketplaceCollectionUpdateInput = {
    description?: InputMaybe<Scalars['String']>;
    endDate?: InputMaybe<Scalars['Time']>;
    name?: InputMaybe<Scalars['String']>;
    slug?: InputMaybe<Scalars['String']>;
    startDate?: InputMaybe<Scalars['Time']>;
    status?: InputMaybe<MarketCollectionStatus>;
};
export declare type MarketplaceItemDeliveryErc721Provenance = {
    __typename?: 'MarketplaceItemDeliveryERC721Provenance';
    extensionAddress: Scalars['String'];
    nftContractId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc721ProvenanceInput = {
    extensionAddress: Scalars['String'];
    nftContractId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc721Transfer = {
    __typename?: 'MarketplaceItemDeliveryERC721Transfer';
    contractAddress: Scalars['String'];
    onChainTokenId: Scalars['Int'];
    ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc721TransferInput = {
    contractAddress: Scalars['String'];
    onChainTokenId: Scalars['Int'];
    ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc1155OpenEdition = {
    __typename?: 'MarketplaceItemDeliveryERC1155OpenEdition';
    contractAddress: Scalars['String'];
    onChainTokenId: Scalars['Int'];
    ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc1155OpenEditionInput = {
    contractAddress: Scalars['String'];
    onChainTokenId: Scalars['Int'];
    ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc1155Transfer = {
    __typename?: 'MarketplaceItemDeliveryERC1155Transfer';
    contractAddress: Scalars['String'];
    onChainTokenId: Scalars['Int'];
    ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc1155TransferInput = {
    contractAddress: Scalars['String'];
    onChainTokenId: Scalars['Int'];
    ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryInput = {
    ERC721Provenance?: InputMaybe<MarketplaceItemDeliveryErc721ProvenanceInput>;
    ERC721Transfer?: InputMaybe<MarketplaceItemDeliveryErc721TransferInput>;
    ERC1155OpenEdition?: InputMaybe<MarketplaceItemDeliveryErc1155OpenEditionInput>;
    ERC1155Transfer?: InputMaybe<MarketplaceItemDeliveryErc1155TransferInput>;
    NoOp?: InputMaybe<MarketplaceItemDeliveryNoOpInput>;
    deliveryMethod: DeliveryMethod;
};
export declare type MarketplaceItemDeliveryNoOp = {
    __typename?: 'MarketplaceItemDeliveryNoOp';
    notes?: Maybe<Scalars['String']>;
};
export declare type MarketplaceItemDeliveryNoOpInput = {
    notes?: InputMaybe<Scalars['String']>;
};
export declare enum MarketplaceSaleType {
    Auction = "Auction",
    BuyNow = "BuyNow"
}
export declare type MarketplaceToken = {
    __typename?: 'MarketplaceToken';
    id: Scalars['UUID'];
    marketplaceID: Scalars['UUID'];
    name?: Maybe<Scalars['String']>;
    nftContractAddress: Scalars['String'];
    nftTokenID?: Maybe<Scalars['UUID']>;
    onChainTokenID: Scalars['Int'];
};
export declare type MarketplaceUser = {
    __typename?: 'MarketplaceUser';
    avatar?: Maybe<Scalars['String']>;
    id: Scalars['UUID'];
    username?: Maybe<Scalars['String']>;
};
export declare type MetadataAttributes = {
    __typename?: 'MetadataAttributes';
    displayType?: Maybe<Scalars['String']>;
    maxValue?: Maybe<Scalars['Int']>;
    traitType: Scalars['String'];
    value: AttributeValue;
};
export declare type Mutation = {
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
    /** Creates new Applicant based on input data. */
    createApplicant: ApplicantResponse;
    /** Creates invoice for given Lot, can be called by org admin */
    createAuctionLotInvoice: InvoiceDetails;
    /** Creates new Check based for provided applicant ID. */
    createCheck: CheckResponse;
    createMarketplaceAuctionBid: MarketplaceAuctionBid;
    createMarketplaceAuctionLot: MarketplaceAuctionLot;
    createMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
    createMarketplaceCollection: MarketplaceCollection;
    createOrgByUser: UserOrganization;
    /** Creates a multisig with organization as parent type */
    createOrgMultisig: Scalars['String'];
    /** Creates payment for given Invoice */
    createPayment: PaymentOutput;
    /** Creates new Payment method based on input data. */
    createPaymentMethod: PaymentMethodOutput;
    createTokenDraft: Scalars['String'];
    /** Create a new API key for given User and Organization. */
    createUserAPIKey?: Maybe<UserApiKeyResponse>;
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
    /** Deploy existing multisig wallet to a new network */
    deployWalletToNetwork: Scalars['String'];
    /** Generates promo codes for a marketplace item */
    generateCodes: Array<Maybe<Scalars['String']>>;
    importExternalTokenToCollection: Scalars['String'];
    loginWithSignature: Organization;
    marketplaceUpdateTheme: Marketplace;
    mintTokens: Scalars['String'];
    nftContractAddAdmin: Scalars['String'];
    nftContractExtensionPause: Scalars['String'];
    nftContractExtensionProvenanceMint: Scalars['String'];
    nftContractExtensionSetBaseURI: Scalars['String'];
    nftContractExtensionSetProvenanceHash: Scalars['String'];
    nftContractExtensionUnpause: Scalars['String'];
    nftContractRegisterExtensionProvenance: NftContract;
    nftContractSetTokenURI: Scalars['String'];
    nftDeployContract: NftContract;
    orgCreateMarketplace: Marketplace;
    ping: Scalars['String'];
    /** Redeem a promo code */
    redeemPromoCode: Scalars['Boolean'];
    /** Release reservations held by invoice ID */
    releaseReservation: Scalars['Boolean'];
    reserveMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
    setJwtIssuerDomain: Organization;
    startInvoiceDelivery: Scalars['Boolean'];
    /** Transfers a token in the provided wallet to the `transferTo` address */
    transferToken: Scalars['String'];
    /** Updates existing  Applicant based on input data. */
    updateApplicant: ApplicantResponse;
    updateMarketplaceAuctionLot: MarketplaceAuctionLot;
    updateMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
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
export declare type MutationAddCollectionItemToUserFavoritesArgs = {
    collectionItemId: Scalars['UUID1'];
};
export declare type MutationAddExistingTokenToCollectionArgs = {
    marketplaceId: Scalars['UUID1'];
    tokenId: Scalars['UUID1'];
};
export declare type MutationAddOrganizationArgs = {
    handle: Scalars['String'];
    name: Scalars['String'];
};
export declare type MutationAddTokensToCollectionArgs = {
    marketplaceId: Scalars['UUID1'];
    tokenIds: Array<Scalars['UUID1']>;
};
export declare type MutationCancelMarketplaceAuctionBidArgs = {
    bidID: Scalars['UUID1'];
    marketplaceID: Scalars['UUID1'];
};
export declare type MutationCancelPaymentArgs = {
    orgID: Scalars['UUID1'];
    paymentID: Scalars['UUID1'];
};
export declare type MutationCreateApplicantArgs = {
    input: ApplicantRequest;
    orgID: Scalars['UUID1'];
};
export declare type MutationCreateAuctionLotInvoiceArgs = {
    lotID: Scalars['UUID1'];
    orgID: Scalars['UUID1'];
};
export declare type MutationCreateCheckArgs = {
    applicantID: Scalars['String'];
};
export declare type MutationCreateMarketplaceAuctionBidArgs = {
    marketplaceAuctionBid: MarketplaceAuctionBidInput;
};
export declare type MutationCreateMarketplaceAuctionLotArgs = {
    marketplaceAuctionLot: MarketplaceAuctionLotInput;
};
export declare type MutationCreateMarketplaceBuyNowLotArgs = {
    input: CreateMarketplaceBuyNowLotInput;
};
export declare type MutationCreateMarketplaceCollectionArgs = {
    data: MarketplaceCollectionCreateInput;
    marketplaceID: Scalars['String'];
};
export declare type MutationCreateOrgByUserArgs = {
    handle: Scalars['String'];
    name: Scalars['String'];
};
export declare type MutationCreateOrgMultisigArgs = {
    chainId: Scalars['Int'];
    name: Scalars['String'];
    orgId: Scalars['UUID1'];
};
export declare type MutationCreatePaymentArgs = {
    invoiceID: Scalars['UUID1'];
    metadata?: InputMaybe<CreatePaymentMetadataInput>;
    paymentMethodID: Scalars['UUID1'];
};
export declare type MutationCreatePaymentMethodArgs = {
    input: PaymentMethodCreateInput;
    orgID: Scalars['UUID1'];
};
export declare type MutationCreateTokenDraftArgs = {
    contractId: Scalars['UUID1'];
    tokens: Array<TokenDraft>;
};
export declare type MutationCreateUserApiKeyArgs = {
    orgId: Scalars['UUID1'];
};
export declare type MutationDeleteAssetArgs = {
    assetId: Scalars['UUID1'];
};
export declare type MutationDeleteCollectionItemFromUserFavoritesArgs = {
    collectionItemId: Scalars['UUID1'];
};
export declare type MutationDeletePaymentMethodArgs = {
    orgID: Scalars['UUID1'];
    paymentMethodID: Scalars['UUID1'];
};
export declare type MutationDeleteTokenArgs = {
    tokenId: Scalars['UUID1'];
};
export declare type MutationDeleteUserApiKeyArgs = {
    keyId: Scalars['UUID1'];
};
export declare type MutationDeployWalletToNetworkArgs = {
    networkId: Scalars['UUID1'];
    walletId: Scalars['UUID1'];
};
export declare type MutationGenerateCodesArgs = {
    marketplaceCollectionItemId: Scalars['UUID1'];
    num: Scalars['Int'];
};
export declare type MutationImportExternalTokenToCollectionArgs = {
    contractAddress: Scalars['String'];
    marketplaceId: Scalars['UUID1'];
    onChainId: Scalars['Int'];
};
export declare type MutationLoginWithSignatureArgs = {
    request: SigninRequest;
};
export declare type MutationMarketplaceUpdateThemeArgs = {
    id: Scalars['String'];
    theme: Scalars['String'];
};
export declare type MutationMintTokensArgs = {
    tokenIds: Array<Scalars['UUID1']>;
};
export declare type MutationNftContractAddAdminArgs = {
    address: Scalars['String'];
    nftContractId: Scalars['UUID1'];
};
export declare type MutationNftContractExtensionPauseArgs = {
    extensionAddress: Scalars['String'];
    nftContractId: Scalars['UUID1'];
};
export declare type MutationNftContractExtensionProvenanceMintArgs = {
    contractId: Scalars['UUID1'];
    extensionAddress: Scalars['String'];
    mintToAddress: Scalars['String'];
    numberOfTokens: Scalars['Int'];
    voucherId: Scalars['UUID1'];
};
export declare type MutationNftContractExtensionSetBaseUriArgs = {
    baseURI: Scalars['String'];
    extensionAddress: Scalars['String'];
    nftContractId: Scalars['UUID1'];
};
export declare type MutationNftContractExtensionSetProvenanceHashArgs = {
    extensionAddress: Scalars['String'];
    nftContractId: Scalars['UUID1'];
    provenanceHash: Scalars['String'];
};
export declare type MutationNftContractExtensionUnpauseArgs = {
    extensionAddress: Scalars['String'];
    nftContractId: Scalars['UUID1'];
};
export declare type MutationNftContractRegisterExtensionProvenanceArgs = {
    contractId: Scalars['UUID1'];
    maxTokenSupply: Scalars['Int'];
};
export declare type MutationNftContractSetTokenUriArgs = {
    nftContractId: Scalars['UUID1'];
    tokenId: Scalars['Int'];
    uri: Scalars['String'];
};
export declare type MutationNftDeployContractArgs = {
    input: DeployContractInput;
};
export declare type MutationOrgCreateMarketplaceArgs = {
    name: Scalars['String'];
    orgId?: InputMaybe<Scalars['UUID1']>;
};
export declare type MutationRedeemPromoCodeArgs = {
    code: Scalars['String'];
    destAddr?: InputMaybe<Scalars['String']>;
};
export declare type MutationReleaseReservationArgs = {
    invoiceID: Scalars['UUID1'];
    orgID?: InputMaybe<Scalars['UUID1']>;
};
export declare type MutationReserveMarketplaceBuyNowLotArgs = {
    input: ReserveMarketplaceBuyNowLotInput;
};
export declare type MutationSetJwtIssuerDomainArgs = {
    domain: Scalars['String'];
    orgId: Scalars['UUID'];
};
export declare type MutationStartInvoiceDeliveryArgs = {
    invoiceID: Scalars['UUID1'];
};
export declare type MutationTransferTokenArgs = {
    contractAddress: Scalars['String'];
    tokenOnChainId: Scalars['Int'];
    transferTo: Scalars['String'];
    walletId: Scalars['UUID1'];
};
export declare type MutationUpdateApplicantArgs = {
    applicantID: Scalars['String'];
    input: ApplicantRequest;
};
export declare type MutationUpdateMarketplaceAuctionLotArgs = {
    data: MarketplaceAuctionLotUpdateInput;
    marketplaceAuctionLotId: Scalars['UUID'];
};
export declare type MutationUpdateMarketplaceBuyNowLotArgs = {
    input: MarketplaceBuyNowUpdateInput;
    marketplaceBuyNowLotID: Scalars['UUID'];
};
export declare type MutationUpdateMarketplaceCollectionArgs = {
    data: MarketplaceCollectionUpdateInput;
    id: Scalars['UUID1'];
};
export declare type MutationUpdateMultisigNameArgs = {
    newName: Scalars['String'];
    walletID: Scalars['UUID1'];
};
export declare type MutationUpdatePaymentMethodArgs = {
    input: PaymentMethodUpdateInput;
    orgID: Scalars['UUID1'];
    paymentMethodID: Scalars['UUID1'];
};
export declare type MutationUpdateTokenDraftArgs = {
    token: TokenDraft;
};
export declare type MutationUpdateUserOrgRoleArgs = {
    orgID: Scalars['UUID'];
    role: Scalars['String'];
    userID: Scalars['UUID'];
};
export declare type MutationUpdateUserOrgSettingsArgs = {
    params: SettingsInput;
};
export declare type MutationUploadArweaveAssetArgs = {
    assetVersionId: Scalars['UUID1'];
};
export declare type MutationUploadArweaveMetadataArgs = {
    tokenId: Scalars['UUID1'];
};
export declare type MutationUploadAssetArgs = {
    file: Scalars['Upload'];
    name: Scalars['String'];
    orgId: Scalars['UUID1'];
};
export declare type NftContract = {
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
export declare type NftContractType = {
    __typename?: 'NFTContractType';
    id: Scalars['UUID1'];
    name: Scalars['String'];
};
export declare type NftMetadata = {
    __typename?: 'NFTMetadata';
    copyright?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    externalUrl?: Maybe<Scalars['String']>;
    image?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare type NftToken = {
    __typename?: 'NFTToken';
    asset?: Maybe<Asset>;
    assetId?: Maybe<Scalars['UUID1']>;
    deployed: Scalars['Boolean'];
    editions?: Maybe<Scalars['Int']>;
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
export declare type Network = {
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
export declare type Organization = {
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
export declare type OrganizationAssetsArgs = {
    filter?: InputMaybe<AssetFilter>;
};
export declare type OrganizationMembersArgs = {
    filter?: InputMaybe<OrganizationMemberFilter>;
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
};
export declare type OrganizationMember = {
    __typename?: 'OrganizationMember';
    email?: Maybe<Scalars['String']>;
    externalId: Scalars['String'];
    id: Scalars['UUID'];
    name?: Maybe<Scalars['String']>;
    role?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
};
export declare type OrganizationMemberFilter = {
    externalUserId?: InputMaybe<Scalars['String']>;
};
export declare type Payment = {
    __typename?: 'Payment';
    circlePaymentID: Scalars['String'];
    id: Scalars['UUID1'];
    invoiceID: Scalars['UUID1'];
    paymentMethodID: Scalars['UUID1'];
    status: PaymentStatus;
    userID: Scalars['UUID1'];
};
export declare type PaymentDetails = CryptoPaymentDetails;
export declare type PaymentMethodCreateInput = {
    achData?: InputMaybe<AchData>;
    creditCardData?: InputMaybe<CreditCardData>;
    paymentType: PaymentType;
    wireData?: InputMaybe<WireData>;
};
export declare type PaymentMethodOutput = AchPaymentMethodOutput | CreditCardPaymentMethodOutput | CryptoPaymentMethodOutput | WirePaymentMethodOutput;
export declare type PaymentMethodPrepareStatementOutput = AchPaymentMethodPrepareStatementOutput;
export declare type PaymentMethodUpdateInput = {
    achData?: InputMaybe<AchData>;
    creditCardData?: InputMaybe<CreditCardData>;
    paymentType: PaymentType;
};
export declare type PaymentNotification3DsMessage = {
    __typename?: 'PaymentNotification3DSMessage';
    error?: Maybe<Scalars['String']>;
    redirectURL?: Maybe<Scalars['String']>;
};
export declare type PaymentNotificationMessage = PaymentNotification3DsMessage;
export declare type PaymentNotificationOutput = {
    __typename?: 'PaymentNotificationOutput';
    message: PaymentNotificationMessage;
};
export declare type PaymentOutput = {
    __typename?: 'PaymentOutput';
    details?: Maybe<PaymentDetails>;
    id: Scalars['UUID1'];
    invoiceID: Scalars['UUID1'];
    paymentMethodID: Scalars['UUID1'];
    processorPaymentID: Scalars['String'];
    status: PaymentStatus;
    userID: Scalars['UUID1'];
};
export declare type PaymentPublicKey = {
    __typename?: 'PaymentPublicKey';
    keyID: Scalars['String'];
    publicKey: Scalars['String'];
};
export declare enum PaymentStatus {
    ActionRequired = "action_required",
    Confirmed = "confirmed",
    Failed = "failed",
    Paid = "paid",
    Pending = "pending"
}
export declare enum PaymentType {
    Ach = "ACH",
    CreditCard = "CreditCard",
    Crypto = "Crypto",
    Wire = "Wire"
}
export declare type Query = {
    __typename?: 'Query';
    collection?: Maybe<MarketplaceCollection>;
    collectionBySlug?: Maybe<MarketplaceCollection>;
    collectionItemById?: Maybe<MarketplaceCollectionItem>;
    /** Retrieves applicant details by organizationID */
    getApplicant: ApplicantResponse;
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
    /** Retrieves sdk token to inititate onfido web SDK */
    getSDKToken: SdkTokenResponse;
    /** Get Tax Quote */
    getTaxQuote: TaxQuoteOutput;
    /** create invoice/lot report by collectionID and mails  to provided email */
    mailInvoiceLotDetailReportMailByCollectionID: Scalars['Boolean'];
    /** create salesreport by collectionID and mails to provided email */
    mailSalesReportByCollectionID: Scalars['Boolean'];
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
export declare type QueryCollectionArgs = {
    id: Scalars['String'];
};
export declare type QueryCollectionBySlugArgs = {
    marketplaceID: Scalars['UUID1'];
    slug: Scalars['String'];
};
export declare type QueryCollectionItemByIdArgs = {
    id: Scalars['UUID1'];
};
export declare type QueryGetApplicantArgs = {
    organizationID: Scalars['UUID1'];
};
export declare type QueryGetInvoiceDetailsArgs = {
    invoiceID: Scalars['UUID1'];
};
export declare type QueryGetInvoicesByUserIdArgs = {
    orgID: Scalars['UUID1'];
    userID: Scalars['UUID1'];
};
export declare type QueryGetMarketplaceAuctionLotArgs = {
    marketplaceAuctionLotId: Scalars['UUID'];
};
export declare type QueryGetPaymentMethodArgs = {
    paymentMethodID: Scalars['UUID1'];
};
export declare type QueryGetPaymentMethodListArgs = {
    orgID?: InputMaybe<Scalars['UUID1']>;
};
export declare type QueryGetPaymentPublicKeyArgs = {
    orgID: Scalars['UUID1'];
};
export declare type QueryGetPaymentsByUserIdArgs = {
    orgID: Scalars['UUID1'];
    userID: Scalars['UUID1'];
};
export declare type QueryGetSdkTokenArgs = {
    applicantID: Scalars['String'];
    referrer: Scalars['String'];
};
export declare type QueryGetTaxQuoteArgs = {
    input: TaxQuoteInput;
};
export declare type QueryMailInvoiceLotDetailReportMailByCollectionIdArgs = {
    collectionID: Scalars['UUID1'];
    toEmail: Scalars['String'];
};
export declare type QueryMailSalesReportByCollectionIdArgs = {
    collectionID: Scalars['UUID1'];
    orgID: Scalars['UUID1'];
    toEmail: Scalars['String'];
};
export declare type QueryMarketplaceArgs = {
    id: Scalars['UUID'];
};
export declare type QueryNetworkArgs = {
    id: Scalars['UUID1'];
};
export declare type QueryNftContractArgs = {
    id: Scalars['UUID1'];
};
export declare type QueryNftTokenArgs = {
    id: Scalars['UUID1'];
};
export declare type QueryOrgUsernameAvailableArgs = {
    organizationID: Scalars['UUID1'];
    username: Scalars['String'];
};
export declare type QueryOrganizationArgs = {
    handle: Scalars['String'];
};
export declare type QueryOrganizationByIdArgs = {
    id: Scalars['UUID1'];
};
export declare type QueryPreparePaymentMethodArgs = {
    orgID?: InputMaybe<Scalars['UUID1']>;
    paymentMethodType: PaymentType;
};
export declare type QueryValidateIpArgs = {
    ip: Scalars['String'];
    organizationID: Scalars['UUID1'];
};
export declare type QueryValidatePaymentLimitArgs = {
    collectionID: Scalars['UUID1'];
    itemsCount: Scalars['Int'];
};
export declare type QueryWalletArgs = {
    id: Scalars['UUID1'];
};
export declare type ReserveMarketplaceBuyNowLotInput = {
    itemCount: Scalars['Int'];
    marketplaceBuyNowLotID: Scalars['UUID1'];
};
export declare enum Role {
    Admin = "admin",
    User = "user"
}
export declare type SdkTokenResponse = {
    __typename?: 'SDKTokenResponse';
    token: Scalars['String'];
};
export declare type SettingsInput = {
    avatar?: InputMaybe<Scalars['String']>;
    settingsJson?: InputMaybe<Scalars['String']>;
    userOrgId: Scalars['String'];
    username?: InputMaybe<Scalars['String']>;
};
export declare type SigninRequest = {
    challenge: Scalars['String'];
    signature: Scalars['String'];
    signer: Scalars['String'];
};
export declare type SigninResponse = {
    __typename?: 'SigninResponse';
    me: CurrentUser;
    refreshToken: Scalars['String'];
    token: Scalars['String'];
};
export declare type Subscription = {
    __typename?: 'Subscription';
    auctionLotUpdated: MarketplaceAuctionLot;
    bidFeed: MarketplaceAuctionBid;
    /** Returns a MarketplaceAuctionLot on subscribe and whenever a new bid is placed */
    getMarketplaceAuctionLot: MarketplaceAuctionLot;
    /** Subscribes to lots and bids updates within given marketplace collection */
    marketplaceCollectionLotsUpdates: MarketplaceAuctionLot;
};
export declare type SubscriptionAuctionLotUpdatedArgs = {
    marketplaceAuctionLotId: Scalars['UUID'];
};
export declare type SubscriptionBidFeedArgs = {
    marketplaceAuctionLotId: Scalars['UUID'];
};
export declare type SubscriptionGetMarketplaceAuctionLotArgs = {
    marketplaceAuctionLotId: Scalars['UUID1'];
};
export declare type SubscriptionMarketplaceCollectionLotsUpdatesArgs = {
    collectionId: Scalars['UUID1'];
};
export declare type TaxQuoteBillingAddressInput = {
    city: Scalars['String'];
    country: Scalars['String'];
    postalCode: Scalars['String'];
    state: Scalars['String'];
    street1: Scalars['String'];
};
export declare type TaxQuoteBillingAddressOutput = {
    __typename?: 'TaxQuoteBillingAddressOutput';
    city: Scalars['String'];
    country: Scalars['String'];
    postalCode: Scalars['String'];
    state: Scalars['String'];
    street1: Scalars['String'];
};
export declare type TaxQuoteInput = {
    address: TaxQuoteBillingAddressInput;
    taxablePrice: Scalars['Float'];
};
export declare type TaxQuoteOutput = {
    __typename?: 'TaxQuoteOutput';
    taxablePrice: Scalars['Float'];
    totalTaxAmount: Scalars['Float'];
    totalTaxedPrice: Scalars['Float'];
    verifiedAddress: TaxQuoteBillingAddressOutput;
};
export declare type TokenDraft = {
    assetId?: InputMaybe<Scalars['UUID1']>;
    copyright?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    editions?: InputMaybe<Scalars['Int']>;
    metadataJSON?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    royaltyBasisPoints?: InputMaybe<Scalars['Int']>;
    tokenId?: InputMaybe<Scalars['UUID1']>;
};
export declare enum TransactionStatus {
    Completed = "Completed",
    Failed = "Failed",
    Pending = "Pending"
}
export declare enum TransactionType {
    DeployMultisig = "DeployMultisig",
    TransferToken = "TransferToken"
}
export declare type User = {
    __typename?: 'User';
    email?: Maybe<Scalars['String']>;
    id: Scalars['UUID'];
    name?: Maybe<Scalars['String']>;
    username: Scalars['String'];
};
export declare type UserApiKeyResponse = {
    __typename?: 'UserAPIKeyResponse';
    createdAt?: Maybe<Scalars['Time']>;
    id?: Maybe<Scalars['UUID1']>;
    key?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['Time']>;
};
export declare type UserOrgFilter = {
    orgId: Scalars['UUID'];
};
export declare type UserOrganization = {
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
export declare type ValidateIpResponse = {
    __typename?: 'ValidateIPResponse';
    Success: Scalars['Boolean'];
    ipScreeningId: Scalars['UUID1'];
};
export declare type ValidatePaymentLimitData = {
    __typename?: 'ValidatePaymentLimitData';
    isLimitExceeded: Scalars['Boolean'];
    remainingTotal: Scalars['Int'];
    remainingTransaction: Scalars['Int'];
};
export declare type ValidatePaymentLimitOutput = {
    __typename?: 'ValidatePaymentLimitOutput';
    ach: ValidatePaymentLimitData;
    creditCard: ValidatePaymentLimitData;
    wire: ValidatePaymentLimitData;
};
export declare type Wallet = {
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
export declare enum WalletParentType {
    Organization = "organization",
    User = "user"
}
export declare type WalletToken = {
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
export declare enum WalletTxType {
    MojitoHotWallet = "MojitoHotWallet",
    Multisig = "Multisig"
}
export declare type WireBankAddress = {
    address1?: InputMaybe<Scalars['String']>;
    address2?: InputMaybe<Scalars['String']>;
    bankName?: InputMaybe<Scalars['String']>;
    city?: InputMaybe<Scalars['String']>;
    country: Scalars['String'];
    district?: InputMaybe<Scalars['String']>;
};
export declare type WireBankAddressOutput = {
    __typename?: 'WireBankAddressOutput';
    address1: Scalars['String'];
    address2: Scalars['String'];
    bankName: Scalars['String'];
    city: Scalars['String'];
    country: Scalars['String'];
    district: Scalars['String'];
};
export declare type WireBeneficiary = {
    __typename?: 'WireBeneficiary';
    address1: Scalars['String'];
    address2: Scalars['String'];
    name: Scalars['String'];
};
export declare type WireBeneficiaryBank = {
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
export declare type WireBillingDetails = {
    address1: Scalars['String'];
    address2?: InputMaybe<Scalars['String']>;
    city: Scalars['String'];
    country: Scalars['String'];
    district?: InputMaybe<Scalars['String']>;
    name: Scalars['String'];
    postalCode: Scalars['String'];
};
export declare type WireBillingDetailsOutput = {
    __typename?: 'WireBillingDetailsOutput';
    address1: Scalars['String'];
    address2: Scalars['String'];
    city: Scalars['String'];
    country: Scalars['String'];
    district: Scalars['String'];
    name: Scalars['String'];
    postalCode: Scalars['String'];
};
export declare type WireData = {
    accountNumber: Scalars['String'];
    bankAddress: WireBankAddress;
    billingDetails: WireBillingDetails;
    routingNumber: Scalars['String'];
};
export declare type WireInstructions = {
    __typename?: 'WireInstructions';
    beneficiary: WireBeneficiary;
    beneficiaryBank: WireBeneficiaryBank;
    trackingRef: Scalars['String'];
};
export declare type WirePaymentMethodOutput = {
    __typename?: 'WirePaymentMethodOutput';
    bankAddress?: Maybe<WireBankAddressOutput>;
    billingDetails?: Maybe<WireBillingDetailsOutput>;
    description: Scalars['String'];
    id: Scalars['UUID1'];
    instructions?: Maybe<WireInstructions>;
    status: Scalars['String'];
    type: PaymentType;
};
export declare type GetPaymentNotificationQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetPaymentNotificationQuery = {
    __typename?: 'Query';
    getPaymentNotification: {
        __typename?: 'PaymentNotificationOutput';
        message: {
            __typename?: 'PaymentNotification3DSMessage';
            redirectURL?: string | null;
            error?: string | null;
        };
    };
};
export declare type CreatePaymentMutationVariables = MutationCreatePaymentArgs;
export declare type CreatePaymentMutation = {
    __typename?: 'Mutation';
    createPayment: {
        __typename?: 'PaymentOutput';
        id: any;
        invoiceID: any;
        processorPaymentID: string;
        status: PaymentStatus;
        userID: any;
    };
};
export declare type CreateAuctionInvoiceMutationVariables = Exact<{
    orgID: Scalars['UUID1'];
    lotID: Scalars['UUID1'];
}>;
export declare type CreateAuctionInvoiceMutation = {
    __typename?: 'Mutation';
    createAuctionLotInvoice: {
        __typename?: 'InvoiceDetails';
        invoiceID: any;
        status: InvoiceStatus;
        items: Array<{
            __typename?: 'ItemInvoiceDetail';
            units: number;
            unitPrice: number;
            taxes: number;
            totalPrice: number;
        } | null>;
    };
};
export declare type ReserveBuyNowLotMutationVariables = Exact<{
    input: ReserveMarketplaceBuyNowLotInput;
}>;
export declare type ReserveBuyNowLotMutation = {
    __typename?: 'Mutation';
    reserveMarketplaceBuyNowLot: {
        __typename?: 'MarketplaceBuyNowOutput';
        invoice?: {
            __typename?: 'InvoiceDetails';
            invoiceID: any;
            status: InvoiceStatus;
            items: Array<{
                __typename?: 'ItemInvoiceDetail';
                units: number;
                unitPrice: number;
                taxes: number;
                totalPrice: number;
            } | null>;
        } | null;
    };
};
export declare type ReleaseReservationBuyNowLotMutationVariables = Exact<{
    orgID: Scalars['UUID1'];
    invoiceID: Scalars['UUID1'];
}>;
export declare type ReleaseReservationBuyNowLotMutation = {
    __typename?: 'Mutation';
    releaseReservation: boolean;
};
export declare type GetInvoiceDetailsQueryVariables = Exact<{
    invoiceID: Scalars['UUID1'];
}>;
export declare type GetInvoiceDetailsQuery = {
    __typename?: 'Query';
    getInvoiceDetails: {
        __typename?: 'InvoiceDetails';
        items: Array<{
            __typename?: 'ItemInvoiceDetail';
            destinationAddress: string;
            units: number;
            unitPrice: number;
            taxes: number;
            totalPrice: number;
        } | null>;
    };
};
export declare type MeQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type MeQuery = {
    __typename?: 'Query';
    me?: {
        __typename?: 'CurrentUser';
        id: any;
        user: {
            __typename?: 'User';
            id: any;
            username: string;
            name?: string | null;
            email?: string | null;
        };
        userOrgs: Array<{
            __typename?: 'UserOrganization';
            organization: {
                __typename?: 'Organization';
                id: any;
                name: string;
            };
        }>;
        wallets?: Array<{
            __typename?: 'Wallet';
            id: any;
            name: string;
            address?: any | null;
        }> | null;
    } | null;
};
export declare type PaymentKeyQueryVariables = Exact<{
    orgID: Scalars['UUID1'];
}>;
export declare type PaymentKeyQuery = {
    __typename?: 'Query';
    getPaymentPublicKey: {
        __typename?: 'PaymentPublicKey';
        keyID: string;
        publicKey: string;
    };
};
export declare type GetPaymentMethodListQueryVariables = Exact<{
    orgID: Scalars['UUID1'];
}>;
export declare type GetPaymentMethodListQuery = {
    __typename?: 'Query';
    getPaymentMethodList: Array<{
        __typename?: 'ACHPaymentMethodOutput';
        id: any;
        type: PaymentType;
        status: string;
        accountNumber: string;
        metadata?: {
            __typename?: 'ACHMetadataOutput';
            email: string;
            phoneNumber: string;
        } | null;
        billingDetails?: {
            __typename?: 'ACHBillingDetailsOutput';
            name: string;
            city: string;
            country: string;
            address1: string;
            address2: string;
            district: string;
            postalCode: string;
        } | null;
        bankAddress?: {
            __typename?: 'ACHBankAddressOutput';
            bankName: string;
        } | null;
    } | {
        __typename?: 'CreditCardPaymentMethodOutput';
        id: any;
        type: PaymentType;
        status: string;
        network: string;
        last4Digit: string;
        metadata?: {
            __typename?: 'CreditCardMetadataOutput';
            email: string;
            phoneNumber: string;
        } | null;
        billingDetails?: {
            __typename?: 'CreditCardBillingDetailsOutput';
            name: string;
            city: string;
            country: string;
            address1: string;
            address2: string;
            district: string;
            postalCode: string;
        } | null;
    } | {
        __typename?: 'CryptoPaymentMethodOutput';
    } | {
        __typename?: 'WirePaymentMethodOutput';
    }>;
};
export declare type CreatePaymentMethodMutationVariables = Exact<{
    orgID: Scalars['UUID1'];
    input: PaymentMethodCreateInput;
}>;
export declare type CreatePaymentMethodMutation = {
    __typename?: 'Mutation';
    createPaymentMethod: {
        __typename?: 'ACHPaymentMethodOutput';
        id: any;
        status: string;
    } | {
        __typename?: 'CreditCardPaymentMethodOutput';
        id: any;
        status: string;
    } | {
        __typename?: 'CryptoPaymentMethodOutput';
        id: any;
        status: string;
    } | {
        __typename?: 'WirePaymentMethodOutput';
        id: any;
        status: string;
    };
};
export declare type DeletePaymentMethodMutationVariables = Exact<{
    paymentMethodID: Scalars['UUID1'];
    orgID: Scalars['UUID1'];
}>;
export declare type DeletePaymentMethodMutation = {
    __typename?: 'Mutation';
    deletePaymentMethod: boolean;
};
export declare type PreparePaymentMethodQueryVariables = Exact<{
    orgID: Scalars['UUID1'];
}>;
export declare type PreparePaymentMethodQuery = {
    __typename?: 'Query';
    preparePaymentMethod?: {
        __typename?: 'ACHPaymentMethodPrepareStatementOutput';
        linkToken: string;
    } | null;
};
export declare type GetPaymentMethodStatusQueryVariables = Exact<{
    paymentMethodID: Scalars['UUID1'];
}>;
export declare type GetPaymentMethodStatusQuery = {
    __typename?: 'Query';
    getPaymentMethod: {
        __typename?: 'ACHPaymentMethodOutput';
        id: any;
        status: string;
    } | {
        __typename?: 'CreditCardPaymentMethodOutput';
        id: any;
        status: string;
    } | {
        __typename?: 'CryptoPaymentMethodOutput';
        id: any;
        status: string;
    } | {
        __typename?: 'WirePaymentMethodOutput';
        id: any;
        status: string;
    };
};
export declare type GetTaxQuoteQueryVariables = Exact<{
    input: TaxQuoteInput;
}>;
export declare type GetTaxQuoteQuery = {
    __typename?: 'Query';
    getTaxQuote: {
        __typename?: 'TaxQuoteOutput';
        taxablePrice: number;
        totalTaxAmount: number;
        totalTaxedPrice: number;
        verifiedAddress: {
            __typename?: 'TaxQuoteBillingAddressOutput';
            street1: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
        };
    };
};
export declare const GetPaymentNotificationDocument: Apollo.DocumentNode;
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
export declare function useGetPaymentNotificationQuery(baseOptions?: Apollo.QueryHookOptions<GetPaymentNotificationQuery, GetPaymentNotificationQueryVariables>): Apollo.QueryResult<GetPaymentNotificationQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetPaymentNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentNotificationQuery, GetPaymentNotificationQueryVariables>): Apollo.QueryTuple<GetPaymentNotificationQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetPaymentNotificationQueryHookResult = ReturnType<typeof useGetPaymentNotificationQuery>;
export declare type GetPaymentNotificationLazyQueryHookResult = ReturnType<typeof useGetPaymentNotificationLazyQuery>;
export declare type GetPaymentNotificationQueryResult = Apollo.QueryResult<GetPaymentNotificationQuery, GetPaymentNotificationQueryVariables>;
export declare const CreatePaymentDocument: Apollo.DocumentNode;
export declare type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;
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
export declare function useCreatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>): Apollo.MutationTuple<CreatePaymentMutation, MutationCreatePaymentArgs, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export declare type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export declare type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export declare const CreateAuctionInvoiceDocument: Apollo.DocumentNode;
export declare type CreateAuctionInvoiceMutationFn = Apollo.MutationFunction<CreateAuctionInvoiceMutation, CreateAuctionInvoiceMutationVariables>;
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
export declare function useCreateAuctionInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateAuctionInvoiceMutation, CreateAuctionInvoiceMutationVariables>): Apollo.MutationTuple<CreateAuctionInvoiceMutation, Exact<{
    orgID: any;
    lotID: any;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateAuctionInvoiceMutationHookResult = ReturnType<typeof useCreateAuctionInvoiceMutation>;
export declare type CreateAuctionInvoiceMutationResult = Apollo.MutationResult<CreateAuctionInvoiceMutation>;
export declare type CreateAuctionInvoiceMutationOptions = Apollo.BaseMutationOptions<CreateAuctionInvoiceMutation, CreateAuctionInvoiceMutationVariables>;
export declare const ReserveBuyNowLotDocument: Apollo.DocumentNode;
export declare type ReserveBuyNowLotMutationFn = Apollo.MutationFunction<ReserveBuyNowLotMutation, ReserveBuyNowLotMutationVariables>;
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
export declare function useReserveBuyNowLotMutation(baseOptions?: Apollo.MutationHookOptions<ReserveBuyNowLotMutation, ReserveBuyNowLotMutationVariables>): Apollo.MutationTuple<ReserveBuyNowLotMutation, Exact<{
    input: ReserveMarketplaceBuyNowLotInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type ReserveBuyNowLotMutationHookResult = ReturnType<typeof useReserveBuyNowLotMutation>;
export declare type ReserveBuyNowLotMutationResult = Apollo.MutationResult<ReserveBuyNowLotMutation>;
export declare type ReserveBuyNowLotMutationOptions = Apollo.BaseMutationOptions<ReserveBuyNowLotMutation, ReserveBuyNowLotMutationVariables>;
export declare const ReleaseReservationBuyNowLotDocument: Apollo.DocumentNode;
export declare type ReleaseReservationBuyNowLotMutationFn = Apollo.MutationFunction<ReleaseReservationBuyNowLotMutation, ReleaseReservationBuyNowLotMutationVariables>;
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
export declare function useReleaseReservationBuyNowLotMutation(baseOptions?: Apollo.MutationHookOptions<ReleaseReservationBuyNowLotMutation, ReleaseReservationBuyNowLotMutationVariables>): Apollo.MutationTuple<ReleaseReservationBuyNowLotMutation, Exact<{
    orgID: any;
    invoiceID: any;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type ReleaseReservationBuyNowLotMutationHookResult = ReturnType<typeof useReleaseReservationBuyNowLotMutation>;
export declare type ReleaseReservationBuyNowLotMutationResult = Apollo.MutationResult<ReleaseReservationBuyNowLotMutation>;
export declare type ReleaseReservationBuyNowLotMutationOptions = Apollo.BaseMutationOptions<ReleaseReservationBuyNowLotMutation, ReleaseReservationBuyNowLotMutationVariables>;
export declare const GetInvoiceDetailsDocument: Apollo.DocumentNode;
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
 *   },
 * });
 */
export declare function useGetInvoiceDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetInvoiceDetailsQuery, GetInvoiceDetailsQueryVariables>): Apollo.QueryResult<GetInvoiceDetailsQuery, Exact<{
    invoiceID: any;
}>>;
export declare function useGetInvoiceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceDetailsQuery, GetInvoiceDetailsQueryVariables>): Apollo.QueryTuple<GetInvoiceDetailsQuery, Exact<{
    invoiceID: any;
}>>;
export declare type GetInvoiceDetailsQueryHookResult = ReturnType<typeof useGetInvoiceDetailsQuery>;
export declare type GetInvoiceDetailsLazyQueryHookResult = ReturnType<typeof useGetInvoiceDetailsLazyQuery>;
export declare type GetInvoiceDetailsQueryResult = Apollo.QueryResult<GetInvoiceDetailsQuery, GetInvoiceDetailsQueryVariables>;
export declare const MeDocument: Apollo.DocumentNode;
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
export declare function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>): Apollo.QueryResult<MeQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.QueryTuple<MeQuery, Exact<{
    [key: string]: never;
}>>;
export declare type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export declare type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export declare type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export declare const PaymentKeyDocument: Apollo.DocumentNode;
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
 *      orgID: // value for 'orgID'
 *   },
 * });
 */
export declare function usePaymentKeyQuery(baseOptions: Apollo.QueryHookOptions<PaymentKeyQuery, PaymentKeyQueryVariables>): Apollo.QueryResult<PaymentKeyQuery, Exact<{
    orgID: any;
}>>;
export declare function usePaymentKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentKeyQuery, PaymentKeyQueryVariables>): Apollo.QueryTuple<PaymentKeyQuery, Exact<{
    orgID: any;
}>>;
export declare type PaymentKeyQueryHookResult = ReturnType<typeof usePaymentKeyQuery>;
export declare type PaymentKeyLazyQueryHookResult = ReturnType<typeof usePaymentKeyLazyQuery>;
export declare type PaymentKeyQueryResult = Apollo.QueryResult<PaymentKeyQuery, PaymentKeyQueryVariables>;
export declare const GetPaymentMethodListDocument: Apollo.DocumentNode;
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
export declare function useGetPaymentMethodListQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentMethodListQuery, GetPaymentMethodListQueryVariables>): Apollo.QueryResult<GetPaymentMethodListQuery, Exact<{
    orgID: any;
}>>;
export declare function useGetPaymentMethodListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentMethodListQuery, GetPaymentMethodListQueryVariables>): Apollo.QueryTuple<GetPaymentMethodListQuery, Exact<{
    orgID: any;
}>>;
export declare type GetPaymentMethodListQueryHookResult = ReturnType<typeof useGetPaymentMethodListQuery>;
export declare type GetPaymentMethodListLazyQueryHookResult = ReturnType<typeof useGetPaymentMethodListLazyQuery>;
export declare type GetPaymentMethodListQueryResult = Apollo.QueryResult<GetPaymentMethodListQuery, GetPaymentMethodListQueryVariables>;
export declare const CreatePaymentMethodDocument: Apollo.DocumentNode;
export declare type CreatePaymentMethodMutationFn = Apollo.MutationFunction<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>;
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
export declare function useCreatePaymentMethodMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>): Apollo.MutationTuple<CreatePaymentMethodMutation, Exact<{
    orgID: any;
    input: PaymentMethodCreateInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreatePaymentMethodMutationHookResult = ReturnType<typeof useCreatePaymentMethodMutation>;
export declare type CreatePaymentMethodMutationResult = Apollo.MutationResult<CreatePaymentMethodMutation>;
export declare type CreatePaymentMethodMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>;
export declare const DeletePaymentMethodDocument: Apollo.DocumentNode;
export declare type DeletePaymentMethodMutationFn = Apollo.MutationFunction<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>;
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
export declare function useDeletePaymentMethodMutation(baseOptions?: Apollo.MutationHookOptions<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>): Apollo.MutationTuple<DeletePaymentMethodMutation, Exact<{
    paymentMethodID: any;
    orgID: any;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeletePaymentMethodMutationHookResult = ReturnType<typeof useDeletePaymentMethodMutation>;
export declare type DeletePaymentMethodMutationResult = Apollo.MutationResult<DeletePaymentMethodMutation>;
export declare type DeletePaymentMethodMutationOptions = Apollo.BaseMutationOptions<DeletePaymentMethodMutation, DeletePaymentMethodMutationVariables>;
export declare const PreparePaymentMethodDocument: Apollo.DocumentNode;
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
 *      orgID: // value for 'orgID'
 *   },
 * });
 */
export declare function usePreparePaymentMethodQuery(baseOptions: Apollo.QueryHookOptions<PreparePaymentMethodQuery, PreparePaymentMethodQueryVariables>): Apollo.QueryResult<PreparePaymentMethodQuery, Exact<{
    orgID: any;
}>>;
export declare function usePreparePaymentMethodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreparePaymentMethodQuery, PreparePaymentMethodQueryVariables>): Apollo.QueryTuple<PreparePaymentMethodQuery, Exact<{
    orgID: any;
}>>;
export declare type PreparePaymentMethodQueryHookResult = ReturnType<typeof usePreparePaymentMethodQuery>;
export declare type PreparePaymentMethodLazyQueryHookResult = ReturnType<typeof usePreparePaymentMethodLazyQuery>;
export declare type PreparePaymentMethodQueryResult = Apollo.QueryResult<PreparePaymentMethodQuery, PreparePaymentMethodQueryVariables>;
export declare const GetPaymentMethodStatusDocument: Apollo.DocumentNode;
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
export declare function useGetPaymentMethodStatusQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentMethodStatusQuery, GetPaymentMethodStatusQueryVariables>): Apollo.QueryResult<GetPaymentMethodStatusQuery, Exact<{
    paymentMethodID: any;
}>>;
export declare function useGetPaymentMethodStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentMethodStatusQuery, GetPaymentMethodStatusQueryVariables>): Apollo.QueryTuple<GetPaymentMethodStatusQuery, Exact<{
    paymentMethodID: any;
}>>;
export declare type GetPaymentMethodStatusQueryHookResult = ReturnType<typeof useGetPaymentMethodStatusQuery>;
export declare type GetPaymentMethodStatusLazyQueryHookResult = ReturnType<typeof useGetPaymentMethodStatusLazyQuery>;
export declare type GetPaymentMethodStatusQueryResult = Apollo.QueryResult<GetPaymentMethodStatusQuery, GetPaymentMethodStatusQueryVariables>;
export declare const GetTaxQuoteDocument: Apollo.DocumentNode;
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
export declare function useGetTaxQuoteQuery(baseOptions: Apollo.QueryHookOptions<GetTaxQuoteQuery, GetTaxQuoteQueryVariables>): Apollo.QueryResult<GetTaxQuoteQuery, Exact<{
    input: TaxQuoteInput;
}>>;
export declare function useGetTaxQuoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaxQuoteQuery, GetTaxQuoteQueryVariables>): Apollo.QueryTuple<GetTaxQuoteQuery, Exact<{
    input: TaxQuoteInput;
}>>;
export declare type GetTaxQuoteQueryHookResult = ReturnType<typeof useGetTaxQuoteQuery>;
export declare type GetTaxQuoteLazyQueryHookResult = ReturnType<typeof useGetTaxQuoteLazyQuery>;
export declare type GetTaxQuoteQueryResult = Apollo.QueryResult<GetTaxQuoteQuery, GetTaxQuoteQueryVariables>;
