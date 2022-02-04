import { UserFormat } from "../../../domain/auth/authentication.interfaces";
import { User } from "../../../queries/graphqlGenerated";
import { CheckoutModalHeaderVariant } from "./CheckoutModalHeader";
export declare function getFormattedUser(variant: CheckoutModalHeaderVariant, user?: User, userFormat?: UserFormat): string;
