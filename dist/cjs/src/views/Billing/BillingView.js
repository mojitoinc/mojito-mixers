'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var material = require('@mui/material');
var CheckoutDeliveryAndItemCostBreakdown = require('../../components/payments/CheckoutDeliveryAndItemCostBreakdown/CheckoutDeliveryAndItemCostBreakdown.js');
var CheckoutStepper = require('../../components/payments/CheckoutStepper/CheckoutStepper.js');
var SavedBillingDetailsSelector = require('../../components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.js');
var circle_utils = require('../../domain/circle/circle.utils.js');
var BillingInfoForm = require('../../forms/BillingInfoForm.js');
var arrayUtils = require('../../utils/arrayUtils.js');
var useFormCheckoutError = require('../../hooks/useFormCheckoutError.js');
var graphqlGenerated = require('../../queries/graphqlGenerated.js');
var useCheckoutItemCostTotal = require('../../hooks/useCheckoutItemCostTotal.js');
var corre = require('@swyg/corre');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const BillingView = ({ vertexEnabled, checkoutItems, savedPaymentMethods: rawSavedPaymentMethods, selectedBillingInfo, wallets, wallet, checkoutError, onBillingInfoSelected, onTaxesChange, onSavedPaymentMethodDeleted, onWalletChange, onNext, onClose, consentType, debug, }) => {
    const savedPaymentMethodAddressIdRef = React.useRef("");
    const savedPaymentMethods = React.useMemo(() => arrayUtils.distinctBy(rawSavedPaymentMethods, "addressId"), [rawSavedPaymentMethods]);
    const { total: subtotal, fees } = useCheckoutItemCostTotal.useCheckoutItemsCostTotal(checkoutItems);
    const total = subtotal + fees;
    const [{ isDeleting, showSaved, taxes }, setViewState] = React.useState({
        isDeleting: false,
        showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string" && !useFormCheckoutError.checkNeedsGenericErrorMessage("billing", checkoutError),
        taxes: vertexEnabled ? { status: "incomplete" } : null,
    });
    const [formSubmitAttempted, setFormSubmitAttempted] = React.useState(false);
    const [getTaxQuote] = graphqlGenerated.useGetTaxQuoteLazyQuery();
    const getTaxQuoteTimestampRef = React.useRef(0);
    React.useEffect(() => {
        return () => {
            // To discard the result below that might come after the component has been unmounted:
            getTaxQuoteTimestampRef.current = 0;
        };
    }, []);
    const calculateTaxes = React.useCallback((taxInfo) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const calledAt = getTaxQuoteTimestampRef.current;
        let invalidZipCode = false;
        const result = yield getTaxQuote({
            variables: {
                input: {
                    taxablePrice: total,
                    address: {
                        street1: taxInfo.street,
                        city: taxInfo.city,
                        postalCode: taxInfo.zipCode,
                        country: `${taxInfo.country.value}`,
                        state: `${taxInfo.state.value}`,
                    },
                },
            },
        }).catch((err) => {
            invalidZipCode = /invalid zipcode/i.test(err.message);
            return { data: null };
        });
        // Discard stale result:
        if (calledAt !== getTaxQuoteTimestampRef.current)
            return;
        const taxResult = ((_a = result.data) === null || _a === void 0 ? void 0 : _a.getTaxQuote) || {};
        const hasVerifiedAddress = !!taxResult.verifiedAddress;
        const zipPlusFour = ((_b = taxResult.verifiedAddress) === null || _b === void 0 ? void 0 : _b.postalCode) || "";
        if (zipPlusFour)
            invalidZipCode || (invalidZipCode = !zipPlusFour.startsWith(taxInfo.zipCode));
        setViewState((prevViewState) => (Object.assign(Object.assign({}, prevViewState), { taxes: hasVerifiedAddress ? {
                status: invalidZipCode ? "error" : "complete",
                invalidZipCode,
                taxRate: 100 * taxResult.totalTaxAmount / taxResult.taxablePrice,
                taxAmount: taxResult.totalTaxAmount,
            } : {
                status: "error",
                invalidZipCode,
            } })));
    }), [getTaxQuote, total]);
    const handleThrottledTaxInfoChange = corre.useThrottledCallback((taxInfo) => {
        var _a, _b;
        if (!vertexEnabled)
            return;
        if (!taxInfo.street || !taxInfo.city || !taxInfo.zipCode || !((_a = taxInfo.country) === null || _a === void 0 ? void 0 : _a.value) || !((_b = taxInfo.state) === null || _b === void 0 ? void 0 : _b.value)) {
            setViewState((prevViewState) => { var _a; return ((_a = prevViewState.taxes) === null || _a === void 0 ? void 0 : _a.status) === "incomplete" ? prevViewState : (Object.assign(Object.assign({}, prevViewState), { taxes: { status: "incomplete" } })); });
            return;
        }
        calculateTaxes(taxInfo);
    }, 1000, [calculateTaxes, vertexEnabled]);
    const handleTaxInfoChange = React.useCallback((taxInfo) => {
        if (!vertexEnabled)
            return;
        setViewState((prevViewState) => { var _a; return ((_a = prevViewState.taxes) === null || _a === void 0 ? void 0 : _a.status) === "loading" ? prevViewState : (Object.assign(Object.assign({}, prevViewState), { taxes: { status: "loading" } })); });
        getTaxQuoteTimestampRef.current = Date.now();
        handleThrottledTaxInfoChange(taxInfo);
    }, [vertexEnabled, handleThrottledTaxInfoChange]);
    React.useEffect(() => {
        if (!vertexEnabled)
            return;
        if (selectedBillingInfo && showSaved) {
            const savedPaymentMethodData = typeof selectedBillingInfo === "string"
                ? savedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo) : null;
            const billingInfo = savedPaymentMethodData
                ? circle_utils.savedPaymentMethodToBillingInfo(savedPaymentMethodData)
                : (typeof selectedBillingInfo === "string" ? null : selectedBillingInfo);
            setViewState((prevViewState) => (Object.assign(Object.assign({}, prevViewState), { taxes: { status: billingInfo ? "loading" : "error" } })));
            if (billingInfo) {
                getTaxQuoteTimestampRef.current = Date.now();
                calculateTaxes(billingInfo);
            }
        }
        else {
            setViewState((prevViewState) => (Object.assign(Object.assign({}, prevViewState), { taxes: { status: selectedBillingInfo ? "loading" : "incomplete" } })));
        }
    }, [vertexEnabled, selectedBillingInfo, savedPaymentMethods, showSaved, calculateTaxes]);
    React.useEffect(() => {
        if (taxes)
            onTaxesChange(taxes);
    }, [onTaxesChange, taxes]);
    const handleShowForm = React.useCallback((savedPaymentMethodAddressId) => {
        if (savedPaymentMethodAddressId && typeof savedPaymentMethodAddressId === "string") {
            savedPaymentMethodAddressIdRef.current = savedPaymentMethodAddressId;
            const data = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);
            if (data)
                onBillingInfoSelected(circle_utils.savedPaymentMethodToBillingInfo(data));
        }
        else {
            onBillingInfoSelected("");
        }
        setViewState({ isDeleting: false, showSaved: false, taxes: vertexEnabled ? { status: "loading" } : null });
    }, [onBillingInfoSelected, savedPaymentMethods, vertexEnabled]);
    const handleShowSaved = React.useCallback(() => {
        const savedPaymentMethodAddressId = savedPaymentMethodAddressIdRef.current;
        if (savedPaymentMethodAddressId)
            onBillingInfoSelected(savedPaymentMethodAddressId);
        setViewState({ isDeleting: false, showSaved: true, taxes: vertexEnabled ? { status: "loading" } : null });
    }, [onBillingInfoSelected, vertexEnabled]);
    const handleSubmit = React.useCallback((data) => {
        if (taxes && taxes.status !== "complete")
            return;
        const savedPaymentMethodAddressId = circle_utils.getSavedPaymentMethodAddressIdFromBillingInfo(data);
        const savedPaymentMethodData = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);
        onBillingInfoSelected(savedPaymentMethodData ? savedPaymentMethodAddressId : data);
        onNext();
    }, [savedPaymentMethods, onBillingInfoSelected, onNext, taxes]);
    const handleSavedPaymentMethodDeleted = React.useCallback((savedPaymentMethodId) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        setViewState(({ taxes }) => ({ isDeleting: true, showSaved: true, taxes }));
        yield onSavedPaymentMethodDeleted(savedPaymentMethodId);
        const remainingPaymentMethods = savedPaymentMethods.length - savedPaymentMethods.filter(({ addressId }) => addressId === savedPaymentMethodId).length;
        setViewState(({ taxes }) => ({ isDeleting: false, showSaved: remainingPaymentMethods > 0, taxes }));
    }), [onSavedPaymentMethodDeleted, savedPaymentMethods]);
    const handleFormAttemptSubmit = React.useCallback(() => setFormSubmitAttempted(true), []);
    React.useEffect(() => {
        const selectedPaymentInfoMatch = typeof selectedBillingInfo === "string" && savedPaymentMethods.some(({ addressId }) => addressId === selectedBillingInfo);
        if (showSaved && !selectedPaymentInfoMatch && savedPaymentMethods.length > 0 /* && !checkoutError */) {
            onBillingInfoSelected(savedPaymentMethods[0].addressId);
        }
    }, [showSaved, savedPaymentMethods, selectedBillingInfo, onBillingInfoSelected /*, checkoutError*/]);
    return (React__default["default"].createElement(material.Stack, { direction: { xs: "column", md: "row" }, spacing: { xs: 0, md: 3.75 } },
        React__default["default"].createElement(material.Stack, { sx: { display: "flex", overflow: "hidden", width: (theme) => ({ xs: "100%", md: `calc(50% - ${theme.spacing(3.75 / 2)})` }) } },
            React__default["default"].createElement(CheckoutStepper.CheckoutStepper, { progress: 50 }),
            showSaved ? (React__default["default"].createElement(SavedBillingDetailsSelector.SavedBillingDetailsSelector, { showLoader: isDeleting, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodAddressId: typeof selectedBillingInfo === "string" ? selectedBillingInfo : undefined, taxes: taxes, onNew: handleShowForm, onEdit: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onBillingInfoSelected, onNext: onNext, onClose: onClose, onAttemptSubmit: handleFormAttemptSubmit, consentType: consentType === "checkbox" ? undefined : consentType })) : (React__default["default"].createElement(BillingInfoForm.BillingInfoForm
            // variant="loggedIn"
            , { 
                // variant="loggedIn"
                defaultValues: typeof selectedBillingInfo === "string" ? undefined : selectedBillingInfo, checkoutError: checkoutError, taxes: taxes, onTaxInfoChange: handleTaxInfoChange, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit, onAttemptSubmit: handleFormAttemptSubmit, consentType: consentType === "checkbox" ? undefined : consentType, debug: debug }))),
        React__default["default"].createElement(material.Divider, { sx: { display: { xs: "block", md: "none" } } }),
        React__default["default"].createElement(CheckoutDeliveryAndItemCostBreakdown.CheckoutDeliveryAndItemCostBreakdown, { checkoutItems: checkoutItems, taxes: vertexEnabled ? taxes : null, validatePersonalDeliveryAddress: formSubmitAttempted, wallets: wallets, wallet: wallet, onWalletChange: onWalletChange })));
};

exports.BillingView = BillingView;
//# sourceMappingURL=BillingView.js.map
