import { Box, Typography, Divider, Stack } from "@mui/material";
import { Theme, SxProps } from "@mui/material/styles";
import { PrimaryButton } from "../../shared/PrimaryButton/PrimaryButton";
import { OutlinedSecondaryButton } from "../../shared/OutlinedSecondaryButton/OutlinedSecondaryButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { NBSP } from "../../../utils/formatUtils";
import { UserFormat } from "../../../domain/auth/authentication.interfaces";
import { getFormattedUser } from "./CheckoutModalHeader.utils";
import { User } from "../../../queries/graphqlGenerated";
import React from "react";

export type CheckoutModalHeaderVariant = "anonymous" | "guest" | "loggedIn" | "logoOnly" | "purchasing" | "error";

const CHECKOUT_MODAL_TITLE: Record<CheckoutModalHeaderVariant, string> = {
  anonymous: "Checkout",
  guest: "Checkout",
  loggedIn: "Checkout",
  logoOnly: "",
  purchasing: "Purchasing",
  error: "Error",
};

const CHECKOUT_MODAL_CONTROLS: Record<CheckoutModalHeaderVariant, boolean> = {
  anonymous: true,
  guest: true,
  loggedIn: true,
  logoOnly: false,
  purchasing: false,
  error: false,
};

export interface CheckoutModalHeaderProps {
  variant: CheckoutModalHeaderVariant;
  title?: string;
  logoSrc: string;
  logoSx?: SxProps<Theme>;
  user?: User;
  userFormat?: UserFormat;
  onLoginClicked: () => void;
  onPrevClicked: () => void;
}
export const CheckoutModalHeader: React.FC<CheckoutModalHeaderProps> = ({
  variant,
  title: customTitle,
  logoSrc,
  logoSx,
  user,
  userFormat,
  onLoginClicked,
  onPrevClicked,
}) => {
  const title = customTitle || CHECKOUT_MODAL_TITLE[variant] || NBSP;
  const displayUsername = getFormattedUser(variant, user, userFormat);
  const showControls = CHECKOUT_MODAL_CONTROLS[variant] || false;

  return (
    <Box>
      <Stack spacing={ 2 } direction="row" sx={{ justifyContent: "space-between", alignItems: "center", py: 2 }}>
        <Typography variant="h5" id="checkout-modal-header-title">{ title }</Typography>

        <Box
          component="img"
          src={ logoSrc }
          sx={{
            maxHeight: "32px",
            maxWidth: { xs: "180px", sm: "240px" },
            ...logoSx
          }} />
      </Stack>

      <Divider />

      { showControls ? (<>
        <Stack spacing={ 2 } direction="row" sx={{ justifyContent: "space-between", alignItems: "center", py: 2 }}>
          { variant === "anonymous" ? (<>
              <Typography sx={{ fontWeight: "500" }}>Already have an account?</Typography>
              <PrimaryButton onClick={ onLoginClicked }>Log in</PrimaryButton>
          </>) : (<>
              <OutlinedSecondaryButton onClick={ onPrevClicked }><ChevronLeftIcon /></OutlinedSecondaryButton>
              <Typography sx={{ fontWeight: "500", minHeight: 40, display: "flex", alignItems: "center" }}>{ displayUsername }</Typography>
          </>) }
        </Stack>

        <Divider />
      </>) : null }
    </Box>
  );
}
