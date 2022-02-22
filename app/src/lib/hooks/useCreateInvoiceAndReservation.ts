import { ApolloError } from "@apollo/client";
import { useCallback, useState } from "react";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { ERROR_PURCHASE_CREATING_INVOICE, ERROR_PURCHASE_LOADING_ITEMS, ERROR_PURCHASE_NO_ITEMS, ERROR_PURCHASE_NO_UNITS } from "../domain/errors/errors.constants";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { useCreateAuctionInvoiceMutation, useCreateBuyNowInvoiceMutation } from "../queries/graphqlGenerated";

export interface UseCreateInvoiceAndReservationOptions {
  orgID: string;
  checkoutItems: CheckoutItem[];
  debug?: boolean;
}

export interface UseCreateInvoiceAndReservationState {
  invoiceID?: string;
  error?: string | CheckoutModalError;
}

export function useCreateInvoiceAndReservation({
  orgID,
  checkoutItems,
  debug = false,
}: UseCreateInvoiceAndReservationOptions): [UseCreateInvoiceAndReservationState, () => Promise<void>] {
  const [createInvoiceAndReservationState, setCreateInvoiceAndReservationState] = useState<UseCreateInvoiceAndReservationState>({ });

  const setError = useCallback((error: string | CheckoutModalError) => {
    setCreateInvoiceAndReservationState({
      error,
    });
  }, []);

  const [createAuctionInvoice] = useCreateAuctionInvoiceMutation();
  const [createBuyNowInvoice] = useCreateBuyNowInvoiceMutation();

  const createInvoiceAndReservation = useCallback(async () => {

    // TODO: Quick fix. The UI can currently display multiple items with multiple units each, but will only purchase the
    // selected amount (can be multiple units) of the first item:
    const {
      lotID,
      lotType,
      units,
    } = checkoutItems[0];

    if (debug) {
      console.log(checkoutItems[0]
        ? `\n🎫 Making reservation & creating invoice for ${ units } × ${ lotType } lot${ units > 1 ? "s" : "" } ${ lotID } (orgID = ${ orgID })...\n`
        : `\n🎫 Aborting reservation & creating invoice for unknown lot (orgID = ${ orgID })...\n`
      );
    }

    if (checkoutItems.length === 0) {
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
    let mutationError: ApolloError | Error;

    if (debug) {
      console.log("  🧾 createAuctionInvoice", {
        orgID,
        lotID,
      });
    }

    if (lotType === "buyNow") {
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

    setCreateInvoiceAndReservationState({ invoiceID });

    // TODO: Error handling and automatic retry:
  }, [
    orgID,
    checkoutItems,
    setError,
    debug,
    createAuctionInvoice,
    createBuyNowInvoice,
  ]);

  return [createInvoiceAndReservationState, createInvoiceAndReservation];
}
