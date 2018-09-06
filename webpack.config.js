var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    library: "main",
    libraryTarget: "umd",
    umdNamedDefine: true
  }
};
