/* eslint-disable node/no-unpublished-require */
'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

describe('Blueprint: functional-modifier', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    it('creates foo modifier', function() {
      return emberGenerateDestroy(['functional-modifier', 'foo'], file => {
        expect(file('app/modifiers/foo.js'))
          .to.contain(
            `import functionalModifier from 'ember-functional-modifiers';`
          )
          .to.contain(`export function foo(element/*, params, hash */) {`)
          .to.contain(`export default functionalModifier(foo)`);

        expect(file('tests/integration/modifiers/foo-test.js'))
          .to.contain(`module('Integration | Modifier | foo'`)
          .to.contain('await render(hbs`<div {{foo}}>Button Text</div>`);');
      });
    });
  });
});
