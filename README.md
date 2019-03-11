ember-functional-modifiers
==============================================================================

This addon provides a [`useLayoutEffect`-like](https://reactjs.org/docs/hooks-reference.html#useeffect) API for adding modifiers to elements in Ember.

For more information on modifiers, please check out @pzuraq's wonderful [blog post](https://www.pzuraq.com/coming-soon-in-ember-octane-part-4-modifiers/).

Compatibility
------------------------------------------------------------------------------

This is currently compatible with:

* Ember.js v3.8 or above
* Ember CLI v2.13 or above

In the future, it will be supported with:

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

(Support for v2.18 is blocked by: https://github.com/rwjblue/ember-modifier-manager-polyfill/issues/6)


Installation
------------------------------------------------------------------------------

```
ember install ember-functional-modifiers
```

Usage
------------------------------------------------------------------------------

This addon does not provide any modifiers out of the box; instead (like Helpers), this library allows you to write your own.

## Example without Cleanup

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

## Example with Cleanup

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
<button {{move-randomly}}>
  {{yield}}
</button>
```

## Example with Service Injection

You may also want to inject a service into your modifier.

You can do that by supplying an injection object before the the modifier function. For example, suppose you wanted to track click events with `ember-metrics`:

```js
// app/modifiers/track-click.js
import makeFunctionalModifier from 'ember-functional-modifiers';

function trackClick(metrics, element, [eventName], options) {
  const callback = () => metrics.trackEvent(eventName, options);

  element.addEventListener('click', callback, true);

  return () => element.removeEventListener('click', callback);
}

export default makeFunctionalModifier(
  { services: ['metrics'] },
  trackClick
);
```

Then, you could use this in your template:

```hbs
<button {{track-click "Clicked the THING!"}}>
  Click Me!
</button>
```

*NOTE*: Because we are not observing the properties in the service in any way, if we are _reading_ a property on a service, the modifier will not recompute if that value changes. If that's the behavior you need, you probably want to pass that value into the modifier as an argument, rather than injecting it.

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
