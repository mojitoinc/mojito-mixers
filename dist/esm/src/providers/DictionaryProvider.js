import React__default, { createContext, useMemo } from 'react';
import { DEFAULT_DICTIONARY } from '../domain/dictionary/dictionary.constants.js';

const DictionaryContext = createContext(DEFAULT_DICTIONARY);
const DictionaryProvider = ({ dictionary, children, }) => {
    const providerDictionary = useMemo(() => (Object.assign(Object.assign({}, DEFAULT_DICTIONARY), dictionary)), [dictionary]);
    return (React__default.createElement(DictionaryContext.Provider, { value: providerDictionary }, children));
};

export { DictionaryContext, DictionaryProvider };
//# sourceMappingURL=DictionaryProvider.js.map
