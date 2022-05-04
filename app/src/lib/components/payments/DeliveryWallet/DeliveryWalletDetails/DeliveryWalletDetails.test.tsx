import React from "react";
import { render, screen } from "@testing-library/react";
import { DeliveryWalletDetails, DeliveryWalletDetailsProps } from "./DeliveryWalletDetails";

describe("DeliveryWalletDetails", () => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => { /* Do nothing */ },
    },

  });
  const walletAddress = "0xb794f5ea0ba39494ce839613fffba74279579268";

  let deliveryWalletDetailsProps: DeliveryWalletDetailsProps;

  beforeAll(() => {
    deliveryWalletDetailsProps = {
      wallet: walletAddress,
    };
  });

  it("render wallet details", async () => {
    render(<DeliveryWalletDetails {...deliveryWalletDetailsProps} />);

    const button = await screen.getByLabelText("Copy Wallet Address");

    button.click();

    expect(screen.getByDisplayValue(walletAddress)).toBeInTheDocument();
    expect(screen.queryByText("Copied", { exact: false })).toBeInTheDocument();
  })
})
