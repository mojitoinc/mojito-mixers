import React from "react";
import { Box, Typography } from "@mui/material";
import { CheckoutModalFooter } from "../../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { formatSentence } from "../../utils/formatUtils";

export interface ErrorViewProps {
  errorMessage?: string;
  errorImageSrc?: string;
  onReviewData: () => void;
  onClose: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  errorMessage = "The purchase could not be completed.",
  errorImageSrc,
  onReviewData,
  onClose,
}) => {
  return (<>
    <Box sx={{ position: "relative", mt: 2 }}>

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

      <Typography variant="body2" sx={{ textAlign: "center", mt: 1.5 }}>Sorry, it looks like we are having some issues on our side:</Typography>
      <Typography variant="body2" sx={{ textAlign: "center", mt: 1.5 }}>{ formatSentence(errorMessage) }</Typography>
      <Typography variant="body2" sx={{ textAlign: "center", mt: 1.5 }}>Please, review your payment information and try again.</Typography>
    </Box>

    <CheckoutModalFooter
      variant="toForm"
      privacyHref=""
      termsOfUseHref=""
      onSubmitClicked={ onReviewData }
      onCloseClicked={ onClose } />
  </>);
};
