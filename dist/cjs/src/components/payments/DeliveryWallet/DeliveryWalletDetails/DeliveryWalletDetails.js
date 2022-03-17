'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var InfoOutlined = require('../../../../../node_modules/@mui/icons-material/InfoOutlined.js');
var CopyButton = require('../../../shared/CopyButton/CopyButton.js');
var ReadOnlyField = require('../../../shared/ReadOnlyField/ReadOnlyField.js');
var React = require('react');
var useDictionary = require('../../../../hooks/useDictionary.js');
var wallet_utils = require('../../../../domain/wallet/wallet.utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DeliveryWalletDetails = ({ wallet, }) => {
    const dictionary = useDictionary.useDictionary();
    const walletAddress = (typeof wallet === "object" ? wallet === null || wallet === void 0 ? void 0 : wallet.address : wallet_utils.filterSpecialWalletAddressValues(wallet)) || "";
    const isMultiSig = typeof wallet === "object" || !walletAddress;
    return (React__default["default"].createElement(material.Box, { pt: 2 },
        React__default["default"].createElement(material.Typography, { variant: "body1" }, "Once minted, items will be delivered to:"),
        React__default["default"].createElement(material.Box, { sx: { display: "flex", justifyContent: "space-between", mt: 1, mb: walletAddress ? 1 : 0, alignItems: "center" } },
            React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500" } }, walletAddress ? "Wallet Address" : "New MultiSig Wallet"),
            isMultiSig && (React__default["default"].createElement(material.Tooltip, { title: dictionary.walletMultiSigTooltip },
                React__default["default"].createElement(material.Chip, { variant: "outlined", size: "small", color: "info", label: (React__default["default"].createElement(React__default["default"].Fragment, null,
                        "MultiSig",
                        React__default["default"].createElement(InfoOutlined["default"], { sx: { fontSize: "16px", ml: 1 } }))) })))),
        walletAddress && (React__default["default"].createElement(ReadOnlyField.ReadOnlyWalletAddress, { value: walletAddress, margin: "none", InputProps: {
                endAdornment: (React__default["default"].createElement(CopyButton.CopyButton, { label: "Wallet Address", value: walletAddress })),
            } }))));
};

exports.DeliveryWalletDetails = DeliveryWalletDetails;
//# sourceMappingURL=DeliveryWalletDetails.js.map
