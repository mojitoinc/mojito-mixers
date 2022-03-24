import { useAuth0 } from "@auth0/auth0-react";
import { GlobalLoader } from "../../components/core/GlobalLoader";
import { EPages } from "../../utils/pages/pages.enum";
import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export function ProtectedPageContainer({
  revertDirection = false,
  children,
}: PropsWithChildren<{
  redirectUrl?: EPages;
  revertDirection?: boolean;
}>) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <GlobalLoader />;

  if (revertDirection && isAuthenticated) {
    return (
      <Typography variant="body2">You must be unauthenticated to see this page.</Typography>
    );
  }

  if (!revertDirection && !isAuthenticated) {
    return (
      <Typography variant="body2">You must be authenticated to see this page.</Typography>
    );
  }

  return <>{children}</>;
}
