import anylogger, {
  type LogFunction,
  type LogLevel,
  type Logger,
} from 'anylogger'
import debug from 'debug'

// override anylogger.ext() to make every log method use debug
anylogger.ext = function(logger: LogFunction): Logger {
  var method = debug(logger.name)
  for (var level in anylogger.levels) {
    (logger as Logger)[level as LogLevel] = method
  }
  (logger as Logger).enabledFor = debug.enabled.bind(logger, logger.name)
  return logger as Logger
}
