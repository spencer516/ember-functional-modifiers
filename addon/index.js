import { FunctionalModifier } from './-private/funtional-manager';
const { setPrototypeOf } = Object;

export default function makeFunctionalModifier(fn) {
  setPrototypeOf(fn, FunctionalModifier);
  return fn;
}
