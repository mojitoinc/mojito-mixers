import { __assign, __awaiter, __generator } from '../../node_modules/tslib/tslib.es6.js';
import { useForm } from 'react-hook-form';
import { yupResolver as o } from '../../node_modules/@hookform/resolvers/yup/dist/yup.mjs.js';
import { string, object, boolean } from 'yup';
import default_1 from '../../node_modules/@mui/icons-material/Book.js';
import React__default, { useMemo, useCallback } from 'react';
import { CheckoutModalFooter } from '../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { ControlledTextField } from '../components/shared/TextField/TextField.js';
import { ControlledCardNumberField } from '../components/shared/CardNumberField/CardNumberField.js';
import { ControlledCardExpiryDateField } from '../components/shared/CardExpiryDateField/CardExpiryDateField.js';
import { ControlledCardSecureCodeField } from '../components/shared/CardSecureCodeField/CardSecureCodeField.js';
import { InputGroupLabel } from '../components/shared/InputGroupLabel/InputGroupLabel.js';
import { SecondaryButton } from '../components/shared/SecondaryButton/SecondaryButton.js';
import { PaymentMethodSelector } from '../components/shared/PaymentMethodSelector/PaymentMethodSelector.js';
import { withInvalidErrorMessage, requireSchemaWhenKeyIs } from '../utils/validationUtils.js';
import { getCardNumberIsValid, getExpiryDateIsvalid, getCVCIsValid } from '../domain/payment/payment.utils.js';
import { Typography } from '@mui/material';
import { DisplayBox, DebugBox } from '../components/payments/DisplayBox/DisplayBox.js';
import { ControlledCheckbox } from '../components/shared/Checkbox/Checkbox.js';
import { ConsentText, CONSENT_ERROR_MESSAGE } from '../components/shared/ConsentText/ConsentText.js';
import Grid from '../../node_modules/@mui/material/Grid/Grid.js';
import Box from '../../node_modules/@mui/material/Box/Box.js';

