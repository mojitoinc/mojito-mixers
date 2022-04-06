'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Apollo = require('@apollo/client');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var Apollo__namespace = /*#__PURE__*/_interopNamespace(Apollo);

const defaultOptions = {};
exports.AuctionBidOrder = void 0;
(function (AuctionBidOrder) {
    AuctionBidOrder["Asc"] = "ASC";
    AuctionBidOrder["Desc"] = "DESC";
})(exports.AuctionBidOrder || (exports.AuctionBidOrder = {}));
exports.AuctionLotStatus = void 0;
(function (AuctionLotStatus) {
    AuctionLotStatus["Active"] = "Active";
    AuctionLotStatus["Completed"] = "Completed";
    AuctionLotStatus["Hidden"] = "Hidden";
    AuctionLotStatus["Preview"] = "Preview";
})(exports.AuctionLotStatus || (exports.AuctionLotStatus = {}));
exports.CollectionType = void 0;
(function (CollectionType) {
    CollectionType["Auction"] = "Auction";
    CollectionType["Tk2"] = "TK2";
})(exports.CollectionType || (exports.CollectionType = {}));
exports.ContractType = void 0;
(function (ContractType) {
    ContractType["Erc721Creator"] = "ERC721Creator";
    ContractType["Erc1155Creator"] = "ERC1155Creator";
})(exports.ContractType || (exports.ContractType = {}));
exports.DeliveryMethod = void 0;
(function (DeliveryMethod) {
    DeliveryMethod["Erc721Provenance"] = "ERC721Provenance";
    DeliveryMethod["Erc721Transfer"] = "ERC721Transfer";
    DeliveryMethod["Erc1155OpenEdition"] = "ERC1155OpenEdition";
    DeliveryMethod["Erc1155Transfer"] = "ERC1155Transfer";
    DeliveryMethod["NoOp"] = "NoOp";
})(exports.DeliveryMethod || (exports.DeliveryMethod = {}));
exports.ExtensionType = void 0;
(function (ExtensionType) {
    ExtensionType["ProvenanceExtension"] = "ProvenanceExtension";
})(exports.ExtensionType || (exports.ExtensionType = {}));
exports.InvoiceStatus = void 0;
(function (InvoiceStatus) {
    InvoiceStatus["Canceled"] = "Canceled";
    InvoiceStatus["Delivered"] = "Delivered";
    InvoiceStatus["Draft"] = "Draft";
    InvoiceStatus["Expired"] = "Expired";
    InvoiceStatus["Failed"] = "Failed";
    InvoiceStatus["Paid"] = "Paid";
    InvoiceStatus["Pending"] = "Pending";
})(exports.InvoiceStatus || (exports.InvoiceStatus = {}));
exports.KycStatus = void 0;
(function (KycStatus) {
    KycStatus["Clear"] = "Clear";
    KycStatus["Failed1"] = "Failed1";
    KycStatus["Failed2"] = "Failed2";
    KycStatus["Level1"] = "Level1";
    KycStatus["Level2"] = "Level2";
    KycStatus["None"] = "None";
    KycStatus["Pending"] = "Pending";
})(exports.KycStatus || (exports.KycStatus = {}));
exports.MarketCollectionStatus = void 0;
(function (MarketCollectionStatus) {
    MarketCollectionStatus["Active"] = "Active";
    MarketCollectionStatus["Archived"] = "Archived";
    MarketCollectionStatus["Inactive"] = "Inactive";
})(exports.MarketCollectionStatus || (exports.MarketCollectionStatus = {}));
exports.MarketplaceCollectionItemStatus = void 0;
(function (MarketplaceCollectionItemStatus) {
    MarketplaceCollectionItemStatus["Active"] = "Active";
    MarketplaceCollectionItemStatus["Completed"] = "Completed";
    MarketplaceCollectionItemStatus["Hidden"] = "Hidden";
    MarketplaceCollectionItemStatus["Preview"] = "Preview";
})(exports.MarketplaceCollectionItemStatus || (exports.MarketplaceCollectionItemStatus = {}));
exports.MarketplaceSaleType = void 0;
(function (MarketplaceSaleType) {
    MarketplaceSaleType["Auction"] = "Auction";
    MarketplaceSaleType["BuyNow"] = "BuyNow";
})(exports.MarketplaceSaleType || (exports.MarketplaceSaleType = {}));
exports.PaymentStatus = void 0;
(function (PaymentStatus) {
    PaymentStatus["ActionRequired"] = "action_required";
    PaymentStatus["Confirmed"] = "confirmed";
    PaymentStatus["Failed"] = "failed";
    PaymentStatus["Paid"] = "paid";
    PaymentStatus["Pending"] = "pending";
})(exports.PaymentStatus || (exports.PaymentStatus = {}));
exports.PaymentType = void 0;
(function (PaymentType) {
    PaymentType["Ach"] = "ACH";
    PaymentType["CreditCard"] = "CreditCard";
    PaymentType["Crypto"] = "Crypto";
    PaymentType["Wire"] = "Wire";
})(exports.PaymentType || (exports.PaymentType = {}));
exports.Role = void 0;
(function (Role) {
    Role["Admin"] = "admin";
    Role["User"] = "user";
})(exports.Role || (exports.Role = {}));
exports.TransactionStatus = void 0;
(function (TransactionStatus) {
    TransactionStatus["Completed"] = "Completed";
    TransactionStatus["Failed"] = "Failed";
    TransactionStatus["Pending"] = "Pending";
})(exports.TransactionStatus || (exports.TransactionStatus = {}));
exports.TransactionType = void 0;
(function (TransactionType) {
    TransactionType["DeployMultisig"] = "DeployMultisig";
    TransactionType["TransferToken"] = "TransferToken";
})(exports.TransactionType || (exports.TransactionType = {}));
exports.WalletParentType = void 0;
(function (WalletParentType) {
    WalletParentType["Organization"] = "organization";
    WalletParentType["User"] = "user";
})(exports.WalletParentType || (exports.WalletParentType = {}));
exports.WalletTxType = void 0;
(function (WalletTxType) {
    WalletTxType["MojitoHotWallet"] = "MojitoHotWallet";
    WalletTxType["Multisig"] = "Multisig";
})(exports.WalletTxType || (exports.WalletTxType = {}));
const GetPaymentNotificationDocument = Apollo.gql `
    query GetPaymentNotification {
  getPaymentNotification {
    message {
      ... on PaymentNotification3DSMessage {
        redirectURL
        error
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
function useGetPaymentNotificationQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useQuery(GetPaymentNotificationDocument, options);
}
const CreatePaymentDocument = Apollo.gql `
    mutation CreatePayment($paymentMethodID: UUID1!, $invoiceID: UUID1!, $metadata: CreatePaymentMetadataInput) {
  createPayment(paymentMethodID: $paymentMethodID, invoiceID: $invoiceID, metadata: $metadata) {
    id
    invoiceID
    processorPaymentID
    status
    userID
  }
}
    `;
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
function useCreatePaymentMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useMutation(CreatePaymentDocument, options);
}
const CreateAuctionInvoiceDocument = Apollo.gql `
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
function useCreateAuctionInvoiceMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useMutation(CreateAuctionInvoiceDocument, options);
}
const ReserveBuyNowLotDocument = Apollo.gql `
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
function useReserveBuyNowLotMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useMutation(ReserveBuyNowLotDocument, options);
}
const ReleaseReservationBuyNowLotDocument = Apollo.gql `
    mutation ReleaseReservationBuyNowLot($orgID: UUID1!, $invoiceID: UUID1!) {
  releaseReservation(orgID: $orgID, invoiceID: $invoiceID)
}
    `;
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
function useReleaseReservationBuyNowLotMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useMutation(ReleaseReservationBuyNowLotDocument, options);
}
const GetInvoiceDetailsDocument = Apollo.gql `
    query GetInvoiceDetails($invoiceID: UUID1!) {
  getInvoiceDetails(invoiceID: $invoiceID) {
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
 *   },
 * });
 */
function useGetInvoiceDetailsQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useQuery(GetInvoiceDetailsDocument, options);
}
const MeDocument = Apollo.gql `
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
function useMeQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useQuery(MeDocument, options);
}
const PaymentKeyDocument = Apollo.gql `
    query PaymentKey($orgID: UUID1!) {
  getPaymentPublicKey(orgID: $orgID) {
    keyID
    publicKey
  }
}
    `;
function usePaymentKeyLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useLazyQuery(PaymentKeyDocument, options);
}
const GetPaymentMethodListDocument = Apollo.gql `
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
function useGetPaymentMethodListQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useQuery(GetPaymentMethodListDocument, options);
}
const CreatePaymentMethodDocument = Apollo.gql `
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
    ... on CryptoPaymentMethodOutput {
      id
      status
    }
  }
}
    `;
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
function useCreatePaymentMethodMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useMutation(CreatePaymentMethodDocument, options);
}
const DeletePaymentMethodDocument = Apollo.gql `
    mutation DeletePaymentMethod($paymentMethodID: UUID1!, $orgID: UUID1!) {
  deletePaymentMethod(paymentMethodID: $paymentMethodID, orgID: $orgID)
}
    `;
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
function useDeletePaymentMethodMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useMutation(DeletePaymentMethodDocument, options);
}
const PreparePaymentMethodDocument = Apollo.gql `
    query PreparePaymentMethod($orgID: UUID1!) {
  preparePaymentMethod(paymentMethodType: ACH, orgID: $orgID) {
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
 *      orgID: // value for 'orgID'
 *   },
 * });
 */
function usePreparePaymentMethodQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useQuery(PreparePaymentMethodDocument, options);
}
const GetPaymentMethodStatusDocument = Apollo.gql `
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
    ... on CryptoPaymentMethodOutput {
      id
      status
    }
  }
}
    `;
function useGetPaymentMethodStatusLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useLazyQuery(GetPaymentMethodStatusDocument, options);
}
const GetTaxQuoteDocument = Apollo.gql `
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
function useGetTaxQuoteLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo__namespace.useLazyQuery(GetTaxQuoteDocument, options);
}

