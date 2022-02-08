import { InputGroupLabel } from '../InputGroupLabel/InputGroupLabel.js';
import default_1 from '../../../../node_modules/@mui/icons-material/Add.js';
import { StackList } from '../StackList/StackList.js';
import React__default, { useCallback } from 'react';
import { BillingInfoItem } from '../../payments/BillingInfo/Item/BillingInfoItem.js';
import { SecondaryButton } from '../SecondaryButton/SecondaryButton.js';
import { CheckoutModalFooter } from '../../payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { Box, CircularProgress } from '@mui/material';

var SavedBillingDetailsSelector = function SavedBillingDetailsSelector(_a) {
  var showLoader = _a.showLoader,
      savedPaymentMethods = _a.savedPaymentMethods,
      selectedPaymentMethodAddressId = _a.selectedPaymentMethodAddressId,
      onNew = _a.onNew,
      onEdit = _a.onEdit,
      onDelete = _a.onDelete,
      onPick = _a.onPick,
      onNext = _a.onNext,
      onClose = _a.onClose;
  var getPaymentMethodAddressId = useCallback(function (savedPaymentMethod) {
    return savedPaymentMethod.addressId;
  }, []);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Box, {
    sx: {
      position: "relative"
    }
  }, showLoader ? /*#__PURE__*/React__default.createElement(Box, {
    sx: {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.75)",
      zIndex: 100
    }
  }, /*#__PURE__*/React__default.createElement(CircularProgress, {
    color: "secondary"
  })) : null, /*#__PURE__*/React__default.createElement(InputGroupLabel, {
    sx: {
      mt: 2.5,
      mb: 1.5
    }
  }, "Saved Billing Info"), /*#__PURE__*/React__default.createElement(StackList, {
    data: savedPaymentMethods,
    additionalProps: function additionalProps(savedPaymentMethod) {
      return {
        active: savedPaymentMethod.addressId === selectedPaymentMethodAddressId,
        disabled: showLoader,
        onEdit: onEdit,
        onDelete: onDelete,
        onPick: onPick
      };
    },
    component: BillingInfoItem,
    itemKey: getPaymentMethodAddressId,
    deps: [onEdit, onDelete, onPick, selectedPaymentMethodAddressId, showLoader]
  }), /*#__PURE__*/React__default.createElement(SecondaryButton, {
    onClick: onNew,
    startIcon: /*#__PURE__*/React__default.createElement(default_1, null),
    sx: {
      mt: 2.5
    },
    disabled: showLoader
  }, "Add New Billing Info")), /*#__PURE__*/React__default.createElement(CheckoutModalFooter, {
    variant: "toPayment",
    onSubmitClicked: onNext,
    onCloseClicked: onClose
  }));
};

export { SavedBillingDetailsSelector };
//# sourceMappingURL=SavedBillingDetailsSelector.js.map
