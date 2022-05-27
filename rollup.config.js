import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import * as fs from 'fs';
import analyze from 'rollup-plugin-analyzer';
import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from "./package.json";


// import { terser } from "rollup-plugin-terser";
// import { babel } from "@rollup/plugin-babel";
// import externals from "rollup-plugin-node-externals";


function writeTo(analysisString) {
  try {
    fs.writeFileSync('./stats.md', analysisString);
  } catch(err) {
    console.log('Could not write stats.md.', err);
  }
}

const RUN_BUNDLE_ANALYSIS = !process.env.GITHUB_ACTIONS && true;

if (RUN_BUNDLE_ANALYSIS) {
  console.log('\n\nRunning build with bundle analysis...\n');
}


// =============================================================================
//
// BUNDLE SIZE ANALYSIS:
//
// The build will run in bundle analysis mode when running locally by default. If you want
//
// If you want to build a production bundle, please, change the `&& true` in `RUN_BUNDLE_ANALYSIS` to `false`.
//
// The build will always run in production mode when running on GitHub Actions.
//
// =============================================================================


// Extensions handled by babel:
// const EXTENSIONS = [".ts", ".tsx"];

// Exclude dev dependencies:
const EXTERNAL = [
  ...Object.keys(pkg.devDependencies),
  ...(RUN_BUNDLE_ANALYSIS ? [] : Object.keys(pkg.dependencies)),
  ...Object.keys(pkg.peerDependencies),

  // See issues https://github.com/rollup/rollup/issues/3684, https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency:
  "react/jsx-runtime",
  "prop-types",
  "react-is",
  "@hookform/resolvers/yup",
  "react-payment-inputs/images",
  "@mui/material/styles",
  "country-region-data/dist/data-umd",
  "@apollo/client/link/context",
  /@mui\/icons\-material\/.*/,
];

export default [{
  input: "src/index.ts",

  output: [{
    dir: "dist/esm",
    sourcemap: true,
    format: "esm",
    preserveModules: true, // Enables tree-shaking.
    globals: {
      react: "React",
    },
    exports: "named",
  }, {
    dir: "dist/cjs",
    sourcemap: true,
    format: "cjs",
    preserveModules: true, // Enables tree-shaking.
    globals: {
      react: "React",
    },
    exports: "named",
  }],

  external: EXTERNAL,

  plugins: [
    // peerDepsExternal(), // https://rollupjs.org/guide/en/#peer-dependencies
    // externals(), // https://www.npmjs.com/package/rollup-plugin-node-externals.

    resolve({
      // Warn if some modules are not going to be imported properly (such as the ones added manually to the EXTERNAL array above):
      modulesOnly: true,
    }),

    commonjs({
      ignoreGlobal: true,
    }),

    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: "rollup.tsconfig.json",
    }),

    // babel({
    //   configFile: "./rollup.babel.json",
    //   extensions: EXTENSIONS,  // Compile our TypeScript files
    //   // babelHelpers: "inline",  // Place babel helper functions in the same file they were used
    //   babelHelpers: "runtime",  // Place babel helper functions in the same file they were used
    //   include: EXTENSIONS.map(ext => `src/**/*${ext}`),
    //   exclude: "node_modules/**",
    // }),

    // terser(),

    RUN_BUNDLE_ANALYSIS ? analyze({ writeTo }) : null,
    RUN_BUNDLE_ANALYSIS ? visualizer() : null,
  ].filter(Boolean),

}, {
  input: "./dist/types/index.d.ts",
  output: [{ file: "./dist/index.d.ts", format: "esm" }],
  external: EXTERNAL,
  plugins: [dts()],
}];
