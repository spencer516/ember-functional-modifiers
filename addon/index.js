import Ember from 'ember';
import FunctionalModifierManager from './-private/functional-manager';

const SINGLETON_MANAGER = new FunctionalModifierManager();

export default function makeFunctionalModifier(fn) {
  return Ember._setModifierManager(() => SINGLETON_MANAGER, fn);
}
