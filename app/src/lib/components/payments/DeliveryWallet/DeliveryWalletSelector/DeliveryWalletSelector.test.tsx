import { render, screen } from '@testing-library/react'
import { DeliveryWalletSelector, DeliveryWalletSelectorProps } from './DeliveryWalletSelector'
describe('render payment components', () => {

  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => { console.debug('Copied!') },
    },
  })
  let walletDetails: DeliveryWalletSelectorProps;
  beforeAll(() => {
    walletDetails = {
      dictionary: {
        walletInfo: "",
        walletMultiSigTooltip: "",
        purchaseInstructions: [],
        wirePaymentsDisclaimer: [],
      },
      walletAddress: null,
      onWalletAddressChange: (walletAddress: string | null) => {
        console.log(walletAddress);
      },
      validatePersonalAddress: false
    }
  })

  it('render wallet selector with custom wallet option', async () => {
    const personalWalletLabel = 'Once minted,';
    render(<DeliveryWalletSelector {...walletDetails} />)
    expect(screen.queryByText(personalWalletLabel, { exact: false })).toBeNull()
  })

  it('render wallet selector whitout custom wallet option', async () => {
    const personalWalletLabel = 'Once minted,';
    const walletAddress = '0xb794f5ea0ba39494ce839613fffba74279579268';
    render(<DeliveryWalletSelector {...walletDetails} walletAddress={walletAddress} />)
    expect(screen.getByText(personalWalletLabel, { exact: false })).toBeInTheDocument()
  })
})
