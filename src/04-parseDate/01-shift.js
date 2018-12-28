const knownUnits = {
  second: true,
  minute: true,
  hour: true,
  day: true,
  week: true,
  month: true,
  season: true,
  quarter: true,
  year: true,
}

//turn '5 weeks before' to {weeks:5}
const parseShift = function(doc) {
  let result = {}

  let m = doc.match('#ShiftDate+')
  if (m.found === false) {
    return result
  }
  m.match('#Cardinal #Duration').forEach(ts => {
    let num = ts.match('#Cardinal').out('normal')
    num = parseFloat(num)
    if (num && typeof num === 'number') {
      let unit = ts.match('#Duration').out('normal')
      unit = unit.replace(/s$/, '')
      if (unit && knownUnits.hasOwnProperty(unit)) {
        result[unit] = num
      }
    }
  })
  //is it 2 weeks before?  → -2
  if (m.has('before$') === true) {
    Object.keys(result).forEach((k) => result[k] *= -1)
  }
  return result
}
module.exports = parseShift
