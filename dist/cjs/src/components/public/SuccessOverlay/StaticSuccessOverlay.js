'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var SuccessView = require('../../../views/Success/SuccessView.js');
var CheckoutModalHeader = require('../../payments/CheckoutModalHeader/CheckoutModalHeader.js');
var FullScreenOverlay = require('../../shared/FullScreenOverlay/FullScreenOverlay.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const PUIStaticSuccessOverlay = (_a) => {
    var { logoSrc, logoSx } = _a, successViewProps = tslib_es6.__rest(_a, ["logoSrc", "logoSx"]);
    const headerElement = (React__default["default"].createElement(CheckoutModalHeader.CheckoutModalHeader, { variant: "purchasing", logoSrc: logoSrc, logoSx: logoSx }));
    return (React__default["default"].createElement(FullScreenOverlay.FullScreenOverlay, { isDialogBlocked: true, centered: true, header: headerElement },
        React__default["default"].createElement(SuccessView.SuccessView, Object.assign({}, successViewProps))));
};

exports.PUIStaticSuccessOverlay = PUIStaticSuccessOverlay;
//# sourceMappingURL=StaticSuccessOverlay.js.map
