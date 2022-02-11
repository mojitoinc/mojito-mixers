import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';

const defaultOptions = {};
var AuctionBidOrder;
(function (AuctionBidOrder) {
    AuctionBidOrder["Asc"] = "ASC";
    AuctionBidOrder["Desc"] = "DESC";
})(AuctionBidOrder || (AuctionBidOrder = {}));
var AuctionLotStatus;
(function (AuctionLotStatus) {
    AuctionLotStatus["Active"] = "Active";
    AuctionLotStatus["Completed"] = "Completed";
    AuctionLotStatus["Hidden"] = "Hidden";
    AuctionLotStatus["Preview"] = "Preview";
})(AuctionLotStatus || (AuctionLotStatus = {}));
var CollectionType;
(function (CollectionType) {
    CollectionType["Auction"] = "Auction";
    CollectionType["Tk2"] = "TK2";
})(CollectionType || (CollectionType = {}));
var ContractType;
(function (ContractType) {
    ContractType["Erc721Creator"] = "ERC721Creator";
    ContractType["Erc1155Creator"] = "ERC1155Creator";
    ContractType["GenerativeContract"] = "GenerativeContract";
    ContractType["ZoraContract"] = "ZoraContract";
})(ContractType || (ContractType = {}));
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["Canceled"] = "Canceled";
    InvoiceStatus["Draft"] = "Draft";
    InvoiceStatus["Paid"] = "Paid";
    InvoiceStatus["Pending"] = "Pending";
})(InvoiceStatus || (InvoiceStatus = {}));
var KycStatus;
(function (KycStatus) {
    KycStatus["Level1"] = "Level1";
    KycStatus["Level2"] = "Level2";
    KycStatus["None"] = "None";
    KycStatus["Pending"] = "Pending";
})(KycStatus || (KycStatus = {}));
var MarketCollectionStatus;
(function (MarketCollectionStatus) {
    MarketCollectionStatus["Active"] = "Active";
    MarketCollectionStatus["Archived"] = "Archived";
    MarketCollectionStatus["Inactive"] = "Inactive";
})(MarketCollectionStatus || (MarketCollectionStatus = {}));
var MarketplaceSaleType;
(function (MarketplaceSaleType) {
    MarketplaceSaleType["Auction"] = "Auction";
    MarketplaceSaleType["BuyNow"] = "BuyNow";
})(MarketplaceSaleType || (MarketplaceSaleType = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["ActionRequired"] = "action_required";
    PaymentStatus["Confirmed"] = "confirmed";
    PaymentStatus["Failed"] = "failed";
    PaymentStatus["Paid"] = "paid";
    PaymentStatus["Pending"] = "pending";
})(PaymentStatus || (PaymentStatus = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["Ach"] = "ACH";
    PaymentType["CreditCard"] = "CreditCard";
    PaymentType["Wire"] = "Wire";
})(PaymentType || (PaymentType = {}));
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["User"] = "user";
})(Role || (Role = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Completed"] = "Completed";
    TransactionStatus["Failed"] = "Failed";
    TransactionStatus["Pending"] = "Pending";
})(TransactionStatus || (TransactionStatus = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["DeployMultisig"] = "DeployMultisig";
    TransactionType["TransferToken"] = "TransferToken";
})(TransactionType || (TransactionType = {}));
var WalletParentType;
(function (WalletParentType) {
    WalletParentType["Organization"] = "organization";
    WalletParentType["User"] = "user";
})(WalletParentType || (WalletParentType = {}));
var WalletTxType;
(function (WalletTxType) {
    WalletTxType["MojitoHotWallet"] = "MojitoHotWallet";
    WalletTxType["Multisig"] = "Multisig";
})(WalletTxType || (WalletTxType = {}));
const MeDocument = gql `
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
    return Apollo.useQuery(MeDocument, options);
}
const CreatePaymentDocument = gql `
    mutation CreatePayment($paymentMethodID: UUID1!, $invoiceID: UUID1!) {
  createPayment(paymentMethodID: $paymentMethodID, invoiceID: $invoiceID) {
    id
    invoiceID
    circlePaymentID
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
    return Apollo.useMutation(CreatePaymentDocument, options);
}
const CreateAuctionInvoiceDocument = gql `
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
    return Apollo.useMutation(CreateAuctionInvoiceDocument, options);
}
const CreateBuyNowInvoiceDocument = gql `
    mutation CreateBuyNowInvoice($input: PurchaseMarketplaceBuyNowLotInput!) {
  purchaseMarketplaceBuyNowLot(input: $input) {
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
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateBuyNowInvoiceDocument, options);
}
const PaymentKeyDocument = gql `
    query PaymentKey {
  getPaymentPublicKey {
    keyID
    publicKey
  }
}
    `;
function usePaymentKeyLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(PaymentKeyDocument, options);
}
const GetPaymentMethodListDocument = gql `
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
    return Apollo.useQuery(GetPaymentMethodListDocument, options);
}
const CreatePaymentMethodDocument = gql `
    mutation CreatePaymentMethod($orgID: UUID1!, $input: PaymentMethodCreateInput!) {
  createPaymentMethod(orgID: $orgID, input: $input) {
    ... on ACHPaymentMethodOutput {
      id
    }
    ... on CreditCardPaymentMethodOutput {
      id
    }
    ... on WirePaymentMethodOutput {
      id
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
    return Apollo.useMutation(CreatePaymentMethodDocument, options);
}
const DeletePaymentMethodDocument = gql `
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
    return Apollo.useMutation(DeletePaymentMethodDocument, options);
}
const PreparePaymentMethodDocument = gql `
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
function usePreparePaymentMethodQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(PreparePaymentMethodDocument, options);
}

export { AuctionBidOrder, AuctionLotStatus, CollectionType, ContractType, CreateAuctionInvoiceDocument, CreateBuyNowInvoiceDocument, CreatePaymentDocument, CreatePaymentMethodDocument, DeletePaymentMethodDocument, GetPaymentMethodListDocument, InvoiceStatus, KycStatus, MarketCollectionStatus, MarketplaceSaleType, MeDocument, PaymentKeyDocument, PaymentStatus, PaymentType, PreparePaymentMethodDocument, Role, TransactionStatus, TransactionType, WalletParentType, WalletTxType, useCreateAuctionInvoiceMutation, useCreateBuyNowInvoiceMutation, useCreatePaymentMethodMutation, useCreatePaymentMutation, useDeletePaymentMethodMutation, useGetPaymentMethodListQuery, useMeQuery, usePaymentKeyLazyQuery, usePreparePaymentMethodQuery };
//# sourceMappingURL=graphqlGenerated.js.map
