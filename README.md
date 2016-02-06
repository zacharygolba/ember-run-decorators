# ember-run-decorators [![Build Status](https://travis-ci.org/zacharygolba/ember-run-decorators.svg?branch=master)](https://travis-ci.org/zacharygolba/ember-run-decorators)

This addon utilizes the [proposed decorator spec](https://github.com/wycats/javascript-decorators)
to provide commonly used [`Ember.run`](http://emberjs.com/api/classes/Ember.run.html) methods as decorators.


##### Available run decorators include:
- [bind](#bind)
- [debounce](#debounce) *
- [throttle](#throttle) *
- [later](#later) *

\* Async decorators automatically get cleaned up on `destroy` or `willDestroyElement` with [`run.cancel`](http://emberjs.com/api/classes/Ember.run.html#method_cancel) to prevent nasty bugs and `calling set on a destroyed object` errors in your code.


Heavily inspired by [rwjblue/ember-computed-decorators](https://github.com/rwjblue/ember-computed-decorators).

## Installation

`ember install ember-run-decorators`

## Usage

### Setup

```javascript
// ember-cli-build.js
var app = new EmberApp({
  babel: {
    optional: ['es7.decorators']
  }
});
```


### Decorators

#### [bind](http://emberjs.com/api/classes/Ember.run.html#method_bind)

Allows you to specify which context to call the specified function in while adding the execution of that function to the Ember run loop. This ability makes this method a great way to asynchronously integrate third-party libraries into your Ember application.

###### NOTE: Using the decorator form of `bind` will always maintain the context of the object the decorated function is a member of.

```javascript
import Ember from 'ember';
import { bind } from 'ember-run-decorators';

const { Component } = Ember;

export default Component.extend({
  isShowing: true,

  @bind
  hideOnESC(e) {
    if (e.keyCode === 27) {
      this.set('isShowing', false);
    }
  },

  didInsertElement() {
    window.addEventListener('keyup', this.hideOnESC, false);
  },

  willDestroyElement() {
    window.removeEventListener('keyup', this.hideOnESC, false);
  }
});
```


#### [debounce](http://emberjs.com/api/classes/Ember.run.html#method_debounce)

Delay calling the target method until the debounce period has elapsed with no additional debounce calls. If debounce is called again before the specified time has elapsed, the timer is reset and the entire period must pass again before the target method is called.

```javascript
import Ember from 'ember';
import { debounce } from 'ember-run-decorators';

const { Component } = Ember;

export default Component.extend({
  @debounce(150)
  onScroll(e) {
    // Cool infinite scroll code...
  },

  didInsertElement() {
    window.addEventListener('scroll', this.onScroll);
  },

  willDestroyElement() {
    window.removeEventListener('scroll', this.onScroll);
  }
});
```


#### [throttle](http://emberjs.com/api/classes/Ember.run.html#method_throttle)

Ensure that the target method is never called more frequently than the specified spacing period. The target method is called immediately.

```javascript
import Ember from 'ember';
import { throttle } from 'ember-run-decorators';

const { Component } = Ember;

export default Component.extend({
  isSaved: false,

  @throttle(500)
  click(e) {
    this.send('save');
  },

  actions: {
    save() {
      this.set('isSaved', true);
    }
  }
});
```


#### [later](http://emberjs.com/api/classes/Ember.run.html#method_later)

Invokes the passed target/method and optional arguments after a specified period of time.

```javascript
import Ember from 'ember';
import { later } from 'ember-run-decorators';

const { Component } = Ember;

export default Component.extend({
  isShowing: true,

  @later(300)
  didClose() {
    this.attrs.didClose();
  },

  actions: {
    close() {
      this.didClose();
      this.set('isShowing', false);
    }
  }
});
```


## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).


## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