var FIELD_LABELS = {
  cardNumber: "Card Number",
  expiryDate: "Expiry Date",
  secureCode: "Secure Code",
  nameOnCard: "Name on Card"
};
var isCreditCardThenRequireSchema = requireSchemaWhenKeyIs("CreditCard");
var PAYMENT_TYPE_FORM_DATA = {
  CreditCard: {
    defaultValues: function defaultValues(consentType) {
      return {
        type: "CreditCard",
        cardNumber: "",
        expiryDate: "",
        secureCode: "",
        nameOnCard: "",
        consent: consentType === "checkbox" ? false : true
      };
    },
    schemaShape: {
      cardNumber: string().label(FIELD_LABELS.cardNumber).when("type", {
        is: "CreditCard",
        then: function then(schema) {
          return schema.required().test({
            name: "is-valid-card-number",
            test: getCardNumberIsValid,
            message: withInvalidErrorMessage
          });
        }
      }),
      expiryDate: string().label(FIELD_LABELS.expiryDate).when("type", {
        is: "CreditCard",
        then: function then(schema) {
          return schema.required().test({
            name: "is-valid-expiry-date",
            test: getExpiryDateIsvalid,
            message: withInvalidErrorMessage
          });
        }
      }),
      secureCode: string().label(FIELD_LABELS.secureCode).when("type", {
        is: "CreditCard",
        then: function then(schema) {
          return schema.required().test({
            name: "is-valid-cvv-or-cid-number",
            test: function test(value, context) {
              return getCVCIsValid(value, context.parent.cardNumber);
            },
            message: withInvalidErrorMessage
          });
        }
      }),
      nameOnCard: string().label(FIELD_LABELS.nameOnCard).when("type", isCreditCardThenRequireSchema)
    },
    fields: function fields(_a) {
      var control = _a.control,
          consentType = _a.consentType,
          privacyHref = _a.privacyHref,
          termsOfUseHref = _a.termsOfUseHref;
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ControlledCardNumberField, {
        name: "cardNumber",
        control: control,
        label: FIELD_LABELS.cardNumber
      }), /*#__PURE__*/React__default.createElement(Grid, {
        container: true,
        columnSpacing: 2,
        direction: {
          xs: "column",
          sm: "row"
        }
      }, /*#__PURE__*/React__default.createElement(Grid, {
        item: true,
        sm: 6,
        zeroMinWidth: true
      }, /*#__PURE__*/React__default.createElement(ControlledCardExpiryDateField, {
        name: "expiryDate",
        control: control,
        label: FIELD_LABELS.expiryDate
      })), /*#__PURE__*/React__default.createElement(Grid, {
        item: true,
        sm: 6
      }, /*#__PURE__*/React__default.createElement(ControlledCardSecureCodeField, {
        name: "secureCode",
        control: control,
        label: FIELD_LABELS.secureCode
      }))), /*#__PURE__*/React__default.createElement(ControlledTextField, {
        name: "nameOnCard",
        control: control,
        label: FIELD_LABELS.nameOnCard
      }), consentType === "checkbox" && /*#__PURE__*/React__default.createElement(ControlledCheckbox, {
        name: "consent",
        control: control,
        label: /*#__PURE__*/React__default.createElement(React__default.Fragment, null, "I ", /*#__PURE__*/React__default.createElement(ConsentText, {
          privacyHref: privacyHref,
          termsOfUseHref: termsOfUseHref
        }))
      }));
    }
  },
  ACH: {
    defaultValues: function defaultValues(consentType) {
      return {
        type: "ACH",
        accountId: "",
        publicToken: "",
        consent: consentType === "checkbox" ? false : true
      };
    },
    schemaShape: {},
    fields: function fields(_a) {
      var control = _a.control,
          consentType = _a.consentType,
          privacyHref = _a.privacyHref,
          termsOfUseHref = _a.termsOfUseHref;
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DisplayBox, {
        sx: {
          mt: 1.5,
          mb: consentType === "checkbox" ? 1 : 0
        }
      }, /*#__PURE__*/React__default.createElement(Typography, {
        variant: "body1"
      }, "We use Plaid to connect to your account.")), consentType === "checkbox" && /*#__PURE__*/React__default.createElement(ControlledCheckbox, {
        name: "consent",
        control: control,
        label: /*#__PURE__*/React__default.createElement(React__default.Fragment, null, "I ", /*#__PURE__*/React__default.createElement(ConsentText, {
          privacyHref: privacyHref,
          termsOfUseHref: termsOfUseHref
        }))
      }));
    }
  },
  Wire: {
    defaultValues: function defaultValues(consentType) {
      return {
        type: "Wire",
        consent: consentType === "checkbox" ? false : true
      };
    },
    schemaShape: {},
    fields: function fields(_a) {
      var control = _a.control,
          consentType = _a.consentType,
          privacyHref = _a.privacyHref,
          termsOfUseHref = _a.termsOfUseHref;
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DisplayBox, {
        sx: {
          mt: 1.5,
          mb: consentType === "checkbox" ? 1 : 0
        }
      }, /*#__PURE__*/React__default.createElement(Typography, {
        variant: "body1"
      }, "Not supported yet.")), consentType === "checkbox" && /*#__PURE__*/React__default.createElement(ControlledCheckbox, {
        name: "consent",
        control: control,
        label: /*#__PURE__*/React__default.createElement(React__default.Fragment, null, "I ", /*#__PURE__*/React__default.createElement(ConsentText, {
          privacyHref: privacyHref,
          termsOfUseHref: termsOfUseHref
        }))
      }));
    }
  },
  Crypto: {
    defaultValues: function defaultValues(consentType) {
      return {
        type: "Crypto",
        consent: consentType === "checkbox" ? false : true
      };
    },
    schemaShape: {},
    fields: function fields(_a) {
      var control = _a.control,
          consentType = _a.consentType,
          privacyHref = _a.privacyHref,
          termsOfUseHref = _a.termsOfUseHref;
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DisplayBox, {
        sx: {
          mt: 1.5,
          mb: consentType === "checkbox" ? 1 : 0
        }
      }, /*#__PURE__*/React__default.createElement(Typography, {
        variant: "body1"
      }, "Not supported yet.")), consentType === "checkbox" && /*#__PURE__*/React__default.createElement(ControlledCheckbox, {
        name: "consent",
        control: control,
        label: /*#__PURE__*/React__default.createElement(React__default.Fragment, null, "I ", /*#__PURE__*/React__default.createElement(ConsentText, {
          privacyHref: privacyHref,
          termsOfUseHref: termsOfUseHref
        }))
      }));
    }
  }
};
var PaymentMethodForm = function PaymentMethodForm(_a) {
  var acceptedPaymentTypes = _a.acceptedPaymentTypes,
      parentDefaultValues = _a.defaultValues,
      onPlaidLinkClicked = _a.onPlaidLinkClicked,
      onSaved = _a.onSaved,
      onClose = _a.onClose,
      onSubmit = _a.onSubmit,
      consentType = _a.consentType,
      privacyHref = _a.privacyHref,
      termsOfUseHref = _a.termsOfUseHref,
      _b = _a.debug,
      debug = _b === void 0 ? false : _b;
  var defaultPaymentType = acceptedPaymentTypes[0] || "CreditCard";
  var defaultPaymentTypeFormData = PAYMENT_TYPE_FORM_DATA[defaultPaymentType];
  var defaultPaymentTypeDefaultValues = defaultPaymentTypeFormData.defaultValues(consentType);
  var schema = useMemo(function () {
    return object().shape(__assign({
      type: string().required(),
      consent: boolean().oneOf([true], CONSENT_ERROR_MESSAGE)
    }, Object.values(PAYMENT_TYPE_FORM_DATA).reduce(function (objectShape, _a) {
      var schemaShape = _a.schemaShape;
      return __assign(__assign({}, objectShape), schemaShape);
    }, {})));
  }, []);

  var _c = useForm({
    defaultValues: __assign(__assign({}, defaultPaymentTypeDefaultValues), parentDefaultValues),
    reValidateMode: "onChange",
    resolver: o(schema)
  }),
      control = _c.control,
      handleSubmit = _c.handleSubmit,
      watch = _c.watch,
      reset = _c.reset,
      trigger = _c.trigger;

  var handleSelectedPaymentMethodChange = useCallback(function (paymentType) {
    reset(__assign({}, PAYMENT_TYPE_FORM_DATA[paymentType].defaultValues(consentType)));
  }, [reset, consentType]);
  var selectedPaymentMethod = watch("type");
  var Fields = PAYMENT_TYPE_FORM_DATA[selectedPaymentMethod].fields;
  var submitForm = handleSubmit(onSubmit);
  var handleFormSubmit = useCallback(function (e) {
    return __awaiter(void 0, void 0, void 0, function () {
      var isFormValid;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            e.preventDefault();
            if (!(selectedPaymentMethod === "ACH")) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , trigger()];

          case 1:
            isFormValid = _a.sent();

            if (!isFormValid) {
              submitForm(e);
              return [2
              /*return*/
              ];
            }

            onPlaidLinkClicked();
            return [3
            /*break*/
            , 3];

          case 2:
            if (selectedPaymentMethod === "CreditCard") {
              submitForm(e);
            }

            _a.label = 3;

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  }, [selectedPaymentMethod, onPlaidLinkClicked, submitForm, trigger]);
  return /*#__PURE__*/React__default.createElement("form", {
    onSubmit: handleFormSubmit
  }, onSaved && /*#__PURE__*/React__default.createElement(Box, {
    sx: {
      my: 2.5
    }
  }, /*#__PURE__*/React__default.createElement(SecondaryButton, {
    onClick: onSaved,
    startIcon: /*#__PURE__*/React__default.createElement(default_1, null)
  }, "Use Saved Payment Method")), acceptedPaymentTypes.length > 1 ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(InputGroupLabel, {
    sx: {
      m: 0,
      pt: 2,
      pb: 1.5
    }
  }, "Payment Method"), /*#__PURE__*/React__default.createElement(PaymentMethodSelector, {
    selectedPaymentMethod: selectedPaymentMethod,
    onPaymentMethodChange: handleSelectedPaymentMethodChange,
    paymentMethods: acceptedPaymentTypes
  })) : null, /*#__PURE__*/React__default.createElement(Fields, {
    control: control,
    consentType: consentType,
    privacyHref: privacyHref,
    termsOfUseHref: termsOfUseHref
  }), debug && /*#__PURE__*/React__default.createElement(DebugBox, {
    sx: {
      my: 2
    }
  }, JSON.stringify(watch(), null, 2)), /*#__PURE__*/React__default.createElement(CheckoutModalFooter, {
    variant: selectedPaymentMethod === "ACH" ? "toPlaid" : "toConfirmation",
    consentType: consentType === "checkbox" ? undefined : consentType,
    privacyHref: privacyHref,
    termsOfUseHref: termsOfUseHref,
    submitDisabled: selectedPaymentMethod === "Wire" || selectedPaymentMethod === "Crypto",
    onCloseClicked: onClose
  }));
};

export { PaymentMethodForm };
//# sourceMappingURL=PaymentMethodForm.js.map
