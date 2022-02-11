function getFormattedUser(variant, user = {}, userFormat = "email") {
    if (variant === "guest")
        return "Guest Checkout";
    return user[userFormat] || user.email || user.name || user.username || "Logged In User";
}

export { getFormattedUser };
//# sourceMappingURL=CheckoutModalHeader.utils.js.map
