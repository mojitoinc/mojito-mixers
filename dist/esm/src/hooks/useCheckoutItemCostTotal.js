import { useMemo } from 'react';
import { to } from '../utils/typescriptUtils.js';

const useCheckoutItemsCostTotal = (checkoutItems) => {
    return useMemo(() => {
        const reduceResult = checkoutItems.reduce((result, checkoutItem) => {
            // result.total += checkoutItem.unitPrice * checkoutItem.units;
            result.total += checkoutItem.totalPrice;
            result.fees += checkoutItem.fee;
            result.taxAmount += checkoutItem.taxes;
            return result;
        }, to({ total: 0, fees: 0, taxAmount: 0 }));
        return Object.assign(Object.assign({}, reduceResult), { taxRate: 100 * reduceResult.taxAmount / reduceResult.total });
    }, [checkoutItems]);
};

export { useCheckoutItemsCostTotal };
//# sourceMappingURL=useCheckoutItemCostTotal.js.map
