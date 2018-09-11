const values = require('./01-values')
const logic = require('./02-logic')
const fixup = require('./03-fixup')
//
const tagger = function(doc) {

  doc = values(doc)

  doc = logic(doc)

  doc = fixup(doc)

  return doc
}
module.exports = tagger
