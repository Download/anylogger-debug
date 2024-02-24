import anylogger, {
  type LogLevel,
  type Logger,
  type Adapter,
} from 'anylogger'
import debug from 'debug'

const adapter: Adapter = (anylogger, debug) => {
  // bail early if it was already extended
  if ((anylogger as any).debug) return
  // override anylogger.ext() to make every log method use debug
  anylogger.ext = function(logger) {
    var method = debug(logger.name)
    for (var level in anylogger.levels) {
      (logger as Logger)[level as LogLevel] = method
    }
    (logger as Logger).enabledFor = debug.enabled.bind(logger, logger.name)
    return logger as Logger
  }
  // set a flag so we can see it was already extended
  ;(anylogger as any).debug = debug
}

export default adapter

// back compat
adapter(anylogger, debug)
