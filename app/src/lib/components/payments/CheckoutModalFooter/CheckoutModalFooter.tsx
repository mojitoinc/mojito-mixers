import { Box, Link, Typography, Divider } from "@mui/material";
import React, { useCallback } from "react";
import { PrimaryButton } from "../../shared/PrimaryButton/PrimaryButton";
import { ICONS_BY_VARIANT, LABELS_BY_VARIANT } from "./CheckoutModalFooter.constants";

export type ConsentType = "disclaimer" | "checkbox";

export type CheckoutModalFooterVariant = "toGuestCheckout" | "toPayment" | "toConfirmation" | "toPlaid" | "toForm" | "toMarketplace";

export interface CheckoutModalFooterProps {
  variant: CheckoutModalFooterVariant;
  guestCheckoutEnabled?: boolean;
  privacyHref: string;
  termsOfUseHref: string;
  onSubmitClicked: () => void;
  onCloseClicked: () => void;
}

export const CheckoutModalFooter: React.FC<CheckoutModalFooterProps> = ({
  variant,
  guestCheckoutEnabled,
  privacyHref,
  termsOfUseHref,
  onSubmitClicked,
  onCloseClicked,
}) => {
  const buttonLabel = LABELS_BY_VARIANT[variant];
  const ButtonIconComponent = ICONS_BY_VARIANT[variant];

  const handleCancelClicked = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    onCloseClicked();
  }, [onCloseClicked]);

  const displayPrimaryButton = variant !== "toGuestCheckout" || guestCheckoutEnabled;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        py: 5
      }}>

      { displayPrimaryButton && (
        <PrimaryButton
          onClick={ onSubmitClicked }
          endIcon={ ButtonIconComponent && <ButtonIconComponent /> }>
          { buttonLabel }
        </PrimaryButton>
      ) }

      { variant !== "toMarketplace" && (
        <Typography sx={ displayPrimaryButton ? { pt: 2 } : undefined }>
          { displayPrimaryButton ? "or " : null }
          <Link sx={{ color: "text.primary" }} href="" onClick={ handleCancelClicked }>
            Cancel and Return to Marketplace
          </Link>
        </Typography>
      ) }

      { variant === "toConfirmation" && (<>
        <Divider sx={{ my: 5, width: "100%" }}/>

        <Typography sx={{ maxWidth: "400px" }} align="center">
          By placing an order you affirm that you have read, understood, and consent to the{" "}
          <Link color="text.primary" href={ privacyHref } target="_blank">Privacy Notices</Link>{" "}
          and{" "}
          <Link color="text.primary" href={ termsOfUseHref } target="_blank">Terms of Use</Link>.
        </Typography>
      </>) }

    </Box>
  );
}
