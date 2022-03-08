import { Box, Typography, Divider, Stack } from "@mui/material";
import { Theme, SxProps } from "@mui/material/styles";
import { PrimaryButton } from "../../shared/PrimaryButton/PrimaryButton";
import { OutlinedSecondaryButton } from "../../shared/OutlinedSecondaryButton/OutlinedSecondaryButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { NBSP } from "../../../utils/formatUtils";
import { UserFormat } from "../../../domain/auth/authentication.interfaces";
import { getFormattedUser } from "./CheckoutModalHeader.utils";
import { User } from "../../../queries/graphqlGenerated";
import React, { useRef, useCallback, Dispatch, SetStateAction } from "react";
import { COUNTER_CLICKS_NEEDED, COUNTER_EXPIRATION_MS, RESERVATION_COUNTDOWN_FROM_MIN } from "../../../config/config";

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
  countdownElementRef?: React.RefObject<HTMLSpanElement>;
  title?: string;
  logoSrc: string;
  logoSx?: SxProps<Theme>;
  user?: User;
  userFormat?: UserFormat;
  onLoginClicked?: () => void;
  onPrevClicked?: () => void;
  setDebug?: Dispatch<SetStateAction<boolean>>;
}

const COUNTDOWN_CONTAINER_SX: SxProps<Theme> = {
  position: "relative",
  color: "transparent",
  userSelect: "none",
};

const COUNTDOWN_SX: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  color: theme => theme.palette.text.primary,
  userSelect: "auto",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
};

export const CheckoutModalHeader: React.FC<CheckoutModalHeaderProps> = ({
  variant,
  countdownElementRef,
  title: customTitle,
  logoSrc,
  logoSx,
  user,
  userFormat,
  onLoginClicked,
  onPrevClicked,
  setDebug,
}) => {
  const title = customTitle || CHECKOUT_MODAL_TITLE[variant] || NBSP;
  const displayUsername = getFormattedUser(variant, user, userFormat);
  const showControls = CHECKOUT_MODAL_CONTROLS[variant] || false;

  const clickCounterRef = useRef(0);
  const clickTimestampRef = useRef(0);

  const handleLogoClick = useCallback(() => {
    if (!setDebug) return;

    const counter = clickCounterRef.current;
    const timestamp = clickTimestampRef.current;
    const now = Date.now();
    const elapsed = now - timestamp;
    const nextCounter = elapsed > COUNTER_EXPIRATION_MS || counter === COUNTER_CLICKS_NEEDED ? 1 : counter + 1;

    clickTimestampRef.current = now;
    clickCounterRef.current = nextCounter;

    if (nextCounter === COUNTER_CLICKS_NEEDED) {
      setDebug((prevValue) => {
        const nextValue = !prevValue;

        console.log(`\n🐞 DEBUG MODE ${ nextValue ? "ENABLED" : "DISABLED" }!\n\n`);

        return nextValue;
      });
    }
  }, [setDebug]);

  return (
    <Box>
      <Stack spacing={ 2 } direction="row" sx={{ justifyContent: "space-between", alignItems: "center", py: 2 }}>
        <Typography variant="h5" id="checkout-modal-header-title">{ title }</Typography>

        <Box
          component="img"
          src={ logoSrc }
          onClick={ setDebug ? handleLogoClick : undefined }
          sx={{
            maxHeight: "32px",
            maxWidth: { xs: "180px", sm: "240px" },
            ...logoSx
          }} />
      </Stack>

      <Divider />

      { showControls ? (<>
        <Stack spacing={ 2 } direction="row" sx={{ justifyContent: "space-between", alignItems: "center", py: 2 }}>
          { (variant === "anonymous"  && onLoginClicked) ? (<>
              <Typography sx={{ fontWeight: "500" }}>Already have an account?</Typography>
              <PrimaryButton onClick={ onLoginClicked }>Log in</PrimaryButton>
          </>) : null }

          { (variant !== "anonymous" && onPrevClicked && displayUsername) ? (<>
              <OutlinedSecondaryButton onClick={ onPrevClicked }><ChevronLeftIcon /></OutlinedSecondaryButton>
              { variant === "loggedIn" && countdownElementRef ? (
                <Typography sx={{ fontWeight: "500" }}>
                  Time left: { " " }
                  <Box component="span" sx={ COUNTDOWN_CONTAINER_SX }>
                    00:00
                    <Box component="span" ref={ countdownElementRef } sx={ COUNTDOWN_SX }>{ RESERVATION_COUNTDOWN_FROM_MIN }:00</Box>
                  </Box>
                </Typography>
              ) : null }
              <Typography sx={{ fontWeight: "500", minHeight: 40, display: "flex", alignItems: "center" }}>{ displayUsername }</Typography>
          </>) : null }
        </Stack>

        <Divider />
      </>) : null }
    </Box>
  );
}
