import styled from "styled-components";
import { useState, useMemo } from "react";
import {
  usePaymentKeyQuery,
  useCreatePaymentMethodMutation,
  useGetPaymentMethodListQuery,
} from "../../services/graphql/generated";
import { createMessage, encrypt, readKeys } from "openpgp";
import atob from "atob";
import btoa from "btoa";

const CardInList = styled.div`
  margin: 5px 0;
  width: auto;
  min-width: 40%;
  padding: 1em;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const PaymentMethodList: React.FC<{ index: number; card: any }> = ({
  index,
  card,
}) => {
  return (
    <CardInList>
      #{index}
      <p>ID: {card.id}</p>
      <p>Last 4: {card.last4Digit}</p>
      <p>Network: {card.network}</p>
      <p>Type: {card.type}</p>
    </CardInList>
  );
};

const OrgInput = styled.div`
  display: block;
  margin: 1em 0;
  position: relative;

  > input {
    display: block;
    position: relative;
  }
`;

const PaymentWrapper = styled.div`
  display: block;
  position: relative;
  margin: 2em auto;

  form {
    input,
    select {
      display: block;
      min-width: 100%;
      margin: 5px 0;
    }

    input[type="submit"] {
      border-radius: 8px;
      border: none;
      padding: 6px 12px;
      cursor: pointer;
      background-color: #7db66b;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

const Expiration = styled.div`
  span {
    display: inline-flex;
    input {
      width: 45%;
    }
  }
`;

const SectionTitle = styled.h3`
  display: block;
`;

const defaultValues = {
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
  phoneNumber: null,
  email: "filip@mojito.xyz",
};

const emptyValues = {
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
  phoneNumber: null,
  email: "",
};

export const CreatePayment = () => {
  const { data, loading, error } = usePaymentKeyQuery();

  const [
    createPaymentMethod,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useCreatePaymentMethodMutation();

  const prefillValues = () => {
    setPaymnentDetails(defaultValues);
  };

  const clearValues = () => {
    setPaymnentDetails(emptyValues);
  };

  const [orgId, setOrgId] = useState("");

  const [paymentDetails, setPaymnentDetails] = useState({
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
  });

  const {
    data: paymentMethodList,
    loading: methodListLoading,
    error: methodListError,
  } = useGetPaymentMethodListQuery({
    variables: {
      orgID: orgId,
    },
  });

  const paymentList = useMemo(() => {
    if (paymentMethodList?.getPaymentMethodList) {
      return paymentMethodList.getPaymentMethodList;
    }
  }, [paymentMethodList]);

  const monthList = [];
  for (let i = 1; i <= 12; i++) {
    monthList.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const years = [2021, 2022, 2023, 2024, 2025, 2026];
  const yearList = years.map((y) => {
    return (
      <option key={y} value={y}>
        {y}
      </option>
    );
  });

  const onChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPaymnentDetails((prevVal) => {
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

  const createCard = async (e) => {
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
  };

  return (
    <>
      <PaymentWrapper>
        <h1>Payment</h1>

        <OrgInput>
          {/* TODO: Make a dropdown list of organizations */}
          <label>Organization ID (required)</label>
          <input
            placeholder="Organization ID"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
          />
        </OrgInput>

        <h4>Card Details</h4>
        <form onSubmit={createCard}>
          <input
            type="text"
            value={paymentDetails.name}
            placeholder="Name"
            name="name"
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Card number"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="CVV"
            value={paymentDetails.cvv}
            name="cvv"
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Line 1"
            name="line1"
            value={paymentDetails.line1}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Line 2"
            name="line2"
            value={paymentDetails.line2}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={paymentDetails.city}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="District"
            name="district"
            value={paymentDetails.district}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Postal Code"
            name="postalCode"
            value={paymentDetails.postalCode}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={paymentDetails.country}
            onChange={onChange}
          />
          <input
            type="phone"
            placeholder="Phone Number"
            name="phoneNumber"
            value={paymentDetails.phoneNumber}
            onChange={onChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={paymentDetails.email}
            onChange={onChange}
          />
          <Expiration>
            <SectionTitle>Expiration</SectionTitle>
            <span>
              <select
                name="expMonth"
                value={paymentDetails.expMonth}
                onChange={onChange}
              >
                {monthList}
              </select>
              <select
                name="expYear"
                value={paymentDetails.expYear}
                onChange={onChange}
              >
                {yearList}
              </select>
            </span>
          </Expiration>
          <input type="submit" value="Create Payment Method" />
        </form>
        <button onClick={prefillValues}>Prefill values</button>
        <button onClick={clearValues}>Clear values</button>
      </PaymentWrapper>
      <div>
        {methodListLoading && <p>Fetching payment method list...</p>}
        {methodListLoading && <p>Error fetching payment method list!</p>}
        {paymentList && (
          <div>
            <h4>Cards in Organization</h4>
            {paymentList.map((card, idx) => {
              return (
                <PaymentMethodList key={idx} index={idx + 1} card={card} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
