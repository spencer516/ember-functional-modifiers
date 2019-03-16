'use strict';

module.exports = {
  description: 'Generates a functional modifier',

  fileMapTokens() {
    return {
      __root__() {
        return 'app';
      },
      __collection__() {
        return 'modifiers';
      },
      __name__(options) {
        return options.dasherizedModuleName;
      }
    };
  }
};
