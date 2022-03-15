'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var dictionary_constants = require('../domain/dictionary/dictionary.constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DictionaryContext = React.createContext(dictionary_constants.DEFAULT_DICTIONARY);
const DictionaryProvider = ({ dictionary, children, }) => {
    const providerDictionary = React.useMemo(() => (Object.assign(Object.assign({}, dictionary_constants.DEFAULT_DICTIONARY), dictionary)), [dictionary]);
    return (React__default["default"].createElement(DictionaryContext.Provider, { value: providerDictionary }, children));
};

exports.DictionaryContext = DictionaryContext;
exports.DictionaryProvider = DictionaryProvider;
//# sourceMappingURL=DictionaryProvider.js.map
