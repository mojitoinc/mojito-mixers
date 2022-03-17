import "@mui/material/styles";
import { PalettePaymentUI } from "./mui.interfaces";

declare module "@mui/material/styles" {

  interface Palette {
    paymentUI?: PalettePaymentUI;
  }

  interface PaletteOptions {
    paymentUI?: PalettePaymentUI;
  }
}
