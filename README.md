# anylogger-debug
### Anylogger adapter for debug

[![npm](https://img.shields.io/npm/v/anylogger-debug.svg)](https://npmjs.com/package/anylogger-debug)
[![license](https://img.shields.io/npm/l/anylogger-debug.svg)](https://opensource.org/licenses/MIT)
[![travis](https://img.shields.io/travis/Download/anylogger-debug.svg)](https://travis-ci.org/Download/anylogger-debug)
[![greenkeeper](https://img.shields.io/david/Download/anylogger-debug.svg)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

## What is this?
This is an [anylogger](https://npmjs.com/package/anylogger) adapter for [debug](https://npmjs.com/package/debug).

This package is meant for application projects that are using libraries using `anylogger`. By including this adapter in your project, all libraries using `anylogger` will automatically start to use `debug` as their logging framework.

## Install

Install both `anylogger` and `debug`, as well as this adapter:

```sh
npm install anylogger debug anylogger-debug
```

## Include in your application project
This package is meant for application projects. If you are writing a library to be NPM installed into some other project, most likely you should not include any adapter, but instead just use `anylogger` directly.

The anylogger-debug adapter will modify the `anylogger` factory in such a way that the loggers it creates will be logging to `debug`. As such, you should make sure to activate debug mode with the environment variable or localStorage key as usual before expecting to see any output.

To activate the adapter, include it in your application entry point.

### Require

*main.js*
```js
require('anylogger-debug')
```

### Import

*main.js*
```js
require('anylogger-debug')
```

## Logging in the application project
In your application module code, only use anylogger to stay framework independent:

*my-module.js*
```js
var anylogger = require('anylogger')
var log = anylogger('my-module')
log('Logging is simple!')
```

This is helpful if you ever decide to factor out the application module into a separate library.

## log configuration in the application project

If you need to control log settings programmatically, do it as you always would:

*main.js*
```js
require('anylogger-debug')
var debug = require('debug')
debug.enable('my-module')
```

> I suggest using debug's build-in configuration mechanism instead of doing it from code.

## Issues

Add an issue in this project's 
[issue tracker](https://github.com/download/anylogger-debug/issues) 
to let me know of any problems you find, or questions you may have.


## Copyright

© 2019 by [Stijn de Witt](https://stijndewitt.com). Some rights reserved.


## License

Licensed under the [MIT Open Source license](https://opensource.org/licenses/MIT).
