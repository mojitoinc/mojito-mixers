import React__default from 'react';
import { Link, Tooltip } from '@mui/material';

const walletMultiSigTooltip = React__default.createElement(React__default.Fragment, null,
    "If you don\u2019t already have a wallet, we will create a ",
    React__default.createElement(Link, { href: "https://gnosis-safe.io/", target: "_blank", rel: "noopener noreferrer" }, "Gnosis Safe MultiSig"),
    " for you to receive your NFT. A MultiSig wallet is used for storing blockchain assets (crypto or NFTs) and enables \u201Cmultiple signatures\u201D to control access. You can transfer your NFTs from your MultiSig wallet to any self-hosted wallet at any time.");
const walletMultiSigShortTooltip = React__default.createElement(React__default.Fragment, null, "A MultiSig wallet is used for storing blockchain assets (crypto or NFTs) and enables \u201Cmultiple signatures\u201D to control access. You can transfer your NFTs from your MultiSig wallet to any self-hosted wallet at any time.");
const multiSigElement = (React__default.createElement(Tooltip, { title: walletMultiSigShortTooltip },
    React__default.createElement(Link, { sx: { color: "text.primary" } }, "MultiSig")));
const DEFAULT_DICTIONARY = {
    walletInfo: React__default.createElement(React__default.Fragment, null,
        "We will cover gas cost for minting and delivery on both ",
        multiSigElement,
        " and self-hosted wallets. Your items will be delivered to your ",
        multiSigElement,
        " wallet by default. If you do not have a Mojito ",
        multiSigElement,
        " wallet yet, we will automatically create one for you."),
    walletMultiSigTooltip,
    wirePaymentsDisclaimer: [React__default.createElement(React__default.Fragment, null,
            React__default.createElement("strong", null, "Third-party wire transfers cannot be accepted. "),
            "Your bank account name needs to match with the name you used to create your user account."), React__default.createElement(React__default.Fragment, null,
            "Please note that wire transfers usually take ",
            React__default.createElement("strong", null, "1-3 business days"),
            " to arrive. We do not charge any deposit fee \u2014 however, your bank may charge you a wire transfer fee.")],
    purchaseInstructions: [
        "After the sale is closed, you’ll receive your NFTs to your chosen wallet.",
    ],
};

export { DEFAULT_DICTIONARY };
//# sourceMappingURL=dictionary.constants.js.map
