import React, { Dispatch, SetStateAction } from "react";

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
  setPromoCode: () => {},
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

  return (
    <PromoCodeContext.Provider
      value={{ promoCode, setPromoCode, editable, setEditable }}
    >
      {children}
    </PromoCodeContext.Provider>
  );
};

const usePromoCode = () => {
  const { promoCode, setPromoCode, editable, setEditable } = React.useContext(PromoCodeContext);

  const onChangePromoCode = (value: string) => {
    setPromoCode((promoCode) => ({
      ...promoCode,
      code: value,
    }));
  };

  const onApply = (invoiceId: string) => {
    // call mutation api
    // update total
    setPromoCode((promoCode) => ({
      ...promoCode,
      id: "123",
      total: 100,
    }));
  }

  return { promoCode, onChangePromoCode, onApply, editable, setEditable };
};

export { PromoCodeProvider, usePromoCode };
