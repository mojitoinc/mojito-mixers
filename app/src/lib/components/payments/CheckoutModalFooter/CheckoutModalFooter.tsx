import { Box, Link, Typography, Divider } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Checkbox } from "../../shared/Checkbox";
import { ConsentText, ConsentType, CONSENT_ERROR_MESSAGE } from "../../shared/ConsentText/ConsentText";
import { PrimaryButton } from "../../shared/PrimaryButton/PrimaryButton";
import { ICONS_BY_VARIANT, LABELS_BY_VARIANT } from "./CheckoutModalFooter.constants";

interface CheckoutModalFooterConsentState {
  isFormSubmitted: boolean;
  isConsentChecked: boolean;
}

export type CheckoutModalFooterVariant = "toGuestCheckout" | "toPayment" | "toConfirmation" | "toPlaid" | "toForm" | "toMarketplace";

export interface CheckoutModalFooterProps {
  variant: CheckoutModalFooterVariant;
  guestCheckoutEnabled?: boolean;
  consentType?: ConsentType;
  privacyHref?: string;
  termsOfUseHref?: string;
  submitDisabled?: boolean;
  onSubmitClicked?: (canSubmit: boolean) => void;
  onCloseClicked: () => void;
}

export const CheckoutModalFooter: React.FC<CheckoutModalFooterProps> = ({
  variant,
  guestCheckoutEnabled,
  consentType,
  privacyHref,
  termsOfUseHref,
  submitDisabled,
  onSubmitClicked,
  onCloseClicked,
}) => {
  // CONSENT:
  const showConsent = consentType && (privacyHref || termsOfUseHref) && (variant === "toConfirmation" || variant === "toPlaid");
  const consentTextElement = showConsent ? <ConsentText privacyHref={ privacyHref } termsOfUseHref={ termsOfUseHref } /> : null;

  const [{
    isFormSubmitted,
    isConsentChecked,
  }, setConsentState] = useState<CheckoutModalFooterConsentState>({
    isFormSubmitted: false,
    isConsentChecked: showConsent && consentType === "checkbox" ? false : true,
  });

  const showConsentError = isFormSubmitted && !isConsentChecked;

  const handleConsentClicked = useCallback((_, checked: boolean) => {
    setConsentState((prevConsentState) => ({
      isFormSubmitted: prevConsentState.isFormSubmitted,
      isConsentChecked: checked,
    }));
  }, []);


  // PRIMARY BUTTON:
  const primaryButtonVisible = variant !== "toGuestCheckout" || guestCheckoutEnabled;
  const primaryButtonLabel = LABELS_BY_VARIANT[variant];
  const PrimaryButtonIcon = ICONS_BY_VARIANT[variant];

  const handleSubmitClicked = useCallback(() => {
    setConsentState({
      isFormSubmitted: true,
      isConsentChecked,
    });

    if (onSubmitClicked) onSubmitClicked(isConsentChecked);
  }, [isConsentChecked, onSubmitClicked]);

  // CANCEL LINK:
  const handleCancelClicked = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    onCloseClicked();
  }, [onCloseClicked]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        pt: consentType === "checkbox" ? 0 : 5,
        pb: 5,
      }}>

      { showConsent && consentType === "checkbox" && (
        <Checkbox
          label={ <>I { consentTextElement }</> }
          checked={ isConsentChecked }
          onChange={ handleConsentClicked }
          error={ showConsentError }
          helperText={ showConsentError ? CONSENT_ERROR_MESSAGE : undefined }
          sx={{ alignSelf: "flex-start", mb: 5 }} />
      ) }

      { primaryButtonVisible && (
        <PrimaryButton
          onClick={ onSubmitClicked ? handleSubmitClicked : undefined }
          type={ onSubmitClicked ? "button" : "submit" }
          endIcon={ PrimaryButtonIcon && <PrimaryButtonIcon /> }
          disabled={ submitDisabled }>
          { primaryButtonLabel }
        </PrimaryButton>
      ) }

      { variant !== "toMarketplace" && (
        <Typography sx={ primaryButtonVisible ? { pt: 2 } : undefined }>
          { primaryButtonVisible ? "or " : null }
          <Link sx={{ color: "text.primary" }} href="" onClick={ handleCancelClicked }>
            Cancel and Return to Marketplace
          </Link>
        </Typography>
      ) }

      { showConsent && consentType === "disclaimer" && (<>
        <Divider sx={{ my: 5, width: "100%" }}/>

        <Typography sx={{ maxWidth: "400px" }} align="center">
          By placing an order you affirm that you { consentTextElement }.
        </Typography>
      </>) }

    </Box>
  );
}
