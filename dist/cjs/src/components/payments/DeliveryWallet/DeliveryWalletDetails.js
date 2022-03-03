'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var InfoOutlined = require('../../../../node_modules/@mui/icons-material/InfoOutlined.js');
var CopyButton = require('../../shared/CopyButton/CopyButton.js');
var ReadOnlyField = require('../../shared/ReadOnlyField/ReadOnlyField.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DeliveryWalletDetails = ({ isMultiSig = true, walletAddress, dictionary, }) => {
    return (React__default["default"].createElement(material.Box, { pt: 2 },
        React__default["default"].createElement(material.Typography, { variant: "body1" }, "Once minted, items will be delivered to:"),
        React__default["default"].createElement(material.Box, { sx: { display: "flex", justifyContent: "space-between", my: 1, alignItems: "center" } },
            React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500" } }, "Wallet Address"),
            isMultiSig && (React__default["default"].createElement(material.Tooltip, { title: dictionary.walletMultiSigTooltip },
                React__default["default"].createElement(material.Chip, { variant: "outlined", size: "small", color: "info", label: (React__default["default"].createElement(React__default["default"].Fragment, null,
                        "MultiSig",
                        React__default["default"].createElement(InfoOutlined["default"], { sx: { fontSize: "16px", ml: 1 } }))) })))),
        React__default["default"].createElement(ReadOnlyField.ReadOnlyWalletAddress, { value: walletAddress, margin: "none", InputProps: {
                endAdornment: (React__default["default"].createElement(CopyButton.CopyButton, { label: "Wallet Address", value: walletAddress })),
            } })));
};

exports["default"] = DeliveryWalletDetails;
//# sourceMappingURL=DeliveryWalletDetails.js.map
