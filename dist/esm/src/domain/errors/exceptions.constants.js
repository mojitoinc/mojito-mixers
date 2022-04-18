const DEV_EXCEPTION_PREFIX = "(DEV)";
const EXCEPTIONS = {
    DEV: {
        // PUI Setup:
        THEME_PROVIDER: `${DEV_EXCEPTION_PREFIX} You can't use both \`themeOptions\` and \`theme\`. Please, use only one. \`themeOptions\` is preferred.`,
        APOLLO_PROVIDER_DUPLICATE: `${DEV_EXCEPTION_PREFIX} You can't use both \`apolloClient\` and \`uri\`. Please, use only one. \`uri\` is preferred.`,
        APOLLO_PROVIDER_MISSING: `${DEV_EXCEPTION_PREFIX} You must set \`apolloClient\` or \`uri\`. Please, add one. \`uri\` is preferred.`,
        // Thrown from useEncryptCardData hook:
        ENCRYPTION_KEYS_MISSING: `${DEV_EXCEPTION_PREFIX} Missing \`publicKey\` or \`keyID\`.`,
    },
    PAYMENT_METHOD: {
        UNSUPPORTED: "Unsupported payment method.",
        CREATION_FAILED: "Payment method could not be created.",
        VALIDATION_FAILED: "Payment method could not be validated.",
        VALIDATION_TIMEOUT: "Payment method validation took too long.",
    },
};

export { DEV_EXCEPTION_PREFIX, EXCEPTIONS };
//# sourceMappingURL=exceptions.constants.js.map
