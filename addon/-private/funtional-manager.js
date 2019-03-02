import Ember from 'ember';
import FunctionalModifier from '../modifiers/functional-modifier';

export default Ember._setModifierManager(
  () => ({
    createModifier(factory) {
      return new factory.class();
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
