import { Link } from "@mui/material";
import React, { Fragment } from "react";

export const CONSENT_ERROR_MESSAGE = "You must accept the terms and conditions of the sale.";

export type ConsentType = "disclaimer" | "checkbox" | "circle";

export interface ConsentTextProps {
  privacyHref?: string;
  termsOfUseHref?: string;
}

export const ConsentText: React.FC<ConsentTextProps> = ({
  privacyHref,
  termsOfUseHref,
}) => {
  const linkElements = [
    privacyHref ? <Link color="text.primary" href={ privacyHref } target="_blank">Privacy Notices</Link> : null,
    termsOfUseHref ? <Link color="text.primary" href={ termsOfUseHref } target="_blank">Terms of Use</Link> : null,
  ].filter(Boolean);

  if (linkElements.length === 0) linkElements.push(<>Terms of Use</>);

  const lastLinkElementsIndex = linkElements.length - 1;

  return (<>
    have read, understood, and consent to the{" "}
    { linkElements.map((linkElement, i) => {
      return <Fragment key={ i }>{ i > 0 && i === lastLinkElementsIndex ? "and " : "" }{ linkElement }{ " " }</Fragment>
    }) }
    of the sale.
  </>);
};

