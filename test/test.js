var DataStorage = require('..')
var assert = require('chai').assert

describe('Test DataStorage', function () {

	var ds

	before(function (done) {
		ds = new DataStorage()
		ds.once('connect', done)
		ds.init()
	})

  it('Should set and get a value', function (done) {
    var key = Math.random().toString(36).substring(7)
    var value = Math.random().toString(36).substring(7)

    ds.set(key, value)
    ds.get(key, function (err, val) {
    	assert.ifError(err)
    	assert.equal(val, value, 'value should be equal to original value.')
    	done()
    })
  })

  it('Should set and get a value in hmap', function (done) {
    var hash = Math.random().toString(36).substring(7)
    var key = Math.random().toString(36).substring(7)
    var value = Math.random().toString(36).substring(7)

    ds.hset(hash, key, value)
    ds.hget(hash, key, function (err, val) {
    	assert.ifError(err)
    	assert.equal(val, value, 'value should be equal to original value.')
    	done()
    })
  })

  it('Should set and get a value in hmap', function (done) {
    var hash = Math.random().toString(36).substring(7)
    var key = Math.random().toString(36).substring(7)
    var value = Math.random().toString(36).substring(7)

    ds.hset(hash, key, value)
    ds.hkeys(hash, function (err, keys) {
    	assert.ifError(err)
    	assert.include(keys, key)
    	done()
    })
  })

})