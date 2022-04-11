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
import { OVERLAY_OPACITY } from "../../../config/theme/themeConstants";
import { getCreditCardNetworkFromLabel, getCvvIsValid } from "../../../domain/payment/payment.utils";
import { withInvalidCVV } from "../../../utils/validationUtils";
import { CreditCardNetwork, getCardTypeByType } from "../../../domain/react-payment-inputs/react-payment-inputs.utils";

interface SavedPaymentDetailsSelectorState {
  isFormSubmitted: boolean;
  cvv: string;
}

export interface SavedPaymentDetailsSelectorProps {
  showLoader: boolean;
  acceptedCreditCardNetworks?: CreditCardNetwork[];
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethodId?: string;
  onNew: () => void;
  onDelete: (paymentMethodId: string) => void;
  onPick: (paymentMethodId: string) => void;
  onCvvSelected: (cvv: string) => void;
  onNext: () => void;
  onClose: () => void;
  onAttemptSubmit: () => void;
  onUpdateItemLimits: () => void;
  loadingLimits: boolean;
  consentType?: ConsentType;
}

interface CreditCardInfo {
  creditCardNetwork: "" | CreditCardNetwork;
  cvvLabel: string;
  isCvvRequired: boolean;
}

export const SavedPaymentDetailsSelector: React.FC<SavedPaymentDetailsSelectorProps> = ({
  showLoader,
  acceptedCreditCardNetworks,
  savedPaymentMethods,
  selectedPaymentMethodId,
  onNew,
  onDelete,
  onPick,
  onCvvSelected,
  onNext,
  onClose,
  onAttemptSubmit,
  onUpdateItemLimits,
  loadingLimits,
  consentType,
}) => {
  const handlePick = useCallback((paymentMethodId: string) => {
    onPick(paymentMethodId);
    onUpdateItemLimits();
  }, [onPick, onUpdateItemLimits]);

  const { creditCardNetwork, cvvLabel, isCvvRequired } = useMemo((): CreditCardInfo => {
    const selectedPaymentMethod = savedPaymentMethods.find(savedPaymentMethod => savedPaymentMethod.id === selectedPaymentMethodId);

    if (!selectedPaymentMethod || selectedPaymentMethod.type !== "CreditCard") {
      return {
        creditCardNetwork: "",
        cvvLabel: "",
        isCvvRequired: false,
      };
    }

    const creditCardNetwork = getCreditCardNetworkFromLabel(selectedPaymentMethod.network);
    const cvvLabel = getCardTypeByType(creditCardNetwork).code.name;

    return {
      creditCardNetwork,
      cvvLabel,
      isCvvRequired: true,
    };
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

  const { cvvExpectedLength, isCvvValid } = getCvvIsValid(cvv, creditCardNetwork, acceptedCreditCardNetworks, isCvvRequired);
  const cvvError = isFormSubmitted && !isCvvValid;

  const handleNextClicked = useCallback((canSubmit: boolean) => {
    onAttemptSubmit();

    if (canSubmit && selectedPaymentMethodId && isCvvValid) {
      onCvvSelected(cvv);
      onNext();

      return;
    }

    setSelectorState(({ cvv }) => ({ isFormSubmitted: true, cvv }));
  }, [onAttemptSubmit, selectedPaymentMethodId, cvv, isCvvValid, onCvvSelected, onNext]);

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
          onPick: handlePick,
          cvvLabel,
          cvvError,
          onCvvChange: handleCvvChange,
        }) }
        component={ PaymentDetailsItem }
        itemKey={ getPaymentMethodId }
        deps={[ selectedPaymentMethodId, showLoader, onDelete, handlePick, cvvLabel, cvvError, handleCvvChange]} />

      { cvvError && (
        <Typography variant="caption" component="p" sx={{ mt: 2, color: theme => theme.palette.warning.dark }}>
          { withInvalidCVV({ cvvLabel, cvvExpectedLength }) }
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
      submitLabel={ loadingLimits ? "Verifying purchase..." : undefined }
      submitDisabled={ loadingLimits }
      onSubmitClicked={ handleNextClicked }
      onCloseClicked={ onClose } />
  </>);
}
