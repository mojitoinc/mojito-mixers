import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";
import React from "react";
import { GlobalLoader } from "../core/GlobalLoader";

interface ProtectedPageContainer {
  revertDirection?: boolean;
  children?: React.ReactNode;
}

export const ProtectedPageContainer: React.FC<ProtectedPageContainer> = ({
  revertDirection = false,
  children,
}) => {
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

  return <>{ children }</>;
};
