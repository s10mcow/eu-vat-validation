var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "euVatValidation.js",
    library: "",
    libraryTarget: "umd"
  }
};
