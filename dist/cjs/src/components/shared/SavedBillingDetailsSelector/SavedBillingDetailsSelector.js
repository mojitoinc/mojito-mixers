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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var SavedBillingDetailsSelector = function (_a) {
    var showLoader = _a.showLoader, savedPaymentMethods = _a.savedPaymentMethods, selectedPaymentMethodAddressId = _a.selectedPaymentMethodAddressId, onNew = _a.onNew, onEdit = _a.onEdit, onDelete = _a.onDelete, onPick = _a.onPick, onNext = _a.onNext, onClose = _a.onClose;
    var getPaymentMethodAddressId = React.useCallback(function (savedPaymentMethod) { return savedPaymentMethod.addressId; }, []);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(material.Box, { sx: { position: "relative" } },
            showLoader ? (React__default["default"].createElement(material.Box, { sx: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.75)",
                    zIndex: 100,
                } },
                React__default["default"].createElement(material.CircularProgress, { color: "secondary" }))) : null,
            React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Saved Billing Info"),
            React__default["default"].createElement(StackList.StackList, { data: savedPaymentMethods, additionalProps: function (savedPaymentMethod) { return ({
                    active: savedPaymentMethod.addressId === selectedPaymentMethodAddressId,
                    disabled: showLoader,
                    onEdit: onEdit,
                    onDelete: onDelete,
                    onPick: onPick,
                }); }, component: BillingInfoItem.BillingInfoItem, itemKey: getPaymentMethodAddressId, deps: [onEdit, onDelete, onPick, selectedPaymentMethodAddressId, showLoader] }),
            React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: onNew, startIcon: React__default["default"].createElement(Add["default"], null), sx: { mt: 2.5 }, disabled: showLoader }, "Add New Billing Info")),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: "toPayment", onSubmitClicked: onNext, onCloseClicked: onClose })));
};

exports.SavedBillingDetailsSelector = SavedBillingDetailsSelector;
//# sourceMappingURL=SavedBillingDetailsSelector.js.map
