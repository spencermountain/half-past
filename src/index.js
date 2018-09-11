const defaults = require('./defaults')
const normalize = require('./01-normalize')
const tagger = require('./02-tagger')
const parse = require('./03-parse')

const nlpDate = function(doc, context = {}) {
  context = Object.assign({}, defaults, context)
  //get rid of some junk
  doc = normalize(doc)
  //tag for dates more aggressively than compromise does
  doc = tagger(doc)
  return parse(doc, context)
}
module.exports = nlpDate
