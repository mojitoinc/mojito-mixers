import { useLayoutEffect } from 'react';
import { getPlaidOAuthFlowState, persistPlaidReceivedRedirectUri } from '../../../domain/plaid/plaid.utils.js';
import { withThemeProvider } from '../../shared/ProvidersInjector/ProvidersInjector.js';

const PUIPlaidOverlay = ({ onRedirect, }) => {
    const { continueOAuthFlow, url } = getPlaidOAuthFlowState();
    useLayoutEffect(() => {
        if (continueOAuthFlow) {
            persistPlaidReceivedRedirectUri(window.location.href);
        }
        onRedirect(url || "/");
    }, [continueOAuthFlow, onRedirect, url]);
    return null;
};
const PUIPlaid = withThemeProvider(PUIPlaidOverlay);

export { PUIPlaid, PUIPlaidOverlay };
//# sourceMappingURL=PlaidOverlay.js.map
