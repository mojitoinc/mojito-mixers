import { Box, Typography, Tooltip, Chip } from '@mui/material';
import default_1 from '../../../../../node_modules/@mui/icons-material/InfoOutlined.js';
import { CopyButton } from '../../../shared/CopyButton/CopyButton.js';
import { ReadOnlyWalletAddress } from '../../../shared/ReadOnlyField/ReadOnlyField.js';
import React__default from 'react';
import { useDictionary } from '../../../../hooks/useDictionary.js';

const DeliveryWalletDetails = ({ wallet, }) => {
    const dictionary = useDictionary();
    const walletAddress = (typeof wallet === "object" ? wallet === null || wallet === void 0 ? void 0 : wallet.address : wallet) || "";
    const isMultiSig = typeof wallet === "object" || !walletAddress;
    return (React__default.createElement(Box, { pt: 2 },
        React__default.createElement(Typography, { variant: "body1" }, "Once minted, items will be delivered to:"),
        React__default.createElement(Box, { sx: { display: "flex", justifyContent: "space-between", mt: 1, mb: walletAddress ? 1 : 0, alignItems: "center" } },
            React__default.createElement(Typography, { sx: { fontWeight: "500" } }, walletAddress ? "Wallet Address" : "New MultiSig Wallet"),
            isMultiSig && (React__default.createElement(Tooltip, { title: dictionary.walletMultiSigTooltip },
                React__default.createElement(Chip, { variant: "outlined", size: "small", color: "info", label: (React__default.createElement(React__default.Fragment, null,
                        "MultiSig",
                        React__default.createElement(default_1, { sx: { fontSize: "16px", ml: 1 } }))) })))),
        walletAddress && (React__default.createElement(ReadOnlyWalletAddress, { value: walletAddress, margin: "none", InputProps: {
                endAdornment: (React__default.createElement(CopyButton, { label: "Wallet Address", value: walletAddress })),
            } }))));
};

export { DeliveryWalletDetails };
//# sourceMappingURL=DeliveryWalletDetails.js.map
