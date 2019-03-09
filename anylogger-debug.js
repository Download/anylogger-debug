var a = require('anylogger')
var d = require('debug')

// override anylogger.ext() to make every log method use debug
a.ext = function(l,o) {
  o = d(l.name)
  for (v in a.levels)
    l[v] = o
  return l;
};
