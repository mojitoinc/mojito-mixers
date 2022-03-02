import React__default from 'react';
import { Stack, Divider } from '@mui/material';
import { DeliveryWalletSelector } from '../DeliveryWallet/DeliveryWalletSelector.js';
import { CheckoutItemCostBreakdown } from '../CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js';

const CheckoutDeliveryAndItemCostBreakdown = ({ checkoutItems, taxes, validatePersonalDeliveryAddress, walletAddress, onWalletAddressChange, dictionary, }) => (React__default.createElement(Stack, { sx: { display: "flex", flex: 1 } },
    React__default.createElement(DeliveryWalletSelector, { validatePersonalAddress: validatePersonalDeliveryAddress, walletAddress: walletAddress, onWalletAddressChange: onWalletAddressChange, dictionary: dictionary }),
    React__default.createElement(Divider, { sx: { my: 3.75 } }),
    React__default.createElement(CheckoutItemCostBreakdown, { checkoutItems: checkoutItems, taxes: taxes })));

export { CheckoutDeliveryAndItemCostBreakdown };
//# sourceMappingURL=CheckoutDeliveryAndItemCostBreakdown.js.map
