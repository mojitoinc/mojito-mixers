import Typography from "@mui/material/Typography";
import { SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "../../../../domain/circle/circle.interfaces";
import React from "react";

export interface BillingInfoFragmentProps {
  savedPaymentMethod: SavedPaymentMethod | SavedPaymentMethodBillingInfo;
};

export const BillingInfoFragment: React.FC<BillingInfoFragmentProps> = ({
  savedPaymentMethod: {
    billingDetails: {
      name,
      address1,
      address2,
      city,
      district,
      postalCode,
      country,
    },
    metadata: {
      email,
      phoneNumber
    },
  },
}) => (<div style={{ display:"flex", flexDirection: 'column' }}>
  <Typography variant="caption">{ name }</Typography>
  { address1 && <Typography variant="caption">{ address1 }</Typography> }
  { address2 && <Typography variant="caption">{ address2 }</Typography> }
  <Typography variant="caption">{ [city, district.label, postalCode, country.label].filter(Boolean).join(", ") }</Typography>
  <Typography variant="caption">{ email }</Typography>
  <Typography variant="caption">{ phoneNumber }</Typography>
</div>);
