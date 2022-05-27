import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useApplyDiscountCodeLazyQuery } from "../queries/graphqlGenerated";

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

const PromoCodeContext = React.createContext<IPromoCodeContext>({
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

const PromoCodeProvider: React.FC<PromoCodeProviderProps> = ({ children }) => {
  const [promoCode, setPromoCode] =
    React.useState<IPromoCode>(defaultPromoCode);
  const [editable, setEditable] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [invoiceItemIDs, setInvoiceItemIDs] = React.useState<string[]>([]);

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

const usePromoCode = () => {
  const [applyDiscountCode] = useApplyDiscountCodeLazyQuery();
  const { promoCode, setPromoCode, editable, setEditable, error, setError, invoiceItemIDs, setInvoiceItemIDs } =
    React.useContext(PromoCodeContext);

  const onChangePromoCode = (value: string) => {
    setPromoCode(code => ({
      ...code,
      code: value,
    }));
    setError(null);
  };

  const onApply = useCallback(async () => {
    try {
      const invoiceItemPromises = invoiceItemIDs.map(invoiceItemID => applyDiscountCode({
        variables: {
          discountCode: promoCode.code,
          invoiceItemID,
        },
      }));
      const results = await Promise.all(invoiceItemPromises).then(discountResults => discountResults.map(discountResult => ({
        id: discountResult.data?.applyDiscountCode?.discountCode?.id,
        total: discountResult.data?.applyDiscountCode?.totalPriceAfterDiscount,
      })));
      let id: string | undefined;
      let total = 0;
      results.forEach((result) => {
        if (result.id) {
          id = result.id;
        }
        if (result.total) {
          total += result.total;
        }
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
        setError("Code invalid");
      }
    } catch (e) {
      console.log(e);
    }
  }, [applyDiscountCode, invoiceItemIDs, promoCode.code, setError, setPromoCode]);

  return { promoCode, onChangePromoCode, onApply, editable, setEditable, error, invoiceItemIDs, setInvoiceItemIDs };
};

export { PromoCodeProvider, usePromoCode };
