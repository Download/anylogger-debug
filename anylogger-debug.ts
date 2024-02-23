import anylogger, {
  type LogLevel,
  type Logger,
  type Extension,
  type Adapter,
} from 'anylogger'
import debug from 'debug'

const extension: Extension = function(logger) {
  var method = debug(logger.name)
  for (var level in anylogger.levels) {
    (logger as Logger)[level as LogLevel] = method
  }
  (logger as Logger).enabledFor = debug.enabled.bind(logger, logger.name)
  return logger as Logger
}

const adapter: Adapter = (anylogger) => {
  // override anylogger.ext() to make every log method use debug
  anylogger.ext = extension
}

export default adapter

// back compat
adapter(anylogger)

