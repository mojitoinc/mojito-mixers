import { render, screen } from '@testing-library/react'
import { DeliveryWalletDetails, DeliveryWalletDetailsProps } from './DeliveryWalletDetails'
describe('render payment components', () => {

  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => { console.debug('Copied!') },
    },
  })
  let walletDetails: DeliveryWalletDetailsProps;
  beforeAll(() => {
    walletDetails = {
      dictionary: {
        purchaseInstructions: [],
        walletInfo: [],
        walletMultiSigTooltip: '',
        wirePaymentsDisclaimer: []
      },
      walletAddress: '1231312312312',
      wallets: []
    }
  })

  it('render wallet details', async () => {
    render(<DeliveryWalletDetails {...walletDetails} />)

    const button = await screen.getByLabelText('Copy Wallet Address')
    button.click()
    expect(screen.getByDisplayValue(walletDetails.walletAddress)).toBeInTheDocument()
    expect(screen.getByText('Copied', { exact: false })).toBeInTheDocument()
  })
})
