import { createMessage, encrypt, Key, readKeys, Message } from "openpgp";
import atob from "atob";
import btoa from "btoa";

export interface EncryptCVVArgs {
  key: string;
  cvv: string;
}

export interface EncryptCardArgs extends EncryptCVVArgs {
  number: string;
}

export type EncryptCardDataArgs = EncryptCardArgs | EncryptCVVArgs;

export async function encryptCardData({ key, ...dataToEncrypt }: EncryptCardDataArgs) {
  const decodedPublicKey = atob(key);

  const [encryptionKeys, message] = await Promise.allSettled([
    readKeys({ armoredKeys: decodedPublicKey }),
    createMessage({ text: JSON.stringify(dataToEncrypt) }),
  ]).then((allSettledResults) => {
    return allSettledResults.map((allSettledResult) => {
      return allSettledResult.status === "fulfilled" ? allSettledResult.value : null;
    }) as [Key[], Message<string>];
  });

  const ciphertext = await encrypt({
    message,
    encryptionKeys,
  });

  return btoa(ciphertext);
}
