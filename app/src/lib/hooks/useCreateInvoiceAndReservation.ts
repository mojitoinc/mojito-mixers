import { ApolloError } from "@apollo/client";
import { useThrottledRequestAnimationFrame } from "@swyg/corre";
import { useCallback, useRef, useState } from "react";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { RESERVATION_COUNTDOWN_FROM_MS, RESERVATION_COUNTDOWN_REFRESH_RATE_MS } from "../config/config";
import { ERROR_INVOICE_TIMEOUT, ERROR_PURCHASE_CREATING_INVOICE, ERROR_PURCHASE_LOADING_ITEMS, ERROR_PURCHASE_NO_ITEMS, ERROR_PURCHASE_NO_UNITS } from "../domain/errors/errors.constants";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { useCreateAuctionInvoiceMutation, useCreateBuyNowInvoiceMutation } from "../queries/graphqlGenerated";
import { formatTimeLeft } from "../utils/formatUtils";

export interface UseCreateInvoiceAndReservationOptions {
  orgID: string;
  checkoutItems: CheckoutItem[];
  debug?: boolean;
}

export interface InvoiceAndReservationState {
  invoiceID?: string;
  error?: string | CheckoutModalError;
}

export interface UseCreateInvoiceAndReservationReturn {
  invoiceAndReservationState: InvoiceAndReservationState;
  createInvoiceAndReservation: () => Promise<void>;
  countdownElementRef: React.RefObject<HTMLSpanElement>;
}

export function useCreateInvoiceAndReservation({
  orgID,
  checkoutItems,
  debug = false,
}: UseCreateInvoiceAndReservationOptions): UseCreateInvoiceAndReservationReturn {
  const [invoiceAndReservationState, setInvoiceAndReservationState] = useState<InvoiceAndReservationState>({ });

  const setError = useCallback((error: string | CheckoutModalError) => {
    setInvoiceAndReservationState({
      error,
    });
  }, []);

  const countdownStartRef = useRef<number | null>(null);
  const countdownElementRef = useRef<HTMLSpanElement | null>(null);

  useThrottledRequestAnimationFrame(() => {
    const countdownStart = countdownStartRef.current;
    const countdownElement = countdownElementRef.current;

    if (countdownStart === null || countdownElement === null) return;

    const formattedTimeLeft = formatTimeLeft(countdownStart, RESERVATION_COUNTDOWN_FROM_MS);

    if (formattedTimeLeft === "00:00") {
      countdownStartRef.current = null;

      setError(ERROR_INVOICE_TIMEOUT());

      return;
    }

    countdownElement.textContent = formattedTimeLeft;
  }, countdownStartRef.current === null ? null : RESERVATION_COUNTDOWN_REFRESH_RATE_MS);

  const [createAuctionInvoice] = useCreateAuctionInvoiceMutation();
  const [createBuyNowInvoice] = useCreateBuyNowInvoiceMutation();

  const createInvoiceAndReservation = useCallback(async () => {
    // TODO: Quick fix. The UI can currently display multiple items with multiple units each, but will only purchase the
    // selected amount (can be multiple units) of the first item:
    const firstCheckoutItem = checkoutItems[0];

    const {
      lotID,
      lotType,
      units,
    } = firstCheckoutItem || {};

    if (debug) {
      console.log(firstCheckoutItem
        ? `\n🎫 Making reservation & creating invoice for ${ units } × ${ lotType } lot${ units > 1 ? "s" : "" } ${ lotID } (orgID = ${ orgID })...\n`
        : `\n🎫 Aborting reservation & creating invoice for unknown lot (orgID = ${ orgID })...\n`
      );
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
    let mutationError: ApolloError | Error | undefined = undefined;

    if (lotType === "buyNow") {
      if (debug) {
        console.log("  🧾 createBuyNowInvoice", {
          units,
          lotID,
        });
      }

      const createBuyNowInvoiceResult = await createBuyNowInvoice({
        variables: {
          input: {
            itemCount: units,
            marketplaceBuyNowLotID: lotID,
          },
        },
      }).catch((error: ApolloError | Error) => {
        mutationError = error;

        if (debug) console.log("    🔴 createBuyNowInvoice error", error);
      });

      if (createBuyNowInvoiceResult && !createBuyNowInvoiceResult.errors) {
        if (debug) console.log("    🟢 createBuyNowInvoice result", createBuyNowInvoiceResult);

        invoiceID = createBuyNowInvoiceResult.data?.purchaseMarketplaceBuyNowLot?.invoice?.invoiceID;
      }
    } else if (lotType === "auction" && process.env.NODE_ENV === "development") {
      if (debug) {
        console.log("  🧾 createAuctionInvoice", {
          orgID,
          lotID,
        });
      }

      const createAuctionInvoiceResult = await createAuctionInvoice({
        variables: {
          orgID,
          lotID,
        },
      }).catch((error: ApolloError | Error) => {
        mutationError = error;

        if (debug) console.log("    🔴 createAuctionInvoice error", error);
      });

      if (createAuctionInvoiceResult && !createAuctionInvoiceResult.errors) {
        if (debug) console.log("    🟢 createAuctionInvoice result", createAuctionInvoiceResult);

        invoiceID = createAuctionInvoiceResult.data?.createAuctionLotInvoice?.invoiceID;
      }
    }

    if (!invoiceID) {
      setError(ERROR_PURCHASE_CREATING_INVOICE(mutationError));

      return;
    }

    countdownStartRef.current = Date.now();

    setInvoiceAndReservationState({ invoiceID });

    // TODO: Error handling and automatic retry:
  }, [
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
