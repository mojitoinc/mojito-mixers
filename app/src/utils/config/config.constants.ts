import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const config = {
  AUTH0_DOMAIN: publicRuntimeConfig.NEXT_PUBLIC_RUNTIME_AUTH0_DOMAIN,
  AUTH0_CLIENTID: publicRuntimeConfig.NEXT_PUBLIC_RUNTIME_AUTH0_CLIENTID,
  AUTH_REDIRECT_URI: publicRuntimeConfig.NEXT_PUBLIC_RUNTIME_AUTH_REDIRECT_URI,
  API_HOSTNAME: publicRuntimeConfig.NEXT_PUBLIC_RUNTIME_API_HOSTNAME,
};
