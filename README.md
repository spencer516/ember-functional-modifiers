ember-functional-modifiers
==============================================================================

This addon provides a [`useLayoutEffect`-like](https://reactjs.org/docs/hooks-reference.html#useeffect) API for adding modifiers to elements in Ember.

For more information on modifiers, please check out @pzuraq's wonderful [blog post](https://www.pzuraq.com/coming-soon-in-ember-octane-part-4-modifiers/).

Compatibility
------------------------------------------------------------------------------

This is currently compatible with:

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

## Generating a Functional Modifier

To create a modifier (and a corresponding integration test), run:

```
ember g functional-modifier scroll-top
```

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

## Example with Cleanup (on destroy)

By default, a functional modifier that returns a cleanup method will trigger the cleanup on each change — the reason for this is similar to the reason for the same behavior with [`useEffect`](https://reactjs.org/docs/hooks-effect.html#explanation-why-effects-run-on-each-update) in React.

If, however, unsubscribing/resubscribing on every change is a particularly expensive action, you may only want to cleanup when the element is about to be removed, not when it updates. (An aside: Because you have to track some state between modifier calls, a better solution _may_ be to use [`ember-oo-modifiers`](https://github.com/sukima/ember-oo-modifiers) instead).

But you can do it with a functional modifier. For example, let's imagine that we're using an RxJS observable-like thing that lets us hot-swap the action it fires. That may look something like:

```js
// app/modifiers/my-rx-thing.js
import makeFunctionalModifier from 'ember-functional-modifiers';
import subscribe from './my-rx-js-observer';

const OBSERVERS = new WeakMap();

export default makeFunctionalModifier((element, [action]) => {
  const observer = OBSERVERS.has(element) ? OBSERVERS.get(element) : subscribe(element);

  observer.updateAction(action);

  OBSERVERS.set(element, observer);

  return (isRemoving) => {
    if (isRemoving) {
      observer.unsubscribe();
    }
  };
});
```

```hbs
<button {{my-rx-thing (action "handleAction")}}>
  Click Me!
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
