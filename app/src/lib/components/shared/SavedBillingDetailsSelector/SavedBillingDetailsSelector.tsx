import { InputGroupLabel } from "../InputGroupLabel/InputGroupLabel";
import AddIcon from '@mui/icons-material/Add';
import { StackList } from "../StackList/StackList";
import React, { useCallback } from "react";
import { BillingInfoItem } from "../../payments/BillingInfo/Item/BillingInfoItem";
import { SecondaryButton } from "../SecondaryButton/SecondaryButton";
import { CheckoutModalFooter } from "../../payments/CheckoutModalFooter/CheckoutModalFooter";
import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import { alpha, Box, CircularProgress } from "@mui/material";
import { OVERLAY_OPACITY } from "../../../config/theme/themeConstants";
import { TaxesState } from "../../../views/Billing/BillingView";
import { TaxesMessagesBox } from "../TaxesMessagesBox/TaxesMessagesBox";
import { ConsentType } from "../ConsentText/ConsentText";

export interface SavedBillingDetailsSelectorProps {
  showLoader: boolean;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethodAddressId?: string;
  taxes: null | TaxesState;
  onNew: () => void;
  onEdit: (billingInfoId: string) => void;
  onDelete: (billingInfoId: string) => Promise<void>;
  onPick: (billingInfoId: string) => void;
  onNext: () => void;
  onClose: () => void;
  onAttemptSubmit: () => void;
  consentType?: ConsentType;
}

export const SavedBillingDetailsSelector: React.FC<SavedBillingDetailsSelectorProps> = ({
  showLoader,
  savedPaymentMethods,
  selectedPaymentMethodAddressId,
  taxes,
  onNew,
  onEdit,
  onDelete,
  onPick,
  onNext,
  onClose,
  onAttemptSubmit,
  consentType,
}) => {
  const getPaymentMethodAddressId = useCallback((savedPaymentMethod: SavedPaymentMethod) => savedPaymentMethod.addressId, []);

  const handleNextClicked = useCallback(() => {
    onAttemptSubmit();
    onNext();
  }, [onAttemptSubmit, onNext]);

  return (<>
    <Box sx={{ position: "relative" }}>

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

      <InputGroupLabel sx={{ mt: 2.5, mb: 1.5 }}>Saved Billing Info</InputGroupLabel>

      <StackList
        data={ savedPaymentMethods }
        additionalProps={ (savedPaymentMethod) => ({
          active: savedPaymentMethod.addressId === selectedPaymentMethodAddressId,
          disabled: showLoader,
          onDelete,
          onPick,
          onEdit,
        }) }
        component={ BillingInfoItem }
        itemKey={ getPaymentMethodAddressId }
        deps={[ selectedPaymentMethodAddressId, showLoader, onDelete, onPick, onEdit ]} />

      <SecondaryButton onClick={ onNew } startIcon={ <AddIcon /> } sx={{ mt: 2.5 }} disabled={ showLoader }>
        Add New Billing Info
      </SecondaryButton>

      <TaxesMessagesBox sx={{ mt: 5 }} taxes={ taxes } variant="selector" />
    </Box>

    <CheckoutModalFooter
      variant="toPayment"
      consentType={ consentType }
      submitLabel={ taxes?.status === "loading" ? "Calculating taxes..." : undefined }
      submitDisabled={ !!taxes && taxes.status === "loading" }
      onSubmitClicked={ handleNextClicked }
      onCloseClicked={ onClose } />
  </>);
}
