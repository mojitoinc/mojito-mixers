'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
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

var defaultOptions = {};
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
  ContractType["GenerativeContract"] = "GenerativeContract";
  ContractType["ZoraContract"] = "ZoraContract";
})(exports.ContractType || (exports.ContractType = {}));

exports.InvoiceStatus = void 0;

(function (InvoiceStatus) {
  InvoiceStatus["Canceled"] = "Canceled";
  InvoiceStatus["Draft"] = "Draft";
  InvoiceStatus["Paid"] = "Paid";
  InvoiceStatus["Pending"] = "Pending";
})(exports.InvoiceStatus || (exports.InvoiceStatus = {}));

exports.KycStatus = void 0;

(function (KycStatus) {
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

var MeDocument = Apollo.gql(templateObject_1 || (templateObject_1 = tslib_es6.__makeTemplateObject(["\n    query Me {\n  me {\n    id\n    user {\n      id\n      username\n      name\n      email\n    }\n    userOrgs {\n      organization {\n        id\n        name\n      }\n    }\n  }\n}\n    "], ["\n    query Me {\n  me {\n    id\n    user {\n      id\n      username\n      name\n      email\n    }\n    userOrgs {\n      organization {\n        id\n        name\n      }\n    }\n  }\n}\n    "])));
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
  var options = tslib_es6.__assign(tslib_es6.__assign({}, defaultOptions), baseOptions);

  return Apollo__namespace.useQuery(MeDocument, options);
}
var CreatePaymentDocument = Apollo.gql(templateObject_2 || (templateObject_2 = tslib_es6.__makeTemplateObject(["\n    mutation CreatePayment($paymentMethodID: UUID1!, $invoiceID: UUID1!) {\n  createPayment(paymentMethodID: $paymentMethodID, invoiceID: $invoiceID) {\n    id\n    invoiceID\n    circlePaymentID\n    status\n    userID\n  }\n}\n    "], ["\n    mutation CreatePayment($paymentMethodID: UUID1!, $invoiceID: UUID1!) {\n  createPayment(paymentMethodID: $paymentMethodID, invoiceID: $invoiceID) {\n    id\n    invoiceID\n    circlePaymentID\n    status\n    userID\n  }\n}\n    "])));
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
  var options = tslib_es6.__assign(tslib_es6.__assign({}, defaultOptions), baseOptions);

  return Apollo__namespace.useMutation(CreatePaymentDocument, options);
}
var CreateAuctionInvoiceDocument = Apollo.gql(templateObject_3 || (templateObject_3 = tslib_es6.__makeTemplateObject(["\n    mutation CreateAuctionInvoice($orgID: UUID1!, $lotID: UUID1!) {\n  createAuctionLotInvoice(orgID: $orgID, lotID: $lotID) {\n    invoiceID\n    status\n    items {\n      units\n      unitPrice\n      taxes\n      totalPrice\n    }\n  }\n}\n    "], ["\n    mutation CreateAuctionInvoice($orgID: UUID1!, $lotID: UUID1!) {\n  createAuctionLotInvoice(orgID: $orgID, lotID: $lotID) {\n    invoiceID\n    status\n    items {\n      units\n      unitPrice\n      taxes\n      totalPrice\n    }\n  }\n}\n    "])));
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
  var options = tslib_es6.__assign(tslib_es6.__assign({}, defaultOptions), baseOptions);

  return Apollo__namespace.useMutation(CreateAuctionInvoiceDocument, options);
}
var CreateBuyNowInvoiceDocument = Apollo.gql(templateObject_4 || (templateObject_4 = tslib_es6.__makeTemplateObject(["\n    mutation CreateBuyNowInvoice($input: PurchaseMarketplaceBuyNowLotInput!) {\n  purchaseMarketplaceBuyNowLot(input: $input) {\n    invoice {\n      invoiceID\n      status\n      items {\n        units\n        unitPrice\n        taxes\n        totalPrice\n      }\n    }\n  }\n}\n    "], ["\n    mutation CreateBuyNowInvoice($input: PurchaseMarketplaceBuyNowLotInput!) {\n  purchaseMarketplaceBuyNowLot(input: $input) {\n    invoice {\n      invoiceID\n      status\n      items {\n        units\n        unitPrice\n        taxes\n        totalPrice\n      }\n    }\n  }\n}\n    "])));
/**
 * __useCreateBuyNowInvoiceMutation__
 *
 * To run a mutation, you first call `useCreateBuyNowInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBuyNowInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBuyNowInvoiceMutation, { data, loading, error }] = useCreateBuyNowInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */

