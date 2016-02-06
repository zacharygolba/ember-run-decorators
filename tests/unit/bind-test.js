import Ember from 'ember';
import { expect } from 'chai';
import { describe, it } from 'mocha';

import { bind } from 'ember-run-decorators';

describe('bind', function() {
  const Subject = Ember.Object.extend({
    @bind
    K() {
      return this;
    }
  });

  it('works', function() {
    const subject = Subject.create();
    const { K } = subject;

    expect( K() ).to.equal(subject);
  });
});
