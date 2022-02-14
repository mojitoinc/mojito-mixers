import { useMemo } from 'react';
import { to } from '../utils/typescriptUtils.js';

const useCheckoutItemsCostTotal = (checkoutItems) => {
    return useMemo(() => {
        return checkoutItems.reduce((result, checkoutItem) => {
            result.total += checkoutItem.unitPrice * checkoutItem.units;
            result.fees += checkoutItem.fee;
            return result;
        }, to({ total: 0, fees: 0 }));
    }, [checkoutItems]);
};

export { useCheckoutItemsCostTotal };
//# sourceMappingURL=useCheckoutItemCostTotal.js.map
