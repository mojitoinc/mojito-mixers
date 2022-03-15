'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var DictionaryProvider = require('../providers/DictionaryProvider.js');

const useDictionary = () => {
    return React.useContext(DictionaryProvider.DictionaryContext);
};

exports.useDictionary = useDictionary;
//# sourceMappingURL=useDictionary.js.map
