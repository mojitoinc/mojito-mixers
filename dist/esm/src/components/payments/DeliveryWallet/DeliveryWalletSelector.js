import { Typography } from '@mui/material';
import React__default, { useCallback } from 'react';
import { DisplayBox } from '../DisplayBox/DisplayBox.js';
import { Checkbox } from '../../shared/Checkbox/Checkbox.js';
import { InputGroupLabel } from '../../shared/InputGroupLabel/InputGroupLabel.js';
import { TextField } from '../../shared/TextField/TextField.js';
import { withInvalidErrorMessage } from '../../../utils/validationUtils.js';
import { isValidWalletAddress } from '../../../domain/wallet/wallet.utils.js';

const WALLET_ADDRESS_FIELD_LABEL = "Wallet Address";
const INVALID_WALLET_ADDRESS_MESSAGE = withInvalidErrorMessage({ label: WALLET_ADDRESS_FIELD_LABEL });
const DeliveryWalletSelector = ({ validatePersonalAddress, walletAddress, onWalletAddressChange, dictionary, }) => {
    const handleCheckboxChange = useCallback((e) => {
        onWalletAddressChange(e.target.checked ? "" : null);
    }, [onWalletAddressChange]);
    const handleInputChange = useCallback((e) => {
        onWalletAddressChange(e.target.value);
    }, [onWalletAddressChange]);
    const usePersonalWallet = typeof walletAddress === "string";
    const isAddressOk = isValidWalletAddress(walletAddress);
    const showAddressError = validatePersonalAddress && !isAddressOk;
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Wallet Delivery Address"),
        React__default.createElement(DisplayBox, { sx: { border: 0, mb: 0.5 } },
            React__default.createElement(Typography, null, dictionary.walletInfo)),
        React__default.createElement(Checkbox, { label: "I would like to deliver to a self-hosted wallet (such as Metamask or Rainbow Wallet)", onChange: handleCheckboxChange, checked: usePersonalWallet, sx: { mb: "-13px" } }),
        usePersonalWallet && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Typography, { variant: "body1", sx: { mt: "13px" } }, "Once minted, this is where your items will be delivered:"),
            React__default.createElement(Typography, { variant: "body2", sx: { mt: 0.5, mb: 1 } }, "(IMPORTANT: Please make sure the wallet address you provide is correct)"),
            React__default.createElement(TextField, { margin: "none", label: WALLET_ADDRESS_FIELD_LABEL, onChange: handleInputChange, value: walletAddress, error: showAddressError, helperText: showAddressError && INVALID_WALLET_ADDRESS_MESSAGE })))));
};

export { DeliveryWalletSelector };
//# sourceMappingURL=DeliveryWalletSelector.js.map
