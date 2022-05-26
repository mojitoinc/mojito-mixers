import { useApplyDiscountCodeLazyQuery } from "@lib/queries/graphqlGenerated";
import React, { Dispatch, SetStateAction, useMemo } from "react";

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
}

const PromoCodeContext = React.createContext<IPromoCodeContext>({
  promoCode: defaultPromoCode,
  setPromoCode: () => undefined,
  editable: false,
  setEditable: () => false,
});

interface PromoCodeProviderProps {
  children?: React.ReactNode;
}

const PromoCodeProvider: React.FC<PromoCodeProviderProps> = ({ children }) => {
  const [promoCode, setPromoCode] =
    React.useState<IPromoCode>(defaultPromoCode);
  const [editable, setEditable] = React.useState<boolean>(false);

  const PromoCodeProviderValue = useMemo(
    () => ({ promoCode, setPromoCode, editable, setEditable }),
    [promoCode, setPromoCode, editable, setEditable],
  );

  return (
    <PromoCodeContext.Provider value={ PromoCodeProviderValue }>
      { children }
    </PromoCodeContext.Provider>
  );
};

const usePromoCode = () => {
  const [applyDiscountCode] = useApplyDiscountCodeLazyQuery();
  const { promoCode, setPromoCode, editable, setEditable } =
    React.useContext(PromoCodeContext);

  const onChangePromoCode = (value: string) => {
    setPromoCode(code => ({
      ...code,
      code: value,
    }));
  };

  const onApply = async (invoiceId: string) => {
    try {
      const discountResult = await applyDiscountCode({
        variables: {
          discountCode: promoCode.code,
          invoiceItemID: invoiceId,
        },
      });
      const id = discountResult.data?.applyDiscountCode?.discountCode?.id;
      const total = discountResult.data?.applyDiscountCode?.totalPriceAfterDiscount;
      if (id) {
        // update total
        setPromoCode(code => ({
          ...code,
          id,
          total,
        }));
      } else {
        console.log("wrong discount code");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { promoCode, onChangePromoCode, onApply, editable, setEditable };
};

export { PromoCodeProvider, usePromoCode };
