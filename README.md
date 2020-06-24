# anylogger-debug <sub><sup>1.0.1</sup></sub>
### Anylogger adapter for debug

[![npm](https://img.shields.io/npm/v/anylogger-debug.svg)](https://npmjs.com/package/anylogger-debug)
[![license](https://img.shields.io/npm/l/anylogger-debug.svg)](https://opensource.org/licenses/MIT)
[![travis](https://img.shields.io/travis/Download/anylogger-debug.svg)](https://travis-ci.org/Download/anylogger-debug)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

## What is this?
This is an [anylogger](https://npmjs.com/package/anylogger) adapter for [debug](https://npmjs.com/package/debug).

This package is meant for application projects that are using libraries using 
`anylogger`. By including this adapter in your project, all libraries using 
`anylogger` will automatically start to use `debug` as their logging framework.

## Download

* [anylogger-debug.js](https://unpkg.com/anylogger-debug@1.0.1/anylogger-debug.js) 
  (fully commented source ~5kB)
* [anylogger-debug.min.js](https://unpkg.com/anylogger-debug@1.0.1/anylogger-debug.min.js) 
  (minified 135 bytes, gzipped ~[122](#gzip-size) bytes)


## CDN

*index.html*
```html
<script src="https://unpkg.com/anylogger@1.0.2/anylogger.min.js"></script>
<script src="https://unpkg.com/anylogger-debug@1.0.1/browserified-debug-4.1.1.min.js"></script>
<script src="https://unpkg.com/anylogger-debug@1.0.1/anylogger-debug.min.js"></script>
<script>(function(){ // IIFE
  var log = anylogger('index.html')
  log.info('Logging is simple!')
  // to see logging, enable it, e.g.:
  // localStorage.setItem('debug', '*')
})()</script>
```

## Install

Install this adapter, as well as both `anylogger` and `debug`:

```sh
npm install --save anylogger-debug anylogger debug
```

## Include in your application project
This package is meant for application projects. If you are writing a library to
be NPM installed into some other project, most likely you should not include 
any adapter, but instead just use `anylogger` directly.

The `anylogger-debug` adapter will modify the `anylogger` factory in such a way
that the loggers it creates will be logging to `debug`. 

> When using `debug`, all logging is supressed by default. As such, you should make sure to activate debug mode with the environment variable or localStorage key [as usual](https://www.npmjs.com/package/debug#usage) before expecting to see any output. 

To activate the adapter, include it in your application entry point.

### Require

*main.js*
```js
require('anylogger-debug')
```

### Import

*main.js*
```js
import 'anylogger-debug'
```

## Logging in the application project
In your application module code, only use anylogger to stay framework 
independent:

*my-module.js*
```js
import anylogger from 'anylogger'
const log = anylogger('my-module')
log('Logging is simple!')
```

This is helpful if you ever decide to factor out the application module into a
separate library.

## log configuration in the application project

Because `anylogger` is simply using `debug` below the surface, you can use
all the normal configuration mechanisms available for `debug`.

If you need to control log settings programmatically, just import `debug` and
use it directly:

*main.js*
```js
// ...
import debug from 'debug'
debug.enable('my-module')
// ...
```

> I suggest using `debug`'s build-in configuration mechanism via environment variables and localstorage lookup keys instead of doing it from code.

## Issues

Add an issue in this project's 
[issue tracker](https://github.com/download/anylogger-debug/issues) 
to let me know of any problems you find, or questions you may have.


## Copyright

© 2020 by [Stijn de Witt](https://stijndewitt.com). Some rights reserved.


## License

Licensed under the [MIT Open Source license](https://opensource.org/licenses/MIT).

## gzip-size
The GZIP algorithm is available in different flavours and with different 
possible compression settings. The sizes quoted in this README have been
measured using [gzip-size](https://npmjs.com/package/gzip-size) 
by [Sindre Sorhus](https://github.com/sindresorhus), your mileage may vary.
