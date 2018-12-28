const parseShift = require('./01-shift')
const relativeUnit = require('./02-relUnit')
const namedUnit = require('./03-namedUnit')
const applyShift = require('./_apply-shift')
//

const oneDate = function(ts, context) {
  // 2 weeks before...
  let shift = parseShift(ts)
  ts.delete('#ShiftDate+')

  // 'this month'
  let unit = relativeUnit(ts, context)
  if (unit && unit.isValid()) {
    unit = applyShift(unit, shift)
    return unit
  }

  // 'june 5th'
  unit = namedUnit(ts, context)
  if (unit && unit.isValid()) {
    unit = applyShift(unit, shift)
    return unit
  }
  return null
}


module.exports = oneDate
