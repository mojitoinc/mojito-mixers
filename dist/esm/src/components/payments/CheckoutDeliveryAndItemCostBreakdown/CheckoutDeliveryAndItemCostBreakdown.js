import React__default from 'react';
import { Stack, Divider } from '@mui/material';
import { DeliveryWalletSelector } from '../DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector.js';
import { CheckoutItemCostBreakdown } from '../CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js';

const CheckoutDeliveryAndItemCostBreakdown = ({ checkoutItems, taxes, validatePersonalDeliveryAddress, wallets, wallet, onWalletChange, }) => (React__default.createElement(Stack, { sx: { display: "flex", width: { xs: "100%", md: "calc(50% - 35px)" } } },
    React__default.createElement(DeliveryWalletSelector, { validatePersonalAddress: validatePersonalDeliveryAddress, wallets: wallets, wallet: wallet, onWalletChange: onWalletChange }),
    React__default.createElement(Divider, { sx: { my: 3.75 } }),
    React__default.createElement(CheckoutItemCostBreakdown, { checkoutItems: checkoutItems, taxes: taxes })));

export { CheckoutDeliveryAndItemCostBreakdown };
//# sourceMappingURL=CheckoutDeliveryAndItemCostBreakdown.js.map
