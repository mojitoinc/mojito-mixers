import React__default from 'react';
import Typography from '../../../../../node_modules/@mui/material/Typography/Typography.js';

var BillingInfoFragment = function BillingInfoFragment(_a) {
  var _b = _a.savedPaymentMethod,
      _c = _b.billingDetails,
      name = _c.name,
      address1 = _c.address1,
      address2 = _c.address2,
      city = _c.city,
      district = _c.district,
      postalCode = _c.postalCode,
      country = _c.country,
      _d = _b.metadata,
      email = _d.email,
      phoneNumber = _d.phoneNumber;
  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React__default.createElement(Typography, {
    variant: "caption"
  }, name), address1 && /*#__PURE__*/React__default.createElement(Typography, {
    variant: "caption"
  }, address1), address2 && /*#__PURE__*/React__default.createElement(Typography, {
    variant: "caption"
  }, address2), /*#__PURE__*/React__default.createElement(Typography, {
    variant: "caption"
  }, [city, district.label, postalCode, country.label].filter(Boolean).join(", ")), /*#__PURE__*/React__default.createElement(Typography, {
    variant: "caption"
  }, email), /*#__PURE__*/React__default.createElement(Typography, {
    variant: "caption"
  }, phoneNumber));
};

export { BillingInfoFragment };
//# sourceMappingURL=BillingInfoFragment.js.map
