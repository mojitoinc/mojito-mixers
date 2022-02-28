import { Box, Link, Typography, Divider, CircularProgress } from "@mui/material";
import React, { useCallback, useState } from "react";
import { DEFAULT_PAYMENT_IMAGE_SRC, SM_MOBILE_MAX_WIDTH } from "../../../config/theme/theme";
import { isPromise } from "../../../utils/promiseUtils";
import { Checkbox } from "../../shared/Checkbox/Checkbox";
import { ConsentText, ConsentType, CONSENT_ERROR_MESSAGE } from "../../shared/ConsentText/ConsentText";
import { PrimaryButton } from "../../shared/PrimaryButton/PrimaryButton";
import { ICONS_BY_VARIANT, LABELS_BY_VARIANT } from "./CheckoutModalFooter.constants";
import Image from 'next/image'

interface CheckoutModalFooterConsentState {
  isFormSubmitted: boolean;
  isFormLoading: boolean;
  isConsentChecked: boolean;
}

export type CheckoutModalFooterVariant = "toGuestCheckout" | "toPayment" | "toConfirmation" | "toPlaid" | "toReview" | "toMarketplace";

export interface CheckoutModalFooterProps {
  variant: CheckoutModalFooterVariant;
  buttonLabel?: string;
  guestCheckoutEnabled?: boolean;
  consentType?: ConsentType;
  privacyHref?: string;
  termsOfUseHref?: string;
  submitDisabled?: boolean;
  onSubmitClicked?: (canSubmit: boolean) => void | Promise<void | false>;
  onCloseClicked?: () => void;
}

export const CheckoutModalFooter: React.FC<CheckoutModalFooterProps> = ({
  variant,
  buttonLabel,
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
  const consentTextElement = showConsent ? <ConsentText privacyHref={privacyHref} termsOfUseHref={termsOfUseHref} /> : null;

  const [{
    isFormSubmitted,
    isFormLoading,
    isConsentChecked,
  }, setConsentState] = useState<CheckoutModalFooterConsentState>({
    isFormSubmitted: false,
    isFormLoading: false,
    isConsentChecked: showConsent && consentType === "checkbox" ? false : true,
  });

  const showConsentError = isFormSubmitted && !isConsentChecked;

  const handleConsentClicked = useCallback((_, checked: boolean) => {
    setConsentState((prevConsentState) => ({
      isFormSubmitted: prevConsentState.isFormSubmitted,
      isFormLoading: prevConsentState.isFormLoading,
      isConsentChecked: checked,
    }));
  }, []);


  // PRIMARY BUTTON:
  const primaryButtonVisible = variant !== "toGuestCheckout" || guestCheckoutEnabled;
  const primaryButtonLabel = buttonLabel || LABELS_BY_VARIANT[variant];
  const PrimaryButtonIcon = ICONS_BY_VARIANT[variant];

  const handleSubmitClicked = useCallback(async () => {
    if (!onSubmitClicked) return;

    setConsentState({
      isFormSubmitted: true,
      isFormLoading: true,
      isConsentChecked,
    });

    const promiseOrResult = onSubmitClicked(isConsentChecked);
    const result = isPromise(promiseOrResult) ? await promiseOrResult : promiseOrResult;

    // This means the parent component will make this one unmount, so there's no need to update the state anymore:
    if (result === false) return;

    setConsentState({
      isFormSubmitted: true,
      isFormLoading: false,
      isConsentChecked,
    });
  }, [isConsentChecked, onSubmitClicked]);

  // CANCEL LINK:
  const handleCancelClicked = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onCloseClicked) onCloseClicked();
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

      {showConsent && consentType === "checkbox" && (
        <Checkbox
          label={<>I {consentTextElement}</>}
          checked={isConsentChecked}
          onChange={handleConsentClicked}
          error={showConsentError}
          helperText={showConsentError ? CONSENT_ERROR_MESSAGE : undefined}
          sx={{ alignSelf: "flex-start", mb: 5 }} />
      )}

      {primaryButtonVisible && (
        <PrimaryButton
          onClick={onSubmitClicked ? handleSubmitClicked : undefined}
          type={onSubmitClicked ? "button" : "submit"}
          endIcon={isFormLoading ? <CircularProgress color="inherit" size="1em" /> : (PrimaryButtonIcon && <PrimaryButtonIcon />)}
          disabled={submitDisabled || isFormLoading}>
          {primaryButtonLabel}
        </PrimaryButton>
      )}

      {variant !== "toMarketplace" && onCloseClicked && (
        <Typography sx={primaryButtonVisible ? { pt: 2 } : undefined}>
          {primaryButtonVisible ? "or " : null}
          <Link sx={{ color: "text.primary" }} href="" onClick={handleCancelClicked}>
            Cancel and Return to Marketplace
          </Link>
        </Typography>
      )}

      {showConsent && consentType === "disclaimer" && (<>
        <Divider sx={{ my: 5, width: "100%" }} />

        <Typography sx={{ maxWidth: SM_MOBILE_MAX_WIDTH }} align="center">
          By placing an order you affirm that you {consentTextElement}.
        </Typography>
      </>)}

      {showConsent && consentType === "circle" && (
        <>
          <Divider sx={{ my: 5, width: "100%" }} />
          <Box display="flex">
            <Typography sx={{ maxWidth: SM_MOBILE_MAX_WIDTH, marginRight: 1 }} align="center">
              Payments powered by
            </Typography>
            <Box component="img" src={DEFAULT_PAYMENT_IMAGE_SRC} height={20} />
          </Box>
        </>
      )}
    </Box>
  );
}
