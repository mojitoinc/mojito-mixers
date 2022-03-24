import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CheckoutModalFooter } from "../../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { fullTrim, parseSentences } from "../../utils/formatUtils";
import { CheckoutModalError, CheckoutModalErrorAt } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { DebugBox } from "../../components/payments/DebugBox/DebugBox";
import { XS_MOBILE_MAX_WIDTH } from "../../config/theme/themeConstants";
import { StatusIcon } from "../../components/shared/StatusIcon/StatusIcon";
import { DEFAULT_ERROR_AT, ERROR_GENERIC, ERROR_LOADING } from "../../domain/errors/errors.constants";
import { DEV_EXCEPTION_PREFIX } from "../../domain/errors/exceptions.constants";
import { useTimeout } from "@swyg/corre";
import { ASYNC_ERROR_MAX_WAIT_MS } from "../../config/config";
import { parseCircleError } from "../../domain/circle/circle.utils";
import { withFullNameErrorMessage } from "../../utils/validationUtils";
import { FIELD_LABELS } from "../../forms/BillingInfoForm";

const ERROR_ACTION_LABELS: Record<CheckoutModalErrorAt, string> = {
  reset: "Try Again",
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

const MAPPED_ERRORS: Record<string, string> = {
  "lot auction not started": "The auction has not started yet.",
  "payment limit exceeded": "You have already bought the maximum number of NFTs allowed for this sale.",
  "name should contains first and last name": withFullNameErrorMessage({ label: FIELD_LABELS.fullName }),
};

export const ErrorView: React.FC<ErrorViewProps> = ({
  checkoutError: {
    error,
    errorMessage = "",
    at = DEFAULT_ERROR_AT,
  },
  errorImageSrc,
  onFixError,
  onClose,
  debug,
}) => {
  const stringifiedError = debug && error ? JSON.stringify(error, null, "  ") : "{}";
  const debugErrorMessage = stringifiedError === "{}" && error ? error.stack : stringifiedError;

  const { circleFieldErrors, mappedError } = useMemo(() => {
    if (!error) return {};

    const circleFieldErrors = parseCircleError(error);

    console.log({ error, circleFieldErrors });

    if (!circleFieldErrors) return {};

    if (Object.keys(circleFieldErrors).length > 2) return { circleFieldErrors };

    // If only 2 keys are present, those are firstAt and summary:

    let mappedErrorPart: string | undefined;

    const errorMessageParts = circleFieldErrors.summary.split(": ").reverse();

    console.log({ errorMessageParts });

    for (const errorMessagePart of errorMessageParts) {
      mappedErrorPart = MAPPED_ERRORS[fullTrim(errorMessagePart)];

      if (mappedErrorPart) break;
    }

    console.log({ mappedErrorPart });

    return { mappedError: mappedErrorPart };
  }, [error]);

  let rawDisplayMessage = "";

  if (circleFieldErrors) {
    rawDisplayMessage = circleFieldErrors.summary;
  } else if (mappedError) {
    rawDisplayMessage = mappedError;
  } else {
    rawDisplayMessage = errorMessage.startsWith(DEV_EXCEPTION_PREFIX) ? ERROR_GENERIC.errorMessage : (errorMessage || ERROR_LOADING.errorMessage);
  }

  useEffect(() => {
    console.log("UPDATE STATE WITH", circleFieldErrors);
  }, [circleFieldErrors]);

  /*

  checkoutError = {
    at: circleFieldErrors.firstAt,
    error: mutationError,
    circleFieldErrors,
    errorMessage: circleFieldErrors.summary,
  };

  */

  const [displayMessage, setDisplayMessage] = useState(rawDisplayMessage);

  useEffect(() => {
    setDisplayMessage(rawDisplayMessage);
  }, [rawDisplayMessage]);

  useTimeout(() => {
    if (!displayMessage) setDisplayMessage(ERROR_GENERIC.errorMessage);
  }, displayMessage ? null : ASYNC_ERROR_MAX_WAIT_MS, []);

  return (<>
    <Box>

      <StatusIcon
        variant="error"
        imgSrc={ errorImageSrc }
        sx={{ my: 5 }} />

      <Box sx={{ maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto" }}>
        { parseSentences(displayMessage).map((sentence) => {
          return <Typography key={ sentence } variant="body2" sx={{ textAlign: "center", mb: 1.5 }}>{ sentence }</Typography>;
        }) }

        <Typography variant="body2" sx={{ textAlign: "center", mt: 5 }}>Sorry, we are experiencing some issues. Please, review your payment information and try again. </Typography>
      </Box>

      { debug && <DebugBox sx={{ mt: 5 }}>{ debugErrorMessage }</DebugBox> }
    </Box>

    <CheckoutModalFooter
      variant="toReview"
      submitLabel={ ERROR_ACTION_LABELS[at] }
      submitDisabled={ !displayMessage }
      onSubmitClicked={ onFixError }
      closeDisabled={ !displayMessage }
      onCloseClicked={ onClose } />

  </>);
};
