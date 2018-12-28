// const Year = require('./units/Year')
// const Month = require('./units/Month')
// const Week = require('./units/Week')
// const Season = require('./units/Season')
// const Quarter = require('./units/Quarter')
// const Day = require('./units/Day')
// const Weekday = require('./units/Weekday')
const dayParser = require('./parsers/01-day')
const holidayParser = require('./parsers/02-holiday')

const applyRel = function(rel, unit) {
  if (rel === 'next') {
    return unit.nextOne()
  } else if (rel === 'last') {
    return unit.lastOne()
  }
  return unit
}

//parse-out this/next/last from input
const parseRelative = function(ts) {
  let rel = ts.match('(next|last|previous|subsequent|current|this)')
  if (!rel.found) {
    return null
  }
  ts.delete(rel) //modifies ts
  if (rel.has('(last|previous)')) {
    return 'last'
  } else if (rel.has('(next|subsequent)')) {
    return 'next'
  }
  return null
}

const findUnit = function(ts, context) {
  let rel = parseRelative(ts)
  // 'June 5th 1992'
  let unit = dayParser(ts, context)
  if (unit && unit.isValid()) {
    unit = applyRel(rel, unit)
    return unit
  }
  // 'christmas'
  unit = holidayParser(ts, context)
  if (unit && unit.isValid()) {
    unit = applyRel(rel, unit)
    return unit
  }
  // let year = new Year(ts, context)
  // if (year.isValid() === true) {
  //   return year
  // }
  // let month = new Month(ts, context)
  // if (month.isValid() === true) {
  //   return month
  // }
  // let week = new Week(ts, context)
  // if (week.isValid() === true) {
  //   return week
  // }
  // let season = new Season(ts, context)
  // if (season.isValid() === true) {
  //   return season
  // }
  // let quarter = new Quarter(ts, context)
  // if (quarter.isValid() === true) {
  //   return quarter
  // }
  // let weekday = new Weekday(ts, context)
  // if (weekday.isValid() === true) {
  //   return weekday
  // }
  // let day = new Day(ts, context)
  // if (day.isValid() === true) {
  //   return day
  // }
  return null
}
module.exports = findUnit
