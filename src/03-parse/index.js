const logicParse = require('./logic')

//
const tokenize = function(doc, context) {
  let results = []
  //this part is handled in compromise
  let dates = doc.dates()
  dates.forEach((ts) => {
    let obj = logicParse(ts, context)
    if (obj) {
      obj.text = ts.out('text')
      obj.normal = ts.out('normal')
      console.log(obj.start.format('MMM yyyy') + ' → ' + obj.end.format('MMM yyyy'))
      // obj.offsets = ts.out('offset')
      results.push(obj)
    }
  })
  return results
}
module.exports = tokenize
