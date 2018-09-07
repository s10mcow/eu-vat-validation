const pkg = require("./package.json");
let libraryName = pkg.name;

import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import nodeResolve from "rollup-plugin-node-resolve";
import { argv } from "yargs";

const format = argv.format || argv.f || "iife";
const compress = argv.uglify;

const babelOptions = {
  exclude: "node_modules/**",
  presets: [["es2015", { modules: false }], "stage-0"],
  plugins: [
    "external-helpers",
    ["transform-es2015-classes", { loose: true }],
    "transform-proto-to-assign"
  ],
  babelrc: false
};

export default {
  entry: "src/index.js",
  format: "umd",
  plugins: [babel(babelOptions), nodeResolve({ jsnext: true })].concat(
    compress ? uglify() : []
  ),
  moduleName: "euVatValidation",
  dest: `dist/umd/euVatValidation${compress ? ".min" : ""}.js`
};
