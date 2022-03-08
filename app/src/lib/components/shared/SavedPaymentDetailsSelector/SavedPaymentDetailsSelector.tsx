import { InputGroupLabel } from "../InputGroupLabel/InputGroupLabel";
import AddIcon from '@mui/icons-material/Add';
import { StackList } from "../StackList/StackList";
import { SecondaryButton } from "../SecondaryButton/SecondaryButton";
import { PaymentDetailsItem } from "../../payments/PaymentDetailsItem/Item/PaymentDetailsItem";
import { CheckoutModalFooter } from "../../payments/CheckoutModalFooter/CheckoutModalFooter";
import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { alpha, Box, CircularProgress, Typography } from "@mui/material";
import { ConsentType } from "../ConsentText/ConsentText";
import { OVERLAY_OPACITY } from "../../../config/theme/theme";
import { getCVCIsValid } from "../../../domain/payment/payment.utils";

export function validateCvv(isCvvRequired: boolean, cvv: string) {
  return !isCvvRequired || getCVCIsValid(cvv);
}

interface SavedPaymentDetailsSelectorState {
  isFormSubmitted: boolean;
  cvv: string;
}

export interface SavedPaymentDetailsSelectorProps {
  showLoader: boolean;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethodId?: string;
  onNew: () => void;
  onDelete: (paymentMethodId: string) => void;
  onPick: (paymentMethodId: string) => void;
  onCvvSelected: (cvv: string) => void;
  onNext: () => void;
  onClose: () => void;
  onAttemptSubmit: () => void;
  consentType?: ConsentType;
  privacyHref?: string;
  termsOfUseHref?: string;
}

export const SavedPaymentDetailsSelector: React.FC<SavedPaymentDetailsSelectorProps> = ({
  showLoader,
  savedPaymentMethods,
  selectedPaymentMethodId,
  onNew,
  onDelete,
  onPick,
  onCvvSelected,
  onNext,
  onClose,
  onAttemptSubmit,
  consentType,
  privacyHref,
  termsOfUseHref,
}) => {
  const isCvvRequired = useMemo(() => {
    const selectedPaymentMethod = savedPaymentMethods.find(savedPaymentMethod => savedPaymentMethod.id === selectedPaymentMethodId);

    return selectedPaymentMethod?.type === "CreditCard";
  }, [savedPaymentMethods, selectedPaymentMethodId]);

  const [{
    isFormSubmitted,
    cvv,
  }, setSelectorState] = useState<SavedPaymentDetailsSelectorState>({
    isFormSubmitted: false,
    cvv: "",
  });

  useEffect(() => {
    // Reset CVV if user selects a different payment method:
    setSelectorState(({ isFormSubmitted }) => ({ isFormSubmitted, cvv: "" }));
  }, [selectedPaymentMethodId]);

  const isCvvOk = validateCvv(isCvvRequired, cvv);
  const cvvError = isFormSubmitted && !isCvvOk;

  const handleNextClicked = useCallback((canSubmit: boolean) => {
    onAttemptSubmit();

    if (canSubmit && selectedPaymentMethodId && isCvvOk) {
      onCvvSelected(cvv);
      onNext();

      return;
    }

    setSelectorState(({ cvv }) => ({ isFormSubmitted: true, cvv }));
  }, [onAttemptSubmit, selectedPaymentMethodId, cvv, isCvvOk, onCvvSelected, onNext]);

  const handleCvvChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const cvv = e.currentTarget.value || "";

    setSelectorState(({ isFormSubmitted }) => ({ isFormSubmitted, cvv }));
  }, []);

  const getPaymentMethodId = useCallback((savedPaymentMethod: SavedPaymentMethod) => savedPaymentMethod.id, []);

  return (<>
    <Box sx={{ position: "relative", mb: consentType === "checkbox" ? 5 : 0 }}>

      { showLoader ? (
        <Box sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: theme => alpha(theme.palette.background.default, OVERLAY_OPACITY),
          zIndex: 100,
        }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : null }

      <InputGroupLabel sx={{ mt: 2.5, mb: 1.5 }}>Saved Payment Methods</InputGroupLabel>

      <StackList
        data={ savedPaymentMethods }
        additionalProps={ (savedPaymentMethod) => ({
          active: savedPaymentMethod.id === selectedPaymentMethodId,
          disabled: showLoader,
          onDelete,
          onPick,
          cvvError,
          onCvvChange: handleCvvChange,
        }) }
        component={ PaymentDetailsItem }
        itemKey={ getPaymentMethodId }
        deps={[ selectedPaymentMethodId, showLoader, onDelete, onPick, cvvError, handleCvvChange]} />

      { cvvError && (
        <Typography variant="caption" component="p" sx={{ mt: 2, color: theme => theme.palette.warning.dark }}>
          You must enter a valid CVV number.
        </Typography>
      ) }

      <SecondaryButton
        onClick={ onNew }
        startIcon={ <AddIcon /> }
        sx={{ mt: 2.5 }}
        disabled={ showLoader }>
        Add New Payment Method
      </SecondaryButton>

      { isFormSubmitted && !selectedPaymentMethodId && (
        <Typography variant="caption" component="p" sx={{ mt: 2, color: theme => theme.palette.warning.dark }}>
          You must select a saved and approved payment method or create a new one.
        </Typography>
      ) }

    </Box>

    <CheckoutModalFooter
      variant="toConfirmation"
      consentType={ consentType }
      privacyHref={ privacyHref }
      termsOfUseHref={ termsOfUseHref }
      onSubmitClicked={ handleNextClicked }
      onCloseClicked={ onClose } />
  </>);
}
