export default class FunctionaModifier {
  modifierFunction;
  cleanupFn;
  element;

  setup(args) {
    const { modifierFunction, element } = this;
    const { positional, named } = args;
    this.cleanupFn = modifierFunction(element, positional, named);
  }

  teardown() {
    const { cleanupFn } = this;

    if (cleanupFn && typeof cleanupFn === 'function') {
      cleanupFn();
    }
  }
}
