import { SelectOption } from "../../components/shared/Select/Select";

export const NEW_WALLET_OPTION: SelectOption<string> = {
  value: "<NEW>",
  label: "Create a new wallet for me"
};

export const CUSTOM_WALLET_OPTION: SelectOption<string> = {
  value: "",
  label: "I already have a wallet (such as Metamask or Rainbow)",
};
