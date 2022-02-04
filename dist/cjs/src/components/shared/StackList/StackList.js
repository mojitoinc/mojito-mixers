'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

// eslint-disable-next-line @typescript-eslint/ban-types
function StackList(_a) {
    var data = _a.data, additionalPropsFn = _a.additionalProps, 
    // placeholderData,
    ItemComponent = _a.component, getItemKey = _a.itemKey, _b = _a.deps, deps = _b === void 0 ? [] : _b;
    var renderedList = React.useMemo(function () {
        return (React__default["default"].createElement(material.Stack, { component: "ol", spacing: 1 }, data.map(function (itemData, index) {
            var key = "".concat(getItemKey(itemData, index));
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: This expression is not callable
            var additionalProps = typeof additionalPropsFn === "function" ? additionalPropsFn(itemData, index) : additionalPropsFn;
            return (React__default["default"].createElement(ItemComponent, { key: key, id: key, index: index, data: itemData, additionalProps: additionalProps }));
        })));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, tslib_es6.__spreadArray([data, ItemComponent], deps, true));
    return renderedList;
}

exports.StackList = StackList;
//# sourceMappingURL=StackList.js.map
