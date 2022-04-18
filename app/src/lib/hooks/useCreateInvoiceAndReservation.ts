import { ApolloError } from "@apollo/client";
import { useCallback, useState } from "react";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { ERROR_PURCHASE_CREATING_INVOICE, ERROR_PURCHASE_LOADING_ITEMS, ERROR_PURCHASE_NO_ITEMS, ERROR_PURCHASE_NO_UNITS } from "../domain/errors/errors.constants";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { useCreateAuctionInvoiceMutation, useReserveBuyNowLotMutation } from "../queries/graphqlGenerated";

export interface UseCreateInvoiceAndReservationOptions {
  orgID: string;
  checkoutItems: CheckoutItem[];
  debug?: boolean;
}

export interface InvoiceAndReservationState {
  invoiceID?: string;
  invoiceCountdownStart?: number;
  error?: string | CheckoutModalError;
}

export interface UseCreateInvoiceAndReservationReturn {
  invoiceAndReservationState: InvoiceAndReservationState;
  createInvoiceAndReservation: () => Promise<void>;
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

  const [createAuctionInvoice] = useCreateAuctionInvoiceMutation();
  const [reserveBuyNowLot] = useReserveBuyNowLotMutation();

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
        ? `\n🎫 Making reservation / creating invoice for ${ units } × ${ lotType } lot${ units > 1 ? "s" : "" } ${ lotID } (orgID = ${ orgID })...\n`
        : `\n🎫 Aborting reservation / creating invoice for unknown lot (orgID = ${ orgID })...\n`
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
        console.log("  🧾 reserveBuyNowLot", {
          units,
          lotID,
        });
      }

      const reserveBuyNowLotResult = await reserveBuyNowLot({
        variables: {
          input: {
            itemCount: units,
            marketplaceBuyNowLotID: lotID,
          },
        },
      }).catch((error: ApolloError | Error) => {
        mutationError = error;

        if (debug) console.log("    🔴 reserveBuyNowLot error", error);
      });

      if (reserveBuyNowLotResult && !reserveBuyNowLotResult.errors) {
        if (debug) console.log("    🟢 reserveBuyNowLot result", reserveBuyNowLotResult);

        invoiceID = reserveBuyNowLotResult.data?.reserveMarketplaceBuyNowLot?.invoice?.invoiceID;
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

    setInvoiceAndReservationState({ invoiceID, invoiceCountdownStart: Date.now() });

    // TODO: Error handling and automatic retry:
  }, [
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
  };
}
