var fs = require('fs'),
  crypto = require('easycrypto').getInstance(),
  contents = {},
  pwd, vault;

/**
 * Constructor.  It is not recommended
 * that instances of SysVault be directly instantiated.
 * Please use the getInstance() factory method with a
 * corresponding config.
 *
 * @param config
 * @constructor
 */
var SysVault = function(config) {
  pwd = config.pwd;
  vault = config.vault || ".sysvault";
  this.init();
};

/**
 * Initializes an empty sysvault file if one
 * does not currently exist.
 */
SysVault.prototype.init = function() {
  var encrypted, raw;
  if (fs.existsSync(vault)) {
    encrypted = fs.readFileSync(vault, 'utf8');
    raw = crypto.decrypt(encrypted, pwd);
    contents = JSON.parse(raw);
  } else {
    this.flush();
  };
};

/**
 * Adds a key/value pair to the vault cache.  Value
 * can be later retrieved with the same key and the get()
 * method.  Value is transient until flush() is invoked.
 *
 * @param key
 * @param value
 */
SysVault.prototype.put = function(key, value) {
  contents[key] = value;
};

/**
 * Returns the value of a cache item
 * with the provided key.  If no such key
 * exists, then undefined will be returned.
 *
 * @param key
 * @return {*}
 */
SysVault.prototype.get = function(key) {
  return contents[key];
};

/**
 * Persists all transient cache data to the local
 * encrypted .sysvault file.  Will persist the cache
 * synchronously if no callback is provided when invoking
 * flush().  If a callback function is provided as a parameter
 * then persistence will happen asynchronously and that
 * callback will be invoked when the operation is complete,
 * passing in an optional error object if a problem
 * persisting the data occurs.
 *
 * @param callback
 */
SysVault.prototype.flush = function(callback) {
  var raw = JSON.stringify(contents);
  var encrypted = crypto.encrypt(raw, pwd);
  if (callback) {
    fs.writeFile(vault, encrypted, 'utf8', callback);
  } else {
    fs.writeFileSync(vault, encrypted, 'utf8');
  }
};

/**
 * Factory method used to instantiate SysVault instances.
 * Instances must be configured with a password 'pwd' which will
 * be used to encrypt and persist transient cache data when
 * flush() is called;
 *
 * ...sysvault.getInstance({
 *   pwd: 'some password'
 * });
 *
 * If an instance is created with a different password that was
 * used to originally encrypt the data, any calls to flush will
 * fail with an encrypt error.
 *
 * Any number of individual vault files can be created (associated
 * to specific instances of SysVault) by providing a 'vault' config value;
 *
 * ...sysvault.getInstance({
 *   vault: 'somefilename'
 * });
 *
 * @param config
 * @return {SysVault}
 */
exports.getInstance = function(config) {
  return new SysVault(config || {});
};