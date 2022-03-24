import { useState, useCallback } from "react";
import {
  usePaymentKeyQuery,
  useCreatePaymentMethodMutation,
  useGetPaymentMethodListQuery,
} from "../../services/graphql/generated";
import { createMessage, encrypt, readKeys } from "openpgp";
import { Box, Button, Typography } from "@mui/material";
import atob from "atob";
import btoa from "btoa";
import { fieldsetLabelSx, inputStyle, inputGroupStyle, buttonSx } from "../../components/legacy/legacy-styles.constants";
import { PaymentMethodListItem } from "../../components/payment/PaymentMethodListItem";

interface PaymentDetails {
  cardNumber: string;
  cvv: string;
  expMonth: number;
  expYear: number;
  line1: string;
  line2: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  name: string;
  phoneNumber: string;
  email: string;
}

const defaultValues: PaymentDetails = {
  cardNumber: "4007400000000007",
  cvv: "000",
  expMonth: 7,
  expYear: 2023,
  line1: "fafsf",
  line2: "",
  city: "Mojitoland",
  district: "Mojitoverse",
  postalCode: "000000",
  country: "MO",
  name: "Satoshi Nakamoto",
  phoneNumber: "",
  email: "filip@mojito.xyz",
};

const emptyValues: PaymentDetails = {
  cardNumber: "",
  cvv: "",
  expMonth: 1,
  expYear: 2022,
  line1: "",
  line2: "",
  city: "",
  district: "",
  postalCode: "",
  country: "",
  name: "",
  phoneNumber: "",
  email: "",
};

