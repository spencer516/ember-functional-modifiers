import { setModifierManager } from '@ember/modifier';
import FunctionalModifierManager from './-private/functional-manager';
import { setServiceInjections } from './-private/service-injections';

const MANAGERS = new WeakMap();

function managerFor(owner) {
  let manager = MANAGERS.get(owner);
  if (manager === undefined) {
    manager = new FunctionalModifierManager(owner);
  }

  return manager;
}

export default function makeFunctionalModifier(...args) {
  const fn = args.pop();
  const injections = args.shift();

  if (injections && injections.services) {
    setServiceInjections(fn, injections.services);
  }

  return setModifierManager(managerFor, fn);
}
