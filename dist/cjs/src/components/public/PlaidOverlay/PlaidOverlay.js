'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var plaid_utils = require('../../../domain/plaid/plaid.utils.js');
var ProvidersInjector = require('../../shared/ProvidersInjector/ProvidersInjector.js');

const PUIPlaidOverlay = ({ onRedirect, }) => {
    const { continueOAuthFlow, url } = plaid_utils.getPlaidOAuthFlowState();
    React.useLayoutEffect(() => {
        if (continueOAuthFlow) {
            plaid_utils.persistPlaidReceivedRedirectUri(window.location.href);
        }
        onRedirect(url || "/");
    }, [continueOAuthFlow, onRedirect, url]);
    return null;
};
const PUIPlaid = ProvidersInjector.withProviders(PUIPlaidOverlay);

exports.PUIPlaid = PUIPlaid;
exports.PUIPlaidOverlay = PUIPlaidOverlay;
//# sourceMappingURL=PlaidOverlay.js.map
