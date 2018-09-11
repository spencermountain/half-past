const Year = require('./units/Year')
const Month = require('./units/Month')
const Week = require('./units/Week')
const Weekday = require('./units/Weekday')
const Season = require('./units/Season')
const Quarter = require('./units/Quarter')

const findUnit = function(ts, context) {
  let year = new Year(ts, context)
  if (year.isValid() === true) {

    return year
  }
  let month = new Month(ts, context)
  if (month.isValid() === true) {
    return month
  }
  let week = new Week(ts, context)
  if (week.isValid() === true) {
    return week
  }
  let season = new Season(ts, context)
  if (season.isValid() === true) {
    return season
  }
  let quarter = new Quarter(ts, context)
  if (quarter.isValid() === true) {
    return quarter
  }
  let weekday = new Weekday(ts, context)
  if (weekday.isValid() === true) {
    return weekday
  }
  return null
}
module.exports = findUnit
