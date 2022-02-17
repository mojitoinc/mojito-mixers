import React from "react";
import { Box, Typography } from "@mui/material";
import { CheckoutModalFooter } from "../../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { parseSentences } from "../../utils/formatUtils";
import { CheckoutModalError, CheckoutModalErrorAt } from "../../components/payments/CheckoutModal/CheckoutModal.hooks";
import { DebugBox } from "../../components/payments/DisplayBox/DisplayBox";
import { NARROW_MAX_WIDTH } from "../../config/theme/theme";

const ERROR_ACTION_LABELS: Record<CheckoutModalErrorAt, string> = {
  authentication: "Review Information",
  billing: "Review Billing Information",
  payment: "Review Payment Information",
  purchasing: "Try Again",
};

export interface ErrorViewProps {
  checkoutError: CheckoutModalError;
  errorImageSrc?: string;
  onFixError: () => Promise<false>;
  onClose: () => void;
  debug?: boolean;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  checkoutError: {
    error,
    errorMessage,
    at,
  },
  errorImageSrc,
  onFixError,
  onClose,
  debug,
}) => {
  const stringifiedError = debug && error ? JSON.stringify(error, null, "  ") : "{}";
  const debugErrorMessage = stringifiedError === "{}" && error ? error.stack : stringifiedError;

  return (<>
    <Box sx={{ position: "relative" }}>

      { errorImageSrc ? (
        <Box
          component="img"
          src={ errorImageSrc }
          sx={{
            width: 196,
            height: 196,
            mx: "auto",
            mt: 2.5,
            mb: 5,
          }} />
      ) : (
        <Box sx={{
          width: 196,
          height: 196,
          mx: "auto",
          mt: 2.5,
          mb: 2.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <WarningAmberIcon sx={{ fontSize: "40px", color: theme => theme.palette.text.primary }} />
        </Box>
      ) }

      <Box sx={{ maxWidth: NARROW_MAX_WIDTH, mx: "auto" }}>
        { parseSentences(errorMessage).map((sentence) => {
          return <Typography key={ sentence } variant="body2" sx={{ textAlign: "center", mb: 1.5 }}>{ sentence }</Typography>;
        }) }

        <Typography variant="body2" sx={{ textAlign: "center", mt: 5 }}>Sorry, we are experiencing some issues. Please, review your payment information and try again. </Typography>
      </Box>

      { debug && <DebugBox sx={{ mt: 5 }}>{ debugErrorMessage }</DebugBox> }
    </Box>

    <CheckoutModalFooter
      variant="toReview"
      buttonLabel={ ERROR_ACTION_LABELS[at] }
      onSubmitClicked={ onFixError }
      onCloseClicked={ onClose } />
  </>);
};
