import React from "react";
import { Number } from "../Number/Number";

interface PricesProps {
  price: number;
  displayCurrency: string;
  cryptoPrice?: number;
  cryptoCurrency?: string;
}

export const Prices: React.FC<PricesProps> = ({
  price,
  displayCurrency,
  cryptoPrice,
  cryptoCurrency,
}) => {
  return (
    <>
      <Number suffix={ ` ${ displayCurrency }` }>{ price }</Number>

      { (cryptoPrice !== undefined && cryptoCurrency) ? (
        <>
          { " " }
          (<Number suffix={ ` ${ cryptoCurrency }` }>{ cryptoPrice }</Number>)
        </>
      ) : null }
    </>
  );
};
