// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require("next-images");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = withImages({
  inlineImageLimit: false,

  images: {
    // Do not add due to vulnerability: https://github.com/mojitoinc/mojito-mixers/security/dependabot/6
    // domains: [],
    loader: "imgix",
    path: "/",
  },

  distDir: "build",

  publicRuntimeConfig: {
    NEXT_PUBLIC_RUNTIME_AUTH0_DOMAIN: process.env.NEXT_PUBLIC_RUNTIME_AUTH0_DOMAIN,
    NEXT_PUBLIC_RUNTIME_AUTH0_CLIENTID: process.env.NEXT_PUBLIC_RUNTIME_AUTH0_CLIENTID,
    NEXT_PUBLIC_RUNTIME_AUTH_REDIRECT_URI: process.env.NEXT_PUBLIC_RUNTIME_AUTH_REDIRECT_URI,
    NEXT_PUBLIC_RUNTIME_API_HOSTNAME: process.env.NEXT_PUBLIC_RUNTIME_API_HOSTNAME,
  },

  reactStrictMode: true,

  // experimental: {
  //   externalDir: true,
  // },

  webpack(config, options) {
    const { dev, isServer } = options;

    if (dev && isServer) {
      // Type checking in separated process for the whole project:
      //
      // - If enabled => Typescript errors for all files while developing, but slower builds.
      // - If disabled => Faster builds, but no Typescript errors in unchanged files.
      //
      // Does not run type checking twice.
      //
      // See https://github.com/vercel/next.js/issues/12735
      // See https://github.com/vercel/next.js/pull/13428

      config.plugins.push(
        new ForkTsCheckerWebpackPlugin(),
      );
    }

    return config;
  },
});
