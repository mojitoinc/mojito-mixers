import React from "react";
import { render, screen } from "@testing-library/react";
import { CUSTOM_WALLET_OPTION, NEW_WALLET_OPTION } from "../../../../domain/wallet/wallet.constants";
import { DeliveryWalletSelector, DeliveryWalletSelectorProps } from "./DeliveryWalletSelector";

describe("DeliveryWalletSelector", () => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => { /* Do nothing */ },
    },
  });

  const customWalletLabel = "Once minted,";
  const walletAddress = "0xb794f5ea0ba39494ce839613fffba74279579268";

  let deliveryWalletSelectorProps: DeliveryWalletSelectorProps;

  beforeAll(() => {
    deliveryWalletSelectorProps = {
      wallet: "",
      onWalletChange: () => { /* Do nothing */ },
      validatePersonalAddress: false
    };
  });

  it("render wallet selector with new wallet option", async () => {
    render(<DeliveryWalletSelector { ...deliveryWalletSelectorProps } wallet="<NEW>" />);

    expect(screen.queryByText(NEW_WALLET_OPTION.label, { exact: false })).toBeInTheDocument();
    expect(screen.queryByText(customWalletLabel, { exact: false })).not.toBeInTheDocument();
  });

  it("render wallet selector with custom wallet option", async () => {
    render(<DeliveryWalletSelector { ...deliveryWalletSelectorProps } wallet={ walletAddress } />);

    expect(screen.queryByText(CUSTOM_WALLET_OPTION.label, { exact: false })).toBeInTheDocument();
    expect(screen.queryByText(customWalletLabel, { exact: false })).toBeInTheDocument();
  });

  it("render wallet selector with MultiSig wallet option", async () => {
    const TEST_WALLET = {
      id: "1",
      name: "Test Wallet",
      address: walletAddress,
      network: { id: "1", name: "Test Network" },
    };

    render(<DeliveryWalletSelector { ...deliveryWalletSelectorProps } wallet={ TEST_WALLET } wallets={ [TEST_WALLET] } />);

    expect(screen.getByText(walletAddress, { exact: false })).toBeInTheDocument();
    expect(screen.queryByText(customWalletLabel, { exact: false })).not.toBeInTheDocument();
  });
});
