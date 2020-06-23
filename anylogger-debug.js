import anylogger from 'anylogger'
import debug from 'debug'

// override anylogger.ext() to make every log method use debug
anylogger.ext = function(logger) {
  var method = debug(logger.name)
  for (var level in anylogger.levels) {
    logger[level] = method
  }
  logger.enabledFor = debug.enabled.bind(logger, logger.name)
  return logger
}
