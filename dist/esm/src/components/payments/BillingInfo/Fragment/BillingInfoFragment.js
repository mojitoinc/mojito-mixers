import React__default from 'react';
import Typography from '../../../../../node_modules/@mui/material/Typography/Typography.js';

const BillingInfoFragment = ({ savedPaymentMethod: { billingDetails: { name, address1, address2, city, district, postalCode, country, }, metadata: { email, phoneNumber }, }, }) => (React__default.createElement("div", { style: { display: "flex", flexDirection: 'column' } },
    React__default.createElement(Typography, { variant: "caption" }, name),
    address1 && React__default.createElement(Typography, { variant: "caption" }, address1),
    address2 && React__default.createElement(Typography, { variant: "caption" }, address2),
    React__default.createElement(Typography, { variant: "caption" }, [city, district.label, postalCode, country.label].filter(Boolean).join(", ")),
    React__default.createElement(Typography, { variant: "caption" }, email),
    React__default.createElement(Typography, { variant: "caption" }, phoneNumber)));

export { BillingInfoFragment };
//# sourceMappingURL=BillingInfoFragment.js.map
