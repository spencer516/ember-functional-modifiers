'use strict';

module.exports = {
  description: 'Generates a functional modifier integration test',

  fileMapTokens() {
    return {
      __root__() {
        return 'tests';
      },
      __collection__() {
        return 'modifiers';
      },
      __testType__() {
        return 'integration';
      },
      __name__(options) {
        return `${options.dasherizedModuleName}-test`;
      }
    };
  },

  locals(options) {
    const { name } = options.entity;
    const friendlyTestDescription = `Integration | Modifier | ${name}`;
    return { friendlyTestDescription };
  }
};
