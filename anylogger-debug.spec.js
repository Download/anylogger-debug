import { expect } from 'chai'
import sinon      from 'sinon'
import 'anylogger-debug'
import anylogger  from 'anylogger'
import debug      from 'debug'

var sandbox = sinon.createSandbox();

describe('anylogger([name, [options]]) => log', function() {
  beforeEach(function(){
    // spy on the debug.log method
    sandbox.spy(debug, 'log')
  })

  afterEach(function(){
    // clear any loggers that were created
    for (const name in anylogger.all) {
      delete anylogger.all[name]
    }
    // restore original console methods
    sandbox.restore()
  })


  it('is a function', function(){
    expect(anylogger).to.be.a('function')
  })

  it('returns a named logger when called with a name', function(){
    var name = 'test'
    var result = anylogger(name)
    expect(result).to.be.a('function')
    expect(result.name).to.equal(name)
  })

  it('returns the same logger when called multiple times with the same name', function(){
    var name = 'test'
    var expected = anylogger(name)
    var actual = anylogger(name)
    expect(actual).to.equal(expected)
  })

  it('calls anylogger.new when a new logger named "test" is created', function(){
    sandbox.spy(anylogger, 'new')
    expect(anylogger.new.callCount).to.equal(0)
    anylogger('test')
    expect(anylogger.new.callCount).to.equal(1)
  })

  it('calls anylogger.ext when a new logger named "test" is created', function(){
    sandbox.spy(anylogger, 'ext')
    expect(anylogger.ext.callCount).to.equal(0)
    anylogger('test')
    expect(anylogger.ext.callCount).to.equal(1)
  })

  it('does not call anylogger.new on subsequent calls with the same name', function(){
    sandbox.spy(anylogger, 'new')
    expect(anylogger.new.callCount).to.equal(0)
    anylogger('test')
    expect(anylogger.new.callCount).to.equal(1)
    anylogger('test')
    expect(anylogger.new.callCount).to.equal(1)
  })

  it('calls anylogger.new when a new logger named "toString" is created', function(){
    sandbox.spy(anylogger, 'new')
    expect(anylogger.new.callCount).to.equal(0)
    anylogger('toString')
    expect(anylogger.new.callCount).to.equal(1)
  })

  it('does not call anylogger.new on subsequent calls with "toString" as argument', function(){
    sandbox.spy(anylogger, 'new')
    expect(anylogger.new.callCount).to.equal(0)
    anylogger('toString')
    expect(anylogger.new.callCount).to.equal(1)
    anylogger('toString')
    expect(anylogger.new.callCount).to.equal(1)
  })

  it('accepts an optional options argument', function(){
    var name = 'test'
    var options = { level: 'info' }
    var result = anylogger(name, options)
    expect(result).to.be.a('function')
  })

  describe('log', function(){
    it('is a function', function(){
      var name = 'test'
      var log = anylogger(name)
      expect(log).to.be.a('function')
    })

    it('has a name that matches the name given to anylogger', function(){
      var name = 'test'
      var log = anylogger(name)
      expect(log.name).to.equal(name)
    })

    it('has a method `trace`', function(){
      var log = anylogger('test')
      expect(log).to.have.property('trace')
      expect(log.trace).to.be.a('function')
    })

    it('has a method `debug`', function(){
      var log = anylogger('test')
      expect(log).to.have.property('debug')
      expect(log.debug).to.be.a('function')
    })

    it('has a method `log`', function(){
      var log = anylogger('test')
      expect(log).to.have.property('log')
      expect(log.log).to.be.a('function')
    })

    it('has a method `info`', function(){
      var log = anylogger('test')
      expect(log).to.have.property('info')
      expect(log.info).to.be.a('function')
    })

    it('has a method `warn`', function(){
      var log = anylogger('test')
      expect(log).to.have.property('warn')
      expect(log.warn).to.be.a('function')
    })

    it('has a method `error`', function(){
      var log = anylogger('test')
      expect(log).to.have.property('error')
      expect(log.error).to.be.a('function')
    })

    it('has a method `enabledFor`', function(){
      try {
        var log = anylogger('test')
        expect(log).to.have.property('enabledFor')
        expect(log.enabledFor).to.be.a('function')
        expect(log.enabledFor()).to.not.equal(true)
        debug.enable('test')
        expect(log.enabledFor()).to.equal(true)
      }
      finally {
        debug.disable()
      }
    })

    it('can be invoked to log a message', function(){
      try {
        debug.enable('test')
        var log = anylogger('test')
        log('message')
        expect(debug.log.callCount).to.equal(1)
      }
      finally {
        debug.disable()
      }
    })

    it('can be invoked with a level name as first argument to log a message at that level', function(){
      try {
        // debug.enable('test')
        var log = anylogger('test')
        sandbox.spy(log, 'log')
        sandbox.spy(log, 'info')
        log('info', 'message')
        expect(log.log.callCount).to.equal(0)
        expect(log.info.callCount).to.equal(1)
      }
      finally {
        debug.disable()
      }
    })

    it('by default, prints no messages to the console', function(){
      var log = anylogger('test')
      expect(debug.log.callCount).to.equal(0)
      log('message')
      expect(debug.log.callCount).to.equal(0)
    })

    it('when enabled via debug, prints messages to the console', function(){
      try {
        debug.enable('test')
        var log = anylogger('test')
        expect(debug.log.callCount).to.equal(0)
        log('message')
        expect(debug.log.callCount).to.equal(1)
      }
      finally {
        debug.disable()
      }
    })


  })
})
