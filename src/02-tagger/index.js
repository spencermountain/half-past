const values = require('./01-values')
const dates = require('./02-dates')
const sections = require('./03-sections')
const time = require('./04-time')
const shifts = require('./05-shifts')
const fixup = require('./06-fixup')

//
const tagger = function(doc) {

  doc = values(doc)
  doc = dates(doc)
  doc = sections(doc)
  doc = time(doc)
  doc = shifts(doc)
  doc = fixup(doc)

  return doc
}
module.exports = tagger
