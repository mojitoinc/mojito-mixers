import { InputGroupLabel } from "../InputGroupLabel/InputGroupLabel";
import AddIcon from '@mui/icons-material/Add';
import { StackList } from "../StackList/StackList";
import { useCallback } from "react";
import { BillingInfoItem } from "../../payments/BillingInfo/Item/BillingInfoItem";
import { SecondaryButton } from "../SecondaryButton/SecondaryButton";
import { CheckoutModalFooter } from "../../payments/CheckoutModalFooter/CheckoutModalFooter";
import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import React from "react";
import { alpha, Box, CircularProgress } from "@mui/material";
import { OVERLAY_OPACITY } from "../../../config/theme/theme";

export interface SavedBillingDetailsSelectorProps {
  showLoader: boolean;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethodAddressId?: string;
  onNew: () => void;
  onEdit: (billingInfoId: string) => void;
  onDelete: (billingInfoId: string) => Promise<void>;
  onPick: (billingInfoId: string) => void;
  onNext: () => void;
  onClose: () => void;
  onAttemptSubmit: () => void;
}

export const SavedBillingDetailsSelector: React.FC<SavedBillingDetailsSelectorProps> = ({
  showLoader,
  savedPaymentMethods,
  selectedPaymentMethodAddressId,
  onNew,
  onEdit,
  onDelete,
  onPick,
  onNext,
  onClose,
  onAttemptSubmit,
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
    </Box>

    <CheckoutModalFooter
      variant="toPayment"
      onSubmitClicked={ handleNextClicked }
      onCloseClicked={ onClose } />
  </>);
}
