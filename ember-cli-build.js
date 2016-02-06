/*jshint node:true*/
/* global require, module */
var path = require('path');
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var jsStringEscape = require('js-string-escape');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    babel: {
      optional: ['es7.decorators']
    },

    eslint: {
      testGenerator: eslintTestGenerator
    },

    'ember-cli-mocha': {
      useLintTree: false
    }
  });

  function render(errors) {
    if (!errors) { return ''; }
    return errors.map(function(error) {
      return error.line + ':' + error.column + ' ' +
        ' - ' + error.message + ' (' + error.ruleId +')';
    }).join('\n');
  }

  function eslintTestGenerator(relativePath, errors) {
    var pass = !errors || errors.length === 0;
    return "import { describe, it } from 'mocha';\n" +
      "import { assert } from 'chai';\n" +
      "describe('ESLint - " + path.dirname(relativePath) + "', function() {\n" +
      "  it('" + relativePath + " should pass ESLint', function() {\n" +
      "    assert.ok(" + pass + ", '" + relativePath + " should pass ESLint." +
      jsStringEscape("\n" + render(errors)) + "');\n" +
     "  });\n});\n";
  }

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
