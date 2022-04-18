'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ProvidersInjector = require('../../shared/ProvidersInjector/ProvidersInjector.js');
var CheckoutOverlay_utils = require('../CheckoutOverlay/CheckoutOverlay.utils.js');

const PUIPlaidOverlay = ({ onRedirect, }) => {
    const { continueFlow, url } = CheckoutOverlay_utils.getCheckoutModalState(true);
    React.useLayoutEffect(() => {
        if (continueFlow) {
            CheckoutOverlay_utils.persistCheckoutModalInfoRedirectURI(window.location.href);
        }
        onRedirect(url || "/");
    }, [continueFlow, onRedirect, url]);
    return null;
};
const PUIPlaid = ProvidersInjector.withThemeProvider(PUIPlaidOverlay);

exports.PUIPlaid = PUIPlaid;
exports.PUIPlaidOverlay = PUIPlaidOverlay;
//# sourceMappingURL=PlaidOverlay.js.map
