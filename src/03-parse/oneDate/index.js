const Year = require('./units/Year')
//
const oneDate = function(ts, context) {
  if (ts.has('#Year') === true) {
    let unit = new Year(ts, context)
    if (unit.isValid() === true) {
      return unit
    }
  }
  return null
}
module.exports = oneDate
