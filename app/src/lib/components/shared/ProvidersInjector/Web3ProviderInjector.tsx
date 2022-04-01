import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from "@web3-react/core"
import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import type { Connector } from "@web3-react/types"
import { WalletConnect } from "@web3-react/walletconnect"
import { coinbaseWallet, hooks as coinbaseWalletHooks } from "../connectors/coinbaseWallet"
import { hooks as metaMaskHooks, metaMask } from "../connectors/metaMask"
import { hooks as networkHooks, network } from "../connectors/network"
import { hooks as walletConnectHooks, walletConnect } from "../connectors/walletConnect"
import { provider as Provider } from "web3-core";
import Web3 from "web3";

function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask";
  if (connector instanceof WalletConnect) return "WalletConnect";
  if (connector instanceof CoinbaseWallet) return "Coinbase Wallet";
  if (connector instanceof Network) return "Network";

  return "Unknown";
}

function getLibrary(provider: Provider) {
  return new Web3(provider);
}

const connectors: [MetaMask | WalletConnect | CoinbaseWallet | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
  [network, networkHooks],
]

function Child() {
  const { connector } = useWeb3React();

  console.log(`Priority Connector is: ${getName(connector)}`);

  return null
}

export default function Web3Provider() {
  return (
    <Web3ReactProvider getLibrary={ getLibrary } /*connectors={connectors}*/>
      <Child />
    </Web3ReactProvider>
  )
}
