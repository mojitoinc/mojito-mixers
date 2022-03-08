import React, { createContext, FunctionComponent, useContext, useEffect } from "react";
import { PUIDictionary } from "../domain/dictionary/dictionary.interfaces";


const DictionaryContext = createContext<PUIDictionary>({
  walletMultiSigTooltip: '',
  purchaseInstructions: [],
  walletInfo: '',
  wirePaymentsDisclaimer: []
})


export const useDictionary = () => {
  return useContext(DictionaryContext);
}


export const DictionaryProvider: FunctionComponent<{ dictionary: PUIDictionary }> = ({ children, dictionary }) => {
  return <DictionaryContext.Provider value={dictionary}>
    {children}
  </DictionaryContext.Provider>
}
