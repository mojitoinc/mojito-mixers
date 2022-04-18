'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var CheckoutDeliveryAndItemCostBreakdown = require('../../components/payments/CheckoutDeliveryAndItemCostBreakdown/CheckoutDeliveryAndItemCostBreakdown.js');
var CheckoutStepper = require('../../components/payments/CheckoutStepper/CheckoutStepper.js');
var PaymentMethodForm = require('../../forms/PaymentMethodForm.js');
var SavedPaymentDetailsSelector = require('../../components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.js');
var BillingInfoItem = require('../../components/payments/BillingInfo/Item/BillingInfoItem.js');
var circle_utils = require('../../domain/circle/circle.utils.js');
var material = require('@mui/material');
var usePlaid = require('../../hooks/usePlaid.js');
var useFormCheckoutError = require('../../hooks/useFormCheckoutError.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const billingInfoItemBoxProps = { sx: { mt: 2.5 } };
const PaymentView = ({ orgID, invoiceID, invoiceCountdownStart, checkoutItems, taxes, savedPaymentMethods: rawSavedPaymentMethods, selectedPaymentMethod, wallets, wallet, checkoutError, onPaymentInfoSelected, onCvvSelected, onSavedPaymentMethodDeleted, onWalletChange, onNext, onPrev, onClose, acceptedPaymentTypes = ["CreditCard"], acceptedCreditCardNetworks, consentType, debug, }) => {
    const { billingInfo: selectedBillingInfo, paymentInfo: selectedPaymentInfo, } = selectedPaymentMethod;
    const savedPaymentMethods = React.useMemo(() => {
        if (typeof selectedBillingInfo !== "string")
            return [];
        return rawSavedPaymentMethods.filter(({ addressId, type }) => addressId === selectedBillingInfo && acceptedPaymentTypes.includes(type));
    }, [acceptedPaymentTypes, rawSavedPaymentMethods, selectedBillingInfo]);
    const selectedPaymentMethodBillingInfo = React.useMemo(() => {
        return typeof selectedBillingInfo === "string"
            ? rawSavedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo)
            : circle_utils.billingInfoToSavedPaymentMethodBillingInfo(selectedBillingInfo);
    }, [rawSavedPaymentMethods, selectedBillingInfo]);
    const [{ isDeleting, showSaved }, setViewState] = React.useState({
        isDeleting: false,
        showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string" && !useFormCheckoutError.checkNeedsGenericErrorMessage("payment", checkoutError),
    });
    const [formSubmitAttempted, setFormSubmitAttempted] = React.useState(false);
    const handleShowForm = React.useCallback(() => {
        setViewState({ isDeleting: false, showSaved: false });
    }, []);
    const handleShowSaved = React.useCallback(() => {
        setViewState({ isDeleting: false, showSaved: true });
    }, []);
    const handleSubmit = React.useCallback((data) => {
        onPaymentInfoSelected(data);
        onNext();
    }, [onPaymentInfoSelected, onNext]);
    const handleSavedPaymentMethodDeleted = React.useCallback((savedPaymentMethodId) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        setViewState({ isDeleting: true, showSaved: true });
        yield onSavedPaymentMethodDeleted(savedPaymentMethodId);
        const remainingPaymentMethods = savedPaymentMethods.length - 1;
        setViewState({ isDeleting: false, showSaved: remainingPaymentMethods > 0 });
    }), [onSavedPaymentMethodDeleted, savedPaymentMethods.length]);
    const handleFormAttemptSubmit = React.useCallback(() => setFormSubmitAttempted(true), []);
    React.useEffect(() => {
        if (!selectedPaymentMethodBillingInfo)
            onPrev();
    }, [selectedPaymentMethodBillingInfo, onPrev]);
    React.useEffect(() => {
        const selectedPaymentInfoMatch = typeof selectedPaymentInfo === "string" && savedPaymentMethods.some(({ id }) => id === selectedPaymentInfo);
        const lastActiveSavedPaymentMethod = savedPaymentMethods.slice().reverse().find(({ status }) => status === "complete");
        if (showSaved && !selectedPaymentInfoMatch && lastActiveSavedPaymentMethod /* && savedPaymentMethods.length > 0 && !checkoutError */) {
            onPaymentInfoSelected(lastActiveSavedPaymentMethod.id);
        }
    }, [showSaved, onPaymentInfoSelected, savedPaymentMethods, selectedPaymentInfo /*, checkoutError*/]);
    // PLAIN LINKS:
    const { loading: plaidLoading, error: plaidError, openLink: onPlaidLinkClicked, refetchLink: refetchPlaidLink, } = usePlaid.usePlaid({
        orgID,
        invoiceID,
        invoiceCountdownStart,
        selectedBillingInfo,
        skip: !acceptedPaymentTypes.includes("ACH"),
    });
    // TODO: Handle errors properly:
    if (!selectedPaymentMethodBillingInfo)
        return null;
    return (React__default["default"].createElement(material.Stack, { direction: { xs: "column", md: "row" }, spacing: { xs: 0, md: 3.75 } },
        React__default["default"].createElement(material.Stack, { sx: { display: "flex", overflow: "hidden", width: (theme) => ({ xs: "100%", md: `calc(50% - ${theme.spacing(3.75 / 2)})` }) } },
            React__default["default"].createElement(CheckoutStepper.CheckoutStepper, { progress: 100 }),
            React__default["default"].createElement(BillingInfoItem.BillingInfoItem, { data: selectedPaymentMethodBillingInfo, additionalProps: { onEdit: onPrev, disabled: isDeleting, boxProps: billingInfoItemBoxProps } }),
            React__default["default"].createElement(material.Divider, { sx: { mt: 2.5 } }),
            showSaved ? (React__default["default"].createElement(SavedPaymentDetailsSelector.SavedPaymentDetailsSelector, { showLoader: isDeleting, acceptedCreditCardNetworks: acceptedCreditCardNetworks, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodId: typeof selectedPaymentInfo === "string" ? selectedPaymentInfo : undefined, onNew: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onPaymentInfoSelected, onCvvSelected: onCvvSelected, onNext: onNext, onClose: onClose, onAttemptSubmit: handleFormAttemptSubmit, consentType: consentType })) : (React__default["default"].createElement(PaymentMethodForm.PaymentMethodForm, { acceptedPaymentTypes: acceptedPaymentTypes, acceptedCreditCardNetworks: acceptedCreditCardNetworks, defaultValues: typeof selectedPaymentInfo === "string" || selectedPaymentInfo === null ? undefined : selectedPaymentInfo, checkoutError: checkoutError, plaidLoading: plaidLoading, plaidError: plaidError, onPlaidLinkClicked: onPlaidLinkClicked, refetchPlaidLink: refetchPlaidLink, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit, onAttemptSubmit: handleFormAttemptSubmit, consentType: consentType, debug: debug }))),
        React__default["default"].createElement(material.Divider, { sx: { display: { xs: "block", md: "none" } } }),
        React__default["default"].createElement(CheckoutDeliveryAndItemCostBreakdown.CheckoutDeliveryAndItemCostBreakdown, { checkoutItems: checkoutItems, taxes: taxes, validatePersonalDeliveryAddress: formSubmitAttempted, wallets: wallets, wallet: wallet, onWalletChange: onWalletChange })));
};

exports.PaymentView = PaymentView;
//# sourceMappingURL=PaymentView.js.map
