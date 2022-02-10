'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var circle_utils = require('../domain/circle/circle.utils.js');
var graphqlGenerated = require('../queries/graphqlGenerated.js');
var promiseUtils = require('../utils/promiseUtils.js');
var useCreatePaymentMethod = require('./useCreatePaymentMethod.js');

const CIRCLE_MAX_EXPECTED_PAYMENT_CREATION_PROCESSING_TIME = 5000;
function useFullPayment({ orgID, invoiceID: existingInvoiceID = "", lotID, lotType, savedPaymentMethods, selectedPaymentMethod, debug = false, }) {
    const [paymentState, setPaymentState] = React.useState({
        paymentStatus: "processing",
        paymentReferenceNumber: "",
    });
    const { billingInfo: selectedBillingInfo, paymentInfo: selectedPaymentInfo, } = selectedPaymentMethod;
    const [createPaymentMethod] = useCreatePaymentMethod.useCreatePaymentMethod();
    const [createAuctionInvoice] = graphqlGenerated.useCreateAuctionInvoiceMutation();
    const [createBuyNowInvoice] = graphqlGenerated.useCreateBuyNowInvoiceMutation();
    const [makePayment] = graphqlGenerated.useCreatePaymentMutation();
    const fullPayment = React.useCallback(() => tslib_es6.__awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (debug)
            console.log(`\n💵 Making payment for orgID = ${orgID} + lotID = ${lotID} (${lotType})\n`);
        setPaymentState({
            paymentStatus: "processing",
            paymentReferenceNumber: "",
        });
        let paymentMethodID = "";
        let invoiceID = existingInvoiceID;
        let circlePaymentID = "";
        let errorMessage = "";
        let paymentMethodCreatedAt = 0;
        if (typeof selectedPaymentInfo === "string") {
            // If selectedPaymentInfo is a payment method ID, that's all we need, no need to create a new payment method:
            paymentMethodID = selectedPaymentInfo;
        }
        else {
            let selectedBillingInfoData;
            if (typeof selectedBillingInfo === "string") {
                // If selectedPaymentInfo is an object and selectedBillingInfo is an addressID, we need to find the matching
                // data in savedPaymentMethods:
                const selectedPaymentMethod = savedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo);
                if (!selectedPaymentMethod) {
                    setPaymentState({
                        paymentStatus: "error",
                        paymentReferenceNumber: "",
                        paymentError: errorMessage || "Could not find the selected payment method.",
                    });
                    return;
                }
                selectedBillingInfoData = circle_utils.savedPaymentMethodToBillingInfo(selectedPaymentMethod);
            }
            else {
                // If both selectedPaymentInfo and selectedBillingInfo are objects, we just create a new payment method with them:
                selectedBillingInfoData = selectedBillingInfo;
            }
            if (debug) {
                console.log("  💳 createPaymentMethod", {
                    orgID,
                    selectedBillingInfoData,
                    selectedPaymentInfo,
                });
            }
            const createPaymentMethodResult = yield createPaymentMethod(orgID, selectedBillingInfoData, selectedPaymentInfo).catch((error) => {
                const parsedCircleError = circle_utils.parseCircleError(error);
                if (debug)
                    console.log("    🔴 createPaymentMethod error", parsedCircleError, error);
                if (typeof parsedCircleError === "string")
                    errorMessage = parsedCircleError;
            });
            paymentMethodCreatedAt = Date.now();
            if (createPaymentMethodResult && !createPaymentMethodResult.errors) {
                if (debug)
                    console.log("    🟢 createPaymentMethod result", createPaymentMethodResult);
                paymentMethodID = ((_b = (_a = createPaymentMethodResult.data) === null || _a === void 0 ? void 0 : _a.createPaymentMethod) === null || _b === void 0 ? void 0 : _b.id) || "";
            }
        }
        if (!paymentMethodID) {
            setPaymentState({
                paymentStatus: "error",
                paymentReferenceNumber: "",
                paymentError: errorMessage || "Error creating payment method.",
            });
            return;
        }
        if (debug) {
            console.log("  🧾 createAuctionInvoice", {
                orgID,
                lotID,
            });
        }
        /*
        if (lotType === "auction" && !invoiceID) {
          setPaymentState({
            paymentStatus: "error",
            paymentReferenceNumber: "",
            paymentError: "Missing auction invoice.",
          });
    
          return;
        }
        */
        if (!invoiceID) {
            if (lotType === "auction") {
                const createAuctionInvoiceResult = yield createAuctionInvoice({
                    variables: {
                        orgID,
                        lotID,
                    },
                }).catch((error) => {
                    if (debug)
                        console.log("    🔴 createAuctionInvoice error", error);
                });
                if (createAuctionInvoiceResult && !createAuctionInvoiceResult.errors) {
                    if (debug)
                        console.log("    🟢 createAuctionInvoice result", createAuctionInvoiceResult);
                    invoiceID = (_d = (_c = createAuctionInvoiceResult.data) === null || _c === void 0 ? void 0 : _c.createAuctionLotInvoice) === null || _d === void 0 ? void 0 : _d.invoiceID;
                }
            }
            else if (lotType === "buyNow") {
                const createBuyNowInvoiceResult = yield createBuyNowInvoice({
                    variables: {
                        input: {
                            itemCount: 1,
                            marketplaceBuyNowLotID: lotID,
                        },
                    },
                }).catch((error) => {
                    if (debug)
                        console.log("    🔴 createBuyNowInvoice error", error);
                });
                if (createBuyNowInvoiceResult && !createBuyNowInvoiceResult.errors) {
                    if (debug)
                        console.log("    🟢 createBuyNowInvoice result", createBuyNowInvoiceResult);
                    invoiceID = (_g = (_f = (_e = createBuyNowInvoiceResult.data) === null || _e === void 0 ? void 0 : _e.purchaseMarketplaceBuyNowLot) === null || _f === void 0 ? void 0 : _f.invoice) === null || _g === void 0 ? void 0 : _g.invoiceID;
                }
            }
        }
        if (!invoiceID) {
            setPaymentState({
                paymentStatus: "error",
                paymentReferenceNumber: "",
                paymentError: errorMessage || "Error creating invoice",
            });
            return;
        }
        if (debug) {
            console.log("  💸 makePayment", {
                paymentMethodID,
                invoiceID,
            });
        }
        const paymentMethodStatusWaitTime = Math.max(CIRCLE_MAX_EXPECTED_PAYMENT_CREATION_PROCESSING_TIME - (Date.now() - paymentMethodCreatedAt), 0);
        if (paymentMethodStatusWaitTime)
            yield promiseUtils.wait(paymentMethodStatusWaitTime);
        const makePaymentResult = yield makePayment({
            variables: {
                paymentMethodID,
                invoiceID,
            },
        }).catch((error) => {
            // TODO: Cancel invoice?
            if (debug)
                console.log("    🔴 makePayment error", error);
        });
        if (makePaymentResult && !makePaymentResult.errors) {
            if (debug)
                console.log("    🟢 makePayment result", makePaymentResult);
            circlePaymentID = ((_j = (_h = makePaymentResult.data) === null || _h === void 0 ? void 0 : _h.createPayment) === null || _j === void 0 ? void 0 : _j.circlePaymentID) || "";
        }
        if (!circlePaymentID) {
            setPaymentState({
                paymentStatus: "error",
                paymentReferenceNumber: "",
                paymentError: errorMessage || "Error while trying to make the payment.",
            });
            return;
        }
        // TODO: Error handling and automatic retry:
        // TODO: After this, refetch payment methods... Maybe after creation?
        setPaymentState({
            paymentStatus: "processed",
            paymentReferenceNumber: circlePaymentID,
        });
    }), [createAuctionInvoice, createBuyNowInvoice, createPaymentMethod, debug, existingInvoiceID, lotID, lotType, makePayment, orgID, savedPaymentMethods, selectedBillingInfo, selectedPaymentInfo]);
    return [paymentState, fullPayment];
}

exports.useFullPayment = useFullPayment;
//# sourceMappingURL=useFullPayment.js.map
