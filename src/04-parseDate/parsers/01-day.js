const Day = require('../units/Day')
const spacetime = require('spacetime')

//most of this is done by compromise/spacetime already.
const dayParser = function(ts, context) {
  //use the compromise date-parser for this.
  //this is a little rough still...
  let dates = ts.dates().data()
  dates = dates.filter((d) => d.date.month !== null && d.date.date !== null)
  dates = dates.map((o) => {
    //allow for assuming our year, if it's not given
    let year = o.date.year || spacetime(context.now).year()
    let arr = [year, o.date.month, o.date.date]
    let s = spacetime(arr, context.timezone)
    // if we're not given a year, should we assume the next year?
    // only if it's more than a month ago #judgement
    if (!o.date.year && s.diff(context.now, 'months') > 1) {
      s.add(1, 'year')
    }
    return s
  })
  dates = dates.filter((d) => d.isValid())
  if (dates.length === 0) {
    return null
  }
  let iso = dates[0].format('iso-short')
  let day = new Day(iso, context)
  return day
}
module.exports = dayParser
