var util = require('util')
var events = require('events')
var redis = require('redis')
var FileSystem

if (typeof window === 'undefined') {
  FileSystem = require('./filesystem.js')
} else {
  FileSystem = require('./localstorage.js')
}

var DataStorage = function (settings) {
  var self = this

  settings = settings || {}

  self.redisPort = settings.redisPort || 6379
  self.redisHost = settings.redisHost || '127.0.0.1'
}

util.inherits(DataStorage, events.EventEmitter)

DataStorage.prototype.init = function (cb) {
  var self = this

  var once = true
  var end = function () {
    self.hasRedis = false
    self.fs = new FileSystem()
    self.emit('connect')
    if (cb && once) {
      once = false
      return cb()
    }
  }
  if (typeof window !== 'undefined') return end()
  self.redisClient = redis.createClient(self.redisPort, self.redisHost)
  self.redisClient.on('error', function (err) {
    // if (err) console.error('Redis err: ' + err)
    self.redisClient.end()
    end()
  })
  self.redisClient.on('connect', function () {
    // console.log('redis connected!')
    self.hasRedis = true
    self.emit('connect')
    if (cb && once) {
      once = false
      return cb()
    }
  })
}

DataStorage.prototype.set = function (key, value) {
  var self = this

  if (self.hasRedis) {
    self.redisClient.set(key, value)
  } else {
    if (self.fs) {
      self.fs.set(key, value)
    }
  }
}

DataStorage.prototype.get = function (key, callback) {
  var self = this

  if (self.hasRedis) {
    return self.redisClient.get(key, callback)
  } else if (self.fs) {
    return callback(null, self.fs.get(key))
  } else {
    return callback('Key ' + key + ' not found.')
  }
}

DataStorage.prototype.hset = function (hash, key, value) {
  var self = this

  if (self.hasRedis) {
    self.redisClient.hset(hash, key, value)
  } else {
    if (self.fs) {
      self.fs.hset(hash, key, value)
    }
  }
}

DataStorage.prototype.hget = function (hash, key, callback) {
  var self = this

  if (self.hasRedis) {
    return self.redisClient.hget(hash, key, callback)
  } else if (self.fs) {
    return callback(null, self.fs.hget(hash, key))
  } else {
    return callback('Key ' + key + ' not found.')
  }
}

DataStorage.prototype.hkeys = function (hash, callback) {
  var self = this

  if (self.hasRedis) {
    return self.redisClient.hkeys(hash, callback)
  } else if (self.fs) {
    return callback(null, self.fs.hkeys(hash))
  } else {
    return callback('Keys not found.')
  }
}

module.exports = DataStorage
