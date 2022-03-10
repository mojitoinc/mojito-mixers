import { createContext, FunctionComponent } from "react";
import { PUIDictionary } from "../domain/dictionary/dictionary.interfaces";


export const DictionaryContext = createContext<PUIDictionary>({
  walletMultiSigTooltip: "",
  purchaseInstructions: [],
  walletInfo: "",
  wirePaymentsDisclaimer: [],
})

export const DictionaryProvider: FunctionComponent<{ dictionary: PUIDictionary }> = ({ children, dictionary }) => {
  return (
    <DictionaryContext.Provider value={ dictionary }>
      { children }
    </DictionaryContext.Provider>
  );
}
