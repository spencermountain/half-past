const Year = require('./units/Year')
const Month = require('./units/Month')
const Week = require('./units/Week')
const Weekday = require('./units/Weekday')
const Season = require('./units/Season')
const Quarter = require('./units/Quarter')

// when a unit of time is spoken of as 'this month' - instead of 'february'
const findRelativeUnit = function(doc) {
  if (doc.has('this? [(next|last|current|this)] month') === true) {

  }
  return null
}
module.exports = findRelativeUnit
