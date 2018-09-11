
//
const applyShift = function(unit, shift) {
  Object.keys(shift).forEach((k) => {
    unit.d.add(shift[k], k)
  })
  return unit
}
module.exports = applyShift
