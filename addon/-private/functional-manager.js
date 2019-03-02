import { getServiceInjections } from './service-injections';

const MODIFIER_STATE = new WeakMap();

function teardown(modifier) {
  if (!MODIFIER_STATE.has(modifier)) {
    return;
  }

  const { teardown, element } = MODIFIER_STATE.get(modifier);

  if (teardown && typeof teardown === 'function') {
    teardown();
  }

  return element;
}

function setup(modifier, element, args) {
  const { positional, named } = args;
  const teardown = modifier(element, positional, named);

  MODIFIER_STATE.set(modifier, { element, teardown });
}

export default class FunctionalModifierManager {
  createModifier(factory) {
    // https://github.com/rwjblue/ember-modifier-manager-polyfill/issues/6
    const fn = factory.class ? factory.class : factory;
    const serivces = getServiceInjections(fn, factory.owner);

    return (...args) => fn(...serivces, ...args);
  }

  installModifier(modifier, element, args) {
    setup(modifier, element, args);
  }

  updateModifier(modifier, args) {
    const element = teardown(modifier);
    setup(modifier, element, args);
  }

  destroyModifier(modifier) {
    teardown(modifier);
  }
}
