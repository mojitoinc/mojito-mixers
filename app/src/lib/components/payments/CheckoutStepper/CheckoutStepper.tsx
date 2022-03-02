import { Typography, Divider, Stack, Box } from "@mui/material";
import { useTimeout } from "@swyg/corre";
import React, { useState } from "react";

export interface CheckoutStepperProps {
  progress: 50 | 100;
}

let lastProgress = 0;

export function resetStepperProgress() {
  lastProgress = 0;
}

export const CheckoutStepper: React.FC<CheckoutStepperProps> = ({
  progress: currentProgress,
}) => {
  const [progress, setProgress] = useState(lastProgress);

  useTimeout(() => {
    setProgress(lastProgress = currentProgress);
  }, 0, [currentProgress]);

  return (
    <Box sx={{ position: "relative" }}>
      <Stack spacing={ 2 } direction="row" sx={{ justifyContent: "space-between", alignItems: "center", pt: 2, pb: 1 }}>
        <Typography variant="subtitle2" sx={{ width: "100%", color: theme => theme.palette.grey[progress === 50 ? "700" : "600"] }} >
          Billing Information
        </Typography>
        <Typography variant="subtitle2" sx={{ width: "100%", color: theme => theme.palette.grey[progress === 50 ? "600" : "700"] }} >
          Payment and Delivery
        </Typography>
      </Stack>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 2,
          background: theme => theme.palette?.gradients?.stepper,
        }}>
        <Divider sx={{
          borderWidth: 0,
          borderBottomWidth: 1,
          background: theme => theme.palette.background.paper,
          width: `${ 100 - progress }%`,
          height: 2,
          marginLeft: "auto",
          transition: theme => `width ${ theme.transitions.duration.standard }ms ${ theme.transitions.easing.easeInOut }`,
        }} />
      </Box>

    </Box>
  );
}
