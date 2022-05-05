import { useAuth0 } from "@auth0/auth0-react";
import React, { useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Theme, SxProps } from "@mui/material/styles";
import { config } from "../../utils/config/config.constants";

const buttonSx: SxProps<Theme> = {
  py: 0,
  height: "32px",
  display: "flex",
  alignItems: "center",
};

export const AuthButton: React.FC = () => {
  const { logout, loginWithPopup, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();

  const handleLogin = useCallback(async () => {
    await loginWithPopup({ prompt: "login" });

    const token = await getIdTokenClaims();

    console.log({ token });
  }, [getIdTokenClaims, loginWithPopup]);

  const handleLogout = useCallback(() => {
    logout({
      returnTo: config.AUTH_REDIRECT_URI,
    });
  }, [logout]);

  if (isLoading) {
    return (
      <Box sx={ buttonSx }><Typography variant="body2">Loading...</Typography></Box>
    );
  }

  if (isAuthenticated) {
    return (
      <Button onClick={ handleLogout } sx={ buttonSx }>
        Log Out
      </Button>
    );
  }

  return (
    <Button onClick={ handleLogin } sx={ buttonSx }>
      Log In
    </Button>
  );
};
