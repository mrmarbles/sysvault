sysvault
========

[![Build Status](https://secure.travis-ci.org/mrmarbles/sysvault.png)](http://travis-ci.org/mrmarbles/sysvault)

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
The MIT License

Copyright (c) 2013 Brian Carr

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

