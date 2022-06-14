import React, { Dispatch, SetStateAction, useCallback, useMemo, useContext, useState, createContext } from "react";
import { useApplyDiscountCodeLazyQuery } from "../queries/graphqlGenerated";
import { DISCOUNT_CODE_EXCEPTION_ERROR_MESSAGE, DISCOUNT_CODE_INVALID_ERROR_MESSAGE, withRequiredErrorMessage } from "./validationUtils";

interface IPromoCode {
  code: string;
  id?: string;
  total?: number;
}

const defaultPromoCode = { code: "" };

interface IPromoCodeContext {
  promoCode: IPromoCode;
  setPromoCode: Dispatch<SetStateAction<IPromoCode>>;
  editable: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  invoiceItemIDs: string[];
  setInvoiceItemIDs: Dispatch<SetStateAction<string[]>>;
}

const PromoCodeContext = createContext<IPromoCodeContext>({
  promoCode: defaultPromoCode,
  setPromoCode: () => undefined,
  editable: false,
  setEditable: () => false,
  error: null,
  setError: () => undefined,
  invoiceItemIDs: [],
  setInvoiceItemIDs: () => undefined,
});

interface PromoCodeProviderProps {
  children?: React.ReactNode;
}

export const PromoCodeProvider: React.FC<PromoCodeProviderProps> = ({ children }) => {
  // TODO: Combine in a single state:
  const [promoCode, setPromoCode] = useState<IPromoCode>(defaultPromoCode);
  const [editable, setEditable] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceItemIDs, setInvoiceItemIDs] = useState<string[]>([]);

  const PromoCodeProviderValue = useMemo(
    () => ({ promoCode, setPromoCode, editable, setEditable, error, setError, invoiceItemIDs, setInvoiceItemIDs }),
    [promoCode, setPromoCode, editable, setEditable, error, setError, invoiceItemIDs, setInvoiceItemIDs],
  );

  return (
    <PromoCodeContext.Provider value={ PromoCodeProviderValue }>
      { children }
    </PromoCodeContext.Provider>
  );
};

export function usePromoCode() {
  const [applyDiscountCode] = useApplyDiscountCodeLazyQuery();
  const { promoCode, setPromoCode, editable, setEditable, error, setError, invoiceItemIDs, setInvoiceItemIDs } = useContext(PromoCodeContext);

  const onChangePromoCode = useCallback((code: string) => {
    setPromoCode(state => ({ ...state, code }));
    setError(null);
  }, [setError, setPromoCode]);

  const onApply = useCallback(async () => {
    const discountCode = promoCode.code;

    if (!discountCode) {
      setError(withRequiredErrorMessage({ label: "Discount Code" }));

      return;
    }

    try {
      const invoiceItemPromises = invoiceItemIDs.map(invoiceItemID => applyDiscountCode({
        variables: {
          discountCode,
          invoiceItemID,
        },
      }));

      let id = "";
      let total = 0;

      // TODO: Add loading state to the discount button / input.

      await Promise.all(invoiceItemPromises).then((discountResults) => {
        discountResults.forEach((discountResult) => {
          const appliedDiscountCode = discountResult.data?.applyDiscountCode;

          if (appliedDiscountCode) {
            id ||= appliedDiscountCode.discountCode.id;
            total += appliedDiscountCode.totalPriceAfterDiscount || 0;
          }
        });
      });

      if (id && total) {
        // update total
        setPromoCode(code => ({
          ...code,
          id,
          total,
        }));
        setError(null);
      } else {
        setError(DISCOUNT_CODE_INVALID_ERROR_MESSAGE);
      }
    } catch (e) {
      setError(DISCOUNT_CODE_EXCEPTION_ERROR_MESSAGE);
    }
  }, [applyDiscountCode, invoiceItemIDs, promoCode, setError, setPromoCode]);

  return { promoCode, onChangePromoCode, onApply, editable, setEditable, error, invoiceItemIDs, setInvoiceItemIDs };
}