exports.CreateAuctionInvoiceDocument = CreateAuctionInvoiceDocument;
exports.CreatePaymentDocument = CreatePaymentDocument;
exports.CreatePaymentMethodDocument = CreatePaymentMethodDocument;
exports.DeletePaymentMethodDocument = DeletePaymentMethodDocument;
exports.GetInvoiceDetailsDocument = GetInvoiceDetailsDocument;
exports.GetPaymentMethodListDocument = GetPaymentMethodListDocument;
exports.GetPaymentMethodStatusDocument = GetPaymentMethodStatusDocument;
exports.GetPaymentNotificationDocument = GetPaymentNotificationDocument;
exports.GetTaxQuoteDocument = GetTaxQuoteDocument;
exports.MeDocument = MeDocument;
exports.PaymentKeyDocument = PaymentKeyDocument;
exports.PreparePaymentMethodDocument = PreparePaymentMethodDocument;
exports.ReleaseReservationBuyNowLotDocument = ReleaseReservationBuyNowLotDocument;
exports.ReserveBuyNowLotDocument = ReserveBuyNowLotDocument;
exports.useCreateAuctionInvoiceMutation = useCreateAuctionInvoiceMutation;
exports.useCreatePaymentMethodMutation = useCreatePaymentMethodMutation;
exports.useCreatePaymentMutation = useCreatePaymentMutation;
exports.useDeletePaymentMethodMutation = useDeletePaymentMethodMutation;
exports.useGetInvoiceDetailsQuery = useGetInvoiceDetailsQuery;
exports.useGetPaymentMethodListQuery = useGetPaymentMethodListQuery;
exports.useGetPaymentMethodStatusLazyQuery = useGetPaymentMethodStatusLazyQuery;
exports.useGetPaymentNotificationQuery = useGetPaymentNotificationQuery;
exports.useGetTaxQuoteLazyQuery = useGetTaxQuoteLazyQuery;
exports.useMeQuery = useMeQuery;
exports.usePaymentKeyLazyQuery = usePaymentKeyLazyQuery;
exports.usePreparePaymentMethodQuery = usePreparePaymentMethodQuery;
exports.useReleaseReservationBuyNowLotMutation = useReleaseReservationBuyNowLotMutation;
exports.useReserveBuyNowLotMutation = useReserveBuyNowLotMutation;
//# sourceMappingURL=graphqlGenerated.js.map
