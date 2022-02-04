import { UserFormat } from "../../../domain/auth/authentication.interfaces";
import { User } from "../../../queries/graphqlGenerated";
import { CheckoutModalHeaderVariant } from "./CheckoutModalHeader";

export function getFormattedUser(
  variant: CheckoutModalHeaderVariant,
  user: User = {} as User,
  userFormat: UserFormat = "email",
): string {
  if (variant === "guest") return "Guest Checkout";

  return user[userFormat] || user.email || user.name || user.username || "Logged In User";
}
