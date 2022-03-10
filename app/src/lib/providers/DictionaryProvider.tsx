import { createContext, FunctionComponent, useMemo } from "react";
import { DEFAULT_DICTIONARY } from "../domain/dictionary/dictionary.constants";
import { PUIDictionary } from "../domain/dictionary/dictionary.interfaces";




export const DictionaryContext = createContext<PUIDictionary>(DEFAULT_DICTIONARY)

export const DictionaryProvider: FunctionComponent<{ dictionary?: Partial<PUIDictionary> | undefined}> = ({ children, dictionary }) => {
  const providerDictionary = useMemo(() => ({ ...DEFAULT_DICTIONARY, ...dictionary }), [dictionary])
  return (
    <DictionaryContext.Provider value={providerDictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}
