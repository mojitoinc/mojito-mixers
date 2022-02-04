import { useAuth0 } from "@auth0/auth0-react";
import { config } from "../../utils/config/config.constants";
import { useCallback } from "react";
import { Button } from "@mui/material";

export function AuthButton() {
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
    return <p>Loading...</p>;
  }

  return (<>
    { isAuthenticated ? (
      <Button onClick={ handleLogout }>
        Log Out
      </Button>
    ) : (
      <Button onClick={ handleLogin }>
        Log In
      </Button>
    ) }
  </>);
}
