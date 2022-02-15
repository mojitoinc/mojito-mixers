'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var typescriptUtils = require('../utils/typescriptUtils.js');

const useCheckoutItemsCostTotal = (checkoutItems) => {
    return React.useMemo(() => {
        return checkoutItems.reduce((result, checkoutItem) => {
            result.total += checkoutItem.unitPrice * checkoutItem.units;
            result.fees += checkoutItem.fee;
            return result;
        }, typescriptUtils.to({ total: 0, fees: 0 }));
    }, [checkoutItems]);
};

exports.useCheckoutItemsCostTotal = useCheckoutItemsCostTotal;
//# sourceMappingURL=useCheckoutItemCostTotal.js.map
