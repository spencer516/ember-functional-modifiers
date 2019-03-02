ember-functional-modifiers
==============================================================================

This addon provides a [`useLayoutEffect`-like](https://reactjs.org/docs/hooks-reference.html#useeffect) API for adding modifiers to elements in Ember.

For more information on modifiers, please check out @pzuraq's wonderful [blog post](https://www.pzuraq.com/coming-soon-in-ember-octane-part-4-modifiers/).

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-functional-modifiers
```

Usage
------------------------------------------------------------------------------

This addon does not provide any modifiers out of the box; instead (like Helpers), this library allows you to write your own.

For example, if you wanted to implement your own `scrollTop` modifier (similar to [this](https://github.com/emberjs/ember-render-modifiers#example-scrolling-an-element-to-a-position)), you may do something like this:

```js
// app/modifiers/scroll-top.js
import makeFunctionalModifier from 'ember-functional-modifiers';

export default makeFunctionalModifier((element, [scrollPosition]) => {
  element.scrollTop = scrollPosition;
})
```

Then, use it in your template:

```hbs
<div class="scroll-container" {{scroll-top @scrollPosition}}>
  {{yield}}
</div>
```

If the functionality you add in the modifier needs to be torn down when the element is removed, you can return a function for the teardown method.

For example, if you wanted to have your elements dance randomly on the page using `setInterval`, but you wanted to make sure that was canceled when the element was removed, you could do:

```js
// app/modifiers/move-randomly.js
import makeFunctionalModifier from 'ember-functional-modifiers';

const { random, round } = Math;

export default makeFunctionalModifier(element => {
  const id = setInterval(() => {
    const top = round(random() * 500);
    const left = round(random() * 500);
    element.style.transform = `translate(${left}px, ${top}px)`;
  }, 1000);

  return () => clearInterval(id);
});

```

```hbs
<button {{click (action "handleClick")}}>
  {{yield}}
</button>
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

Releasing
------------------------------------------------------------------------------

```sh
yarn release
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
