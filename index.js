"use strict";

module.exports = {
  name: require("./package").name,
  options: {
    babel: {
      plugins: [
        "@babel/plugin-proposal-class-properties",
        ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: false }]
      ]
    }
  }
};
