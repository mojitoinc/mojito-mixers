import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CheckoutModalFooter } from "../../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { parseSentences } from "../../utils/formatUtils";
import { CheckoutModalError, CheckoutModalErrorAt } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { DebugBox } from "../../components/payments/DebugBox/DebugBox";
import { XS_MOBILE_MAX_WIDTH } from "../../config/theme/themeConstants";
import { StatusIcon } from "../../components/shared/StatusIcon/StatusIcon";
import { DEFAULT_ERROR_AT, ERROR_GENERIC, ERROR_LOADING } from "../../domain/errors/errors.constants";
import { DEV_EXCEPTION_PREFIX } from "../../domain/errors/exceptions.constants";
import { useTimeout } from "@swyg/corre";
import { ASYNC_ERROR_MAX_WAIT_MS } from "../../config/config";

const ERROR_ACTION_LABELS: Record<CheckoutModalErrorAt, string> = {
  reset: "Try Again",
  authentication: "Review Information",
  billing: "Review Billing Information",
  payment: "Review Payment Information",
  purchasing: "Try Again",
};

export interface ErrorViewProps {
  checkoutError?: CheckoutModalError;
  errorImageSrc?: string;
  onFixError?: (errorMessage: string) => Promise<false>;
  onClose?: () => void;
  debug?: boolean;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  checkoutError: {
    at = DEFAULT_ERROR_AT,
    error,
    circleFieldErrors,
    errorMessage = "",
  } = { },
  errorImageSrc,
  onFixError,
  onClose,
  debug,
}) => {
  const stringifiedError = debug && error ? JSON.stringify(error, null, "  ") : "{}";
  const debugErrorMessage = stringifiedError === "{}" && error ? error.stack : stringifiedError;

  let rawDisplayMessage = "";

  if (circleFieldErrors) {
    rawDisplayMessage = circleFieldErrors.summary;
  } else {
    rawDisplayMessage = errorMessage.startsWith(DEV_EXCEPTION_PREFIX) ? ERROR_GENERIC.errorMessage : errorMessage;
  }

  const [displayMessage, setDisplayMessage] = useState(rawDisplayMessage);

  useEffect(() => {
    setDisplayMessage(rawDisplayMessage);
  }, [rawDisplayMessage]);

  useTimeout(() => {
    if (!displayMessage) setDisplayMessage(ERROR_GENERIC.errorMessage);
  }, displayMessage ? null : ASYNC_ERROR_MAX_WAIT_MS, []);

  const handleSubmitClicked: () => Promise<false> = useCallback(async () => {
    if (onFixError) onFixError(displayMessage);

    return false;
  }, [onFixError, displayMessage]);

  return (<>
    <Box>

      <StatusIcon
        variant="error"
        imgSrc={ errorImageSrc }
        sx={{ my: 5 }} />

      <Box sx={{ maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto", textAlign: "center" }}>
        <Typography variant="body2" sx={{ mb: 1.5 }}>Sorry, we are experiencing some issues:</Typography>

        { parseSentences(displayMessage || ERROR_LOADING.errorMessage).map((sentence) => {
          return <Typography key={ sentence } variant="body2" sx={{ mb: 1.5 }}>{ sentence }</Typography>;
        }) }

        <Typography variant="body2" sx={{ mt: 5 }}>Please, review your payment information and try again.</Typography>
      </Box>

      { debug && <DebugBox sx={{ mt: 5 }}>{ debugErrorMessage }</DebugBox> }
    </Box>

    <CheckoutModalFooter
      variant="toReview"
      submitLabel={ ERROR_ACTION_LABELS[at] }
      submitDisabled={ !displayMessage || !onFixError }
      submitLoading={ !displayMessage || !onFixError }
      onSubmitClicked={ handleSubmitClicked }
      closeDisabled={ !displayMessage || !onClose }
      onCloseClicked={ onClose } />

  </>);
};
