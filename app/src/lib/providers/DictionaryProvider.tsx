import React, { createContext, useMemo } from "react";
import { DEFAULT_DICTIONARY } from "../domain/dictionary/dictionary.constants";
import { PUIDictionary } from "../domain/dictionary/dictionary.interfaces";

export const DictionaryContext = createContext<PUIDictionary>(DEFAULT_DICTIONARY);

export interface DictionaryProviderProps {
  dictionary?: Partial<PUIDictionary>;
}

export const DictionaryProvider: React.FC<DictionaryProviderProps> = ({
  dictionary,
  children,
}) => {
  const providerDictionary = useMemo(() => ({ ...DEFAULT_DICTIONARY, ...dictionary }), [dictionary]);

  return (
    <DictionaryContext.Provider value={ providerDictionary }>
      { children }
    </DictionaryContext.Provider>
  );
}
