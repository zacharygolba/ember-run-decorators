import Ember from 'ember';
import { expect } from 'chai';
import { describe, it } from 'mocha';

import { throttle } from 'ember-run-decorators';

const { run } = Ember;

describe('throttle', function(done) {
  const Subject = Ember.Object.extend({
    name: '',

    testCounter: 0,

    @throttle(150)
    test(name) {
      this.set('name', name);
      this.incrementProperty('testCounter');
    }
  });

  it('works', function() {
    const subject = Subject.create();

    subject.test('foo');
    subject.test('bar');

    run.later(this, () => {
      subject.test('baz');
      subject.destroy();

      expect( subject.get('name') ).to.equal('foo');
      expect( subject.get('testCounter') ).to.equal(1);
    }, 150);

    run.later(this, () => {
      expect( subject.get('name') ).to.equal('foo');
      expect( subject.get('testCounter') ).to.equal(1);

      done();
    }, 300);
  });
});
