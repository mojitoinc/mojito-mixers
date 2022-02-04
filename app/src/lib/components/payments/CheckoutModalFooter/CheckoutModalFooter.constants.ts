import { SvgIcon } from "@mui/material";
import { CheckoutModalFooterVariant } from "./CheckoutModalFooter";
import LockIcon from '@mui/icons-material/Lock';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const LABELS_BY_VARIANT: Record<CheckoutModalFooterVariant, string> = {
  toGuestCheckout: "Guest Check Out",
  toPayment: "Continue to Payment",
  toConfirmation: "Purchase",
  toPlaid: "Purchase with Plaid",
  toForm: "Review Payment Information",
  toMarketplace: "Back to Marketplace",
};

export const ICONS_BY_VARIANT: Record<CheckoutModalFooterVariant, typeof SvgIcon | null> = {
  toGuestCheckout: null,
  toPayment: ChevronRightIcon,
  toConfirmation: LockIcon,
  toPlaid: LockIcon,
  toForm: null,
  toMarketplace: null,
};
