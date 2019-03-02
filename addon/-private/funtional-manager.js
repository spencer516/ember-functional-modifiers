import Ember from 'ember';
import FunctionalModifier from '../modifiers/functional-modifier';

export default Ember._setModifierManager(
  () => ({
    createModifier(factory) {
      // https://github.com/rwjblue/ember-modifier-manager-polyfill/issues/6
      if (factory.class) {
        return new factory.class();
      } else {
        return new factory();
      }
    },
    installModifier(instance, element, args) {
      instance.element = element;
      instance.setup(args);
    },
    updateModifier(instance, args) {
      instance.teardown();
      instance.setup(args);
    },
    destroyModifier(instance) {
      instance.teardown();
    }
  }),
  FunctionalModifier
);
