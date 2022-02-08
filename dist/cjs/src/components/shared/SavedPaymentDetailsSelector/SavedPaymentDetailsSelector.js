'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var InputGroupLabel = require('../InputGroupLabel/InputGroupLabel.js');
var Add = require('../../../../node_modules/@mui/icons-material/Add.js');
var StackList = require('../StackList/StackList.js');
var SecondaryButton = require('../SecondaryButton/SecondaryButton.js');
var PaymentDetailsItem = require('../../payments/PaymentDetailsItem/Item/PaymentDetailsItem.js');
var CheckoutModalFooter = require('../../payments/CheckoutModalFooter/CheckoutModalFooter.js');
var React = require('react');
var material = require('@mui/material');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var SavedPaymentDetailsSelector = function (_a) {
    var showLoader = _a.showLoader, savedPaymentMethods = _a.savedPaymentMethods, selectedPaymentMethodId = _a.selectedPaymentMethodId, onNew = _a.onNew, onDelete = _a.onDelete, onPick = _a.onPick, onNext = _a.onNext, onClose = _a.onClose, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref;
    var getPaymentMethodId = React.useCallback(function (savedPaymentMethod) { return savedPaymentMethod.id; }, []);
    var handleNextClicked = React.useCallback(function (canSubmit) {
        if (canSubmit)
            onNext();
    }, [onNext]);
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
            React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Saved Payment Methods"),
            React__default["default"].createElement(StackList.StackList, { data: savedPaymentMethods, additionalProps: function (savedPaymentMethod) { return ({
                    active: savedPaymentMethod.id === selectedPaymentMethodId,
                    disabled: showLoader,
                    onDelete: onDelete,
                    onPick: onPick,
                }); }, component: PaymentDetailsItem.PaymentDetailsItem, itemKey: getPaymentMethodId, deps: [onDelete, onPick, selectedPaymentMethodId, showLoader] }),
            React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: onNew, startIcon: React__default["default"].createElement(Add["default"], null), sx: { mt: 2.5, mb: consentType === "checkbox" ? 5 : 0 }, disabled: showLoader }, "Add New Payment Method")),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: "toConfirmation", consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, onSubmitClicked: handleNextClicked, onCloseClicked: onClose })));
};

exports.SavedPaymentDetailsSelector = SavedPaymentDetailsSelector;
//# sourceMappingURL=SavedPaymentDetailsSelector.js.map
