// TODO: I expected this to be imported were it exported in modifier-managers
import './-private/funtional-manager';
import FunctionalModifier from './modifiers/functional-modifier';

export default function makeFunctionaModifier(fn) {
  return class CustomModifier extends FunctionalModifier {
    modifierFunction = fn;
  };
}
