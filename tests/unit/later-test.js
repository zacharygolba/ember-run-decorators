import Ember from 'ember';
import { expect } from 'chai';
import { describe, it } from 'mocha';

import { later } from 'ember-run-decorators';

const { run } = Ember;

describe('later', function(done) {
  const Subject = Ember.Object.extend({
    name: '',

    @later(150)
    test(name) {
      this.set('name', name);
    }
  });

  it('works', function() {
    const subject = Subject.create();

    subject.test('foo');

    expect( subject.get('name') ).to.equal('');

    run.later(this, () => {
      subject.test('bar');

      expect( subject.get('name') ).to.equal('foo');
    }, 150);

    run.later(this, () => {
      subject.test('baz');
      subject.destroy();

      expect( subject.get('name') ).to.equal('bar');
    }, 300);

    run.later(this, () => {
      expect( subject.get('name') ).to.equal('bar');

      done();
    }, 450);
  });
});
