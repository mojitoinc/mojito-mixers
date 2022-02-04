'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getFormattedUser(variant, user, userFormat) {
    if (user === void 0) { user = {}; }
    if (userFormat === void 0) { userFormat = "email"; }
    if (variant === "guest")
        return "Guest Checkout";
    return user[userFormat] || user.email || user.name || user.username || "Logged In User";
}

exports.getFormattedUser = getFormattedUser;
//# sourceMappingURL=CheckoutModalHeader.utils.js.map
