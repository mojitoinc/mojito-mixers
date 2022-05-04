import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import { parseSentences } from "../../../utils/formatUtils";

export interface FormErrorsBoxProps extends BoxProps {
  error: string;
}

export const FormErrorsBox: React.FC<FormErrorsBoxProps> = ({
  error,
  sx,
  ...props
}) => {
  return (
    <Box { ...props } sx={{ color: theme => theme.palette.warning.dark, ...sx }}>
      <Typography variant="caption" component="p" sx={{ fontWeight: 600 }}>
        Last purchase attempt errors:
      </Typography>

      <Box component="ul" sx={{ m: 0, pl: "16px !important", listStyle: "disc !important" }}>
        { parseSentences(error).map((sentence) => {
          return <Typography key={ sentence } variant="caption" component="li" sx={{ mt: 1.5 }}>{ sentence }</Typography>;
        }) }
      </Box>
    </Box>
  );
}
