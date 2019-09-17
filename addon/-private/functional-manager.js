import { capabilities } from '@ember/modifier';
import { getServiceInjections } from './service-injections';

const MODIFIER_STATE = new WeakMap();

function teardown(modifier, isRemoving) {
  if (!MODIFIER_STATE.has(modifier)) {
    return;
  }

  const { teardown, element } = MODIFIER_STATE.get(modifier);

  if (teardown && typeof teardown === 'function') {
    teardown(isRemoving);
  }

  return element;
}

function setup(modifier, element, args) {
  const { positional, named } = args;
  const teardown = modifier(element, positional, named);

  MODIFIER_STATE.set(modifier, { element, teardown });
}

export default class FunctionalModifierManager {
  constructor(owner) {
    this.owner = owner;
    this.serviceCache = new WeakMap();
    this.capabilities = capabilities('3.13');
  }

  getServicesFor(fn) {
    let services = this.serviceCache.get(fn);

    if (services === undefined) {
      services = getServiceInjections(fn, this.owner);
      this.serviceCache.set(fn, services);
    }

    return services;
  }

  createModifier(factory) {
    const { class: fn } = factory;
    const services = this.getServicesFor(fn);

    return (...args) => fn(...services, ...args);
  }

  installModifier(modifier, element, args) {
    setup(modifier, element, args);
  }

  updateModifier(modifier, args) {
    const element = teardown(modifier, false);
    setup(modifier, element, args);
  }

  destroyModifier(modifier) {
    teardown(modifier, true);
  }
}
