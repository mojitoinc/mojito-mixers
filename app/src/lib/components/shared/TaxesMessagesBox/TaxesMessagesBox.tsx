import { Box, BoxProps, Link, Tooltip, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { withInvalidZipCode, withInvalidAddress } from "../../../utils/validationUtils";
import { TaxesState, VertexSuggestions } from "../../../views/Billing/BillingView";
import { FormErrorsCaption } from "../FormErrorCaption/FormErrorCaption";

export type TaxesMessagesBoxVariant = "form" | "selector";

export interface TaxesMessagesBoxProps extends BoxProps {
  isSubmitted: boolean;
  variant: TaxesMessagesBoxVariant;
  taxes: null | TaxesState;
  onSuggestionAccepted?: (fieldKey: string, newValue: string) => void;
}

export const TaxesMessagesBox: React.FC<TaxesMessagesBoxProps> = ({
  isSubmitted,
  variant,
  taxes,
  onSuggestionAccepted,
  ...props
}) => {
  const vertexSuggestions = taxes?.vertexSuggestions;

  const handleSuggestionAccepted = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!vertexSuggestions || !onSuggestionAccepted) return;

    const fieldKey = (e.currentTarget.dataset.field || "") as keyof VertexSuggestions;
    const newValue = vertexSuggestions[fieldKey];

    if (!fieldKey || !newValue) return;

    onSuggestionAccepted(fieldKey, newValue);
  }, [vertexSuggestions, onSuggestionAccepted]);

  if (taxes === null) return null;

  if (taxes.status === "error" && isSubmitted) {
    const message = taxes.invalidZipCode && variant === "form"
      ? withInvalidZipCode({ label: "zip code" })
      : withInvalidAddress({ variant });

    return (
      <Box { ...props }>
        <FormErrorsCaption>
          { message }
        </FormErrorsCaption>
      </Box>
    );
  }

  if (!vertexSuggestions || Object.keys(vertexSuggestions).length === 0 || !onSuggestionAccepted || variant === "selector") return null;

  return (
    <Box { ...props }>
      { Object.entries(vertexSuggestions).map(([fieldKey, suggestionValue], i) => {
        return (
          <Typography variant="caption" component="p" sx={{ mt: i === 0 ? 0 : 1 }}>
            Did you mean
            { " " }
            <Tooltip title={ `Click to accept suggestion (${ suggestionValue })` }>
              <Link href="" onClickCapture={ handleSuggestionAccepted } data-field={ fieldKey }>{ suggestionValue }</Link>
            </Tooltip>
            ?
          </Typography>
        );
      }) }
    </Box>
  );
}
