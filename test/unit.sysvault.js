var factory = require('../lib/sysvault'),
  fs = require('fs');

module.exports = {

  "Test should initialize default vault file": function(test) {

    var vault = factory.getInstance({
      pwd:'test'
    });

    test.ok(fs.existsSync('.sysvault'));

    test.done();

    fs.unlinkSync('.sysvault');

  },

  "Test should put and get value": function(test) {

    var vault = factory.getInstance({
      pwd:'test'
    });

    vault.put('hello', 'world');

    test.equals('world', vault.get('hello'));

    test.done();

    fs.unlinkSync('.sysvault');

  }

};