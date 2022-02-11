import { InputGroupLabel } from "../InputGroupLabel/InputGroupLabel";
import AddIcon from '@mui/icons-material/Add';
import { StackList } from "../StackList/StackList";
import { SecondaryButton } from "../SecondaryButton/SecondaryButton";
import { PaymentDetailsItem } from "../../payments/PaymentDetailsItem/Item/PaymentDetailsItem";
import { CheckoutModalFooter } from "../../payments/CheckoutModalFooter/CheckoutModalFooter";
import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import React, { useCallback, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ConsentType } from "../ConsentText/ConsentText";

export interface SavedPaymentDetailsSelectorProps {
  showLoader: boolean;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethodId?: string;
  onNew: () => void;
  onDelete: (paymentMethodId: string) => void;
  onPick: (paymentMethodId: string) => void;
  onNext: () => void;
  onClose: () => void;
  consentType: ConsentType;
  privacyHref: string;
  termsOfUseHref: string;
}

export const SavedPaymentDetailsSelector: React.FC<SavedPaymentDetailsSelectorProps> = ({
  showLoader,
  savedPaymentMethods,
  selectedPaymentMethodId,
  onNew,
  onDelete,
  onPick,
  onNext,
  onClose,
  consentType,
  privacyHref,
  termsOfUseHref,
}) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleNextClicked = useCallback((canSubmit: boolean) => {
    if (canSubmit && selectedPaymentMethodId) {
      onNext();
    } else if (!selectedPaymentMethodId) {
      setIsFormSubmitted(true);
    }
  }, [selectedPaymentMethodId, onNext]);

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
          background: "rgba(255, 255, 255, 0.75)",
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
        }) }
        component={ PaymentDetailsItem }
        itemKey={ getPaymentMethodId }
        deps={[ onDelete, onPick, selectedPaymentMethodId, showLoader]} />

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
