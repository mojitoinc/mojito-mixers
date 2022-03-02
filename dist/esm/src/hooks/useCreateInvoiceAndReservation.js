import { __awaiter } from '../../node_modules/tslib/tslib.es6.js';
import { useThrottledRequestAnimationFrame } from '@swyg/corre';
import { useState, useCallback, useRef } from 'react';
import { RESERVATION_COUNTDOWN_REFRESH_RATE_MS, RESERVATION_COUNTDOWN_FROM_MS } from '../config/config.js';
import { ERROR_INVOICE_TIMEOUT, ERROR_PURCHASE_NO_ITEMS, ERROR_PURCHASE_NO_UNITS, ERROR_PURCHASE_LOADING_ITEMS, ERROR_PURCHASE_CREATING_INVOICE } from '../domain/errors/errors.constants.js';
import { useCreateAuctionInvoiceMutation, useReserveBuyNowLotMutation } from '../queries/graphqlGenerated.js';
import { formatTimeLeft } from '../utils/formatUtils.js';

function useCreateInvoiceAndReservation({ orgID, checkoutItems, debug = false, }) {
    const [invoiceAndReservationState, setInvoiceAndReservationState] = useState({});
    const setError = useCallback((error) => {
        setInvoiceAndReservationState({
            error,
        });
    }, []);
    const countdownStartRef = useRef(null);
    const countdownElementRef = useRef(null);
    useThrottledRequestAnimationFrame(() => {
        const countdownStart = countdownStartRef.current;
        const countdownElement = countdownElementRef.current;
        if (countdownStart === null || countdownElement === null)
            return;
        const formattedTimeLeft = formatTimeLeft(countdownStart, RESERVATION_COUNTDOWN_FROM_MS);
        if (formattedTimeLeft === "00:00") {
            countdownStartRef.current = null;
            setError(ERROR_INVOICE_TIMEOUT());
            return;
        }
        countdownElement.textContent = formattedTimeLeft;
    }, countdownStartRef.current === null ? null : RESERVATION_COUNTDOWN_REFRESH_RATE_MS);
    const [createAuctionInvoice] = useCreateAuctionInvoiceMutation();
    const [reserveBuyNowLot] = useReserveBuyNowLotMutation();
    const createInvoiceAndReservation = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        // TODO: Quick fix. The UI can currently display multiple items with multiple units each, but will only purchase the
        // selected amount (can be multiple units) of the first item:
        const firstCheckoutItem = checkoutItems[0];
        const { lotID, lotType, units, } = firstCheckoutItem || {};
        if (debug) {
            console.log(firstCheckoutItem
                ? `\n🎫 Making reservation / creating invoice for ${units} × ${lotType} lot${units > 1 ? "s" : ""} ${lotID} (orgID = ${orgID})...\n`
                : `\n🎫 Aborting reservation / creating invoice for unknown lot (orgID = ${orgID})...\n`);
        }
        if (!firstCheckoutItem) {
            setError(ERROR_PURCHASE_NO_ITEMS());
            return;
        }
        if (!units) {
            setError(ERROR_PURCHASE_NO_UNITS());
            return;
        }
        if (!lotID || !lotType) {
            setError(ERROR_PURCHASE_LOADING_ITEMS());
            return;
        }
        let invoiceID = "";
        let mutationError = undefined;
        if (lotType === "buyNow") {
            if (debug) {
                console.log("  🧾 reserveBuyNowLot", {
                    units,
                    lotID,
                });
            }
            const reserveBuyNowLotResult = yield reserveBuyNowLot({
                variables: {
                    input: {
                        itemCount: units,
                        marketplaceBuyNowLotID: lotID,
                    },
                },
            }).catch((error) => {
                mutationError = error;
                if (debug)
                    console.log("    🔴 reserveBuyNowLot error", error);
            });
            if (reserveBuyNowLotResult && !reserveBuyNowLotResult.errors) {
                if (debug)
                    console.log("    🟢 reserveBuyNowLot result", reserveBuyNowLotResult);
                invoiceID = (_c = (_b = (_a = reserveBuyNowLotResult.data) === null || _a === void 0 ? void 0 : _a.reserveMarketplaceBuyNowLot) === null || _b === void 0 ? void 0 : _b.invoice) === null || _c === void 0 ? void 0 : _c.invoiceID;
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
            setError(ERROR_PURCHASE_CREATING_INVOICE(mutationError));
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
        reserveBuyNowLot,
    ]);
    return {
        invoiceAndReservationState,
        createInvoiceAndReservation,
        countdownElementRef,
    };
}

export { useCreateInvoiceAndReservation };
//# sourceMappingURL=useCreateInvoiceAndReservation.js.map
