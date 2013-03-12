sysvault
========

[![Build Status](https://travis-ci.org/mrmarbles/sysvault.png?branch=master)](https://travis-ci.org/mrmarbles/sysvault)

Safe and secure file system key/value store.

Installation
---------------
     npm install sysvault

Use
---------------
    var vault = require('sysvault').getInstance({
      pwd: 'mypassword'
    });

    vault.put('hello', 'world');
    vault.flush(); // persists all transient keys to the local filesystem, encrypted

    var unencrypted = vault.get('hello');

Testing
---------------
    npm test

License
-------
[MIT License](http://mrmarbles.mit-license.org/ "Mit License")