function useCreateBuyNowInvoiceMutation(baseOptions) {
  var options = tslib_es6.__assign(tslib_es6.__assign({}, defaultOptions), baseOptions);

  return Apollo__namespace.useMutation(CreateBuyNowInvoiceDocument, options);
}
var PaymentKeyDocument = Apollo.gql(templateObject_5 || (templateObject_5 = tslib_es6.__makeTemplateObject(["\n    query PaymentKey {\n  getPaymentPublicKey {\n    keyID\n    publicKey\n  }\n}\n    "], ["\n    query PaymentKey {\n  getPaymentPublicKey {\n    keyID\n    publicKey\n  }\n}\n    "])));
function usePaymentKeyLazyQuery(baseOptions) {
  var options = tslib_es6.__assign(tslib_es6.__assign({}, defaultOptions), baseOptions);

  return Apollo__namespace.useLazyQuery(PaymentKeyDocument, options);
}
var GetPaymentMethodListDocument = Apollo.gql(templateObject_6 || (templateObject_6 = tslib_es6.__makeTemplateObject(["\n    query GetPaymentMethodList($orgID: UUID1!) {\n  getPaymentMethodList(orgID: $orgID) {\n    ... on ACHPaymentMethodOutput {\n      id\n      type\n      status\n      accountNumber\n      metadata {\n        email\n        phoneNumber\n      }\n      billingDetails {\n        name\n        city\n        country\n        address1\n        address2\n        district\n        postalCode\n      }\n      bankAddress {\n        bankName\n      }\n    }\n    ... on CreditCardPaymentMethodOutput {\n      id\n      type\n      status\n      network\n      last4Digit\n      metadata {\n        email\n        phoneNumber\n      }\n      billingDetails {\n        name\n        city\n        country\n        address1\n        address2\n        district\n        postalCode\n      }\n    }\n  }\n}\n    "], ["\n    query GetPaymentMethodList($orgID: UUID1!) {\n  getPaymentMethodList(orgID: $orgID) {\n    ... on ACHPaymentMethodOutput {\n      id\n      type\n      status\n      accountNumber\n      metadata {\n        email\n        phoneNumber\n      }\n      billingDetails {\n        name\n        city\n        country\n        address1\n        address2\n        district\n        postalCode\n      }\n      bankAddress {\n        bankName\n      }\n    }\n    ... on CreditCardPaymentMethodOutput {\n      id\n      type\n      status\n      network\n      last4Digit\n      metadata {\n        email\n        phoneNumber\n      }\n      billingDetails {\n        name\n        city\n        country\n        address1\n        address2\n        district\n        postalCode\n      }\n    }\n  }\n}\n    "])));
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
  var options = tslib_es6.__assign(tslib_es6.__assign({}, defaultOptions), baseOptions);

  return Apollo__namespace.useQuery(GetPaymentMethodListDocument, options);
}
var CreatePaymentMethodDocument = Apollo.gql(templateObject_7 || (templateObject_7 = tslib_es6.__makeTemplateObject(["\n    mutation CreatePaymentMethod($orgID: UUID1!, $input: PaymentMethodCreateInput!) {\n  createPaymentMethod(orgID: $orgID, input: $input) {\n    ... on ACHPaymentMethodOutput {\n      id\n    }\n    ... on CreditCardPaymentMethodOutput {\n      id\n    }\n    ... on WirePaymentMethodOutput {\n      id\n    }\n  }\n}\n    "], ["\n    mutation CreatePaymentMethod($orgID: UUID1!, $input: PaymentMethodCreateInput!) {\n  createPaymentMethod(orgID: $orgID, input: $input) {\n    ... on ACHPaymentMethodOutput {\n      id\n    }\n    ... on CreditCardPaymentMethodOutput {\n      id\n    }\n    ... on WirePaymentMethodOutput {\n      id\n    }\n  }\n}\n    "])));
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
  var options = tslib_es6.__assign(tslib_es6.__assign({}, defaultOptions), baseOptions);

  return Apollo__namespace.useMutation(CreatePaymentMethodDocument, options);
}
var DeletePaymentMethodDocument = Apollo.gql(templateObject_8 || (templateObject_8 = tslib_es6.__makeTemplateObject(["\n    mutation DeletePaymentMethod($paymentMethodID: UUID1!, $orgID: UUID1!) {\n  deletePaymentMethod(paymentMethodID: $paymentMethodID, orgID: $orgID)\n}\n    "], ["\n    mutation DeletePaymentMethod($paymentMethodID: UUID1!, $orgID: UUID1!) {\n  deletePaymentMethod(paymentMethodID: $paymentMethodID, orgID: $orgID)\n}\n    "])));
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
  var options = tslib_es6.__assign(tslib_es6.__assign({}, defaultOptions), baseOptions);

  return Apollo__namespace.useMutation(DeletePaymentMethodDocument, options);
}
var PreparePaymentMethodDocument = Apollo.gql(templateObject_9 || (templateObject_9 = tslib_es6.__makeTemplateObject(["\n    query PreparePaymentMethod {\n  preparePaymentMethod(paymentMethodType: ACH) {\n    ... on ACHPaymentMethodPrepareStatementOutput {\n      linkToken\n    }\n  }\n}\n    "], ["\n    query PreparePaymentMethod {\n  preparePaymentMethod(paymentMethodType: ACH) {\n    ... on ACHPaymentMethodPrepareStatementOutput {\n      linkToken\n    }\n  }\n}\n    "])));
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

