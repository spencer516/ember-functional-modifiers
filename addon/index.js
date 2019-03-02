import Ember from 'ember';
import FunctionalModifierManager from './-private/functional-manager';
import { setServiceInjections } from './-private/service-injections';

const SINGLETON_MANAGER = new FunctionalModifierManager();

export default function makeFunctionalModifier(...args) {
  const fn = args.pop();
  const injections = args.shift();

  if (injections && injections.services) {
    setServiceInjections(fn, injections.services);
  }

  return Ember._setModifierManager(() => SINGLETON_MANAGER, fn);
}
