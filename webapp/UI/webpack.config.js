const path = require("path");
const dist = "C:/projects/TavTav/webapp/UI/target";

module.exports = {
  entry: "./src/main/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(dist)
  },
  devtool: "#source-map"
};