function usePreparePaymentMethodQuery(baseOptions) {
  var options = tslib_es6.__assign(tslib_es6.__assign({}, defaultOptions), baseOptions);

  return Apollo__namespace.useQuery(PreparePaymentMethodDocument, options);
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;

exports.CreateAuctionInvoiceDocument = CreateAuctionInvoiceDocument;
exports.CreateBuyNowInvoiceDocument = CreateBuyNowInvoiceDocument;
exports.CreatePaymentDocument = CreatePaymentDocument;
exports.CreatePaymentMethodDocument = CreatePaymentMethodDocument;
exports.DeletePaymentMethodDocument = DeletePaymentMethodDocument;
exports.GetPaymentMethodListDocument = GetPaymentMethodListDocument;
exports.MeDocument = MeDocument;
exports.PaymentKeyDocument = PaymentKeyDocument;
exports.PreparePaymentMethodDocument = PreparePaymentMethodDocument;
exports.useCreateAuctionInvoiceMutation = useCreateAuctionInvoiceMutation;
exports.useCreateBuyNowInvoiceMutation = useCreateBuyNowInvoiceMutation;
exports.useCreatePaymentMethodMutation = useCreatePaymentMethodMutation;
exports.useCreatePaymentMutation = useCreatePaymentMutation;
exports.useDeletePaymentMethodMutation = useDeletePaymentMethodMutation;
exports.useGetPaymentMethodListQuery = useGetPaymentMethodListQuery;
exports.useMeQuery = useMeQuery;
exports.usePaymentKeyLazyQuery = usePaymentKeyLazyQuery;
exports.usePreparePaymentMethodQuery = usePreparePaymentMethodQuery;
//# sourceMappingURL=graphqlGenerated.js.map
