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

For example, if we wanted to write our own click handler, that may look like this:

```js
// app/modifiers/click.js
import makeFunctionalModifier from 'ember-functional-modifiers';

export default makeFunctionalModifier((element, [action]) => {
  element.addEventListener('click', action);
  return () => element.removeEventListener('click', action);
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


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
