import { Box } from "@mui/material";
import { Theme, SxProps } from "@mui/material/styles";
import React from "react";
import Link from "next/link";
import { AuthButton } from "../auth/AuthButton";

const headerSx: SxProps<Theme> = {
  backgroundColor: "white",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  py: 2,
  mb: 4,
  boxSizing: "border-box",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
};

export const Header: React.FC = () => (
  <Box sx={ headerSx } component="header">
    <AuthButton />

    <Link href="/">
      <a style={{ display: "block" }}>
        { /* eslint-disable-next-line @next/next/no-img-element */ }
        <img src="/img/logos/mojito-light-logo.svg" alt="Mojito Logo" style={{ display: "block", height: "32px" }} />
      </a>
    </Link>
  </Box>
);
