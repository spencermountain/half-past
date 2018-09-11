const spacetime = require('spacetime')

//from a list ot start-dates, determine which one we're 'in'
const getCurrent = function(d, arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let start = spacetime(arr[i], d.timezone().name)
    start.year(d.year()) //make them the same year
    start.startOf('day')
    // console.log(season.format('nice'), d.format('nice'))
    if (d.isBefore(start)) {
      //we've passed it, return last one
      i -= 1
      if (i < 0) {
        return arr.length - 1
      }
      return i
    }
  }
  return arr.length - 1
}

module.exports = getCurrent
