import { useState, useEffect } from 'react';

function checkNeedsGenericErrorMessage(formKey, checkoutError) {
    return checkoutError && checkoutError.circleFieldErrors && ((formKey === "billing" && !checkoutError.circleFieldErrors.payment) ||
        (formKey === "payment" && !checkoutError.circleFieldErrors.billing));
}
function useFormCheckoutError({ formKey, checkoutError, fields, setError, deps = [], }) {
    const [genericErrorMessage, setGenericErrorMessage] = useState("");
    useEffect(() => {
        var _a;
        let needsGenericErrorMessage = checkNeedsGenericErrorMessage(formKey, checkoutError);
        const fieldErrors = ((_a = checkoutError === null || checkoutError === void 0 ? void 0 : checkoutError.circleFieldErrors) === null || _a === void 0 ? void 0 : _a[formKey]) || {};
        if (fieldErrors) {
            Object.entries(fieldErrors).forEach(([inputName, message]) => {
                if (!fields.includes(inputName))
                    return;
                needsGenericErrorMessage = false;
                setError(inputName, { type: "manual", message });
            });
        }
        // Only show the generic error message at the bottom of the form if we could not match any error to a specific
        // input field:
        setGenericErrorMessage(needsGenericErrorMessage ? ((checkoutError === null || checkoutError === void 0 ? void 0 : checkoutError.errorMessage) || "") : "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formKey, checkoutError, fields, setError, ...deps]);
    return genericErrorMessage;
}

export { checkNeedsGenericErrorMessage, useFormCheckoutError };
//# sourceMappingURL=useFormCheckoutError.js.map
