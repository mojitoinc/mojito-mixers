import { __spreadArray } from '../../../../node_modules/tslib/tslib.es6.js';
import { Stack } from '@mui/material';
import React__default, { useMemo } from 'react';

function StackList(_a) {
  var data = _a.data,
      additionalPropsFn = _a.additionalProps,
      // placeholderData,
  ItemComponent = _a.component,
      getItemKey = _a.itemKey,
      _b = _a.deps,
      deps = _b === void 0 ? [] : _b;
  var renderedList = useMemo(function () {
    return /*#__PURE__*/React__default.createElement(Stack, {
      component: "ol",
      spacing: 1
    }, data.map(function (itemData, index) {
      var key = "".concat(getItemKey(itemData, index)); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: This expression is not callable

      var additionalProps = typeof additionalPropsFn === "function" ? additionalPropsFn(itemData, index) : additionalPropsFn;
      return /*#__PURE__*/React__default.createElement(ItemComponent, {
        key: key,
        id: key,
        index: index,
        data: itemData,
        additionalProps: additionalProps
      });
    })); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, __spreadArray([data, ItemComponent], deps, true));
  return renderedList;
}

export { StackList };
//# sourceMappingURL=StackList.js.map
