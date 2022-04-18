import { useLayoutEffect } from 'react';
import { withThemeProvider } from '../../shared/ProvidersInjector/ProvidersInjector.js';
import { getCheckoutModalState, persistCheckoutModalInfoRedirectURI } from '../CheckoutOverlay/CheckoutOverlay.utils.js';

const PUIPlaidOverlay = ({ onRedirect, }) => {
    const { continueFlow, url } = getCheckoutModalState(true);
    useLayoutEffect(() => {
        if (continueFlow) {
            persistCheckoutModalInfoRedirectURI(window.location.href);
        }
        onRedirect(url || "/");
    }, [continueFlow, onRedirect, url]);
    return null;
};
const PUIPlaid = withThemeProvider(PUIPlaidOverlay);

export { PUIPlaid, PUIPlaidOverlay };
//# sourceMappingURL=PlaidOverlay.js.map
