'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var material = require('@mui/material');
var CheckoutItemCostBreakdown = require('../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js');
var CheckoutStepper = require('../../components/payments/CheckoutStepper/CheckoutStepper.js');
var SavedBillingDetailsSelector = require('../../components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.js');
var circle_utils = require('../../domain/circle/circle.utils.js');
var BillingInfoForm = require('../../forms/BillingInfoForm.js');
var arrayUtils = require('../../utils/arrayUtils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const BillingView = ({ checkoutItems, savedPaymentMethods: rawSavedPaymentMethods, selectedBillingInfo, onBillingInfoSelected, onSavedPaymentMethodDeleted, onNext, onClose, debug, }) => {
    const savedPaymentMethodAddressIdRef = React.useRef("");
    const savedPaymentMethods = React.useMemo(() => arrayUtils.distinctBy(rawSavedPaymentMethods, "addressId"), [rawSavedPaymentMethods]);
    const [{ isDeleting, showSaved }, setViewState] = React.useState({
        isDeleting: false,
        showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string",
    });
    const handleShowForm = React.useCallback((savedPaymentMethodAddressId) => {
        if (savedPaymentMethodAddressId && typeof savedPaymentMethodAddressId === "string") {
            savedPaymentMethodAddressIdRef.current = savedPaymentMethodAddressId;
            const data = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);
            if (data)
                onBillingInfoSelected(circle_utils.savedPaymentMethodToBillingInfo(data));
        }
        setViewState({ isDeleting: false, showSaved: false });
    }, [onBillingInfoSelected, savedPaymentMethods]);
    const handleShowSaved = React.useCallback(() => {
        const savedPaymentMethodAddressId = savedPaymentMethodAddressIdRef.current;
        if (savedPaymentMethodAddressId)
            onBillingInfoSelected(savedPaymentMethodAddressId);
        setViewState({ isDeleting: false, showSaved: true });
    }, [onBillingInfoSelected]);
    const handleSubmit = React.useCallback((data) => {
        const savedPaymentMethodAddressId = circle_utils.getSavedPaymentMethodAddressIdFromBillingInfo(data);
        const savedPaymentMethodData = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);
        onBillingInfoSelected(savedPaymentMethodData ? savedPaymentMethodAddressId : data);
        onNext();
    }, [savedPaymentMethods, onBillingInfoSelected, onNext]);
    const handleSavedPaymentMethodDeleted = React.useCallback((savedPaymentMethodId) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        setViewState({ isDeleting: true, showSaved: true });
        yield onSavedPaymentMethodDeleted(savedPaymentMethodId);
        const remainingPaymentMethods = savedPaymentMethods.length - savedPaymentMethods.filter(({ addressId }) => addressId === savedPaymentMethodId).length;
        setViewState({ isDeleting: false, showSaved: remainingPaymentMethods > 0 });
    }), [onSavedPaymentMethodDeleted, savedPaymentMethods]);
    React.useEffect(() => {
        const selectedPaymentInfoMatch = typeof selectedBillingInfo === "string" && savedPaymentMethods.some(({ addressId }) => addressId === selectedBillingInfo);
        if (showSaved && savedPaymentMethods.length > 0 && !selectedPaymentInfoMatch) {
            onBillingInfoSelected(savedPaymentMethods[0].addressId);
        }
    }, [showSaved, savedPaymentMethods, selectedBillingInfo, onBillingInfoSelected]);
    return (React__default["default"].createElement(material.Stack, { direction: {
            xs: "column",
            sm: "column",
            md: "row",
        }, spacing: 8.75 },
        React__default["default"].createElement(material.Stack, { sx: { display: 'flex', flex: 1 } },
            React__default["default"].createElement(CheckoutStepper.CheckoutStepper, { progress: 50 }),
            showSaved ? (React__default["default"].createElement(SavedBillingDetailsSelector.SavedBillingDetailsSelector, { showLoader: isDeleting, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodAddressId: typeof selectedBillingInfo === "string" ? selectedBillingInfo : undefined, onNew: handleShowForm, onEdit: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onBillingInfoSelected, onNext: onNext, onClose: onClose })) : (React__default["default"].createElement(BillingInfoForm.BillingInfoForm
            // variant="loggedIn"
            , { 
                // variant="loggedIn"
                defaultValues: typeof selectedBillingInfo === "string" ? undefined : selectedBillingInfo, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit, debug: debug }))),
        React__default["default"].createElement(CheckoutItemCostBreakdown.CheckoutItemCostBreakdown, { checkoutItems: checkoutItems })));
};

exports.BillingView = BillingView;
//# sourceMappingURL=BillingView.js.map
