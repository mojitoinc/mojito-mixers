'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Used to limit text width in PaymentView's disclaimer text and PurchasingView's loading text:
const XS_MOBILE_MAX_WIDTH = 320;
const SM_MOBILE_MAX_WIDTH = 400;
// There's theme.shape.borderRadius, but it's a single value:
const SM_BORDER_RADIUS = 2;
const MD_BORDER_RADIUS = 4;
const ROUNDED_BORDER_RADIUS = 1024;
// TODO: Not used everywhere, changing it won't work as expected:
const BORDER_THICKNESS = 1;
// Used to cover the saved payment methods with a loader when deleting them:
const OVERLAY_OPACITY = 0.75;
// Images:
const DEFAULT_PURCHASING_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif";
const DEFAULT_ERROR_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-error-loader.gif";
const CIRCLE_LOGO_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/circle.png";

exports.BORDER_THICKNESS = BORDER_THICKNESS;
exports.CIRCLE_LOGO_IMAGE_SRC = CIRCLE_LOGO_IMAGE_SRC;
exports.DEFAULT_ERROR_IMAGE_SRC = DEFAULT_ERROR_IMAGE_SRC;
exports.DEFAULT_PURCHASING_IMAGE_SRC = DEFAULT_PURCHASING_IMAGE_SRC;
exports.MD_BORDER_RADIUS = MD_BORDER_RADIUS;
exports.OVERLAY_OPACITY = OVERLAY_OPACITY;
exports.ROUNDED_BORDER_RADIUS = ROUNDED_BORDER_RADIUS;
exports.SM_BORDER_RADIUS = SM_BORDER_RADIUS;
exports.SM_MOBILE_MAX_WIDTH = SM_MOBILE_MAX_WIDTH;
exports.XS_MOBILE_MAX_WIDTH = XS_MOBILE_MAX_WIDTH;
//# sourceMappingURL=themeConstants.js.map
