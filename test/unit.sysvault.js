var factory = require('../lib/sysvault'),
  fs = require('fs');

module.exports = {

  setUp: function(callback) {
    this.vault = factory.getInstance({
      pwd:'test'
    });
    callback();
  },

  "Test should initialize default vault file": function(test) {

    test.ok(fs.existsSync('.sysvault'));

    test.done();

  },

  "Test should put and get value": function(test) {

    this.vault.put('hello', 'world');

    test.equals('world', this.vault.get('hello'));

    test.done();

  },

  "Test should flush synchronously without callback": function(test) {

    this.vault.put('hello', 'world');

    this.vault.flush();

    test.done();

  },

  "Test should flush asynchronously with callback": function(test) {

    this.vault.put('hello', 'world');

    this.vault.flush(function(err) {
      test.ok(!err);
      test.done();
    });

  },

  tearDown: function(callback) {
    fs.unlinkSync('.sysvault');
    callback();
  }

};