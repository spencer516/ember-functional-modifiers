import makeFunctionalModifier from 'ember-functional-modifiers';

export function fooModifier(element) {
  function callback() {
    alert('You clicked me!');
  }

  element.addEventListener('click', callback);

  return () => {
    element.removeEventListener('click', callback);
  };
}

export default makeFunctionalModifier(fooModifier);
