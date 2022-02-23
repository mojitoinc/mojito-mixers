
import { Box, Typography } from "@mui/material";
import React from "react";
import { StatusIcon } from "../../components/shared/StatusIcon/StatusIcon";
import { XS_MOBILE_MAX_WIDTH } from "../../config/theme/theme";

export interface SuccessViewProps {
  successImageSrc?: string;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  successImageSrc,
}) => {
  return (
    <Box>

      <StatusIcon
        variant="success"
        imgSrc={ successImageSrc }
        sx={{ my: 5 }} />

      <Box sx={{ maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto", my: 5 }}>
        <Typography variant="body2" sx={{ textAlign: "center", mb: 1.5 }}>Payment success!</Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>Redirecting you to the confirmation screen...</Typography>
      </Box>

    </Box>
  );
}