export const CreatePayment: React.FC = () => {

  const [orgId, setOrgId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(emptyValues);

  const { data, loading, error } = usePaymentKeyQuery({
    skip: !orgId,
    variables: {
      orgID: orgId,
    },
  });

  const [createPaymentMethod, {
    data: mutationData,
    loading: mutationLoading,
    error: mutationError
  }] = useCreatePaymentMethodMutation();

  const prefillValues = () => setPaymentDetails(defaultValues);
  const clearValues = () => setPaymentDetails(emptyValues);

  const {
    data: paymentMethodList,
    loading: methodListLoading,
    error: paymentMethodListError,
  } = useGetPaymentMethodListQuery({
    skip: !orgId,
    variables: {
      orgID: orgId,
    },
  });

  const paymentList = paymentMethodList?.getPaymentMethodList || [];

  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
    return (
      <option key={m} value={m}>
        {m}
      </option>
    );
  });

  const yearList = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map((y) => {
    return (
      <option key={y} value={y}>
        {y}
      </option>
    );
  });

  const onChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPaymentDetails((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };

  const encryptCard = async (
    key: string,
    keyId: string,
    cardNumber: string,
    cvv: string
  ) => {
    const dataToEncrypt = {
      number: cardNumber,
      cvv,
    };
    const decodedPublicKey = atob(key);
    const encryptionKeys = await readKeys({ armoredKeys: decodedPublicKey });
    const message = await createMessage({
      text: JSON.stringify(dataToEncrypt),
    });

    const options = {
      message,
      encryptionKeys,
    };

    const ciphertext = await encrypt(options);

    return {
      encryptedData: btoa(ciphertext),
      keyId: keyId,
    };
  };

  const createCard = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orgId) {
      console.log("Please fill in Org ID");
      return;
    }

    if (!data?.getPaymentPublicKey) {
      console.log("error getting publicKey: ", error);
      return;
    }
    try {
      const encrypt = await encryptCard(
        data.getPaymentPublicKey.publicKey,
        data.getPaymentPublicKey.keyID,
        paymentDetails.cardNumber,
        paymentDetails.cvv
      );

      enum PaymentType {
        CreditCard = "CreditCard",
      }

      const res = await createPaymentMethod({
        variables: {
          orgID: orgId,
          input: {
            paymentType: PaymentType.CreditCard,
            creditCardData: {
              keyID: encrypt.keyId,
              encryptedData: encrypt.encryptedData,
              billingDetails: {
                name: paymentDetails.name,
                city: paymentDetails.city,
                country: paymentDetails.country,
                address1: paymentDetails.line1,
                address2: paymentDetails.line2,
                district: paymentDetails.district,
                postalCode: paymentDetails.postalCode,
              },
              expirationMonth: paymentDetails.expMonth,
              expirationYear: paymentDetails.expYear,
              metadata: {
                email: paymentDetails.email,
              },
            },
          },
        },
      });
      console.log({ res });
    } catch (err) {
      console.error({ err });
    } finally {
      console.log("loading done");
    }
  }, [createPaymentMethod, data, error, orgId, paymentDetails]);

  return (<>
    <Box sx={{ display: "block", position: "relative", margin: "2em auto" }}>
      <Typography variant="h5">1. Create Payment Method</Typography>

      <form onSubmit={createCard}>
        <Typography variant="h6" sx={ fieldsetLabelSx }>Organization ID</Typography>

        { /* TODO: Make a dropdown list of organizations */ }
        <input
          style={ inputStyle }
          type="text"
          value={orgId}
          placeholder="Organization ID"
          name="orgID"
          onChange={(e) => setOrgId(e.target.value)} />

        <Typography variant="h6" sx={ fieldsetLabelSx }>Billing Information</Typography>

        <input
          style={ inputStyle }
          type="text"
          value={paymentDetails.name}
          placeholder="Name"
          name="name"
          onChange={onChange} />

        <input
          style={ inputStyle }
          type="email"
          placeholder="Email"
          name="email"
          value={paymentDetails.email}
          onChange={onChange} />

        <input
          style={ inputStyle }
          type="phone"
          placeholder="Phone Number"
          name="phoneNumber"
          value={paymentDetails.phoneNumber}
          onChange={onChange} />

        <input
          style={ inputStyle }
          type="text"
          placeholder="Line 1"
          name="line1"
          value={paymentDetails.line1}
          onChange={onChange} />

        <input
          style={ inputStyle }
          type="text"
          placeholder="Line 2"
          name="line2"
          value={paymentDetails.line2}
          onChange={onChange} />

        <input
          style={ inputStyle }
          type="text"
          placeholder="City"
          name="city"
          value={paymentDetails.city}
          onChange={onChange} />

        <input
          style={ inputStyle }
          type="text"
          placeholder="Country"
          name="country"
          value={paymentDetails.country}
          onChange={onChange} />

        <input
          style={ inputStyle }
          type="text"
          placeholder="State"
          name="district"
          value={paymentDetails.district}
          onChange={onChange} />

        <input
          style={ inputStyle }
          type="text"
          placeholder="Postal Code"
          name="postalCode"
          value={paymentDetails.postalCode}
          onChange={onChange} />

        <Typography variant="h6" sx={ fieldsetLabelSx }>Credit Card Information</Typography>

        <Box sx={ inputGroupStyle }>
          <input
            style={ inputStyle }
            type="text"
            placeholder="Card number"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={onChange} />

          <input
            style={ inputStyle }
            type="text"
            placeholder="CVV"
            value={paymentDetails.cvv}
            name="cvv"
            onChange={onChange} />
        </Box>

        <Box sx={ inputGroupStyle }>
          <select
            style={ inputStyle }
            placeholder="Exp. Month"
            name="expMonth"
            value={paymentDetails.expMonth}
            onChange={onChange}>
            {monthList}
          </select>

          <select
            style={ inputStyle }
            placeholder="Exp. Year"
            name="expYear"
            value={paymentDetails.expYear}
            onChange={onChange}>
            {yearList}
          </select>
        </Box>

        <Button type="submit" sx={ buttonSx } variant="contained">Create Payment Method</Button>

        <Box sx={ inputGroupStyle }>
          <Button onClick={ prefillValues } sx={ buttonSx } variant="contained" color="secondary">Fill Form</Button>
          <Button onClick={ clearValues } sx={ buttonSx } variant="contained" color="secondary">Clear Form</Button>
        </Box>

      </form>
    </Box>

    <div>
      {methodListLoading && <p>Fetching payment method list...</p>}
      {methodListLoading && <p>Error fetching payment method list!</p>}
      {paymentList.length > 0 && (
        <div>
          <h4>Cards in Organization</h4>
          {paymentList.map((card, i) => {
            return (
              <PaymentMethodListItem key={ i } index={ i  + 1} card={card} />
            );
          })}
        </div>
      )}
    </div>

  </>);
};
