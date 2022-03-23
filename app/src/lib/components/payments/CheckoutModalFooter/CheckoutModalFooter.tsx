import { Box, Link, Typography, Divider, CircularProgress } from "@mui/material";
import React, { useCallback, useState } from "react";
import { CIRCLE_LOGO_IMAGE_SRC, SM_MOBILE_MAX_WIDTH } from "../../../config/theme/themeConstants";
import { isPromise } from "../../../utils/promiseUtils";
import { Checkbox } from "../../shared/Checkbox/Checkbox";
import { ConsentText, ConsentType, CONSENT_ERROR_MESSAGE } from "../../shared/ConsentText/ConsentText";
import { PrimaryButton } from "../../shared/PrimaryButton/PrimaryButton";
import { ICONS_BY_VARIANT, LABELS_BY_VARIANT } from "./CheckoutModalFooter.constants";
import { Img } from "../../shared/Img/Img";

interface CheckoutModalFooterConsentState {
  isFormSubmitted: boolean;
  isFormLoading: boolean;
  isConsentChecked: boolean;
}

export type CheckoutModalFooterVariant = "toGuestCheckout" | "toPayment" | "toConfirmation" | "toPlaid" | "toReview" | "toMarketplace";

export interface CheckoutModalFooterProps {
  // Configuration:
  variant: CheckoutModalFooterVariant;
  guestCheckoutEnabled?: boolean;
  consentType?: ConsentType;

  // Submit button:
  submitLabel?: string;
  submitDisabled?: boolean;
  onSubmitClicked?: (canSubmit: boolean) => void | Promise<void | false>;

  // Close link:
  closeLabel?: string;
  closeDisabled?: boolean;
  onCloseClicked?: () => void;

  // Collection button:
  onGoToCollection?: () => void;
}

const VARIANTS_WITH_DISCLAIMER: CheckoutModalFooterVariant[] = ["toPayment", "toPlaid", "toConfirmation"]

export const CheckoutModalFooter: React.FC<CheckoutModalFooterProps> = ({
  // Configuration:
  variant,
  guestCheckoutEnabled,
  consentType,

  // Submit button:
  submitLabel,
  submitDisabled,
  onSubmitClicked,

  // Close link:
  closeLabel,
  closeDisabled,
  onCloseClicked,

  // onGoToCollection:
  onGoToCollection,
}) => {
  // CONSENT:
  const showConsent = consentType && VARIANTS_WITH_DISCLAIMER.includes(variant);
  const consentTextElement = showConsent ? <ConsentText /> : null;

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

  // COLLECTION BUTTON (ConfirmationView-specific):
  const handleCollectionClicked = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // TODO: In order to implement be functionality below, we need to pass a Link component to PUI to use, and then we
    // can just pass a collectionPathname instead of onGoToCollection:

    // We want to display the link (href) if the user hovers the button or if they click with the wheel or Ctrl + Click,
    // but we don't know what type of routing the parent app is using (Next.js, React Router, etc.) so we just prevent
    // default here and let the parent app handle the routing:
    // console.log(e.ctrlKey, e.button);

    if (onGoToCollection) onGoToCollection();
  }, [onGoToCollection]);


  // SUBMIT BUTTON:
  const primaryButtonVisible = variant !== "toGuestCheckout" || guestCheckoutEnabled;
  const primaryButtonLabel = submitLabel || LABELS_BY_VARIANT[variant];
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
  const cancelLinkLabel = closeLabel || "Cancel and Return to Marketplace";
  const cancelLinkColor = closeDisabled ? "text.disabled" : "text.primary"; // TODO: Create custom Link component with this functionality.

  const handleCancelClicked = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onCloseClicked && !closeDisabled) onCloseClicked();
  }, [onCloseClicked, closeDisabled]);

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

      { onGoToCollection && (
        <PrimaryButton
          onClick={ handleCollectionClicked }
          disabled={ submitDisabled || isFormLoading }
          sx={{ mb: 2 }}>
          View Collection
        </PrimaryButton>
      ) }

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
        <Typography sx={{ color: cancelLinkColor, pt: primaryButtonVisible ? 2 : 0 }}>
          {primaryButtonVisible ? "or " : null}
          <Link sx={{ color: cancelLinkColor, cursor: closeDisabled ? "not-allowed" : "pointer" }} href="" onClick={handleCancelClicked}>
            { cancelLinkLabel }
          </Link>
        </Typography>
      )}

      {showConsent && consentType === "disclaimer" && (<>
        <Divider sx={{ my: 5, width: "100%" }} />

        <Typography sx={{ maxWidth: SM_MOBILE_MAX_WIDTH }} align="center">
          By placing an order you affirm that you {consentTextElement}
        </Typography>
      </>)}

      {showConsent && consentType === "circle" && (
        <>
          <Divider sx={{ my: 5, width: "100%" }} />
          <Box display="flex">
            <Typography sx={{ maxWidth: SM_MOBILE_MAX_WIDTH, marginRight: 1 }} align="center">
              Payments powered by
            </Typography>
            <Link href="https://www.circle.com/en/" target="_blank" rel="noopener noreferrer">
              <Img src={CIRCLE_LOGO_IMAGE_SRC} height={20} />
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
}
