'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var circle_utils = require('../domain/circle/circle.utils.js');
var graphqlGenerated = require('../queries/graphqlGenerated.js');
var promiseUtils = require('../utils/promiseUtils.js');
var useCreatePaymentMethod = require('./useCreatePaymentMethod.js');

var CIRCLE_MAX_EXPECTED_PAYMENT_CREATION_PROCESSING_TIME = 5000;
function useFullPayment(_a) {
  var orgID = _a.orgID,
      _b = _a.invoiceID,
      existingInvoiceID = _b === void 0 ? "" : _b,
      lotID = _a.lotID,
      lotType = _a.lotType,
      savedPaymentMethods = _a.savedPaymentMethods,
      selectedPaymentMethod = _a.selectedPaymentMethod,
      _c = _a.debug,
      debug = _c === void 0 ? false : _c;

  var _d = React.useState({
    paymentStatus: "processing",
    paymentReferenceNumber: ""
  }),
      paymentState = _d[0],
      setPaymentState = _d[1];

  var selectedBillingInfo = selectedPaymentMethod.billingInfo,
      selectedPaymentInfo = selectedPaymentMethod.paymentInfo;
  var createPaymentMethod = useCreatePaymentMethod.useCreatePaymentMethod()[0];
  var createAuctionInvoice = graphqlGenerated.useCreateAuctionInvoiceMutation()[0];
  var createBuyNowInvoice = graphqlGenerated.useCreateBuyNowInvoiceMutation()[0]; // TODO: There's another mutation, PurchaseBuyNow, to create invoice and pay that also makes a reservation.

  var makePayment = graphqlGenerated.useCreatePaymentMutation()[0];

  function fullPayment() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;

    return tslib_es6.__awaiter(this, void 0, void 0, function () {
      var paymentMethodID, invoiceID, circlePaymentID, errorMessage, paymentMethodCreatedAt, selectedBillingInfoData, selectedPaymentMethod_1, createPaymentMethodResult, createAuctionInvoiceResult, createBuyNowInvoiceResult, paymentMethodStatusWaitTime, makePaymentResult;
      return tslib_es6.__generator(this, function (_k) {
        switch (_k.label) {
          case 0:
            if (debug) console.log("\n\uD83D\uDCB5 Making payment for orgID = ".concat(orgID, " + lotID = ").concat(lotID, " (").concat(lotType, ")\n"));
            setPaymentState({
              paymentStatus: "processing",
              paymentReferenceNumber: ""
            });
            paymentMethodID = "";
            invoiceID = existingInvoiceID;
            circlePaymentID = "";
            errorMessage = "";
            paymentMethodCreatedAt = 0;
            if (!(typeof selectedPaymentInfo === "string")) return [3
            /*break*/
            , 1]; // If selectedPaymentInfo is a payment method ID, that's all we need, no need to create a new payment method:

            paymentMethodID = selectedPaymentInfo;
            return [3
            /*break*/
            , 3];

          case 1:
            selectedBillingInfoData = void 0;

            if (typeof selectedBillingInfo === "string") {
              selectedPaymentMethod_1 = savedPaymentMethods.find(function (_a) {
                var addressId = _a.addressId;
                return addressId === selectedBillingInfo;
              });

              if (!selectedPaymentMethod_1) {
                setPaymentState({
                  paymentStatus: "error",
                  paymentReferenceNumber: "",
                  paymentError: errorMessage || "Could not find the selected payment method."
                });
                return [2
                /*return*/
                ];
              }

              selectedBillingInfoData = circle_utils.savedPaymentMethodToBillingInfo(selectedPaymentMethod_1);
            } else {
              // If both selectedPaymentInfo and selectedBillingInfo are objects, we just create a new payment method with them:
              selectedBillingInfoData = selectedBillingInfo;
            }

            if (debug) {
              console.log("  💳 createPaymentMethod", {
                orgID: orgID,
                selectedBillingInfoData: selectedBillingInfoData,
                selectedPaymentInfo: selectedPaymentInfo
              });
            }

            return [4
            /*yield*/
            , createPaymentMethod(orgID, selectedBillingInfoData, selectedPaymentInfo)["catch"](function (error) {
              var parsedCircleError = circle_utils.parseCircleError(error);
              if (debug) console.log("    🔴 createPaymentMethod error", parsedCircleError, error);
              if (typeof parsedCircleError === "string") errorMessage = parsedCircleError;
            })];

          case 2:
            createPaymentMethodResult = _k.sent();
            paymentMethodCreatedAt = Date.now();

            if (createPaymentMethodResult && !createPaymentMethodResult.errors) {
              if (debug) console.log("    🟢 createPaymentMethod result", createPaymentMethodResult);
              paymentMethodID = ((_b = (_a = createPaymentMethodResult.data) === null || _a === void 0 ? void 0 : _a.createPaymentMethod) === null || _b === void 0 ? void 0 : _b.id) || "";
            }

            _k.label = 3;

          case 3:
            if (!paymentMethodID) {
              setPaymentState({
                paymentStatus: "error",
                paymentReferenceNumber: "",
                paymentError: errorMessage || "Error creating payment method."
              });
              return [2
              /*return*/
              ];
            }

            if (debug) {
              console.log("  🧾 createAuctionInvoice", {
                orgID: orgID,
                lotID: lotID
              });
            }

            if (!!invoiceID) return [3
            /*break*/
            , 7];
            if (!(lotType === "auction")) return [3
            /*break*/
            , 5];
            return [4
            /*yield*/
            , createAuctionInvoice({
              variables: {
                orgID: orgID,
                lotID: lotID
              }
            })["catch"](function (error) {
              if (debug) console.log("    🔴 createAuctionInvoice error", error);
            })];

          case 4:
            createAuctionInvoiceResult = _k.sent();

            if (createAuctionInvoiceResult && !createAuctionInvoiceResult.errors) {
              if (debug) console.log("    🟢 createAuctionInvoice result", createAuctionInvoiceResult);
              invoiceID = (_d = (_c = createAuctionInvoiceResult.data) === null || _c === void 0 ? void 0 : _c.createAuctionLotInvoice) === null || _d === void 0 ? void 0 : _d.invoiceID;
            }

            return [3
            /*break*/
            , 7];

          case 5:
            if (!(lotType === "buyNow")) return [3
            /*break*/
            , 7];
            return [4
            /*yield*/
            , createBuyNowInvoice({
              variables: {
                input: {
                  itemCount: 1,
                  marketplaceBuyNowLotID: lotID
                }
              }
            })["catch"](function (error) {
              if (debug) console.log("    🔴 createBuyNowInvoice error", error);
            })];

          case 6:
            createBuyNowInvoiceResult = _k.sent();

            if (createBuyNowInvoiceResult && !createBuyNowInvoiceResult.errors) {
              if (debug) console.log("    🟢 createBuyNowInvoice result", createBuyNowInvoiceResult);
              invoiceID = (_g = (_f = (_e = createBuyNowInvoiceResult.data) === null || _e === void 0 ? void 0 : _e.purchaseMarketplaceBuyNowLot) === null || _f === void 0 ? void 0 : _f.invoice) === null || _g === void 0 ? void 0 : _g.invoiceID;
            }

            _k.label = 7;

          case 7:
            if (!invoiceID) {
              setPaymentState({
                paymentStatus: "error",
                paymentReferenceNumber: "",
                paymentError: errorMessage || "Error creating invoice"
              });
              return [2
              /*return*/
              ];
            }

            if (debug) {
              console.log("  💸 makePayment", {
                paymentMethodID: paymentMethodID,
                invoiceID: invoiceID
              });
            }

            paymentMethodStatusWaitTime = Math.max(CIRCLE_MAX_EXPECTED_PAYMENT_CREATION_PROCESSING_TIME - (Date.now() - paymentMethodCreatedAt), 0);
            if (!paymentMethodStatusWaitTime) return [3
            /*break*/
            , 9];
            return [4
            /*yield*/
            , promiseUtils.wait(paymentMethodStatusWaitTime)];

          case 8:
            _k.sent();

            _k.label = 9;

          case 9:
            return [4
            /*yield*/
            , makePayment({
              variables: {
                paymentMethodID: paymentMethodID,
                invoiceID: invoiceID
              }
            })["catch"](function (error) {
              // TODO: Cancel invoice?
              if (debug) console.log("    🔴 makePayment error", error);
            })];

          case 10:
            makePaymentResult = _k.sent();

            if (makePaymentResult && !makePaymentResult.errors) {
              if (debug) console.log("    🟢 makePayment result", makePaymentResult);
              circlePaymentID = ((_j = (_h = makePaymentResult.data) === null || _h === void 0 ? void 0 : _h.createPayment) === null || _j === void 0 ? void 0 : _j.circlePaymentID) || "";
            }

            if (!circlePaymentID) {
              setPaymentState({
                paymentStatus: "error",
                paymentReferenceNumber: "",
                paymentError: errorMessage || "Error while trying to make the payment."
              });
              return [2
              /*return*/
              ];
            } // TODO: Error handling and automatic retry:
            // TODO: After this, refetch payment methods... Maybe after creation?


            setPaymentState({
              paymentStatus: "processed",
              paymentReferenceNumber: circlePaymentID
            });
            return [2
            /*return*/
            ];
        }
      });
    });
  }

  var calledRef = React.useRef(false);

  if (!calledRef.current) {
    calledRef.current = true;
    fullPayment();
  }

  return paymentState;
}

exports.useFullPayment = useFullPayment;
//# sourceMappingURL=useFullPayment.js.map
