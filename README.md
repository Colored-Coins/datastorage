# datastorage
[![Build Status](https://travis-ci.org/Colored-Coins/datastorage.svg?branch=master)](https://travis-ci.org/Colored-Coins/datastorage) [![Coverage Status](https://coveralls.io/repos/github/Colored-Coins/datastorage/badge.svg?branch=BLOC-45_engineless-sdk)](https://coveralls.io/github/Colored-Coins/datastorage?branch=BLOC-45_engineless-sdk) [![npm version](https://badge.fury.io/js/data-storage.svg)](http://badge.fury.io/js/data-storage)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### Installation

```sh
$ npm i data-storage
```
### Usage

```js
var DataStorage = require('data-storage')
var ds = new DataStorage()
ds.once('connect', function () {
  console.log('data-storage is now initialized')
})
ds.init()
```

### API

#### Constructor:
```js
DataStorage(settings)
```
where `settings` is an object of these properties:
```js
{
  redisPort: 6379,
  redisHost: '127.0.0.1',
  redisUrl: '127.0.0.1:6379'  // if specified, redisPort and redisHost are ignored
}
```

#### Member methods:
```js
DataStorage.prototype.set(key, value)
DataStorage.prototype.get(key, callback)
DataStorage.prototype.hset(hash, key, callback)
DataStorage.prototype.hget(hash, key, callback)
DataStorage.prototype.hkeys(hash, callback)
```

### Testing

```sh
$ mocha
```
