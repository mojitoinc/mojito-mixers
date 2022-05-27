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


// =============================================================================
//
// BUNDLE SIZE ANALYSIS:
//
// To analyze the bundle size, you must:
//
// - Comment out `...Object.keys(pkg.dependencies),` below.
// - Uncomment `writeTo`, `analyze` and `visualizer`, both at the top (imports) and at the bottom (plugins).
//
// This is done automatically, checking `process.env.GITHUB_ACTIONS`, so that we only run the analysis and update the
// result files when running locally.
//
// If you want to build a production bundle, please, make sure `...Object.keys(pkg.dependencies),` is included in
// `EXTERNAL` below.
//
// =============================================================================

if (process.env.GITHUB_ACTIONS) {
  console.log('\nRunning build with bundle analysis...\n');
}

// Extensions handled by babel:
// const EXTENSIONS = [".ts", ".tsx"];

// Exclude dev dependencies:
const EXTERNAL = [
  ...Object.keys(pkg.devDependencies),
  ...(process.env.GITHUB_ACTIONS ? Object.keys(pkg.dependencies) : []),
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

    process.env.GITHUB_ACTIONS ? analyze({ writeTo }) : null,
    process.env.GITHUB_ACTIONS ? visualizer() : null,
  ].filter(Boolean),

}, {
  input: "./dist/types/index.d.ts",
  output: [{ file: "./dist/index.d.ts", format: "esm" }],
  external: EXTERNAL,
  plugins: [dts()],
}];
