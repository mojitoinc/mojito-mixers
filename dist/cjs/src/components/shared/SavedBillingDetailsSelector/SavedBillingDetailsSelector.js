'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var InputGroupLabel = require('../InputGroupLabel/InputGroupLabel.js');
var Add = require('../../../../node_modules/@mui/icons-material/Add.js');
var StackList = require('../StackList/StackList.js');
var React = require('react');
var BillingInfoItem = require('../../payments/BillingInfo/Item/BillingInfoItem.js');
var SecondaryButton = require('../SecondaryButton/SecondaryButton.js');
var CheckoutModalFooter = require('../../payments/CheckoutModalFooter/CheckoutModalFooter.js');
var material = require('@mui/material');
var themeConstants = require('../../../config/theme/themeConstants.js');
var TaxesMessagesBox = require('../TaxesMessagesBox/TaxesMessagesBox.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const SavedBillingDetailsSelector = ({ showLoader, savedPaymentMethods, selectedPaymentMethodAddressId, taxes, onNew, onEdit, onDelete, onPick, onNext, onClose, onAttemptSubmit, consentType, }) => {
    const getPaymentMethodAddressId = React.useCallback((savedPaymentMethod) => savedPaymentMethod.addressId, []);
    const handleNextClicked = React.useCallback(() => {
        onAttemptSubmit();
        onNext();
    }, [onAttemptSubmit, onNext]);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(material.Box, { sx: { position: "relative" } },
            showLoader ? (React__default["default"].createElement(material.Box, { sx: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme => material.alpha(theme.palette.background.default, themeConstants.OVERLAY_OPACITY),
                    zIndex: 100,
                } },
                React__default["default"].createElement(material.CircularProgress, { color: "secondary" }))) : null,
            React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Saved Billing Info"),
            React__default["default"].createElement(StackList.StackList, { data: savedPaymentMethods, additionalProps: (savedPaymentMethod) => ({
                    active: savedPaymentMethod.addressId === selectedPaymentMethodAddressId,
                    disabled: showLoader,
                    onDelete,
                    onPick,
                    onEdit,
                }), component: BillingInfoItem.BillingInfoItem, itemKey: getPaymentMethodAddressId, deps: [selectedPaymentMethodAddressId, showLoader, onDelete, onPick, onEdit] }),
            React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: onNew, startIcon: React__default["default"].createElement(Add["default"], null), sx: { mt: 2.5 }, disabled: showLoader }, "Add New Billing Info"),
            React__default["default"].createElement(TaxesMessagesBox.TaxesMessagesBox, { sx: { mt: 5 }, taxes: taxes, variant: "selector" })),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: "toPayment", consentType: consentType, buttonLabel: taxes.status === "loading" ? "Calculating taxes..." : undefined, submitDisabled: taxes.status !== "complete", onSubmitClicked: handleNextClicked, onCloseClicked: onClose })));
};

exports.SavedBillingDetailsSelector = SavedBillingDetailsSelector;
//# sourceMappingURL=SavedBillingDetailsSelector.js.map
