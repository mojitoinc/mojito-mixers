import { Typography } from '@mui/material';
import React__default, { useCallback } from 'react';
import { DisplayBox } from '../../DisplayBox/DisplayBox.js';
import { InputGroupLabel } from '../../../shared/InputGroupLabel/InputGroupLabel.js';
import { TextField } from '../../../shared/TextField/TextField.js';
import { withInvalidErrorMessage } from '../../../../utils/validationUtils.js';
import { isValidWalletAddress, isCustomWalletAddress } from '../../../../domain/wallet/wallet.utils.js';
import { WalletAddressSelector } from '../../../shared/Select/WalletAddressSelector/WalletAddressSelector.js';
import { useDictionary } from '../../../../hooks/useDictionary.js';

const WALLET_ADDRESS_FIELD_LABEL = "Wallet Address";
const INVALID_WALLET_ADDRESS_MESSAGE = withInvalidErrorMessage({
    label: WALLET_ADDRESS_FIELD_LABEL,
});
const DeliveryWalletSelector = ({ validatePersonalAddress, wallets, wallet, onWalletChange, }) => {
    const dictionary = useDictionary();
    const handleInputChange = useCallback((e) => {
        onWalletChange(e.target.value);
    }, [onWalletChange]);
    const handleSelectWallet = useCallback((nextWallet) => {
        onWalletChange(nextWallet);
    }, [onWalletChange]);
    const isAddressOk = isValidWalletAddress(wallet);
    const showAddressError = validatePersonalAddress && !isAddressOk;
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Wallet Delivery Address"),
        React__default.createElement(DisplayBox, null,
            React__default.createElement(Typography, { sx: { mb: 1.5 } }, dictionary.walletInfo),
            React__default.createElement(WalletAddressSelector, { margin: "none", label: "Wallet", wallets: wallets, wallet: wallet, onSelectWallet: handleSelectWallet, error: showAddressError, helperText: showAddressError ? INVALID_WALLET_ADDRESS_MESSAGE : undefined }),
            isCustomWalletAddress(wallet) && (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(Typography, { variant: "body1", sx: { my: 1.5 } }, "Once minted, this is where your items will be delivered:"),
                React__default.createElement(TextField, { margin: "none", label: WALLET_ADDRESS_FIELD_LABEL, onChange: handleInputChange, value: wallet, error: showAddressError, helperText: showAddressError ? INVALID_WALLET_ADDRESS_MESSAGE : undefined }),
                React__default.createElement(Typography, { variant: "body2", sx: { mt: 1.5 } }, "(IMPORTANT: Please make sure the wallet address you provide is correct)"))))));
};

export { DeliveryWalletSelector };
//# sourceMappingURL=DeliveryWalletSelector.js.map
