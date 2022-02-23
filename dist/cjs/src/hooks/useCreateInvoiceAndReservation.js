'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var errors_constants = require('../domain/errors/errors.constants.js');
var graphqlGenerated = require('../queries/graphqlGenerated.js');

function useCreateInvoiceAndReservation({ orgID, checkoutItems, debug = false, }) {
    const [createInvoiceAndReservationState, setCreateInvoiceAndReservationState] = React.useState({});
    const setError = React.useCallback((error) => {
        setCreateInvoiceAndReservationState({
            error,
        });
    }, []);
    const [createAuctionInvoice] = graphqlGenerated.useCreateAuctionInvoiceMutation();
    const [createBuyNowInvoice] = graphqlGenerated.useCreateBuyNowInvoiceMutation();
    const createInvoiceAndReservation = React.useCallback(() => tslib_es6.__awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        // TODO: Quick fix. The UI can currently display multiple items with multiple units each, but will only purchase the
        // selected amount (can be multiple units) of the first item:
        const { lotID, lotType, units, } = checkoutItems[0];
        if (debug) {
            console.log(checkoutItems[0]
                ? `\n🎫 Making reservation & creating invoice for ${units} × ${lotType} lot${units > 1 ? "s" : ""} ${lotID} (orgID = ${orgID})...\n`
                : `\n🎫 Aborting reservation & creating invoice for unknown lot (orgID = ${orgID})...\n`);
        }
        if (checkoutItems.length === 0) {
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
        let mutationError;
        if (debug) {
            console.log("  🧾 createAuctionInvoice", {
                orgID,
                lotID,
            });
        }
        if (lotType === "buyNow") {
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
        setCreateInvoiceAndReservationState({ invoiceID });
        // TODO: Error handling and automatic retry:
    }), [
        orgID,
        checkoutItems,
        setError,
        debug,
        createAuctionInvoice,
        createBuyNowInvoice,
    ]);
    return [createInvoiceAndReservationState, createInvoiceAndReservation];
}

exports.useCreateInvoiceAndReservation = useCreateInvoiceAndReservation;
//# sourceMappingURL=useCreateInvoiceAndReservation.js.map
