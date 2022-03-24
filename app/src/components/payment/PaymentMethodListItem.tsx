import { SxProps, Theme } from "@mui/material/styles";
import { Box } from "@mui/material";

const paymentMethodListItemSx: SxProps<Theme> = {
  margin: "5px 0",
  width: "auto",
  minWidth: "40%",
  padding: "1em",
  borderRadius: "4px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
};

export interface PaymentMethodListItem {
  index: number;
  card: any;
}

export const PaymentMethodListItem: React.FC<PaymentMethodListItem> = ({
  index,
  card,
}) => {
  return (
    <Box sx={ paymentMethodListItemSx }>
      <p>#{index}</p>
      <p>ID: {card.id}</p>
      <p>Last 4: {card.last4Digit}</p>
      <p>Network: {card.network}</p>
      <p>Type: {card.type}</p>
    </Box>
  );
};
