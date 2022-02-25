'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var corre = require('@swyg/corre');
var React = require('react');
var config = require('../config/config.js');
var errors_constants = require('../domain/errors/errors.constants.js');
var graphqlGenerated = require('../queries/graphqlGenerated.js');
var formatUtils = require('../utils/formatUtils.js');

function useCreateInvoiceAndReservation({ orgID, checkoutItems, debug = false, }) {
    const [invoiceAndReservationState, setInvoiceAndReservationState] = React.useState({});
    const setError = React.useCallback((error) => {
        setInvoiceAndReservationState({
            error,
        });
    }, []);
    const countdownStartRef = React.useRef(null);
    const countdownElementRef = React.useRef(null);
    corre.useThrottledRequestAnimationFrame(() => {
        const countdownStart = countdownStartRef.current;
        const countdownElement = countdownElementRef.current;
        if (countdownStart === null || countdownElement === null)
            return;
        const formattedTimeLeft = formatUtils.formatTimeLeft(countdownStart, config.RESERVATION_COUNTDOWN_FROM_MS);
        if (formattedTimeLeft === "00:00") {
            countdownStartRef.current = null;
            setError(errors_constants.ERROR_INVOICE_TIMEOUT());
            return;
        }
        countdownElement.textContent = formattedTimeLeft;
    }, countdownStartRef.current === null ? null : config.RESERVATION_COUNTDOWN_REFRESH_RATE_MS);
    const [createAuctionInvoice] = graphqlGenerated.useCreateAuctionInvoiceMutation();
    const [createBuyNowInvoice] = graphqlGenerated.useCreateBuyNowInvoiceMutation();
    const createInvoiceAndReservation = React.useCallback(() => tslib_es6.__awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        // TODO: Quick fix. The UI can currently display multiple items with multiple units each, but will only purchase the
        // selected amount (can be multiple units) of the first item:
        const firstCheckoutItem = checkoutItems[0];
        const { lotID, lotType, units, } = firstCheckoutItem || {};
        if (debug) {
            console.log(firstCheckoutItem
                ? `\n🎫 Making reservation & creating invoice for ${units} × ${lotType} lot${units > 1 ? "s" : ""} ${lotID} (orgID = ${orgID})...\n`
                : `\n🎫 Aborting reservation & creating invoice for unknown lot (orgID = ${orgID})...\n`);
        }
        if (!firstCheckoutItem) {
            setError(errors_constants.ERROR_PURCHASE_NO_ITEMS());
            return;
        }
        if (!units) {
            setError(errors_constants.ERROR_PURCHASE_NO_UNITS());
            return;
        }
        if (!lotID || !lotType) {
            setError(errors_constants.ERROR_PURCHASE_LOADING_ITEMS());
            return;
        }
        let invoiceID = "";
        let mutationError = undefined;
        if (lotType === "buyNow") {
            if (debug) {
                console.log("  🧾 createBuyNowInvoice", {
                    units,
                    lotID,
                });
            }
            const createBuyNowInvoiceResult = yield createBuyNowInvoice({
                variables: {
                    input: {
                        itemCount: units,
                        marketplaceBuyNowLotID: lotID,
                    },
                },
            }).catch((error) => {
                mutationError = error;
                if (debug)
                    console.log("    🔴 createBuyNowInvoice error", error);
            });
            if (createBuyNowInvoiceResult && !createBuyNowInvoiceResult.errors) {
                if (debug)
                    console.log("    🟢 createBuyNowInvoice result", createBuyNowInvoiceResult);
                invoiceID = (_c = (_b = (_a = createBuyNowInvoiceResult.data) === null || _a === void 0 ? void 0 : _a.purchaseMarketplaceBuyNowLot) === null || _b === void 0 ? void 0 : _b.invoice) === null || _c === void 0 ? void 0 : _c.invoiceID;
            }
        }
        else if (lotType === "auction" && process.env.NODE_ENV === "development") {
            if (debug) {
                console.log("  🧾 createAuctionInvoice", {
                    orgID,
                    lotID,
                });
            }
            const createAuctionInvoiceResult = yield createAuctionInvoice({
                variables: {
                    orgID,
                    lotID,
                },
            }).catch((error) => {
                mutationError = error;
                if (debug)
                    console.log("    🔴 createAuctionInvoice error", error);
            });
            if (createAuctionInvoiceResult && !createAuctionInvoiceResult.errors) {
                if (debug)
                    console.log("    🟢 createAuctionInvoice result", createAuctionInvoiceResult);
                invoiceID = (_e = (_d = createAuctionInvoiceResult.data) === null || _d === void 0 ? void 0 : _d.createAuctionLotInvoice) === null || _e === void 0 ? void 0 : _e.invoiceID;
            }
        }
        if (!invoiceID) {
            setError(errors_constants.ERROR_PURCHASE_CREATING_INVOICE(mutationError));
            return;
        }
        countdownStartRef.current = Date.now();
        setInvoiceAndReservationState({ invoiceID });
        // TODO: Error handling and automatic retry:
    }), [
        orgID,
        checkoutItems,
        setError,
        debug,
        createAuctionInvoice,
        createBuyNowInvoice,
    ]);
    return {
        invoiceAndReservationState,
        createInvoiceAndReservation,
        countdownElementRef,
    };
}

exports.useCreateInvoiceAndReservation = useCreateInvoiceAndReservation;
//# sourceMappingURL=useCreateInvoiceAndReservation.js.map
