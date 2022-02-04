import { __rest, __assign } from '../../../../node_modules/tslib/tslib.es6.js';
import { SvgIcon } from '@mui/material';
import { standaloneGetCardImageProps } from '../../../domain/payment/payment.utils.js';
import React__default from 'react';

var CREDIT_CARD_ICON_SX = { width: "35px", height: "24px" };
var SelectIcon = function (props) { return (React__default.createElement(SvgIcon, __assign({}, props),
    React__default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 16C11.8567 16 11.7195 15.9419 11.6198 15.8389L6.14917 10.1919C5.94573 9.98189 5.95105 9.64672 6.16105 9.44328C6.37105 9.23984 6.70622 9.24516 6.90966 9.45516L12 14.7097L17.0903 9.45516C17.2938 9.24516 17.6289 9.23984 17.839 9.44328C18.049 9.64672 18.0543 9.98189 17.8508 10.1919L12.3802 15.8389C12.2805 15.9419 12.1433 16 12 16Z", fill: "currentColor" }))); };
var CreditCardIcon = function (_a) {
    var network = _a.network, props = __rest(_a, ["network"]);
    return (React__default.createElement(SvgIcon, __assign({}, standaloneGetCardImageProps(network), props, { sx: __assign(__assign({}, CREDIT_CARD_ICON_SX), props.sx) })));
};

export { CREDIT_CARD_ICON_SX, CreditCardIcon, SelectIcon };
//# sourceMappingURL=Icons.js.map
