import { SvgIcon } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CheckoutModalFooterVariant } from "./CheckoutModalFooter";

export const LABELS_BY_VARIANT: Record<CheckoutModalFooterVariant, string> = {
  toGuestCheckout: "Guest Check Out",
  toPayment: "Continue to Payment",
  toConfirmation: "Purchase",
  toPlaid: "Purchase with Plaid",
  toReview: "Review Information",
  toMarketplace: "Back to Marketplace",
};

export const ICONS_BY_VARIANT: Record<CheckoutModalFooterVariant, typeof SvgIcon | null> = {
  toGuestCheckout: null,
  toPayment: ChevronRightIcon,
  toConfirmation: LockIcon,
  toPlaid: LockIcon,
  toReview: null,
  toMarketplace: null,
};
