import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts"
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2"
// import { terser } from "rollup-plugin-terser";
// import { babel } from "@rollup/plugin-babel";
// import externals from "rollup-plugin-node-externals";

import pkg from "./package.json";

// Extensions handled by babel:
// const EXTENSIONS = [".ts", ".tsx"];

// Exclude dev dependencies:
const EXTERNAL = [
  ...Object.keys(pkg.devDependencies),
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),

  // See issues https://github.com/rollup/rollup/issues/3684, https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency:
  "react/jsx-runtime",
  "prop-types",
  "react-is",
  "@hookform/resolvers/yup",
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
  ],

}, {
  input: "./dist/types/index.d.ts",
  output: [{ file: "./dist/index.d.ts", format: "esm" }],
  external: EXTERNAL,
  plugins: [dts()],
}];
